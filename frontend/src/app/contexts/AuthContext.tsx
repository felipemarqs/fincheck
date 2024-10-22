import * as Sentry from '@sentry/react';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { toast } from 'react-hot-toast';
import { LaunchScreen } from '../../view/components/LaunchScreen';
import { User } from '../entities/User';
import { queryKeys } from '../config/queryKeys';
import { clarity } from 'react-microsoft-clarity';

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  user: User | undefined;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const queryClient = useQueryClient();

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.invalidateQueries({
      queryKey: [queryKeys.USERS, queryKeys.ME],
    });
    setSignedIn(false);
  }, []);

  const { isError, data, isFetching, isSuccess } = useQuery({
    queryKey: [queryKeys.USERS, queryKeys.ME],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
      Sentry.setUser(null);
    }
  }, [isError, signout, data]);

  useEffect(() => {
    if (import.meta.env.PROD) {
      Sentry.setUser({
        email: data?.email,
        username: data?.name,
      });

      // Identify the user
      if (clarity.hasStarted()) {
        clarity.identify('', {
          name: data?.name,
          email: data?.email,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signin, signout, user: data }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
};
