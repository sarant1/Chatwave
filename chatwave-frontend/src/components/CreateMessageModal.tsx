import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { User } from "@/utils/types";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { refreshToken } from "@/services/auth/refreshToken";
interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

function CreateMessageModal({
  isOpen,
  onClose,
  user,
}: CreateMessageModalProps) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const csrfToken = getCsrfCookie();
      const accessToken = await refreshToken();
      if (!user) {
        return;
      }
      const input = {
        user1: user.email,
        user2: email,
        message: message,
      };

      const response = await fetch("http://localhost:8080/api/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${accessToken}`,
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Messaage</FormLabel>
              <Input
                placeholder="Message"
                type="message"
                onChange={(event) => setMessage(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateMessageModal;
