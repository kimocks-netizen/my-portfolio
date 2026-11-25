import { projects } from '@/data/projects'
import type { ProjectItem } from '@/types'

export const getProjects = async (): Promise<ProjectItem[]> => projects
export const getProjectById = async (id: string): Promise<ProjectItem | undefined> =>
  projects.find(p => p.id === id)
