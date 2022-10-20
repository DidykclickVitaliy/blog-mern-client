import { StatusEnum } from "../posts/types";

export type TagType = {
  tag: string;
};

export interface TagsSliceState {
  tags: TagType[];
  status: StatusEnum;
}
