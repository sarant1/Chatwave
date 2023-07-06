import { Input, Button, Flex, Spacer } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { AuthContext } from "@/contexts/auth.context";

const CreateNewMessageBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { user, selectedRoom } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const csrfToken = getCsrfCookie();
      console.log("csrfToken:", csrfToken);
      if (!user) {
        return;
      }

      // todo change this to use the user access token
      const input = {
        message: message,
        sender_id: user.email,
      };

      console.log(JSON.stringify(input));

      const response = await fetch("http://localhost:8080/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(input),
        credentials: "include",
      });
      const data = await response;
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Flex alignItems="center" mb={4} gap={2} mt={2}>
      <Input
        flex="1"
        placeholder="Type a message..."
        backgroundColor="gray.300"
        onChange={(e) => setMessage(e.target.value)}
      ></Input>
      <Button type="submit" colorScheme="messenger" onClick={handleSubmit}>
        Send
      </Button>
    </Flex>
  );
};

export default CreateNewMessageBox;
