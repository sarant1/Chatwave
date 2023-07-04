import { Auth } from "aws-amplify";

export const logOut = async () => {
  try {
    await Auth.signOut({ global: true });
  } catch (err) {
    console.error(err);
  }
};
