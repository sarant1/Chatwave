import { Input, Button, Flex, Spacer } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { AuthContext } from "@/contexts/auth.context";
import { MessageItemProps } from "@/utils/types";
import { refreshToken } from "@/services/auth/refreshToken";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import { CreateMessageMutation } from "@/API";
interface CreateNewMessageBoxProps {
  setCurrentMessages: React.Dispatch<MessageItemProps[]>;
  currentMessages: MessageItemProps[];
}

const CreateNewMessageBox: React.FC<CreateNewMessageBoxProps> = (props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, selectedRoom } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!selectedRoom || !user) return;
    try {
      setIsLoading(true);
      const newMessage = await API.graphql<GraphQLQuery<CreateMessageMutation>>(
        {
          query: mutations.createMessage,
          variables: {
            input: {
              message: message,
              roomId: selectedRoom,
              senderEmail: user.email,
            },
          },
        }
      );
      console.log(newMessage);
      props.setCurrentMessages([
        newMessage.data?.createMessage as MessageItemProps,
        ...props.currentMessages,
      ]);
    } catch (error) {}
    setIsLoading(false);
    setMessage("");
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
