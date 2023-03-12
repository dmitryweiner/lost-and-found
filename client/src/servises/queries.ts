import {QueryClient, useQuery, useMutation, QueryCache} from "@tanstack/react-query";
import {API, ErrorResponse} from "./api";
import {LoginData} from "../interfaces";
import toast from "react-hot-toast";
import history from "../history";
import axios from "axios";

const STALE_TIME = 60 * 1000;
const CURRENT_USER_QUERY = "currentUser";

const queryCache  = new QueryCache({
  onError: (error) => {
    console.log({error});
    let message = "";
    let notAuthorizedError = false;
    if (error instanceof Error) {
      message = error.message;
    }
    if (axios.isAxiosError<ErrorResponse>(error)) {
      message = error.response?.data?.error as string;
      if (error?.response?.status === 401) {
        notAuthorizedError = true;
        history.replace("/login");
      }
    }
    if (!notAuthorizedError) {
      toast.error(message);
    }
  },
});
export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
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
  () => API.user.getCurrentUser(),
  {
    staleTime: STALE_TIME,
    retry: false
  }
);
