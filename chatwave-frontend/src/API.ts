/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type RoomInput = {
  otherUserEmail: string,
  senderEmail: string,
  message: string,
  type: string,
  avatarUrl?: string | null,
  title: string,
};

export type Room = {
  __typename: "Room",
  pk?: string | null,
  sk?: string | null,
  avatarUrl?: string | null,
  title?: string | null,
  roomId: string,
  message: string,
  updatedAt: string,
  senderEmail: string,
};

export type MessageInput = {
  type: string,
  imageKey?: string | null,
  message?: string | null,
  roomId: string,
  senderEmail: string,
  otherUserEmail: string,
};

export type Message = {
  __typename: "Message",
  pk?: string | null,
  sk?: string | null,
  type: string,
  imageKey?: string | null,
  key: string,
  message?: string | null,
  senderEmail: string,
  otherUserEmail: string,
  updatedAt?: string | null,
  roomId: string,
};

export type CreateRoomMutationVariables = {
  input: RoomInput,
};

export type CreateRoomMutation = {
  createRoom?:  {
    __typename: "Room",
    pk?: string | null,
    sk?: string | null,
    avatarUrl?: string | null,
    title?: string | null,
    roomId: string,
    message: string,
    updatedAt: string,
    senderEmail: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: MessageInput,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    pk?: string | null,
    sk?: string | null,
    type: string,
    imageKey?: string | null,
    key: string,
    message?: string | null,
    senderEmail: string,
    otherUserEmail: string,
    updatedAt?: string | null,
    roomId: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: MessageInput,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    pk?: string | null,
    sk?: string | null,
    type: string,
    imageKey?: string | null,
    key: string,
    message?: string | null,
    senderEmail: string,
    otherUserEmail: string,
    updatedAt?: string | null,
    roomId: string,
  } | null,
};

export type ListRoomsQuery = {
  listRooms?:  Array< {
    __typename: "Room",
    pk?: string | null,
    sk?: string | null,
    avatarUrl?: string | null,
    title?: string | null,
    roomId: string,
    message: string,
    updatedAt: string,
    senderEmail: string,
  } | null > | null,
};

export type ListMessagesQueryVariables = {
  roomId: string,
};

export type ListMessagesQuery = {
  listMessages?:  Array< {
    __typename: "Message",
    pk?: string | null,
    sk?: string | null,
    type: string,
    imageKey?: string | null,
    key: string,
    message?: string | null,
    senderEmail: string,
    otherUserEmail: string,
    updatedAt?: string | null,
    roomId: string,
  } | null > | null,
};

export type OnCreateRoomSubscriptionVariables = {
  title: string,
};

export type OnCreateRoomSubscription = {
  onCreateRoom?:  {
    __typename: "Room",
    pk?: string | null,
    sk?: string | null,
    avatarUrl?: string | null,
    title?: string | null,
    roomId: string,
    message: string,
    updatedAt: string,
    senderEmail: string,
  } | null,
};

export type OnCreateMessageByRoomIdSubscriptionVariables = {
  roomId: string,
};

export type OnCreateMessageByRoomIdSubscription = {
  onCreateMessageByRoomId?:  {
    __typename: "Message",
    pk?: string | null,
    sk?: string | null,
    type: string,
    imageKey?: string | null,
    key: string,
    message?: string | null,
    senderEmail: string,
    otherUserEmail: string,
    updatedAt?: string | null,
    roomId: string,
  } | null,
};
