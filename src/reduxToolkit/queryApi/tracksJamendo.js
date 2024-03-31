import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tracksApi = createApi({
    reducerPath: 'tracksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.jamendo.com/v3.0/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all'
    }),
    endpoints: (builder) => ({
        getTrack: builder.query({
            query: () => '/tracks',
        })
    })
});

export const { useGetTrackQuery } = tracksApi;
