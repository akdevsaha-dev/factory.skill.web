'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, GithubLogo, Sun, Moon, List, X, Cube } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { REPO } from '@/lib/skills';
export function Brand() { return <span className="brand"><span className="brand-mark"><Cube weight="duotone" size={23}/></span>factory<span className="brand-suffix">skills</span></span>; }
export function Header() {
 const [theme,setTheme]=useState('dark'); const [menu,setMenu]=useState(false); const path=usePathname();
 useEffect(()=>{setTheme(document.documentElement.dataset.theme || 'dark');},[]);
 useEffect(()=>setMenu(false),[path]);
 function toggle(){const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.theme=next;try{localStorage.setItem('factory-theme',next)}catch{}}
 return <header className="header"><div className="nav-wrap"><Link href="/" ><Brand/></Link><nav className={menu?'navigation open':'navigation'} aria-label="Main navigation"><Link href="/skills/" aria-current={path.startsWith('/skills')?'page':undefined} onClick={()=>setMenu(false)}>Skills</Link><Link href="/#how-it-works" onClick={()=>setMenu(false)}>How it works</Link><Link href="/learn/" aria-current={path.startsWith('/learn')?'page':undefined} onClick={()=>setMenu(false)}>Learn</Link><Link href="/contribute/" aria-current={path.startsWith('/contribute')?'page':undefined}>Contribute</Link></nav><div className="nav-actions"><button className="icon-button theme-toggle" onClick={toggle} aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><a href={REPO} target="_blank" rel="noreferrer" className="github-nav" aria-label="GitHub"><GithubLogo size={18} weight="fill"/><span>GitHub</span><ArrowUpRight size={13}/></a><button className="icon-button mobile-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={21}/>:<List size={21}/>}</button></div></div></header>;
}
export function Footer(){return <footer className="footer container"><div><Link href="/"><Brand/></Link><p>Better habits. Better software.</p><span className="copyright">Open source. MIT licensed.</span></div><div className="footer-links"><div><span>Explore</span><Link href="/skills/">The skills</Link><Link href="/learn/">Learn</Link><Link href="/#questions">Questions</Link></div><div><span>Open source</span><a href={REPO}>GitHub <ArrowUpRight/></a><Link href="/contribute/">Contribute</Link><a href={`${REPO}/issues`}>Report an issue <ArrowUpRight/></a></div></div><div className="footer-bottom"><span>Made for people who care about the code.</span><a href={`${REPO}/blob/main/LICENSE`}>MIT License <ArrowUpRight size={12}/></a></div></footer>}
