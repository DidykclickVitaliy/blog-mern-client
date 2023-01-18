export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type PostCreateType = {
  id?: string;
  title: string;
  text: string;
  tags: string[];
  imageUrl?: string;
};

export type CommentCreateType = {
  id: string;
  text: string;
};

export interface IComment {
  _id: string;
  user: UserType;
  updatedAt: string;
  createdAt: string;
  post: string;
  text: string;
}

export interface IPost {
  _id: string;
  comments: IComment[];
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserType;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
