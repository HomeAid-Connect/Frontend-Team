import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const AUTHENTICATED_USER_KEY = "authenticated_user";

const AuthContext = createContext(null);

function readStoredUser() {
  const storedUser = sessionStorage.getItem(AUTHENTICATED_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    sessionStorage.removeItem(AUTHENTICATED_USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAccessToken(sessionStorage.getItem(ACCESS_TOKEN_KEY));
    setRefreshToken(sessionStorage.getItem(REFRESH_TOKEN_KEY));
    setUser(readStoredUser());
    setIsLoading(false);
  }, []);

  function login({ user: authenticatedUser, tokens }) {
    if (!tokens?.access) {
      throw new Error("Login response did not include an access token.");
    }

    sessionStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);

    if (tokens.refresh) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    } else {
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    if (authenticatedUser) {
      sessionStorage.setItem(
        AUTHENTICATED_USER_KEY,
        JSON.stringify(authenticatedUser),
      );
    } else {
      sessionStorage.removeItem(AUTHENTICATED_USER_KEY);
    }

    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh || null);
    setUser(authenticatedUser || null);
  }

  function logout() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(AUTHENTICATED_USER_KEY);

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      user,
      isAuthenticated: Boolean(accessToken),
      isLoading,
      login,
      logout,
    }),
    [accessToken, refreshToken, user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
