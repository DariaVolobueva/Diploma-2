import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const appealsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.status > b.status ? -1 : 1),
});

const initialState = appealsAdapter.getInitialState();

export const appealsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppeals: builder.query({
            query: () => "/appeals",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                const loadedAppeals = responseData.map((appeal) => {
                    appeal.id = appeal._id;
                    return appeal;
                });
                return appealsAdapter.setAll(initialState, loadedAppeals);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Appeal", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Appeal", id })),
                    ];
                } else return [{ type: "Appeal", id: "LIST" }];
            },
        }),
        addNewAppeal: builder.mutation({
            query: (initialAppealData) => ({
                url: "/appeals",
                method: "POST",
                body: {
                    ...initialAppealData,
                },
            }),
            invalidatesTags: [{ type: "Appeal", id: "LIST" }],
        }),
        updateAppeal: builder.mutation({
            query: (initialAppealData) => ({
                url: "/appeals",
                method: "PATCH",
                body: { ...initialAppealData },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Appeal", id: arg.id },
            ],
        }),
        deleteAppeal: builder.mutation({
            query: ({ id }) => ({
                url: `/appeals`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Appeal", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetAppealsQuery,
    useAddNewAppealMutation,
    useUpdateAppealMutation,
    useDeleteAppealMutation,
} = appealsApiSlice;

export const selectAppealsResult =
    appealsApiSlice.endpoints.getAppeals.select();

const selectAppealsData = createSelector(
    selectAppealsResult,
    (appealsResult) => appealsResult.data
);

export const {
    selectAll: selectAllAppeals,
    selectById: selectAppealById,
    selectIds: selectAppealIds,
} = appealsAdapter.getSelectors(
    (state) => selectAppealsData(state) ?? initialState
);
