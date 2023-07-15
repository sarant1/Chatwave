/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type RoomInput = {
  title: string,
  message: string,
};

export type Room = {
  __typename: "Room",
  pk?: string | null,
  sk?: string | null,
  title?: string | null,
  latestMessage?: string | null,
  latestMessageTime?: string | null,
};

export type MessageInput = {
  message: string,
  roomId: string,
};

export type Message = {
  __typename: "Message",
  pk?: string | null,
  sk?: string | null,
  key: string,
  message: string,
  sender_id: string,
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
    title?: string | null,
    latestMessage?: string | null,
    latestMessageTime?: string | null,
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
    key: string,
    message: string,
    sender_id: string,
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
    key: string,
    message: string,
    sender_id: string,
    updatedAt?: string | null,
    roomId: string,
  } | null,
};

export type ListRoomsQuery = {
  listRooms?:  Array< {
    __typename: "Room",
    pk?: string | null,
    sk?: string | null,
    title?: string | null,
    latestMessage?: string | null,
    latestMessageTime?: string | null,
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
    key: string,
    message: string,
    sender_id: string,
    updatedAt?: string | null,
    roomId: string,
  } | null > | null,
};

export type OnCreateRoomSubscription = {
  onCreateRoom?:  {
    __typename: "Room",
    pk?: string | null,
    sk?: string | null,
    title?: string | null,
    latestMessage?: string | null,
    latestMessageTime?: string | null,
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
    key: string,
    message: string,
    sender_id: string,
    updatedAt?: string | null,
    roomId: string,
  } | null,
};

export type OnUpdateMessageByRoomIdSubscriptionVariables = {
  roomId: string,
};

export type OnUpdateMessageByRoomIdSubscription = {
  onUpdateMessageByRoomId?:  {
    __typename: "Message",
    pk?: string | null,
    sk?: string | null,
    key: string,
    message: string,
    sender_id: string,
    updatedAt?: string | null,
    roomId: string,
  } | null,
};
