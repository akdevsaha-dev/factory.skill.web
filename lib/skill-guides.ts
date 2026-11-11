import { skills } from './skills';
export type Example = { title: string; prompt: string; note: string };
export type SkillGuide = { name: string; category: string; summary: string; intro: string; when: string; before: string; steps: string[]; examples: Example[]; expect: string; watch: string; related: string[] };
export const skillGuides: SkillGuide[] = [
 {
 name:'implement-feature',category:'Build',summary:'Add a feature without making the codebase feel like two different projects.',
 intro:'This is the one I’d start with. Give it a concrete change in a project that already exists. It looks for a similar feature, follows that path through the code, and builds the new thing in the same style.',
 when:'Use it for a contained feature or behavior change: an export, a filter, an endpoint, or a missing error state. If the work spans several systems and needs coordination, use hungry-jack.',
 before:'Open the project in your agent. Know what should happen when the feature works, and what should happen when it fails. You don’t need to know which files to edit.',
 steps:['Finds the code your request refers to and traces the nearest existing example.','Turns the request into observable behavior, including failure cases.','Implements the change using the project’s patterns and reusable code.','Runs relevant checks, reviews the diff, and reports the evidence.'],
 examples:[
 {title:'Export a filtered list',prompt:'/implement-feature add CSV export to invoices. Export only the invoices matching the current filters. Reuse the existing export format if there is one.',note:'Giving the filter behavior prevents a common mismatch: exporting everything when the screen shows a subset.'},
 {title:'Handle a failed request',prompt:'/implement-feature add loading, empty, and error states to the fetching views. Follow ProjectsView and reuse its components. Include a retry action for failed requests.',note:'Name an existing example when you know one. Otherwise let the agent find it.'},
 {title:'Add a search control',prompt:'/implement-feature add search by project name to the projects list. Keep the search in the URL so I can share the filtered view. Preserve pagination.',note:'The URL and pagination requirements make the expected behavior explicit.'},
 {title:'Extend an endpoint',prompt:'/implement-feature add a status filter to the existing orders endpoint. Keep the current response shape and pagination behavior. Reject unknown statuses using the existing error format.',note:'Say which contracts must stay stable, especially when other code calls the endpoint.'},
 {title:'Use plain language',prompt:'Use the implement-feature skill to add a clear confirmation before archiving a project. Match the existing destructive-action dialogs and preserve the current permission checks.',note:'Slash commands are convenient, but mentioning the installed skill in plain words works too.'}],
 expect:'A focused diff, the important decisions, checks that actually ran, and anything still unverified. High-risk changes pause for plan approval before editing.',
 watch:'“Make the app better” leaves too much undecided. Start with one change you can describe and review. Don’t turn a small feature into a request to refactor the whole project.',related:['hungry-jack','verify-work','review-changes']
 },
 {
 name:'init-backend',category:'Foundation',summary:'Start a backend with a structure you can keep building on.',
 intro:'An empty folder is easy to fill badly. This skill gives the backend a sensible starting point: routes, handlers, services, validation, configuration, and tests, without inventing layers nobody needs yet.',
 when:'Use it when you need a new backend. The supported starting points are Node.js with TypeScript and Express, Python with FastAPI and uv, or Go with the standard library HTTP server.',
 before:'Choose a stack if you have a preference. The default location is backend/, unless the repository already has a convention or you name another directory. Existing code should be inspected before anything is generated.',
 steps:['Inspects the repository and checks for an existing backend.','Asks for the stack when you haven’t already chosen one.','Scaffolds the backend using the selected stack’s conventions.','Installs dependencies and checks startup, tests, and GET /health.'],
 examples:[
 {title:'Let it ask about the stack',prompt:'/init-backend',note:'Useful when you want to choose from the supported options after the project is inspected.'},
 {title:'Start with TypeScript',prompt:'/init-backend use Node.js, TypeScript, and Express. Keep the backend in backend/ and follow the repository conventions.',note:'Naming the stack avoids an extra round of questions.'},
 {title:'Use Python',prompt:'/init-backend use Python with FastAPI and uv. I’ll add the product endpoints after the scaffold is verified.',note:'Keep the first task about the foundation. Product features can follow separately.'},
 {title:'Keep Go straightforward',prompt:'/init-backend use Go with the standard library HTTP server. Reuse any established Go conventions in this repository.',note:'The skill supports the standard library stack; it doesn’t need a new web framework.'},
 {title:'Use an established directory',prompt:'/init-backend use Node.js and TypeScript. This monorepo keeps APIs in apps/api/, so use that directory.',note:'An explicit destination overrides the default backend/ location.'}],
 expect:'A startup command and a verified health endpoint on port 8080 by default, with an environment override. The health response is {"status":"ok"}. The report should say what ran and what couldn’t run.',
 watch:'A scaffold is a starting point. Database connections, authentication, and your business logic are separate decisions. If a backend already exists, decide whether to extend it before creating another.',related:['init-database','init-auth','implement-feature']
 },
 {
 name:'init-database',category:'Foundation',summary:'Connect the backend to Postgres. Keep schema decisions separate.',
 intro:'This skill does the wiring: validated configuration, one reusable client, and environment files. It deliberately stops short of creating tables. That keeps “connect my database” from quietly becoming “design my data model.”',
 when:'Use it when an existing backend needs a database connection through Prisma, Drizzle, or Supabase. Prisma and Drizzle are Node.js options; Supabase also supports the Python and Go backends.',
 before:'Have a backend and a database provider in mind. You’ll need a Postgres connection string or a Supabase project. Put real credentials in the local environment file, not in a prompt or a committed example file.',
 steps:['Detects the backend stack and existing database setup.','Asks you to choose Prisma, Drizzle, or Supabase unless you already specified one.','Adds the config and a single client in the backend’s existing structure.','Runs available checks and a connection check when real credentials are configured.'],
 examples:[
 {title:'Choose after inspection',prompt:'/init-database',note:'The agent should show the supported choices and let you decide.'},
 {title:'Use Prisma',prompt:'/init-database with Prisma. Use the existing backend config module. I’ll provide DATABASE_URL in the local .env file.',note:'For a Node.js backend. The connection string can come from your Postgres provider.'},
 {title:'Use Drizzle',prompt:'/init-database with Drizzle. Connect the Node.js backend to Postgres and keep schema and migrations out of this setup.',note:'This makes the boundary of the task explicit.'},
 {title:'Use Supabase with Python',prompt:'/init-database with Supabase for the existing FastAPI backend. Tell me which environment variables I need to configure.',note:'Supabase is the supported option here; Prisma and Drizzle don’t run in a Python backend.'},
 {title:'Keep credentials out of chat',prompt:'Use the init-database skill with Supabase. I’ll add the project settings to the local .env. Keep .env.example limited to placeholders.',note:'If credentials are missing, a skipped connection check should be reported as skipped.'}],
 expect:'A single client, validated config, ignored local environment values, and placeholder examples. No tables, models, migrations, seed data, or local database containers are created by this skill.',
 watch:'Don’t ask this skill to infer your schema. Connect first, then describe the data model as a separate feature. If a database client already exists, review whether it needs extending rather than replacing.',related:['init-backend','init-auth','implement-feature']
 },
 {
 name:'init-auth',category:'Foundation',summary:'Add sign-in and access control where the data is actually protected.',
 intro:'A login screen is only part of authentication. This skill inspects the application, helps choose a provider, and follows the request all the way to server-side permission checks. The tests should try to get around those checks, too.',
 when:'Use it for sign-in, sessions, ownership, roles, or team access in an existing app. It supports Supabase Auth, Clerk, and Better Auth, subject to what your stack can run.',
 before:'Decide who may access which data and how people should sign in. The agent can recommend a provider, but you choose it. If auth already exists, decide whether to extend it or plan a migration.',
 steps:['Reads the app, database ownership, deployment shape, and existing auth.','Recommends a provider with a reason and asks for the choices that matter.','Checks current official docs and plans the integration.','Implements the selected flows and verifies server enforcement and adversarial cases.'],
 examples:[
 {title:'Get a grounded recommendation',prompt:'/init-auth inspect this app and recommend a provider. I need email OTP, and each user should only see their own data.',note:'State the access rule even if you don’t know which provider you want.'},
 {title:'Add Google sign-in',prompt:'/init-auth with Supabase Auth. Add Google sign-in and resource ownership checks. Ask me for any provider configuration you need.',note:'Provider setup may require action in a hosted service. The skill asks before outward-facing writes.'},
 {title:'Use an existing TypeScript backend',prompt:'/init-auth with Better Auth for this TypeScript backend. Use our existing database. I need email OTP and user/admin roles; confirm the permissions before implementation.',note:'Better Auth needs a compatible server and a database. The skill should inspect those prerequisites.'},
 {title:'Add team access',prompt:'/init-auth with Clerk. I need organizations where members see only their organization’s projects. Help me define owner, admin, and member permissions first.',note:'Organization boundaries need to be defined before the agent can enforce them.'},
 {title:'Extend current auth',prompt:'Use the init-auth skill to inspect our current Supabase Auth integration and add GitHub sign-in. Keep existing users and sessions working; do not replace the provider.',note:'Call out continuity when an auth system is already in use.'}],
 expect:'A provider-backed integration with explicit access rules, server checks, and evidence from relevant tests. Missing credentials or untested provider flows should be called out, not waved away.',
 watch:'Hiding a button is not authorization. Ask whether the same request is rejected when sent directly by another user. Don’t paste secrets, session tokens, or OTPs into examples.',related:['init-database','plan-change','verify-work']
 },
 {
 name:'catch-up',category:'Understand',summary:'Find out what changed before you start changing it again.',
 intro:'Coming back to a busy branch shouldn’t mean reading twenty commit messages and guessing what matters. Catch Up reads the actual changes, groups them by feature, and points out what affects the work in front of you.',
 when:'Use it after a break, before working in an unfamiliar area, or when you want to understand what a pull would bring in. It is read-only unless you explicitly ask it to save a checkpoint.',
 before:'Open a Git repository. By default it starts from your most recent authored commit reachable from the target. If that isn’t the right baseline, give it a ref, date, or number of changes.',
 steps:['Resolves and shows the target and baseline.','Reads the net diff, with more depth for contracts, migrations, config, and other high-signal changes.','Groups related work and connects it to your local changes.','Reports concrete locations, risks, and what deserves a closer look.'],
 examples:[
 {title:'The everyday briefing',prompt:'/catch-up',note:'Starts with a quick briefing against local HEAD.'},
 {title:'Use a clear baseline',prompt:'/catch-up since main',note:'Replace main with the branch or commit that represents where you left off.'},
 {title:'Look back a few changes',prompt:'/catch-up last 5',note:'Counts units of change along the target’s first-parent history.'},
 {title:'Inspect the remote view',prompt:'/catch-up deep remote',note:'Uses the remote-tracking refs already on your machine. It does not fetch, so check when those refs were last updated.'},
 {title:'Narrow it to a teammate',prompt:'/catch-up since 2026-11-01 author alex',note:'Replace the date and author with your own. Findings outside that author’s work may still matter to your local changes.'},
 {title:'Create a return point',prompt:'/catch-up save',note:'Explicitly asks to save the analyzed commit as a checkpoint. Next time, use /catch-up checkpoint.'}],
 expect:'A feature-based briefing with a resolved range and file locations. It shouldn’t pull, merge, fetch, switch branches, or edit the working tree. Remote analysis is only as fresh as your local tracking refs.',
 watch:'An empty range can be correct. Change the baseline if you want a different window. “Remote” means inspect available refs, not contact the server for new commits.',related:['plan-change','implement-feature','review-changes']
 },
 {
 name:'hungry-jack',category:'Build',summary:'Carry a substantial change from the request to a review-ready result.',
 intro:'Some tasks don’t fit in one tidy implementation pass. A background job might touch the database, API, worker, and UI. Hungry Jack coordinates the focused skills so that the work gets built in slices and checked as a whole.',
 when:'Use it for substantial work across systems: payments, authorization, jobs, integrations, or architectural changes. For a contained feature, implement-feature is usually enough.',
 before:'Install the companion bundle below. Describe the outcome and constraints. You can set optional effort to snack, balanced, feast, or banquet; balanced is the default. More effort does not waive required checks or approval for high-risk work.',
 steps:['Inspects the task, scope, and risk.','Plans when needed and hands slices to implement-feature.','Verifies the full change, then simplifies or reviews where justified.','Fixes confirmed issues within bounded loops and gives an evidence-based handoff.'],
 examples:[
 {title:'Coordinate a substantial feature',prompt:'/hungry-jack add refunds to orders. Use our existing payment provider and order permissions. Support partial refunds and duplicate-request protection.',note:'Money movement is high-risk. Expect a plan approval step before implementation.'},
 {title:'Move work into a job',prompt:'/hungry-jack --effort feast move invoice generation to a background job. Keep the current invoice output and show users pending, completed, and failed states.',note:'Feast spends more optional effort on architecture, regression checks, and independent review.'},
 {title:'Set a tight scope',prompt:'/hungry-jack --effort snack add a bulk archive action to the project list. Reuse the existing archive behavior and report if the task is broader than it looks.',note:'Snack reduces optional process. It still keeps the work and verification the task requires.'},
 {title:'Explore failure modes',prompt:'/hungry-jack --effort banquet add organization-level permissions. Existing personal accounts must keep working. Plan the migration and tenant-isolation checks before editing.',note:'Banquet goes deeper on failure modes and security boundaries; it is not a promise that every task needs that much process.'},
 {title:'Describe the business outcome',prompt:'Use hungry-jack to let customers track a long-running import. Include progress, failure details, and a safe retry. Reuse our current queue and upload flow.',note:'You can describe the outcome without knowing the implementation slices.'}],
 expect:'A report of the implementation, important decisions, checks, skipped checks, risks, and readiness for review. Missing required companions stop the workflow. It does not commit, push, merge, or deploy unless asked.',
 watch:'Start balanced. Turn effort up because the change deserves deeper work, not because the longest process sounds safest. Reflect is optional and only runs when a demonstrated failure calls for it.',related:['plan-change','implement-feature','verify-work','simplify-code','review-changes','reflect']
 },
 {
 name:'plan-change',category:'Companion',summary:'Work out what a change touches before you commit to the design.',
 intro:'A useful plan makes the next edit easier. This skill finds the nearest existing pattern, maps the affected code and consumers, and turns the request into small slices with checks attached.',
 when:'Use it before a change that crosses modules, alters a contract, or needs an explicit risk assessment. Skip a separate planning session for an obvious, contained change.',
 before:'Bring the request and any acceptance criteria you already know. You don’t need a design document. If there are existing checks or an impact map, share them so the agent can build on that work.',
 steps:['Turns the request into observable acceptance criteria.','Traces an existing analog and affected contracts, consumers, and data.','Assesses risk and chooses a design that fits the project.','Orders implementation slices and gives each criterion a verification check.'],
 examples:[
 {title:'Scope a background job',prompt:'/plan-change move report generation out of the request handler into a background job. Keep the report format and existing permissions.',note:'The plan should cover the worker, status storage, API response, and any UI that consumes it.'},
 {title:'Check contract impact',prompt:'/plan-change add cursor pagination to the projects API. Find every consumer and propose a rollout that keeps existing clients working.',note:'Ask for consumer impact when a response contract changes.'},
 {title:'Plan a migration',prompt:'/plan-change split customer names into first and last name fields. Account for existing records, ambiguous names, and rollback.',note:'A migration plan should explain how current data survives, not just describe the new schema.'},
 {title:'Define a risky workflow',prompt:'/plan-change add partial refunds. Identify the amount, idempotency, permission, and webhook invariants before choosing the implementation slices.',note:'This produces a plan. It does not execute a real refund.'},
 {title:'Keep planning bounded',prompt:'Use plan-change to scope organization invites. Give me the affected modules, unresolved permission decisions, ordered slices, and a check for each acceptance criterion.',note:'Useful outputs are decisions and checks you can act on.'}],
 expect:'A grounded goal, acceptance criteria, an impact map, risk, a recommended design, ordered slices, and a verification plan. High-risk plans go to you for approval before implementation.',
 watch:'A long list of files isn’t a plan. Ask what each slice changes and how you’ll know it worked. Hand an approved plan to hungry-jack or implement-feature when you’re ready to build.',related:['hungry-jack','implement-feature','verify-work']
 },
 {
 name:'verify-work',category:'Companion',summary:'Check what changed. Show what actually ran.',
 intro:'“Tests pass” is useful only when you know which tests ran and what they cover. This skill traces the change through its consumers and runtime paths, selects relevant checks, and records the results honestly.',
 when:'Use it after implementation, after a fix, or before handing work over for review. It verifies a change; it does not fix product code. It may add tests when an acceptance criterion or invariant needs coverage.',
 before:'Give it the change or base commit, the original request, and any checks already run. If the code covered by a passing check hasn’t changed, there’s no reason to rerun it just for ceremony.',
 steps:['Maps the diff to affected contracts, data flow, consumers, and runtime.','Chooses checks based on that impact.','Runs narrow checks before broader integration and runtime checks.','Reports results, concrete failures, and checks that couldn’t run.'],
 examples:[
 {title:'Verify the current change',prompt:'/verify-work check the current changes against the original CSV export request. Include filtering, escaping, and the download behavior.',note:'Restating the intent helps distinguish “it builds” from “it does what I asked.”'},
 {title:'Check a branch',prompt:'/verify-work verify the change against main. Use the acceptance criteria in the task description and report skipped checks with reasons.',note:'Name a base ref your local repository has.'},
 {title:'Recheck a fix',prompt:'/verify-work re-verify the retry fix. The previous failure was a duplicate request after a timeout. Focus on the paths affected by the fix.',note:'Give it the observed failure so it can check the right thing.'},
 {title:'Verify a backend change',prompt:'Use verify-work on the order validation change. Check accepted and rejected payloads and the callers of the changed contract.',note:'A backend-only validation change should get relevant tests and API checks; a browser is needed only if an affected page must be exercised.'},
 {title:'Be explicit about unavailable services',prompt:'/verify-work verify the email job change using our existing provider fake. Separate local evidence from anything that would require real provider credentials.',note:'A fake can establish local behavior. It does not prove delivery through the real provider.'}],
 expect:'An impact map, commands and results, findings, and a status. Checks blocked by a service or credentials must be marked not run. The skill does not turn an unverified path into a passing claim.',
 watch:'Passing types and a build don’t prove runtime behavior. On the other hand, running every unrelated test doesn’t make the evidence stronger. Ask for checks tied to what changed.',related:['review-changes','implement-feature','hungry-jack']
 },
 {
 name:'simplify-code',category:'Companion',summary:'Make a working change easier to read without changing what it does.',
 intro:'Sometimes a feature works, but the diff is heavier than the problem. This skill looks for unnecessary wrappers, one-use abstractions, redundant checks, and dead code within the change. It keeps behavior fixed.',
 when:'Use it after the change has passing checks and the diff feels unnecessarily complicated. A small, plain diff can simply be left alone.',
 before:'Give it the scope or base commit and the checks that cover the changed behavior. Passing checks provide something concrete to preserve. Don’t use “simplify” as a hidden request to redesign the API.',
 steps:['Reads the change and the surrounding project patterns.','Names simplification candidates and rejects anything that alters behavior or scope.','Applies candidates one at a time and reruns affected checks.','Stops when no remaining change makes the code clearer.'],
 examples:[
 {title:'Simplify a working feature',prompt:'/simplify-code simplify the current invoice export diff. Keep behavior and the public interface unchanged. Use the passing export tests as the baseline.',note:'Keep the scope tied to a feature you can review.'},
 {title:'Review unnecessary layers',prompt:'/simplify-code inspect the change against main for wrappers or interfaces with only one implementation. Remove them only if that makes the code clearer and preserves behavior.',note:'One implementation is a signal to investigate, not an automatic reason to delete an interface.'},
 {title:'Flatten difficult control flow',prompt:'Use simplify-code on the new retry handler. Keep the retry limit, timing, and error behavior identical; look for a clearer control flow.',note:'Spell out the behavior that must stay fixed.'},
 {title:'Limit the area',prompt:'/simplify-code focus on the recently changed report formatting code. Leave unrelated files and public types alone.',note:'The default scope is a change, not a cleanup of the whole repository.'},
 {title:'Know when to stop',prompt:'/simplify-code review the current diff. If it is already plain, say so rather than changing it for style.',note:'“No useful simplification” is a valid result.'}],
 expect:'A list of simplifications made, choices deliberately kept, and checks rerun. A candidate that breaks a check is reverted. Behavior or interface changes are suggestions for separate work.',
 watch:'Fewer lines aren’t always clearer. Avoid turning this into a rewrite, and get passing checks before asking the agent to preserve behavior.',related:['verify-work','review-changes','implement-feature']
 },
 {
 name:'review-changes',category:'Companion',summary:'Review the diff for defects you can point to and explain.',
 intro:'I want a review to tell me what can fail, where it fails, and why. This skill reads the full change and its callers, checks the acceptance criteria, and keeps findings grounded in concrete failure scenarios.',
 when:'Use it before merging or handing off a change, especially for a risky contract or permission change. It can review a local diff, a branch, a commit range, or a pull request.',
 before:'Give it the base ref or change and the intended behavior. An evidence record can help explain what was tested, but it is not proof that the implementation is correct.',
 steps:['Reads the full diff, surrounding code, and affected callers.','Checks every acceptance criterion on success and failure paths.','Investigates correctness, security, contracts, tests, and maintainability.','Confirms and ranks findings, then gives a verdict.'],
 examples:[
 {title:'Review current work',prompt:'/review-changes review the current changes against the CSV export request. Check that the export matches the filtered list and handles escaping correctly.',note:'Give the reviewer the behavior to assess, not just an implementation summary.'},
 {title:'Review a branch',prompt:'/review-changes review this branch against main. Focus on confirmed failures and include file locations and reproduction scenarios.',note:'The base needs to exist locally.'},
 {title:'Check a permission boundary',prompt:'/review-changes review the new organization membership checks. Trace direct API calls, cross-organization resource IDs, and role changes.',note:'The review reports findings; it does not change access or patch the product code.'},
 {title:'Compare a commit range',prompt:'/review-changes review the change from BASE_REF to HEAD against the acceptance criteria in the task.',note:'Replace BASE_REF with the actual commit or branch you want compared.'},
 {title:'Review after a fix',prompt:'/review-changes re-review the fix for the duplicate import finding. Confirm the earlier issue is resolved and inspect the paths changed by the fix.',note:'A re-review should concentrate on the fix and affected code, not repeat the same unchanged review.'}],
 expect:'Evidence-backed findings with severity, locations, and failure scenarios, plus a verdict for the acceptance criteria. If nothing survives confirmation, it should say so plainly.',
 watch:'A review with no findings is useful evidence, not a guarantee of zero bugs. Keep taste preferences separate from defects and from the project’s documented conventions.',related:['verify-work','implement-feature','reflect']
 },
 {
 name:'reflect',category:'Companion',summary:'Turn a demonstrated mistake into a prevention you can approve.',
 intro:'Adding another vague instruction after every mistake is a good way to grow a rulebook nobody follows. Reflect starts with evidence, checks whether the problem is recurring, and prefers a test or tool that can catch it next time.',
 when:'Use it after a repeated failure, an escaped defect, or a correction that exposes a systematic gap. It isn’t a ritual for the end of every successful task.',
 before:'Bring the failing test, confirmed review finding, regression, or correction. With no demonstrated failure, there’s nothing concrete to learn from.',
 steps:['States the failure and checks whether the pattern appears elsewhere.','Finds a root cause that a check, tool, or instruction could address.','Proposes the smallest durable prevention and validates it where possible.','Shows the exact proposed change and waits for your approval.'],
 examples:[
 {title:'Learn from a repeated test failure',prompt:'/reflect the last two export changes mishandled quoted CSV values. Use the failing test output in this session to find the shared cause and propose a regression check.',note:'The claim needs actual evidence from the session or files you provide.'},
 {title:'Investigate an escaped permission defect',prompt:'/reflect the confirmed review finding about cross-organization project access. Check whether the same lookup pattern appears elsewhere and propose the smallest prevention.',note:'A confirmed finding is a better starting point than a hypothetical vulnerability.'},
 {title:'Prefer a check over a new rule',prompt:'Use reflect on the repeated missing loading-state correction. First check whether a test or static rule could catch it. Show the proposal before changing anything persistent.',note:'The preference is test, static rule, tooling, and only then an instruction change.'},
 {title:'Check whether a mistake is isolated',prompt:'/reflect investigate the regression described in this bug report. If it is an isolated slip, say so rather than adding a broad rule.',note:'Reflect may conclude that a persistent rule is not warranted.'},
 {title:'Review a proposed prevention',prompt:'/reflect use the confirmed retry regression and its failing test. Show how the proposed prevention would catch that case and still pass for correct code.',note:'The proposal should be validated against concrete bad and good cases.'}],
 expect:'A failure statement, recurrence assessment, root cause, and a validated proposal. Persistent instructions, tests, lint configuration, and other rules are not changed until you explicitly approve the specific change.',
 watch:'Don’t ask it to “remember everything from this task.” That mixes observations, preferences, and real defects. Start with one demonstrated failure and a prevention that addresses it.',related:['review-changes','verify-work','implement-feature']
 }
];
export const getSkillGuide = (name: string) => skillGuides.find(s => s.name === name);
export const primaryNames = new Set(skills.map(s => s.name));
