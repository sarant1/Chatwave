/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($title: String!) {
    onCreateRoom(title: $title) {
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
      otherUserEmail
      updatedAt
      roomId
    }
  }
`;
