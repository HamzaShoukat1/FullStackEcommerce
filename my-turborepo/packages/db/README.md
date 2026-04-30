This package centralizes Prisma schema and client for the monorepo.

Usage:

- Run migrations from this package: `pnpm --filter @repo/db run db:migrate`
- Import the client in services: `import { prisma } from '@repo/db';`
