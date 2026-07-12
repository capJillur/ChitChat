import api from "./axios";

interface AuthPayload {
  username?: string;
  email?: string;
  password: string;
  emailOrUsername?: string;
}

export const registerUser = async ({ username, email, password }: AuthPayload) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async ({ emailOrUsername, password }: AuthPayload) => {
  const response = await api.post("/auth/login", {
    emailOrUsername,
    password,
  });
  return response.data;
};

export const getUserCount = async () => {
  const response = await api.get("/auth/users/count");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};
