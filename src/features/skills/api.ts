import { skills } from '@/data/skills'
import type { SkillGroup } from '@/types'

export const getSkills = async (): Promise<SkillGroup[]> => skills
