import { Check, Code, Database, Folder, GitBranch, ShieldCheck, Stack } from '@phosphor-icons/react';

// Illustrative workflows, rather than screenshots of a running product.
export function SkillVisual({ name }: { name: string }) {
  return <div className={`skill-visual visual-${name}`} aria-hidden="true">
    {name === 'implement-feature' && <div className="visual-diff">
      <div className="visual-panel-label"><Code size={14}/> InvoicesView.tsx</div>
      <div className="diff-context">{'export function InvoicesView() {'}</div>
      <div className="diff-context">{'  const invoices = useInvoices()'}</div>
      <div className="diff-added"><span>+</span>{'  if (isLoading) return <Spinner />'}</div>
      <div className="diff-added"><span>+</span>{'  if (error) return <ErrorState />'}</div>
      <div className="diff-context">{'  return <InvoiceList items={invoices} />'}</div>
      <div className="diff-context">{'}'}</div>
      <div className="visual-proof"><Check size={13}/> Existing patterns. Covered states.</div>
    </div>}
    {name === 'init-backend' && <div className="visual-tree">
      <div className="visual-panel-label"><Folder size={14}/> your-backend</div>
      {['src/routes', 'src/services', 'src/validation', 'tests', '.env.example'].map((file, i) => <div className="tree-file" key={file}><span className="tree-elbow"/>{i < 4 ? <Folder size={13}/> : <Code size={13}/>}<span>{file}</span><Check size={12}/></div>)}
      <div className="visual-proof"><Stack size={13}/> Structure before the first endpoint.</div>
    </div>}
    {(name === 'init-database' || name === 'init-auth') && <div className="visual-connection">
      <div className="connection-source"><Code size={18}/><span>Your backend</span></div>
      <div className="connection-wire"/>
      <div className="connection-center">{name === 'init-database' ? <Database size={24} weight="light"/> : <ShieldCheck size={24} weight="light"/>}<span>{name === 'init-database' ? 'One client' : 'Server authorization'}</span></div>
      <div className="connection-wire"/>
      <div className="connection-destinations">{(name === 'init-database' ? ['Prisma', 'Drizzle', 'Supabase'] : ['Sign-in', 'Sessions', 'Permissions']).map(label => <span key={label}>{label}</span>)}</div>
    </div>}
    {name === 'catch-up' && <div className="visual-history">
      <div className="visual-panel-label"><GitBranch size={14}/> A feature-by-feature briefing</div>
      {['What changed', 'Why it matters', 'What to watch'].map((label, i) => <div className="history-row" key={label}><span className={`history-node node-${i}`}/><span>{label}</span><div className="history-lines"><i/><i/></div></div>)}
      <div className="visual-proof">Grounded in the diff.</div>
    </div>}
    {name === 'hungry-jack' && <div className="visual-pipeline">
      <div className="visual-panel-label">From plan to proof</div>
      {['Understand the change', 'Build a focused slice', 'Verify the result'].map((label, i) => <div className="pipeline-step" key={label}><span className="pipeline-index">0{i + 1}</span><span>{label}</span><Check size={13}/></div>)}
      <div className="pipeline-return">Repeat for the next slice</div>
    </div>}
  </div>;
}
