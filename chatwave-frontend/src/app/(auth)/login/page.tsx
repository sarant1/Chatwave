"use client";

import {
  Flex,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { logIn } from "@/services/auth/logIn";
import { LoginProps, LoginSchema } from "@/utils/validators/login.validator";
import { useAuth } from "@/hooks/useAuth";
import { ErrorManager, ErrorResponse } from "@/utils/exceptions/errorManager";

import amplifyConfigure from "@/utils/configure-amplify";

// run in every auth page
amplifyConfigure();

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const toast = useToast();

  useAuth();

  const guestCredentails: LoginProps = {
    email: "guest@chatwave.com",
    password: "123Testing!",
  };

  const [errors, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //TODO FIX ERROR HANDLING

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const signUpData: LoginProps = {
        email: email,
        password: password,
      };
      LoginSchema.parse(signUpData);

      await logIn(signUpData);

      toast({
        title: "Logged in",
        description: "You've been successfully logged in",
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        setIsLoading(false);
        const errorResponse: ErrorResponse = ErrorManager.handle(err.name);
        setError(errorResponse);

        toast({
          title: errorResponse.title,
          description: errorResponse.message,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        console.log(errorResponse);

        if (errorResponse.title === "User is not confirmed") {
          setTimeout(() => {
            toast({
              title: "Redirection Notice",
              description:
                "You're about to be redirected to the code verification page",
              status: "warning",
              position: "top",
              duration: 4000,
              isClosable: true,
            });

            setTimeout(() => {
              router.push(`/auth/verify?email=${email}`);
            }, 4000);
          }, 6000);
        }
      }
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Log in</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!!errors}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isInvalid={!!errors}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link
                    as={NextLink}
                    color={"blue.400"}
                    href={"/forgot_password"}
                  >
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  onClick={() => handleSubmit()}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </Stack>

              <Divider />

              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                isDisabled={isLoading}
                onClick={() => {
                  setEmail(guestCredentails.email);
                  setPassword(guestCredentails.password);
                  handleSubmit();
                }}
              >
                Continue as Guest User
              </Button>

              <Button
                type="button"
                bg={"white.400"}
                color={"black"}
                variant="outline"
                _hover={{
                  bg: "gray.200",
                }}
                isDisabled={isLoading}
              >
                Continue with Google
              </Button>
            </Stack>
          </Box>

          <Text fontSize={"lg"} color={"gray.600"} textAlign="center">
            Not registered yet?{" "}
            <Link color={"blue.400"} href="/signup">
              Sign Up
            </Link>
          </Text>
        </Stack>
      </Flex>
    </>
  );
}
