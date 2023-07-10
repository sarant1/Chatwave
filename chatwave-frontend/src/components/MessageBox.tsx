import React, { useEffect, useContext, useState } from "react";
import { Container } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import MessageItem from "@/components/MessageItem";
import { MessageItemProps } from "@/utils/types";
import { AuthContext } from "@/contexts/auth.context";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { refreshToken } from "@/services/auth/refreshToken";

const MessageBox: React.FC = () => {
  const { selectedRoom } = useContext(AuthContext);
  const [currentMessages, setCurrentMessages] = useState<MessageItemProps[]>(
    []
  );
  const fetchMessages = async () => {
    try {
      if (!selectedRoom) return;
      const csrfToken = getCsrfCookie();
      const accessToken = await refreshToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages?room=${selectedRoom}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCurrentMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedRoom]);

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
        <CreateNewMessageBox
          setCurrentMessages={setCurrentMessages}
          currentMessages={currentMessages}
        />
        {selectedRoom &&
          currentMessages.map((message) => (
            <MessageItem
              key={message.key}
              message={message.message}
              created_at={message.created_at}
              sender_id={message.sender_id}
            />
          ))}
      </Container>
    </>
  );
};

export default MessageBox;
