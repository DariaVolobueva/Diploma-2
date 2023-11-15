import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const votesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.updatedAt > b.updatedAt ? -1 : 1),
});

const initialState = votesAdapter.getInitialState();

export const votesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVotes: builder.query({
            query: () => "/votes",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                const loadedVotes = responseData.map((votes) => {
                    votes.id = votes._id;
                    return votes;
                });
                return votesAdapter.setAll(initialState, loadedVotes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Votes", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Votes", id })),
                    ];
                } else return [{ type: "Votes", id: "LIST" }];
            },
        }),
        addNewVotes: builder.mutation({
            query: (initialVotesData) => ({
                url: "/votes",
                method: "POST",
                body: initialVotesData,
            }),
            invalidatesTags: [{ type: "Votes", id: "LIST" }],
        }),
        updateVotes: builder.mutation({
            query: (initialVotesData) => ({
                url: "/votes",
                method: "PATCH",
                body: initialVotesData,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Votes", id: arg.id },
            ],
        }),
        deleteVotes: builder.mutation({
            query: ({ id }) => ({
                url: `/votes`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Votes", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetVotesQuery,
    useAddNewVotesMutation,
    useUpdateVotesMutation,
    useDeleteVotesMutation,
} = votesApiSlice;

export const selectVotesResult = votesApiSlice.endpoints.getVotes.select();

const selectVotesData = createSelector(
    selectVotesResult,
    (votesResult) => votesResult.data
);

export const {
    selectAll: selectAllVotes,
    selectById: selectVotesById,
    selectIds: selectVotesIds,
} = votesAdapter.getSelectors(
    (state) => selectVotesData(state) ?? initialState
);
