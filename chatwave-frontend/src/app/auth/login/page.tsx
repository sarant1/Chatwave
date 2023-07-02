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
import NextLink from 'next/link';

import { Cache } from 'aws-amplify';

type FormData = {
  email: string;
  password: string;
};

import { Auth } from 'aws-amplify';
import { zodResolver } from "@hookform/resolvers/zod";

import { logIn } from "@/services/auth/logIn";
import { LoginProps } from "@/utils/validators/login.validator";
import { LoginSchema } from "@/utils/validators/login.validator";
import { useEffect } from "react";


import { ErrorManager, ErrorResponse } from "@/utils/exceptions/errorManager";



export default function Signin() {

  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [error, setError] = useState<ErrorResponse>({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const signUpData: LoginProps = {
        email: data.email,
        password: data.password,
      };

      await logIn(signUpData);

      toast({
        title: "Logged in",
        description: "You've been successfully logged in",
        status: 'success',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });

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

        if (errorResponse.title === 'User is not confirmed') {
          setTimeout(() => {
            toast({
              title: "Redirection Notice",
              description: "You're about to be redirected to the code verification page",
              status: 'warning',
              position: 'top',
              duration: 4000,
              isClosable: true,
            });

            setTimeout(() => {
              router.push(`/auth/verify?email=${data.email}`);
            }, 4000);
          }, 6000);
        }
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
            <Heading fontSize={"4xl"}>Log in</Heading>
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
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link 
                      as={NextLink} 
                      color={"blue.400"}
                      href={'/auth/forgot_password'}
                    >
                      Forgot password?
                    </Link>
                  </Stack>

                  <Button
                    type="submit"
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
            Not registered yet? <Link color={"blue.400"} href='/auth/signup'>Sign Up</Link>
          </Text>
        </Stack>
      </Flex>
    </>
  );
}