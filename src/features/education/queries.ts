import { useQuery } from '@tanstack/react-query'
import { getEducation } from './api'

export const useEducation = () =>
  useQuery({ queryKey: ['education'], queryFn: getEducation })
