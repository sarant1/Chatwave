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
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import * as mutations from "@/graphql/mutations";
import { CreateRoomMutation } from "@/API";
import { Room } from "@/API";
interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

function CreateMessageModal({
  isOpen,
  onClose,
  user,
  setRooms,
}: CreateMessageModalProps) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!user) return;
    const inputVals = {
      otherUserEmail: email,
      message: message,
      type: "text",
      senderEmail: user.email,
      title: email,
    };
    try {
      const newRoom = await API.graphql<GraphQLQuery<CreateRoomMutation>>({
        query: mutations.createRoom,
        variables: {
          input: inputVals,
        },
      });
      console.log("NEWEST ROOM: ", newRoom);
      setRooms((prevRooms) => [newRoom.data?.createRoom as Room, ...prevRooms]);
    } catch (error: any) {
      console.log(error);
    }
    onClose();
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
