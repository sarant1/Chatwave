/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type RoomInput = {
  otherUserEmail: string;
  message: string;
  avatarUrl?: string | null;
  senderEmail: string;
  title: string;
};

export type Room = {
  __typename: "Room";
  pk?: string | null;
  sk?: string | null;
  avatarUrl?: string;
  title?: string | null;
  latestMessage?: string | null;
  latestMessageTime?: string | null;
  roomId: string;
};

export type MessageInput = {
  message: string;
  roomId: string;
  senderEmail: string;
};

export type Message = {
  __typename: "Message";
  pk?: string | null;
  sk?: string | null;
  key: string;
  message: string;
  senderEmail: string;
  updatedAt?: string | null;
  roomId: string;
};

export type CreateRoomMutationVariables = {
  input: RoomInput;
};

export type CreateRoomMutation = {
  createRoom?: {
    __typename: "Room";
    pk?: string | null;
    sk?: string | null;
    avatarUrl?: string | null;
    title?: string | null;
    latestMessage?: string | null;
    latestMessageTime?: string | null;
    roomId: string;
  } | null;
};

export type CreateMessageMutationVariables = {
  input: MessageInput;
};

export type CreateMessageMutation = {
  createMessage?: {
    __typename: "Message";
    pk?: string | null;
    sk?: string | null;
    key: string;
    message: string;
    senderEmail: string;
    updatedAt?: string | null;
    roomId: string;
  } | null;
};

export type UpdateMessageMutationVariables = {
  input: MessageInput;
};

export type UpdateMessageMutation = {
  updateMessage?: {
    __typename: "Message";
    pk?: string | null;
    sk?: string | null;
    key: string;
    message: string;
    senderEmail: string;
    updatedAt?: string | null;
    roomId: string;
  } | null;
};

export type ListRoomsQuery = {
  listRooms?: Array<{
    __typename: "Room";
    pk?: string | null;
    sk?: string | null;
    avatarUrl?: string | null;
    title?: string | null;
    latestMessage?: string | null;
    latestMessageTime?: string | null;
    roomId: string;
  } | null> | null;
};

export type ListMessagesQueryVariables = {
  roomId: string;
};

export type ListMessagesQuery = {
  listMessages?: Array<{
    __typename: "Message";
    pk?: string | null;
    sk?: string | null;
    key: string;
    message: string;
    senderEmail: string;
    updatedAt?: string | null;
    roomId: string;
  } | null> | null;
};

export type OnCreateRoomSubscription = {
  onCreateRoom?: {
    __typename: "Room";
    pk?: string | null;
    sk?: string | null;
    avatarUrl?: string | null;
    title?: string | null;
    latestMessage?: string | null;
    latestMessageTime?: string | null;
    roomId: string;
  } | null;
};

export type OnCreateMessageByRoomIdSubscriptionVariables = {
  roomId: string;
};

export type OnCreateMessageByRoomIdSubscription = {
  onCreateMessageByRoomId?: {
    __typename: "Message";
    pk?: string | null;
    sk?: string | null;
    key: string;
    message: string;
    senderEmail: string;
    updatedAt?: string | null;
    roomId: string;
  } | null;
};

export type OnUpdateMessageByRoomIdSubscriptionVariables = {
  roomId: string;
};

export type OnUpdateMessageByRoomIdSubscription = {
  onUpdateMessageByRoomId?: {
    __typename: "Message";
    pk?: string | null;
    sk?: string | null;
    key: string;
    message: string;
    senderEmail: string;
    updatedAt?: string | null;
    roomId: string;
  } | null;
};
