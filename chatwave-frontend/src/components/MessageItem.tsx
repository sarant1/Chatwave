import { Container, Text } from "@chakra-ui/react";
import { MessageItemProps } from "@/utils/types";
// sender will be true if it is the current user sending the messag

const MessageItem: React.FC<MessageItemProps> = (props) => {
  return (
    <Container
      backgroundColor={!props.sender_id ? "messenger.500" : "green.100"}
      p={2}
      mt="2px"
      borderRadius="lg"
      w="auto"
      maxW="60%"
      marginInlineStart={props.sender_id ? "auto" : 0}
      marginInlineEnd={props.sender_id ? 0 : "auto"}
      minH="40px"
      alignItems="center"
      display="flex"
    >
      <Text>{props.message}</Text>
    </Container>
  );
};

export default MessageItem;
