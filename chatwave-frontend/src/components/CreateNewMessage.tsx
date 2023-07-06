import { Input, Button, Flex, Spacer } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { AuthContext } from "@/contexts/auth.context";
import { MessageItemProps } from "@/utils/types";

interface CreateNewMessageBoxProps {
  setCurrentMessages: React.Dispatch<MessageItemProps[]>;
  currentMessages: MessageItemProps[];
}

const CreateNewMessageBox: React.FC<CreateNewMessageBoxProps> = (props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, selectedRoom } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const csrfToken = getCsrfCookie();
      console.log("csrfToken:", csrfToken);
      if (!user) {
        return;
      }

      // todo change this to use the user access token
      const input = {
        room: selectedRoom,
        message: message,
        email: user.email,
      };

      console.log(JSON.stringify(input));

      const response = await fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(input),
        credentials: "include",
      });
      const data: MessageItemProps = await response.json();
      setMessage("");
      props.setCurrentMessages([...props.currentMessages, data]);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Flex alignItems="center" mb={4} gap={2} mt={2}>
      <Input
        flex="1"
        placeholder="Type a message..."
        backgroundColor="gray.300"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></Input>
      <Button
        type="submit"
        colorScheme="messenger"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Send
      </Button>
    </Flex>
  );
};

export default CreateNewMessageBox;
