"use client"

import { useEffect, useState } from 'react'
import { Hub } from 'aws-amplify'
import { useRouter } from 'next/navigation'
import { User } from '@/contexts/auth.context'
import { Auth } from 'aws-amplify'
import amplifyConfigure from '@/utils/configure-amplify'

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

export const useCheckAuth = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
          switch (event) {
            case "signIn":
              setUser({
                // name: "",
                // occupation: "",
                email: data.signInUserSession.idToken.payload.email,
                accessToken: data.signInUserSession.accessToken.jwtToken,
              });
              router.replace('/dashboard');
              break;
            case "signOut":
              setUser(null);
              router.replace('/');
              break;
          }
        });
    
        Auth.currentAuthenticatedUser()
          .then((currentUser: CurrentUser) => {
            const email = currentUser.attributes.email;
            const accessToken = currentUser.signInUserSession.accessToken.jwtToken;
            setUser({ email, accessToken });
          })
          .catch((err) => {
            router.replace('/login')
            console.log("Not signed in")
          });
    
        return unsubscribe;
      }, []);

      return { user }
}