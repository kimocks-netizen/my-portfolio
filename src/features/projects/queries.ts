import { useQuery } from '@tanstack/react-query'
import { getProjects, getProjectById } from './api'

export const useProjects = () =>
  useQuery({ queryKey: ['projects'], queryFn: getProjects })

export const useProject = (id: string) =>
  useQuery({ queryKey: ['projects', id], queryFn: () => getProjectById(id) })
