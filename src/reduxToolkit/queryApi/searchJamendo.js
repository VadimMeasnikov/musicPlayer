import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.jamendo.com/v3.0/',
    }),
    endpoints: (builder) => ({
        search: builder.query({
            query: ({path, name}) => {
                console.log("Search query params:", path, name);
                return {
                    url: path,
                    params: {
                        client_id: '354e8ba5',
                        format: 'jsonpretty',
                        limit: 'all',
                        name: name
                    },
                };
            },            
        }),
    }),
});

export const { useSearchQuery } = searchApi;
