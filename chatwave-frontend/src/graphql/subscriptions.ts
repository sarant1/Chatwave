/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
      pk
      sk
      avatarUrl
      title
      latestMessage
      latestMessageTime
      roomId
    }
  }
`;
export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID!) {
    onCreateMessageByRoomId(roomId: $roomId) {
      pk
      sk
      type
      imageKey
      key
      message
      senderEmail
      updatedAt
      roomId
    }
  }
`;
export const onUpdateMessageByRoomId = /* GraphQL */ `
  subscription OnUpdateMessageByRoomId($roomId: ID!) {
    onUpdateMessageByRoomId(roomId: $roomId) {
      pk
      sk
      type
      imageKey
      key
      message
      senderEmail
      updatedAt
      roomId
    }
  }
`;
