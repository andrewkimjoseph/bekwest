"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Fade,
  ScaleFade,
  Slide,
  Collapse,
  Circle,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import LogoLink from "./logoLink";
import { BekwestLogo } from "./logo";
import NavLink from "./navLink";

export default function BekwestNavbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [userAddress, setUserAddress] = useState("");
  // const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  const [participantExists, setParticipantExists] = useState(false);
  const [researcherExists, setResearcherExists] = useState(false);

  const { connect } = useConnect();

  const [isMiniPay, setIsMiniPay] = useState(false);

  const Links = [
    {
      title: "Onboarding",
      href: "/",
    },
    {
      title: "Donor View",
      href: "/donor/1",    },
    {
      title: "Applicant View",
      href: "/applicant/1",    },
    {
      title: "Voter View",
      href: "/voter/1",    },
  ];

  useEffect(() => {
    if (
      window.ethereum &&
      (window.ethereum.isMiniPay || window.ethereum.isMinipay)
    ) {
      setIsMiniPay(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <>
      <Box bg="#1E1E49" px={4} position="sticky" top="0" zIndex="1000">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            border={"1px solid black"}
            bgColor={"white"}
            color={"#1E1E49"}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon color={"black"} />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={onToggle}
          />
          <HStack spacing={4} alignItems={"center"}>
            {/* <Box>Stekcit BwC</Box> */}

            <LogoLink href="/">
              <BekwestLogo />
            </LogoLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>
                  {link.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {!isMiniPay ? (
              <ConnectButton
                chainStatus="none"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                label="Connect"
              />
            ) : (
              <Circle
                size="10px"
                bg={`${isConnected ? "#EB3C7F" : "#E6E8FA"}`}
                color="white"
              >
                {/* <PhoneIcon /> */}
              </Circle>
            )}
          </Flex>
        </Flex>
      </Box>

      {isOpen ? (
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box
            mt={16}
            pb={2}
            display={{ md: "none" }}
            className="flex flex-col w-full h-screen"
            bg="#1E1E49"
            px={2}
            py={4}
            // borderTopRadius={20}
          >
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        </Slide>
      ) : // <Collapse in={isOpen} animateOpacity>

      // </Collapse>
      // <Fade in={isOpen}>

      null}
      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
