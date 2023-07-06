import React, { useEffect, useContext } from "react";
import { Container } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import MessageItem from "./MessageItem";
import { AuthContext } from "@/contexts/auth.context";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";

const MessageBox: React.FC = () => {
  const { selectedRoom, setSelectedRoom } = useContext(AuthContext);
  const fetchMessages = async () => {
    try {
      if (!selectedRoom) return;
      const csrfToken = getCsrfCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages?room=${selectedRoom}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
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
      >
        <CreateNewMessageBox />
      </Container>
    </>
  );
};

export default MessageBox;
