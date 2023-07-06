import { Container, Text } from "@chakra-ui/react";

// sender will be true if it is the current user sending the message
interface MessageItemProps {
  message: string;
  sender: boolean;
}

const MessageItem: React.FC<MessageItemProps> = (props) => {
  return (
    <Container
      backgroundColor={!props.sender ? "messenger.500" : "green.100"}
      p={2}
      mt="2px"
      borderRadius="lg"
      w="auto"
      marginInlineStart={props.sender ? "auto" : 0}
      marginInlineEnd={props.sender ? 0 : "auto"}
      minH="40px"
      alignItems="center"
      display="flex"
    >
      <Text>{props.message}</Text>
    </Container>
  );
};

export default MessageItem;
