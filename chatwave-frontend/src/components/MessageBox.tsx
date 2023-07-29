"use client";
import { Spinner, Flex } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import { Container, IconButton } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import { OnCreateMessageByRoomIdSubscription } from "@/API";
import MessageItem from "@/components/MessageItem";
import { MessageItemProps } from "@/utils/types";
import { AuthContext } from "@/contexts/auth.context";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLSubscription, GraphQLQuery } from "@aws-amplify/api";
import * as queries from "@/graphql/queries";
import * as subscriptions from "@/graphql/subscriptions";
import { ListMessagesQuery } from "@/API";
import { BiArrowBack } from "react-icons/bi";

const MessageBox: React.FC = () => {
  const { selectedRoom, setSelectedRoom } = useContext(AuthContext);
  const [currentMessages, setCurrentMessages] = useState<MessageItemProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sub, setSub] = useState<any>(null);

  useEffect(() => {
    console.log("CURRENTMESSAGES!!: ", currentMessages);
  });
  useEffect(() => {
    if (sub) {
      sub.unsubscribe();
    }
    fetchMessages();
    subscribeToMessages();
  }, [selectedRoom]);
  // query messages
  const fetchMessages = async () => {
    setIsLoading(true);
    if (!selectedRoom || currentMessages.length > 0) return;
    try {
      const messages = await API.graphql<GraphQLQuery<ListMessagesQuery>>(
        graphqlOperation(queries.listMessages, { roomId: selectedRoom })
      );
      setCurrentMessages(messages.data?.listMessages as MessageItemProps[]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  // subscribe to messages for that room
  const subscribeToMessages = () => {
    if (!selectedRoom || !currentMessages) return;
    setSub(
      API.graphql<GraphQLSubscription<OnCreateMessageByRoomIdSubscription>>(
        graphqlOperation(subscriptions.onCreateMessageByRoomId, {
          roomId: selectedRoom,
        })
      ).subscribe({
        // Update current messages here on new message
        next: ({ value }) => {
          console.log(value.data?.onCreateMessageByRoomId);
          setCurrentMessages((prevMessages) => [
            value.data?.onCreateMessageByRoomId as MessageItemProps,
            ...prevMessages,
          ]);
        },
        error: (error) => console.warn(error),
      })
    );
    console.log("SUBSCRIPTION", sub);
    // Stop receiving data updates from the subscription
    return () => sub.unsubscribe();
  };

  return (
    <Flex
      flexDir="column"
      w="full"
      h="full"
      justifyContent="center"
      alignItems={{ base: "center", xl: "flex-start" }}
    >
      <IconButton
        display={selectedRoom ? "flex" : "none"}
        aria-label="back"
        icon={<BiArrowBack />}
        mx={4}
        my={1}
        onClick={() => {
          setSelectedRoom(null);
          setCurrentMessages([]);
        }}
      >
        Test
      </IconButton>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        borderColor={{ base: "", xl: "gray.400" }}
        mx={4}
        mb={4}
        display={selectedRoom ? "flex" : "none"}
        flexDirection="column-reverse"
        overflowY="scroll"
        lineHeight="1.5"
        flex="1"
        justifyContent={isLoading && selectedRoom ? "center" : ""}
        paddingInlineStart={{ base: "2px", xl: 4 }}
        paddingInlineEnd={{ base: "2px", xl: 3 }}
      >
        {isLoading && selectedRoom ? (
          <Flex justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <CreateNewMessageBox />
            {selectedRoom &&
              currentMessages.map((message) => (
                <MessageItem
                  type={message.type}
                  key={message.key}
                  imageKey={message.imageKey}
                  message={message.message}
                  updatedAt={message.updatedAt}
                  senderEmail={message.senderEmail}
                  roomId={message.roomId}
                />
              ))}
          </>
        )}
      </Container>
    </Flex>
  );
};

export default MessageBox;
