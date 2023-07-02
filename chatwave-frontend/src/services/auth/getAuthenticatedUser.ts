import { Auth } from 'aws-amplify';

export const getAuthenticatedUser= async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    return response; 
      
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}