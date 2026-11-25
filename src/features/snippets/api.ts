import { snippets } from '@/data/snippets'
import type { SnippetItem } from '@/types'

export const getSnippets = async (): Promise<SnippetItem[]> => snippets
