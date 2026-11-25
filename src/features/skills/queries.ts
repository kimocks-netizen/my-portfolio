import { useQuery } from '@tanstack/react-query'
import { getSkills } from './api'
import type { SkillGroup } from '@/types'

export const skillsQueries = {
  all: () => ({
    queryKey: ['skills'] as const,
    queryFn: getSkills,
    select: (data: SkillGroup[]) => data,
  }),
}

export const useSkills = () =>
  useQuery(skillsQueries.all())
