export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { skillGuides } from '@/lib/skill-guides';
import { lessons } from '@/lib/lessons';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/contribute/', '/skills/', '/learn/', ...skillGuides.map(s => `/skills/${s.name}/`), ...lessons.map(l => `/learn/${l.slug}/`)].map(path => ({url: `https://factory-skills-akdevsaha.akdevsaha2003.chatgpt.site${path}`, changeFrequency: 'weekly', priority: path ? 0.7 : 1})); }
