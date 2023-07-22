export interface User {
  email: string;
  accessToken: string;
}

export interface Room {
  user: string;
  key: string;
  title: string;
  latestMessage: string;
  latestMessageTime: string;
  avatar_url: string;
  room_id: string;
}

export interface MessageItemProps {
  key: string;
  updatedAt: string;
  message: string;
  senderEmail: string;
}
