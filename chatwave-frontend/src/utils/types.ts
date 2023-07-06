export interface User {
  email: string;
  accessToken: string;
}

export interface Room {
  user: string;
  key: string;
  title: string;
  latest_message: string;
  latest_message_time: string;
  avatar_url: string;
  room_id: string;
}

export interface MessageItemProps {
  key: string;
  created_at: string;
  message: string;
  sender_id: string;
}
