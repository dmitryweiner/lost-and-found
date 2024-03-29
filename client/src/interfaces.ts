export type LoginData = {
  login: string;
  password: string;
};

export type RegistrationData = {
  login: string;
  password: string;
};

export type PhotoData = {
  tags: string[];
  filename: string;
};

export type User = {
  id: number;
  login: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  Tags?: Tag[];
  Photos?: Photo[];
};

export type Tag = {
  id: number;
  name: string;
};

export type Photo = {
  id: number;
  filename: string;
  Tags: Tag[];
  createdAt: string;
};

export type FileType = {
  filename: string;
};

export type ClarifaiResponse = {
  outputs: {
    data: {
      concepts: Concept[];
    };
  }[];
};

export type Concept = {
  id: string;
  name: string;
  value: number;
  app_id: string;
};
