import type { TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce";

export const authConfig: TAuthConfig = {
  clientId: "oauth2-pkce-client",
  authorizationEndpoint: "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/auth",
  tokenEndpoint: "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173",
  scope: "openid profile email offline_access",
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => event.logIn(),
};
