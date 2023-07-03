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
  useToast
} from "@chakra-ui/react";

import { FormEventHandler, useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

import { ErrorManager, ErrorResponse } from "@/utils/exceptions/errorManager";

type FormData = {
  email: string;
  password: string;
};

import { SignUpSchema } from "@/utils/validators/signup.validator";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUp } from "@/services/auth/signUp";
import type { SignUpProps } from "@/services/auth/signUp";

import { Amplify } from "aws-amplify";
import awsExports from "@/utils/aws-exports";

console.log('awsExports:', awsExports);

// // Configure Amplify in index file or root file
// try {
//   Amplify.configure(awsExports);
//   console.log("Amplify Configured!");
// } catch (error) {
//   console.log("Error setting up Amplify");
// }

export default function Signup() {

  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse>({});

  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(async (data) => {
    setIsLoading(true);
    
    const signUpData: SignUpProps = {
      email: data.email,
      password: data.password,
    };

    try {
      await signUp(signUpData);

      setIsLoading(false);
      setTimeout(() => {
        toast({
          title: "Redirection Notice",
          description: "Please verify your email",
          status: 'warning',
          position: 'top',
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          router.push(`/auth/verify?email=${signUpData.email}`);
        }, 5000);
      }, 4000);
      

    } catch (err) {
      if (err instanceof Error) {
        setIsLoading(false);
        const errorResponse: ErrorResponse = ErrorManager.handle(err);
        setError(errorResponse);

        toast({
          title: errorResponse.title,
          description: errorResponse.message,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  });

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
            <Heading fontSize={"4xl"}>Sign up</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={onSubmit}>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...register("email")}
                    type="email"
                    autoComplete="off"
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...register("password")}
                    type="password"
                    autoComplete="off"
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  {/* <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack> */}
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isLoading={isLoading}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>

              <Divider />

              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                isDisabled={isLoading}
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
            Already signed up? <Link color={"blue.400"}>Log in</Link>
          </Text>
        </Stack>
      </Flex>
    </>
  );
}
