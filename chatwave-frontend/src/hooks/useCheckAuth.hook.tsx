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
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        /*
          payload: {
            event: 'signIn' | 'signOut' | others
            data: Cognito Object
          }
        */
      
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
          .catch(() => {
            router.replace('/auth/login')
            console.log("Not signed in")
          });
    
        return unsubscribe;
      }, []);

      return { user }
}