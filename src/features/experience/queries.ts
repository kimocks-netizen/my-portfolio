import { useQuery } from '@tanstack/react-query'
import { getExperience } from './api'

export const useExperience = () =>
  useQuery({ queryKey: ['experience'], queryFn: getExperience })
