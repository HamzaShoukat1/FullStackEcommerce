
import { triggerSessionExpired } from '@/components/Dialogs/SessionExpiredModal';

export function handleSessionExpired(queryClient: any) {
  queryClient.clear();
  triggerSessionExpired();
}