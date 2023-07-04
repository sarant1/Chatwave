"use client";

import { Avatar, Box, Flex, Text, Container } from "@chakra-ui/react";
import React from "react";

const RoomsList = () => {
  return (
    <Container
      maxW={{ base: "100vw", md: "sm" }}
      minH="100vh"
      bg="green.500"
      m={-4}
    >
      <Box
        p={3}
        minW="100%"
        borderWidth="1px"
        borderBottom="0.5px"
        borderColor="black"
        m={0}
      >
        <Avatar
          size="md"
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
      </Box>
      <Box
        p={3}
        minW="100%"
        borderWidth="1px"
        borderColor="black"
        borderBottom="1px"
        m={0}
      >
        <Avatar
          size="md"
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
      </Box>
    </Container>
  );
};

export default RoomsList;
