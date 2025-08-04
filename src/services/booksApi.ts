import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
    }),
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        books: builder.query({
            query: () => "/books",
            providesTags: ["Books"]
        }),
        addBook: builder.mutation({
            query: (book) => ({
                url: "/books",
                method: "POST",
                body: book  
            }),
            invalidatesTags: ["Books"]
        }),
        // updateTask: builder.mutation({
        //     query: ({ id, ...rest }) => ({
        //         url: `/tasks/${id}`,
        //         method: "PUT",
        //         body: rest
        //     })
        // }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const { useBooksQuery, useAddBookMutation, useDeleteTaskMutation } = booksApi