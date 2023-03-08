import axios from "axios";
import history from "../history";
import {FileType, LoginData, Photo, PhotoData, RegistrationData, Tag, User} from "../interfaces";
import toast from "react-hot-toast";

export const BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

client.interceptors.response.use(
  response => response.data,
  async error => {
    let message = error.response?.data?.error ?? error.message;
    toast.error(message);
    if (error.response.status === 401) {
      return history.replace("/login");
    }
    return Promise.reject(error);
  });


export const API = {
  auth: {
    login: (data: LoginData) => client.post("/auth", data),
    logout: () => client.delete("/auth"),
  },
  user: {
    register: (data: RegistrationData) => client.post("/user", data),
    getCurrentUser: () => client.get<never, User>("/user"),
  },
  file: {
    upload: (formData: FormData) => client.post<never, FileType>("/file", formData)
  },
  photo: {
    create: ({tags, filename}: PhotoData) => client.post<never, Photo>("/photo", {
      tags,
      filename
    }),
    getAll: (query: string) => client.get<never, Photo[]>(`/photo/?query=${query}`)
  },
  tag: {
    getAll: () => client.get<never, Tag[]>("/tag"),
    getById: (id: number) => client.get<never, Tag>(`/tag/${id}`)
  }

};
