import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCSRFToken } from "../../../utils/cookies";
type LoginResponse = object;
type LoginRequest = { email: string; password: string };

export const serverApi = createApi({
  reducerPath: "serverApiWithCredentials",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    user: build.query({
      query: () => ({
        url: `user`,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    edit: build.mutation({
      query: ({ id, name, surname }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: `user/change_data/${id}`,
        method: "PUT",
        body: { name, surname },
      }),
    }),
    change_password: build.mutation({
      query: ({ id, old_password, new_password, repeat_password }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: `user/change_password/${id}`,
        method: "PUT",
        body: { old_password, new_password, repeat_password },
      }),
    }),
    getCollections: build.query({
      query: () => ({
        url: `collection`,
      }),
    }),
    createCollection: build.mutation({
      query: ({ id, title }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: "collection",
        method: "POST",
        body: { user: id, name: title },
      }),
    }),
    deleteCollection: build.mutation({
      query: (id) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: `collection/${id}`,
        method: "DELETE",
      }),
    }),
    renameCollection: build.mutation({
      query: ({ id, newName }: { id: number; newName: string }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: `collection/${id}`,
        method: "PUT",
        body: { name: newName },
      }),
    }),
    getStory: build.query({
      query: (id: number) => ({
        url: `story/${id}`,
      }),
    }),
    getAllStories: build.query({
      query: () => ({
        url: "story",
      }),
    }),
    editStory: build.mutation({
      query: ({ id, name, generated_context }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: `story/${id}`,
        method: "PUT",
        body: {
          name,
          generated_context,
        },
      }),
    }),
    generateStory: build.mutation({
      query: ({ name, user_input, collection }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: "story/",
        method: "POST",
        body: {
          // csrfmiddlewaretoken: "Z1siXhaOHL7wD2QDPKchJustpnNmaAdG",
          name,
          user_input,
          collection,
        },
      }),
    }),
    deleteStory: build.mutation({
      query: ({ id }) => ({
        headers: {
          "X-Csrftoken": getCSRFToken(),
        },
        url: `story/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUserQuery,
  useLazyUserQuery,
  useLogoutMutation,
  useEditMutation,
  useChange_passwordMutation,
  useLazyGetCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useRenameCollectionMutation,
  useLazyGetStoryQuery,
  useLazyGetAllStoriesQuery,
  useGenerateStoryMutation,
  useEditStoryMutation,
  useDeleteStoryMutation
} = serverApi;
