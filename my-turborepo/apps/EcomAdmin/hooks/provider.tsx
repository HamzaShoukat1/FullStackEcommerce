'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24  // 1 hour
    }

  }
})
const localStoragePersister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
})

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
})
export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}