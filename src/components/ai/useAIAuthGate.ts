import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';

/**
 * Hook that provides an auth gate for AI interactions.
 * If the user is not authenticated, shows a toast and redirects to /auth.
 * 
 * Usage:
 *   const { isAuthenticated, guardAIInteraction } = useAIAuthGate();
 *   // Before any AI call:
 *   if (!guardAIInteraction()) return;
 */
export function useAIAuthGate() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const guardAIInteraction = useCallback(() => {
    if (isAuthenticated) return true;

    toast({
      title: 'Sign in to use AI features',
      description: 'AI-powered features require a free account. Sign in to continue.',
      duration: 5000,
    });

    const returnUrl = location.pathname + location.search;
    navigate(`/auth?return=${encodeURIComponent(returnUrl)}`);
    return false;
  }, [isAuthenticated, navigate, location, toast]);

  return { isAuthenticated, guardAIInteraction };
}
