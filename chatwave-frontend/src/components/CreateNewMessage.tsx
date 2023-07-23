import { Textarea, Button, Flex, Spacer } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { AuthContext } from "@/contexts/auth.context";
import { MessageItemProps } from "@/utils/types";
import { refreshToken } from "@/services/auth/refreshToken";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import { CreateMessageMutation } from "@/API";
import { AiFillPicture } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";

const CreateNewMessageBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [scrollHeight, setScrollHeight] = useState<number>(0);
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
      setScrollHeight(43);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setMessage("");
  };

  return (
    <Flex alignItems="end" mb={4} gap={2} mt={2}>
      <IconButton
        aria-label="upload picture"
        icon={<AiFillPicture size={30} />}
        onClick={() => console.log("upload picture")}
      />
      <Textarea
        flex="1"
        display="inline-block"
        minH={"40px"}
        height={`${scrollHeight}px`}
        placeholder="Type a message..."
        backgroundColor="gray.300"
        resize="none"
        overflow="hidden"
        onChange={(e) => {
          setMessage(e.target.value);
          // handling textarea height change
          if (e.target.value === "") {
            setScrollHeight(40);
            return;
          }
          if (scrollHeight != e.target.scrollHeight) {
            setScrollHeight(e.target.scrollHeight);
          }
        }}
        value={message}
      ></Textarea>
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
