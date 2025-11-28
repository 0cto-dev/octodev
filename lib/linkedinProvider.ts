import { LinkedInProfile } from "next-auth/providers/linkedin";
import { OAuthConfig } from "next-auth/providers/oauth";

export const LinkedinProvider = (
  config: Partial<OAuthConfig<LinkedInProfile>>
): OAuthConfig<LinkedInProfile> => ({
  id: "linkedin",
  name: "LinkedIn",
  type: "oauth",
  client: { token_endpoint_auth_method: "client_secret_post" },
  issuer: "https://www.linkedin.com",
  profile: (profile: LinkedInProfile) => ({
    id: profile.sub,
    name: profile.name,
    email: profile.email,
    image: profile.picture,
  }),
  wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  authorization: {
    params: {
      scope: "openid profile email",
    },
  },
  ...config,
});
