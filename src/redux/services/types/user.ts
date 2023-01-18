export type UserLoginType = {
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export interface UserSliceState {
  isAuth: boolean;
  token: string | null;
}
