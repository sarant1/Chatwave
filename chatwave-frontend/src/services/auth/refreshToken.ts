import { Auth } from "aws-amplify";

export async function refreshToken(): Promise<string | undefined> {
  try {
    const response = (await Auth.currentSession()).getIdToken();
    console.log(response.getJwtToken());
    return response.getJwtToken();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
