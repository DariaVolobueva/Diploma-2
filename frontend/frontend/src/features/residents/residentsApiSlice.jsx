import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const residentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.username > b.username ? -1 : 1),
});

const initialState = residentsAdapter.getInitialState();

export const residentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResidents: builder.query({
            query: () => "/residents",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },

            transformResponse: (responseData) => {
                const loadedResidents = responseData.map((resident) => {
                    resident.id = resident._id;
                    return resident;
                });
                return residentsAdapter.setAll(initialState, loadedResidents);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Resident", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Resident", id })),
                    ];
                } else return [{ type: "Resident", id: "LIST" }];
            },
        }),
        addNewResident: builder.mutation({
            query: (initialResidentData) => ({
                url: "/residents",
                method: "POST",
                body: {
                    ...initialResidentData,
                },
            }),
            invalidatesTags: [{ type: "Resident", id: "LIST" }],
        }),
        updateResident: builder.mutation({
            query: (initialResidentData) => ({
                url: "/residents",
                method: "PATCH",
                body: { ...initialResidentData },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Resident", id: arg.id },
            ],
        }),
        deleteResident: builder.mutation({
            query: ({ id }) => ({
                url: `/residents`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Resident", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetResidentsQuery,
    useAddNewResidentMutation,
    useUpdateResidentMutation,
    useDeleteResidentMutation,
} = residentsApiSlice;

export const selectResidentsResult =
    residentsApiSlice.endpoints.getResidents.select();

const selectResidentsData = createSelector(
    selectResidentsResult,
    (residentsResult) => residentsResult.data
);

export const {
    selectAll: selectAllResidents,
    selectById: selectResidentById,
    selectIds: selectResidentIds,
} = residentsAdapter.getSelectors(
    (state) => selectResidentsData(state) ?? initialState
);
