export type LoginData = {
  login: string;
  password: string;
};

export type RegistrationData = {
  login: string;
  password: string;
};

export type PhotoData = {
  tags: string[],
  filename: string
};

export type User = {
  id: number;
  login: string;
  password: string;
}

export type Tag = {
  id: number;
  name: string;
}

export type Photo = {
  id: number;
  filename: string;
  Tags: Tag[];
}

export type FileType = {
  filename: string;
}
