export type User = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: User;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export enum StatusEnum {
  LOADIND = "loading",
  SUCCESS = "success",
  REJECTED = "rejected",
}

export interface PostSliceState {
  posts: Post[];
  status: StatusEnum;
}
