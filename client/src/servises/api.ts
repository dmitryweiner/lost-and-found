export const BASE_URL = "http://localhost:3001";

type LoginData = {
  login: string;
  password: string;
};

type RegistrationData = {
  login: string;
  password: string;
};

type PhotoData = {
  tags: string[],
  filename: string
};

const errorHandler = async (response: Response) => {
  if (response.status !== 200) {
    const responseData = await response.json();
    throw Error(responseData.message);
  }
};

export const API = {
  auth: {
    login: async (data: LoginData) => {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      await errorHandler(response);
    },
    logout: async () => {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "DELETE",
        credentials: "include",
      });
      await errorHandler(response);
    },
  },
  user: {
    register: async (data: RegistrationData) => {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      await errorHandler(response);
    },
    getCurrentUser: async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
        method: "GET"
      });
      await errorHandler(response);
      return await response.json();
    },
  },
  file: {
    upload: async (formData: FormData) => {
      const response = await fetch(`${BASE_URL}/file`, {
        credentials: "include",
        method: "POST",
        body: formData
      });
      await errorHandler(response);
      return await response.json();
    }
  },
  photo: {
    create: async ({tags, filename}: PhotoData) => {
      const response = await fetch(`${BASE_URL}/photo`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tags,
          filename
        })
      });
      await errorHandler(response);
      return await response.json();
    },
    getAll: async (query: string) => {
      const response = await fetch(`${BASE_URL}/photo/?query=${query}`, {
        credentials: "include",
        method: "GET"
      });
      await errorHandler(response);
      return await response.json();
    }
  },
  tag: {
    getAll: async () => {
      const response = await fetch(`${BASE_URL}/tag`, {
        credentials: "include",
        method: "GET"
      });
      await errorHandler(response);
      return await response.json();
    }
  }

};
