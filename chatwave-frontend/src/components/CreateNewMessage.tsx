import { Input, Button, Flex, Spacer } from "@chakra-ui/react";

const CreateNewMessageBox = () => {
  return (
    <Flex alignItems="center" mb={4} gap={2}>
      <Input
        flex="1"
        placeholder="Type a message..."
        backgroundColor="gray.300"
      ></Input>
      <Button type="submit" colorScheme="messenger">
        Send
      </Button>
    </Flex>
  );
};

export default CreateNewMessageBox;
