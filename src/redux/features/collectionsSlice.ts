import {
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type CollectionType = {
  col_id?: number;
  user: string;
  logo?: string;
  name: string;
  stories: [];
};
const initialState: {
  collections: Array<CollectionType>;
  loading: boolean;
} = {
  collections: [],
  loading: false,
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addCollections: {
      prepare: (action: { payload: CollectionType[] }) => {
        return {
          payload: action.payload.map((collection: CollectionType) => {
            return { ...collection };
          }),
          error: null,
          meta: null,
        };
      },
      reducer: (state, action) => {
        state.collections = action.payload;
      },
    },
    addCollection: (state, action: PayloadAction<CollectionType>) => {
      state.collections.push(action.payload);
    },
    removeCollection: (state, action: PayloadAction<number>) => {
      state.collections = state.collections.filter(
        (collection) => collection.col_id !== action.payload
      );
    },
    changeCollectionName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      state.collections.forEach((collection) => {
        if (collection.col_id === action.payload.id) {
          collection.name = action.payload.name;
        }
      });
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(fetchAllcollections.fulfilled, (state, action) => {
  //     state.length = action.payload.length;
  //     state.loading = false;
  //   });
  //   builder.addCase(fetchCard.fulfilled, (state, action) => {
  //     state.card = action.payload[0];
  //   });
  //   builder.addCase(fetchcollectionsToShow.fulfilled, (state, action) => {
  //     state.collections.push(...action.payload);
  //   });
  //   builder.addCase(fetchcollectionsToShow.pending, (state, action) => {
  //     console.log("pending");
  //   });
  //   builder.addCase(fetchAllcollections.pending, (state) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(fetchByInput.fulfilled,(state,action)=>{
  //     state.searchedcollections = action.payload;
  //   })
  // },
});

export const {
  addCollection,
  addCollections,
  removeCollection,
  changeCollectionName,
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
