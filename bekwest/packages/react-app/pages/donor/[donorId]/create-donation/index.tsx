import {
  Box,
  Button,
  Select,
  Text,
  Spacer,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import router from "next/router";
export default function Home() {
  const [entitySelection, setEntitySelection] = useState("Donor");
  const [sliderValue, setSliderValue] = useState(2);
  const labelStyles = {
    mt: "4",
    // fontSize: "sm",
  };

  return (
    <Box className="flex flex-col h-screen align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Donation Creation Form Creation</Text>
        <Spacer></Spacer>
        <ArrowBackIcon
          color={"#EB3C7F"}
          onClick={() => router.back()}
          boxSize={6}
        />
      </Box>

      <Box px={4}>
        <Divider borderColor="black" />
      </Box>
      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16} mb={2}>
          Industry
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
          Topic
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
          Maximum number of applicants
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
          Maximum number of voters
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
        <Text fontSize={16} mb={10}>
          Amount (cUSD)
        </Text>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          min={1}
          max={3}
          colorScheme="pink"
        >
          <SliderMark value={1} {...labelStyles}>
            1
          </SliderMark>
          <SliderMark value={2} {...labelStyles}>
            2
          </SliderMark>
          <SliderMark value={3} {...labelStyles}>
            3
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg="#EB3C7F"
            color="white"
            mt="-10"

            ml={-1}

            w="4"
          >
            {sliderValue}
          </SliderMark>
          <SliderTrack bg='pink.100'>
            <SliderFilledTrack  bg='#1E1E49'/>
            
          </SliderTrack>
          <SliderThumb bg={"#EB3C7F"}/>
        </Slider>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          mb={24}
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Create your donation
        </Button>
      </Box>
    </Box>
  );
}
