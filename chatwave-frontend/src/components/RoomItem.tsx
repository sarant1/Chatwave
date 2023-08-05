import { Avatar, Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Room } from "@/API";
import { AuthContext } from "@/contexts/auth.context";
import { useContext } from "react";

interface RoomItemProps extends Room {}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const { setSelectedRoom, selectedRoom } = useContext(AuthContext);

  const localItemTime = () => {
    const date = new Date(props.updatedAt as string);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };
  return (
    <Box
      p={3}
      minW="100%"
      borderWidth="2px"
      borderColor="gary.400"
      borderRadius="lg"
      mb={2}
      _hover={{ cursor: "pointer", bg: "gray.300" }}
      onClick={() => {
        setSelectedRoom({ id: props.roomId, title: props.title });
      }}
    >
      <Flex>
        <Avatar
          size="md"
          mr={3}
          src={
            props.avatarUrl ||
            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          }
        />
        <Flex w="full" flexDir={"column"}>
          <Flex justifyContent="space-between" w="full">
            <Text
              fontWeight="bold"
              maxW="70%"
              overflowX="hidden"
              whiteSpace={"nowrap"}
            >
              {props.title}
            </Text>
            <Text color="gray.600">{localItemTime()}</Text>
          </Flex>
          <Text>{props.message}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RoomItem;
