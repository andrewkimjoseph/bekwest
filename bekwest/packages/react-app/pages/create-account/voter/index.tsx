import { Box, Button, Select, Text, Spacer, Divider } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import router from "next/router";
export default function Home() {
  const [entitySelection, setEntitySelection] = useState("Donor");

  return (
    <Box className="flex flex-col h-screen align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Voter Account Creation</Text>
        <Spacer></Spacer>
        <ArrowBackIcon color={"#EB3C7F"} onClick={() => router.back()} boxSize={6}/>
      </Box>

      <Box px={4}>
        <Divider borderColor="black" />
      </Box>
      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Pick any adjective you like
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          //   value={entitySelection}
          //   onChange={(event) => {
          //     setEntitySelection(event.target.value);
          //   }}
        >
          <option value="Smart">Smart</option>
          <option value="Humble">Humble</option>
          <option value="Powerful">Powerful</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Your Gender
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          //   value={entitySelection}
          //   onChange={(event) => {
          //     setEntitySelection(event.target.value);
          //   }}
        >
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Climate">Climate</option>
        </Select>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Country of Residence
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          //   value={entitySelection}
          //   onChange={(event) => {
          //     setEntitySelection(event.target.value);
          //   }}
        >
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Climate">Climate</option>
        </Select>
      </Box>


      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Age Bracket
        </Text>

        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          //   value={entitySelection}
          //   onChange={(event) => {
          //     setEntitySelection(event.target.value);
          //   }}
        >
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
          <option value="Climate">Climate</option>
        </Select>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          mb={24}
          onClick={() => router.push("/voter/1")}
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create your voter account
        </Button>
      </Box>
    </Box>
  );
}
