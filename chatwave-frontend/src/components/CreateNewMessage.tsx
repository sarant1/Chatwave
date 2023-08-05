import { Textarea, Button, Flex } from "@chakra-ui/react";
import { useState, useContext, ChangeEvent } from "react";
import { AuthContext } from "@/contexts/auth.context";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import { CreateMessageMutation } from "@/API";
import PhotoIconUpload from "@/components/PhotoIconUpload";

const CreateNewMessageBox: React.FC = () => {
  const { user, selectedRoom } = useContext(AuthContext);
  const [message, setMessage] = useState<string>("");
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | null | undefined>(null);
  const [imageKey, setImageKey] = useState<string | null>(""); // this is the key to the image in S3
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null); // this is the url to upload the image to S3
  const [formData, setFormData] = useState<FormData | null>(null);
  const defaultScrollHeight = 43;
  const submitPhotoToS3 = async () => {
    if (!formData || !presignedUrl) return;
    try {
      setIsLoading(true);
      const response = await fetch(presignedUrl, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("SUCCESS UPLOADING ITEM");
      }
    } catch (error) {
      console.log(error);
    }
    setPresignedUrl(null);
  };

  const submitPhotoToAppSync = async () => {
    if (!selectedRoom.id || !user) return;
    const inputVals = {
      type: "image",
      roomId: selectedRoom.id,
      senderEmail: user.email,
      imageKey: imageKey,
      otherUserEmail: selectedRoom.title,
    };
    try {
      await API.graphql<GraphQLQuery<CreateMessageMutation>>({
        query: mutations.createMessage,
        variables: {
          input: inputVals,
        },
      });
      setImageKey(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRoom.id || !user) return;
    setIsLoading(true);
    if (file) {
      await submitPhotoToS3();
      await submitPhotoToAppSync();
      setFile(null);
    }
    if (message.length === 0) {
      setIsLoading(false);
      return;
    }
    const inputVals = {
      type: "text",
      roomId: selectedRoom.id,
      senderEmail: user.email,
      otherUserEmail: selectedRoom.title,
      message: message,
    };
    try {
      await API.graphql<GraphQLQuery<CreateMessageMutation>>({
        query: mutations.createMessage,
        variables: {
          input: inputVals,
        },
      });
      setScrollHeight(defaultScrollHeight);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <Flex alignItems="end" mb={4} gap={2} mt={2} mr={2}>
      <PhotoIconUpload
        file={file}
        setFile={setFile}
        setImageKey={setImageKey}
        setFormData={setFormData}
        setPresignedUrl={setPresignedUrl}
      />
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
