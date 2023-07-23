"use client";

import React, { useEffect, useContext, useState } from "react";
import { Container } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import {
  OnCreateMessageByRoomIdSubscription,
  OnCreateMessageByRoomIdSubscriptionVariables,
} from "@/API";
import MessageItem from "@/components/MessageItem";
import { MessageItemProps } from "@/utils/types";
import { AuthContext } from "@/contexts/auth.context";
import { onCreateMessageByRoomId } from "@/graphql/subscriptions";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { GraphQLSubscription, GraphQLQuery } from "@aws-amplify/api";
import * as queries from "@/graphql/queries";
import * as subscriptions from "@/graphql/subscriptions";
import { ListMessagesQuery } from "@/API";
const MessageBox: React.FC = () => {
  const { selectedRoom } = useContext(AuthContext);
  const [currentMessages, setCurrentMessages] = useState<MessageItemProps[]>(
    []
  );
  useEffect(() => {
    console.log("CURRENTMESSAGES!!: ", currentMessages);
  });
  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [selectedRoom]);
  // query messages
  const fetchMessages = async () => {
    if (!selectedRoom || currentMessages.length > 0) return;
    const messages = await API.graphql<GraphQLQuery<ListMessagesQuery>>(
      graphqlOperation(queries.listMessages, { roomId: selectedRoom })
    );
    console.log(messages.data?.listMessages);
    setCurrentMessages(messages.data?.listMessages as MessageItemProps[]);
    console.log(currentMessages);
  };
  // subscribe to messages for that room
  const subscribeToMessages = () => {
    if (!selectedRoom || !currentMessages) return;
    const sub = API.graphql<
      GraphQLSubscription<OnCreateMessageByRoomIdSubscription>
    >(
      graphqlOperation(subscriptions.onCreateMessageByRoomId, {
        roomId: selectedRoom,
      })
    ).subscribe({
      // Update current messages here on subscribe
      next: ({ value }) => {
        console.log(value.data?.onCreateMessageByRoomId);
        setCurrentMessages((prevMessages) => [
          value.data?.onCreateMessageByRoomId as MessageItemProps,
          ...prevMessages,
        ]);
      },
      error: (error) => console.warn(error),
    });
    console.log("SUBSCRIPTION", sub);
    // Stop receiving data updates from the subscription
    return () => sub.unsubscribe();
  };

  return (
    <>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.400"
        m={4}
        display="flex"
        flexDirection="column-reverse"
        overflowY="scroll"
        lineHeight="1.5"
      >
        <CreateNewMessageBox />
        {selectedRoom &&
          currentMessages.map((message) => (
            <MessageItem
              key={message.key}
              message={message.message}
              updatedAt={message.updatedAt}
              senderEmail={message.senderEmail}
              roomId={message.roomId}
            />
          ))}
      </Container>
    </>
  );
};

export default MessageBox;
