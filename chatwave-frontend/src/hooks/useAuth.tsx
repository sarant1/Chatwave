"use client";

import { useEffect } from "react";
import { Hub } from "aws-amplify";
import { useRouter, usePathname } from "next/navigation";
import { Auth } from "aws-amplify";
import amplifyConfigure from "@/utils/configure-amplify";
import { AuthContext } from "@/contexts/auth.context";
import { useContext } from "react";

interface CurrentUser {
  attributes: {
    email: string;
  };
  signInUserSession: {
    accessToken: {
      jwtToken: string;
    };
  };
}
amplifyConfigure();

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser({
            email: data.signInUserSession.idToken.payload.email,
            accessToken: data.signInUserSession.accessToken.jwtToken,
          });
          if (pathname === "/login") {
            router.replace("/dashboard");
          }
          break;
        case "signOut":
          setUser(null);
          router.replace("/");
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser: CurrentUser) => {
        const email = currentUser.attributes.email;
        const accessToken = currentUser.signInUserSession.accessToken.jwtToken;
        setUser({ email, accessToken });
        if (pathname === "/login") {
          router.replace("/dashboard");
        }
      })
      .catch((err) => {
        router.replace("/login");
        console.log("Not signed in", err);
      });
    console.log("AUTH CHECKED", user);
    return unsubscribe;
  }, []);

  return { user };
};
