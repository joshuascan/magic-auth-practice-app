import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth2";
import { WebAuthnExtension } from "@magic-ext/webauthn";
import { AuthExtension } from "@magic-ext/auth";

const createMagic = (key) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      network: "sepolia",
      extensions: [
        new AuthExtension(),
        new OAuthExtension(),
        new WebAuthnExtension(),
      ],
    })
  );
};

export const magic = createMagic("pk_live_3EFC32B01A29985C");
