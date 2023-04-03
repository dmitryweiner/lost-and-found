import {QueryClient, useQuery, useMutation} from "@tanstack/react-query";
import {API} from "./api";
import {FileType, LoginData, PhotoData, RegistrationData} from "../interfaces";
import toast from "react-hot-toast";
import history from "../history";
import routes from "./routes";

const STALE_TIME = 60 * 1000;
const CURRENT_USER_QUERY = "currentUser";
const DETAILED_USER_QUERY = "detailedUser";
const ALL_PHOTOS_QUERY = "allPhotos";
const PHOTO_QUERY = "photo";
const ALL_TAGS_QUERY = "allTags";
const DETECT_IMAGE_QUERY = "detectImage";

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

export const useUpdateUserMutation = ()  => useMutation(
  (data: {password: string}) => API.user.update(data),
  {
    onSuccess: () => {
      toast.success("User successfully updated.");
      return queryClient.invalidateQueries({queryKey: [DETAILED_USER_QUERY]});
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

export const useDetailedUserQuery = () => useQuery(
  [DETAILED_USER_QUERY],
  () => API.user.getCurrentUser(true)
);

export const useFileUploadMutation = () => useMutation<FileType, unknown, FormData>(
  (formData: FormData) => API.file.upload(formData)
);

export const useDetectImageQuery = (filename?: string) => useQuery(
  [DETECT_IMAGE_QUERY, filename],
  () => API.clarifai.detect(filename!!),
  {
    enabled: !!filename
  }
);

export const useCreatePhotoMutation = () => useMutation(
  (photoData: PhotoData) => API.photo.create(photoData),
  {
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({queryKey: [ALL_PHOTOS_QUERY]}),
      queryClient.invalidateQueries({queryKey:[ALL_TAGS_QUERY]}),
      queryClient.invalidateQueries({queryKey: [DETAILED_USER_QUERY]})
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

export const useDeleteTagMutation = () => useMutation(
  (id: number) => API.tag.deleteById(id),
  {
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({queryKey: [DETAILED_USER_QUERY]}),
      queryClient.invalidateQueries({queryKey: [ALL_TAGS_QUERY]})
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
