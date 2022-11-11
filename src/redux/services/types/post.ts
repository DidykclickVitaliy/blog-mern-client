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

export interface CommentType {
  _id: string;
  user: UserType;
  updatedAt: string;
  createdAt: string;
  post: string;
  text: string;
}

export interface PostType {
  _id: string;
  comments: CommentType[];
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserType;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
