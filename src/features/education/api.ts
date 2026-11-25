import { education } from '@/data/education'
import type { EducationItem } from '@/types'

export const getEducation = async (): Promise<EducationItem[]> => education
