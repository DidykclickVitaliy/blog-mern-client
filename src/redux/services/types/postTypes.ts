export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type PostType = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: UserType;
  imageUrl: string;
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
