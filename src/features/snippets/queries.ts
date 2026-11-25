import { useQuery } from '@tanstack/react-query'
import { getSnippets } from './api'

export const useSnippets = () =>
  useQuery({ queryKey: ['snippets'], queryFn: getSnippets })
