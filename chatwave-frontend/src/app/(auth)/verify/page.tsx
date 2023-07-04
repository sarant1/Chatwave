"use client";

import { Center, Heading, useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";

import { PinInput, PinInputField } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { confirmSignUp } from "@/services/auth/confirmSignUp";

import amplifyConfigure from "@/utils/configure-amplify";

// run in every auth page
amplifyConfigure();

import { SignUpVerificationSchema } from "@/utils/validators/signup-confirmation.validator";

import { ZodError } from "zod";
import { useRouter } from "next/navigation";

import { resendVerificationCode } from "@/services/auth/resendVerificationCode";

export default function VerifyEmailForm(): JSX.Element {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleResendVerificationCode = async (email: string) => {
    try {
      await resendVerificationCode(email);

      toast({
        title: "Verification code sent",
        description: "We have sent a new verification code to your email",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error resending verification code");
      }
    }
  };

  const handleInputSubmission = async () => {
    const data = {
      email,
      verificationCode,
    };

    try {
      const verificationData = SignUpVerificationSchema.parse(data);
      await confirmSignUp(verificationData);
      router.push("/login");
    } catch (err) {
      if (err instanceof ZodError) {
        console.log("The sign up verification data is not valid.");
        console.log(err);
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      flexDirection={"column"}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>

        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent code to your email
        </Center>

        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {email}
        </Center>

        <FormControl>
          <Center>
            <HStack>
              <PinInput onChange={(e) => setVerificationCode(e)} otp>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>

        <Stack spacing={6}>
          <Button
            onClick={handleInputSubmission}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Verify
          </Button>
        </Stack>
      </Stack>

      <Stack>
        <Text fontSize={"lg"} color={"gray.600"} textAlign="center">
          Problems with the verification code?{" "}
          <Button
            color={"blue.400"}
            variant="link"
            onClick={() => handleResendVerificationCode(email)}
          >
            Resend code
          </Button>
        </Text>
      </Stack>
    </Flex>
  );
}
