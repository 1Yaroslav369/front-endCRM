import { useEffect, useRef } from 'react';

import { refresh } from '../services/authService';
import { useAuthStore } from '../store/authStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const hasChecked = useRef(false);

  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    if (hasChecked.current) return;

    hasChecked.current = true;

    const checkSession = async () => {
      try {
        const user = await refresh();

        setUser(user);
      } catch {
        console.log('No active session');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setUser, setLoading]);

  return children;
};

export default AuthProvider;