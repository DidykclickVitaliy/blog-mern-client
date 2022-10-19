import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StatusEnum } from "../posts/types";
import { fetchTags } from "./asyncAction";
import { Tag, TagsSliceState } from "./types";

const initialState: TagsSliceState = {
  tags: [],
  status: StatusEnum.LOADIND,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTags.pending, (state) => {
      state.tags = [];
      state.status = StatusEnum.LOADIND;
    });
    builder.addCase(
      fetchTags.fulfilled,
      (state, action: PayloadAction<Tag[]>) => {
        state.tags = action.payload;
        state.status = StatusEnum.SUCCESS;
      }
    );
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags = [];
      state.status = StatusEnum.REJECTED;
    });
  },
});

export default tagsSlice.reducer;
