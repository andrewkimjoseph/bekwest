"use client";

import {
  Box,
  Text,
  Spacer,
  Divider,
  Card,
  CardBody,
  Circle,
} from "@chakra-ui/react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { Result } from "@/entities/result";
import { useAccount } from "wagmi";
import { getLatestResultsOfDonation } from "@/services/result/getLatestResultsOfDonation";
export default function ParticularApplicationMade() {
  const [latestResultsOfDonation, setLatestResultsOfDonation] = useState<
    Result[]
  >([]);
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { applicantId, donationId } = router.query;

  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80],
        fill: true,
        backgroundColor: "#EB3C7F",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  useEffect(() => {
    const getLatestResultsOfDonationAndSet = async () => {
      if (address) {
        const latestResultsOfDonation = await getLatestResultsOfDonation(
          address,
          { _donationId: Number(donationId) }
        );

        setLatestResultsOfDonation(latestResultsOfDonation);
      }
    };

    getLatestResultsOfDonationAndSet();
  }, [address]);

  return (
    <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={26}>Donation {donationId}: Applications</Text>

        <Spacer></Spacer>
        <ArrowBackIcon
          color={"#EB3C7F"}
          onClick={() => router.back()}
          boxSize={6}
        />
      </Box>
      <Box w={"full"} px={4} className="flex flex-col" my={4}>
        <Text fontSize={20}>Applications so far: {latestResultsOfDonation.length}</Text>

      </Box>

      <Box px={4} mb={2}>
        <Divider borderColor="black" />
      </Box>

      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20} fontWeight={"bold"}>
          Live voting
        </Text>

        <Circle size="10px" bg="#EB3C7F" color="white" ml={2} onClick={()=>{
          console.log(latestResultsOfDonation);
        }}></Circle>
      </Box>

      <Box px={4} mb={2} className="align-center justify-center flex flex-row">
        <Bar data={data} />
      </Box>


      <Box px={4} mb={2}>
        <Divider borderColor="black" />
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Your pitch statement</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>
              I need to improve my livelihood
            </Text>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}
