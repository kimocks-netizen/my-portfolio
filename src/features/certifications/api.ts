import { certifications } from '@/data/certifications'
import type { CertificationItem } from '@/types'

export const getCertifications = async (): Promise<CertificationItem[]> => certifications
