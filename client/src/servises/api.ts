import axios from "axios";
import {Cookies} from "react-cookie";
import history from "../history";
import {
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

export type ErrorResponse = {
  error: string;
};

export const BASE_URL = process.env.REACT_APP_API_URL;

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
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  response => response.data,
  async error => {
    let message = error.response?.data?.error ?? error.message;
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
    },
  },
  user: {
    register: (data: RegistrationData) => client.post("/user", data),
    getCurrentUser: () => client.get<never, User>("/user"),
  },
  file: {
    upload: (formData: FormData) => client.post<never, FileType>("/file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  },
  photo: {
    create: ({tags, filename}: PhotoData) => client.post<never, Photo>("/photo", {
      tags,
      filename
    }),
    getAll: (query: string) => client.get<never, Photo[]>(`/photo/?query=${query}`),
    getById: (id: number) => client.get<never, Photo>(`/photo/${id}`),
    deleteById: (id: number) => client.delete<never, void>(`/photo/${id}`),
  },
  tag: {
    getAll: () => client.get<never, Tag[]>("/tag"),
    getById: (id: number) => client.get<never, Tag>(`/tag/${id}`)
  }

};
