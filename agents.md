# AI Agent Coding Guidelines

## Core Principles

1. **Plan First, Code Second**: Before writing any code, describe your approach and wait for approval.
2. **Seek Clarification**: Always ask clarifying questions before writing any code if requirements are ambiguous.
3. **Manage Complexity**: If a task requires changes to more than 3 files, stop and break it into smaller tasks first.
4. **Proactive Testing**: After writing code, list what could break and suggest tests to cover it.
5. **Test-Driven Debugging**: When there's a bug, start by writing a test that reproduces it, then fix it until the test passes.
6. **Continuous Improvement**: Every time I correct you, add a new rule to this file so it never happens again.
7. **Protect Critical Files**: Do not modify configuration, environment, or infrastructure files without explicit user approval. Always verify if a file is marked as "Critical" before editing.

## Critical Files and Folders

The following files and folders are considered critical for the project. Exercise extreme caution and seek approval before modifying:

- **Config**: `next.config.ts`, `tsconfig.json`, `jsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `codegen.yml`, `eslint.config.mjs`, `.npmrc`, `.nvmrc`
- **Infrastructure & CI/CD**: `amplify.yml`, `bitbucket-pipelines.yml`
- **Environment**: `.env.*` (all environment files)
- **Dependencies**: `package.json`, `package-lock.json`
- **Project Meta**: `.cursorrules`, `agents.md`
- **Core Logic**: `src/middleware.ts`, `src/app/layout.tsx`
