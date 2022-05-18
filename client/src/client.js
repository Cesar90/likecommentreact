import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://geopins2022.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql'

export const useClient = () => {
  useEffect(() => {}, [])

  return new GraphQLClient(BASE_URL)
}
