import {QueryClient, useQuery, useMutation} from "@tanstack/react-query";
import {API} from "./api";
import {FileType, LoginData, PhotoData, RegistrationData} from "../interfaces";
import toast from "react-hot-toast";
import history from "../history";
import routes from "./routes";

const STALE_TIME = 60 * 1000;
const CURRENT_USER_QUERY = "currentUser";
const ALL_PHOTOS_QUERY = "allPhotos";
const PHOTO_QUERY = "photo";
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
      history.replace(routes.home);
      toast.success("User successfully logged in.");
      queryClient.invalidateQueries([CURRENT_USER_QUERY]);
    },
  }
);

export const useRegisterMutation = ()  => useMutation(
  (data: RegistrationData) => API.user.register(data),
  {
    onSuccess: () => {
      toast.success("User successfully created.");
      setTimeout(() => {
        history.replace(routes.login);
      }, 1000);
    },
  }
);

export const useLogoutMutation = () => useMutation(
  () => API.auth.logout(),
  {
    onSuccess: () => {
      queryClient.clear();
      toast.success("User successfully logged out.");
      setTimeout(() => {
        history.replace(routes.login);
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
  (photoData: PhotoData) => API.photo.create(photoData),
  {
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({queryKey: [ALL_PHOTOS_QUERY]}),
      queryClient.invalidateQueries({queryKey:[ALL_TAGS_QUERY]})
    ])
  }
);

export const useDeletePhotoMutation = () => useMutation(
  (id: number) => API.photo.deleteById(id),
  {
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({queryKey: [ALL_PHOTOS_QUERY]}),
      queryClient.invalidateQueries({queryKey:[ALL_TAGS_QUERY]})
    ])
  }
);

export const useAllPhotosQuery = (query: string) => useQuery(
  [ALL_PHOTOS_QUERY, query],
  () => API.photo.getAll(query)
);

export const usePhotoQuery = (id: number) => useQuery(
  [PHOTO_QUERY, id],
  () => API.photo.getById(id), {
    enabled: !!id
  }
);

export const useAllTagsQuery = () => useQuery(
  [ALL_TAGS_QUERY],
  () => API.tag.getAll()
);
