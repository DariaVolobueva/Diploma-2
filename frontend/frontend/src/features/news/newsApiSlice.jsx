import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const newsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.updatedAt > b.updatedAt ? -1 : 1),
});

const initialState = newsAdapter.getInitialState();

export const newsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query({
            query: () => "/news",
            skipToken: true,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                const loadedNews = responseData.map((news) => {
                    news.id = news._id;
                    return news;
                });
                return newsAdapter.setAll(initialState, loadedNews);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "News", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "News", id })),
                    ];
                } else return [{ type: "News", id: "LIST" }];
            },
        }),
        addNewNews: builder.mutation({
            query: (initialNewsData) => {
                console.log(initialNewsData.extra);
                const bodyFormData = new FormData(initialNewsData.extra);
                const formJson = Object.fromEntries(bodyFormData.entries());
                console.log(formJson);
                return {
                    url: "/news",
                    method: "POST",
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: [{ type: "News", id: "LIST" }],
        }),
        updateNews: builder.mutation({
            query: (initialNewsData) => {
                const bodyFormData = new FormData(initialNewsData.extra);
                bodyFormData.append("id", initialNewsData.id);
                const formJson = Object.fromEntries(bodyFormData.entries());
                console.log(formJson);
                return {
                    url: "/news",
                    method: "PATCH",
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "News", id: arg.id },
            ],
        }),
        deleteNews: builder.mutation({
            query: ({ id }) => ({
                url: `/news`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "News", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetNewsQuery,
    useAddNewNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
} = newsApiSlice;

export const selectNewsResult = newsApiSlice.endpoints.getNews.select();

const selectNewsData = createSelector(
    selectNewsResult,
    (newsResult) => newsResult.data
);

export const {
    selectAll: selectAllNews,
    selectById: selectNewsById,
    selectIds: selectNewsIds,
} = newsAdapter.getSelectors((state) => selectNewsData(state) ?? initialState);
