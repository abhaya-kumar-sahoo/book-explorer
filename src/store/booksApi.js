import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getPersistentCache, setPersistentCache } from './cacheStorage'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://gutendex.com/',
})

const persistentBaseQuery = async (args, api, extraOptions) => {
  const urlKey = typeof args === 'string' ? args : args.url || JSON.stringify(args)

  const cached = getPersistentCache(urlKey)
  if (cached) {
    return { data: cached }
  }

  const result = await rawBaseQuery(args, api, extraOptions)
  if (result.data) {
    setPersistentCache(urlKey, result.data)
  }

  return result
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: persistentBaseQuery,
  keepUnusedDataFor: 86400, // 24 hours
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ search, languages, topic, sort, page }) => {
        const params = new URLSearchParams()
        if (search?.trim()) params.set('search', search.trim())
        if (languages) params.set('languages', languages)
        if (topic) params.set('topic', topic)
        if (sort && sort !== 'popular') params.set('sort', sort)
        if (page && Number(page) > 1) params.set('page', String(page))

        const qs = params.toString()
        return qs ? `books/?${qs}` : 'books/'
      },
      keepUnusedDataFor: 86400,
    }),
    getBookById: builder.query({
      query: (id) => `books/${id}/`,
      keepUnusedDataFor: 86400,
    }),
  }),
})

export const { useGetBooksQuery, useGetBookByIdQuery, usePrefetch } = booksApi

