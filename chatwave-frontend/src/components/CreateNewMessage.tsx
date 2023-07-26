import {
  Textarea,
  Button,
  Flex,
  Input,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { useState, useContext, ChangeEvent } from "react";
import { AuthContext } from "@/contexts/auth.context";
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
  const [file, setFile] = useState<File | null | undefined>(null);
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
      setScrollHeight(43);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setMessage("");
  };

  return (
    <Flex alignItems="end" mb={4} gap={2} mt={2}>
      <Box position="relative" display="inline-block">
        <IconButton
          aria-label="upload picture"
          icon={<AiFillPicture size={30} />}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("fileinput")?.click();
          }}
          backgroundColor={file ? "green.200" : "none"}
        />
        {file && (
          <CloseButton
            size="sm"
            color="red.500"
            position="absolute"
            top="-10px"
            right="-10px"
            onClick={() => setFile(null)}
          />
        )}
      </Box>
      <Input // handle file upload
        type="file"
        display="none"
        id="fileinput"
        accept=".png, .jpg, .jpeg"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFile(e.target.files?.[0]);
          if (file) {
            console.log(file);
          }
        }}
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
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
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
