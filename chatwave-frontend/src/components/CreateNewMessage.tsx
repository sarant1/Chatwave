import { Textarea, Button, Flex } from "@chakra-ui/react";
import { useState, useContext, ChangeEvent } from "react";
import { AuthContext } from "@/contexts/auth.context";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import { CreateMessageMutation } from "@/API";
import PhotoIconUpload from "@/components/PhotoIconUpload";

const CreateNewMessageBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, selectedRoom } = useContext(AuthContext);
  const [file, setFile] = useState<File | null | undefined>(null);
  const defaultScrollHeight = 43;

  const handleSubmit = async () => {
    if (!selectedRoom || !user) return;
    try {
      setIsLoading(true);
      const newMessage = await API.graphql<GraphQLQuery<CreateMessageMutation>>(
        {
          query: mutations.createMessage,
          variables: {
            input: {
              // type: text
              message: message,
              roomId: selectedRoom,
              senderEmail: user.email,
            },
          },
        }
      );
      setScrollHeight(defaultScrollHeight);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setMessage("");
  };

  return (
    <Flex alignItems="end" mb={4} gap={2} mt={2}>
      <PhotoIconUpload file={file} setFile={setFile} />
      <Textarea
        flex="1"
        display="inline-block"
        minH={`${defaultScrollHeight}px`}
        height={`${scrollHeight}px`}
        placeholder="Type a message..."
        backgroundColor="gray.300"
        resize="none"
        overflow="hidden"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value);
          // handling textarea height change
          if (e.target.value === "") {
            setScrollHeight(defaultScrollHeight);
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
