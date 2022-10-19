import { StatusEnum } from "../posts/types";

export type Tag = {
  tag: string;
};

export interface TagsSliceState {
  tags: Tag[];
  status: StatusEnum;
}
