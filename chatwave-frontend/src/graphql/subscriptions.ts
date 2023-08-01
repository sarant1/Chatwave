/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($otherUserEmail: String!) {
    onCreateRoom(otherUserEmail: $otherUserEmail) {
      pk
      sk
      avatarUrl
      title
      roomId
      latestMessage
      latestMessageTime
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
