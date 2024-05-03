import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artistsApi = createApi({
    reducerPath: 'artistsApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.jamendo.com/v3.0/', 
    }),
    endpoints: (builder) => ({
        getArtists: builder.query({
            query: () => 'artists/?client_id=354e8ba5&format=jsonpretty&limit=23', 
        })
    })
});

export const { useGetArtistsQuery } = artistsApi; 