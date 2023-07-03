"use client"

import { useEffect, useState } from 'react'
import { Hub } from 'aws-amplify'
import { useRouter } from 'next/navigation'
import { getAuthenticatedUser } from '@/services/auth'
import { User } from '@/contexts/auth.context'

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
    
        getAuthenticatedUser()
          .then((currentUser: CurrentUser) => {
            const email = currentUser.attributes.email;
            const accessToken = currentUser.signInUserSession.accessToken.jwtToken;
            setUser({ email, accessToken });
          })
          .then(() => {
            router.replace('/dashboard')
            console.log("Signed in")
          })
          .catch(() => {
            router.replace('/login')
            console.log("Not signed in")
          });
    
        return unsubscribe;
      }, []);

      return { user }
}