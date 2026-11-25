import { useQuery } from '@tanstack/react-query'
import { getCertifications } from './api'

export const useCertifications = () =>
  useQuery({ queryKey: ['certifications'], queryFn: getCertifications })
