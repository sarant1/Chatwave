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
  type: string;
  imageKey?: string;
  key: string;
  updatedAt: string;
  message?: string;
  senderEmail: string;
  otherUserEmail: string;
  roomId: string;
  pk?: string | null;
  sk?: string | null;
}
