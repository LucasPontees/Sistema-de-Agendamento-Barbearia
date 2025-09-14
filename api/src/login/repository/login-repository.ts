export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}
export interface ILogin {
  login(data: LoginData): Promise<LoginResponse>;
}
