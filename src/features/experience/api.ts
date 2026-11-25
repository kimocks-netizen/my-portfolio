import { experience } from '@/data/experience'
import type { ExperienceItem } from '@/types'

export const getExperience = async (): Promise<ExperienceItem[]> => experience
