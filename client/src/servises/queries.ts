import {QueryClient, useQuery, useMutation, QueryCache} from "@tanstack/react-query";
import {API, ErrorResponse} from "./api";
import {FileType, LoginData, PhotoData} from "../interfaces";
import toast from "react-hot-toast";
import history from "../history";
import axios from "axios";

const STALE_TIME = 60 * 1000;
const CURRENT_USER_QUERY = "currentUser";
const ALL_PHOTOS_QUERY = "allPhotos";
const ALL_TAGS_QUERY = "allTags";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: STALE_TIME
    },
  },
});
export const useLoginMutation = ()  => useMutation(
  (data: LoginData) => API.auth.login(data),
  {
    onSuccess: () => {
      queryClient.invalidateQueries([CURRENT_USER_QUERY]);
      toast.success("User successfully logged in.");
      setTimeout(() => {
        history.replace("/");
      }, 1000);
    },
  }
);

export const useLogoutMutation = () => useMutation(
  () => API.auth.logout(),
  {
    onSuccess: () => {
      queryClient.invalidateQueries([CURRENT_USER_QUERY]);
      toast.success("User successfully logged out.");
      setTimeout(() => {
        history.replace("/login");
      }, 1000);
    },
  }
);

export const useCurrentUserQuery = () => useQuery(
  [CURRENT_USER_QUERY],
  () => API.user.getCurrentUser()
);

export const useFileUploadMutation = () => useMutation<FileType, unknown, FormData>(
  (formData: FormData) => API.file.upload(formData)
);

export const useCreatePhotoMutation = () => useMutation(
  (photoData: PhotoData) => API.photo.create(photoData)
);

export const useAllPhotosQuery = (query: string) => useQuery(
  [ALL_PHOTOS_QUERY, query],
  () => API.photo.getAll(query)
);

export const useAllTagsQuery = () => useQuery(
  [ALL_TAGS_QUERY],
  () => API.tag.getAll()
);
