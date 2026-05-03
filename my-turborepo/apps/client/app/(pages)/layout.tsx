import { ReactNode } from 'react';
import ProtectedRoute from '@/components/Dialogs/ProtectedRoute';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
