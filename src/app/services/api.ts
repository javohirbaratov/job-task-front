import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { main_url } from "../../constants/api";

const baseQuery = fetchBaseQuery({
  baseUrl: main_url,
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    headers.set("Content-type", "application/json");
    // const token = (getState() as RootState).auth.token;
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }

    return headers;
  },
  credentials: "same-origin",
});

const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: process.env.NODE_ENV === "development" ? 0 : 3,
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,

  tagTypes: ["Time", "Posts", "Counter"],

  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPosts: () => "test",
  }),
});
