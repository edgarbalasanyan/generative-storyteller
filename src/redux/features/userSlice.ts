import { createSlice } from "@reduxjs/toolkit";
export type UserType = {
  email: string;
  name: string;
  surname: string;
  id: string;
  avatar: string;
};
const initialState: UserType = {
  email: "",
  name: "",
  surname: "",
  id: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (action.payload?.email) state.email = action.payload.email;
      if (action.payload?.user_id) state.id = action.payload.user_id;
      if (action.payload?.name) state.name = action.payload.name;
      if (action.payload?.surname) state.surname = action.payload.surname;
      if (localStorage.getItem(state.id) !== null) {
        state.avatar = localStorage.getItem(state.id) as string;
      } else {
        state.avatar = "../../../../../public/unUploadAvatar.png";
      }
    },
    removeUser: (state) => {
      state.name = "";
      state.surname = "";
      state.email = "";
      state.id = "";
      state.avatar = "../../../../../public/unUploadAvatar.png";
    },
    changeAvatar: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem(state.id, action.payload);
    },
    // edit: (state:UserType, action) => {
    //   state.email = action.payload?.email;
    //   state.id = action.payload?.id;
    //   state.name = action.payload?.name;
    //   state.surname = action.payload?.surname;
    // },
  },
});

export const { addUser, changeAvatar, removeUser } = userSlice.actions;
export default userSlice.reducer;
