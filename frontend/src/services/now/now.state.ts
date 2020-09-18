import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const REDUX_KEY = "now";

type State = {
  taskIds: string[];
  skipCount: number;
};
const initialState: State = {
  taskIds: [],
  skipCount: 0,
};

const nowSlice = createSlice({
  name: "app/now",
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => {
      state.taskIds.push(action.payload);
    },
    removeId: (state, action: PayloadAction<string>) => {
      const idIndex = state.taskIds.indexOf(action.payload);
      state.taskIds.splice(idIndex, 1);
    },
    skip: (state) => {
      state.skipCount++;
    },
    resetSkip: (state) => {
      state.skipCount = 0;
    },
  },
});

export const { addId, removeId, skip, resetSkip } = nowSlice.actions;

export default nowSlice.reducer;
