/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: RoomInput!) {
    createRoom(input: $input) {
      pk
      sk
      avatarUrl
      title
      roomId
      message
      updatedAt
      senderEmail
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
      pk
      sk
      type
      imageKey
      key
      message
      senderEmail
      otherUserEmail
      updatedAt
      roomId
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: MessageInput!) {
    updateMessage(input: $input) {
      pk
      sk
      type
      imageKey
      key
      message
      senderEmail
      otherUserEmail
      updatedAt
      roomId
    }
  }
`;
