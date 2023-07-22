import { Container, Text } from "@chakra-ui/react";
import { MessageItemProps } from "@/utils/types";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
// sender will be true if it is the current user sending the messag

const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <Container
      backgroundColor={
        props.senderEmail !== user?.email ? "messenger.300" : "green.100"
      }
      p={2}
      mt="2px"
      borderRadius="lg"
      w="auto"
      maxW="60%"
      marginInlineStart={props.senderEmail === user?.email ? "auto" : 0}
      marginInlineEnd={props.senderEmail === user?.email ? 0 : "auto"}
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Text>{props.message}</Text>
    </Container>
  );
};

export default MessageItem;
