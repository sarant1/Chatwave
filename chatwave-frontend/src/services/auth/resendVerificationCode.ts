import { Auth } from 'aws-amplify';

export async function resendVerificationCode(email: string) {
  try {
    await Auth.resendSignUp(email);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}