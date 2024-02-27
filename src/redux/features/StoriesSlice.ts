import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type StoryType = {
  st_id: number;
  name: string;
  user_input: string;
  generated_context: string;
  collection: number;
};
const initialState: {
  stories: Array<StoryType>;
  loading: boolean;
} = {
  stories: [],
  loading: false,
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<StoryType>) => {
      state.stories.push(action.payload);
    },
    setStories: (state, action: PayloadAction<Array<StoryType>>) => {
      state.stories = action.payload;
    },
    removeStory: (state, action: PayloadAction<number>) => {
      state.stories.filter((el) => el.st_id !== action.payload);
    },
  },
});

export const { addStory, setStories,removeStory } = storiesSlice.actions;
export default storiesSlice.reducer;
