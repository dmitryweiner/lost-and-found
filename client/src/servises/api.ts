import axios from "axios";
import { Cookies } from "react-cookie";
import history from "../history";
import {
  ClarifaiResponse,
  Concept,
  FileType,
  LoginData,
  Photo,
  PhotoData,
  RegistrationData,
  Tag,
  User
} from "../interfaces";
import toast from "react-hot-toast";
import routes from "./routes";
import { getPhotoUrl } from "./utils";

export type ErrorResponse = {
  error: string;
};

export const BASE_URL = process.env.REACT_APP_API_URL;
const CLARIFAI_KEY = process.env.REACT_APP_CLARIFAI_KEY;

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const COOKIE_NAME = "token";
const COOKIE_TTL = 24 * 60 * 60 * 1000;
const cookies = new Cookies();

client.interceptors.request.use(
  (config) => {
    const token = cookies.get(COOKIE_NAME);
    if (token && config.withCredentials) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const message = error.response?.data?.error ?? error.message;
    if (error.response?.status === 401) {
      history.replace(routes.login);
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export const API = {
  auth: {
    login: async (data: LoginData) => {
      const result = await client.post<never, { token: string }>("/auth", data);
      const d = new Date();
      d.setTime(d.getTime() + COOKIE_TTL);
      cookies.set(COOKIE_NAME, result.token, {
        expires: d,
        sameSite: "lax"
      });
      return Promise.resolve();
    },
    logout: async () => {
      await client.delete("/auth");
      cookies.remove(COOKIE_NAME);
      return Promise.resolve();
    }
  },
  user: {
    register: (data: RegistrationData) => client.post("/user", data),
    getCurrentUser: (isFull = false) =>
      client.get<never, User>(`/user${isFull ? "?full=true" : ""}`),
    update: (data: { password: string }) => client.patch("/user", data)
  },
  file: {
    upload: (formData: FormData) =>
      client.post<never, FileType>("/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
  },
  photo: {
    create: ({ tags, filename }: PhotoData) =>
      client.post<never, Photo>("/photo", {
        tags,
        filename
      }),
    getAll: (query: string) => client.get<never, Photo[]>(`/photo/?query=${query}`),
    getById: (id: number) => client.get<never, Photo>(`/photo/${id}`),
    deleteById: (id: number) => client.delete<never, void>(`/photo/${id}`)
  },
  tag: {
    getAll: () => client.get<never, Tag[]>("/tag"),
    getById: (id: number) => client.get<never, Tag>(`/tag/${id}`),
    deleteById: (id: number) => client.delete<never, void>(`/tag/${id}`)
  },
  clarifai: {
    detect: async (filename: string): Promise<Concept[]> => {
      const data = {
        user_app_id: {
          user_id: "clarifai",
          app_id: "main"
        },
        inputs: [
          {
            data: {
              image: {
                url: getPhotoUrl(filename)
              }
            }
          }
        ]
      };

      const response = await client.post<never, ClarifaiResponse>(
        "/v2/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs",
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            Authorization: `Key ${CLARIFAI_KEY}`
          },
          withCredentials: false,
          baseURL: "https://api.clarifai.com"
        }
      );
      return response.outputs[0].data.concepts;
    }
  }
};
