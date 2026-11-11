import type { Metadata } from 'next';
import { Contribute } from '@/components/contribute';
export const metadata: Metadata = { title: 'Contribute', description: 'Help improve Factory Skills. Learn how to propose a skill, share a reproducible issue, sync shared standards, and verify your contribution.' };
export default function Page(){return <Contribute/>}
