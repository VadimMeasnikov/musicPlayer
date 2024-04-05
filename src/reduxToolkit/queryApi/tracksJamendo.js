import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.jamendo.com/v3.0/',
    }),
    endpoints: (builder) => ({
        getTrack: builder.query({
            query: (name) => ({
                url: 'tracks/',
                params: {
                    client_id: '354e8ba5',
                    format: 'jsonpretty',
                    limit: 10,
                    featured: 1
                },
            }),
        }),
    }),
});

export const { useGetTrackQuery } = tracksApi;
