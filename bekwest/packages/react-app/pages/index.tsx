import { Box, Image, Button, Select } from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
export default function Home() {
  const [entitySelection, setEntitySelection] = useState("Donor");

  return (
    <Box className="flex flex-col  items-center h-screen" bgColor={"#E6E8FA"}>
      <Box boxSize="sm">
        <Image
          src="/feature.png"
          alt="Feature"
          objectFit="cover"
          className="w-full"
        />
      </Box>
      <Box w={"full"} px={4}>
        <Select
          bgColor={"white"}
          focusBorderColor="#EB3C7F"
          value={entitySelection}
          onChange={(event) => {
            setEntitySelection(event.target.value);
          }}
        >
          <option value="Donor">Donor</option>
          <option value="Applicant">Applicant</option>
          <option value="Voter">Voter</option>
        </Select>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          mb={24}
          loadingText="Creating your participant account"
          onClick={()=>{

            router.push(`/create-account/${entitySelection.toLocaleLowerCase()}`);



          }}
          borderRadius={"10"}
          bgColor={"#1E1E49"}
          textColor={"white"}
          _hover={{
            bgColor: "#EB3C7F",
            textColor: "white",
          }}
        >
          Continue as {entitySelection.toLowerCase()}
        </Button>
      </Box>
    </Box>
  );
}
