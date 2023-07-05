export interface User {
  email: string;
  accessToken: string;
}

export interface Room {
  user: string;
  key: string;
  title: string;
  latest_message: string;
  avatar_url: string;
}
