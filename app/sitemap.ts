export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/contribute/'].map(path => ({url: `https://factory-skills-akdevsaha.akdevsaha2003.chatgpt.site${path}`, changeFrequency: 'weekly', priority: path ? 0.7 : 1})); }
