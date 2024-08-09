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
import { Donation } from "@/entities/donation";
import { getDonationById } from "@/services/donation/getDonationById";
import { getApplicationsOfApplicant } from "@/services/application/getAllApplicationsOfApplicant";
import { Application } from "@/entities/application";
import { getApplicantByWalletAddress } from "@/services/applicant/getApplicantByWalletAddress";
import { Applicant } from "@/entities/applicant";
export default function ParticularApplicationMade() {
  const [latestResultsOfDonation, setLatestResultsOfDonation] = useState<
    Result[]
  >([]);
  const [allApplicationsOfApplicant, setAllApplicationsOfApplicant] = useState<
    Application[]
  >([]);
  const [donation, setDonation] = useState<Donation | null>(null);

  const [application, setApplication] = useState<Application | null>(null);

  const [winner, setWinner] = useState<Applicant | null>(null);

  const [barChartData, setBarChartData] = useState<ChartData | null>(null);


  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { applicantId, donationId } = router.query;

  useEffect(() => {
    const getAndSetDonation = async () => {
      if (address) {
        const donationFetched = await getDonationById(address, {
          _donationId: Number(donationId),
        });
        setDonation(donationFetched);
      }
    };

    getAndSetDonation();
  }, [address]);

  useEffect(() => {
    const getAllApplicationsOfDonationAndSet = async () => {
      if (address) {
        const applicationsOfApplicant = await getApplicationsOfApplicant(
          address,
          { _applicantWalletAddress: address }
        );

        setAllApplicationsOfApplicant(applicationsOfApplicant);
      }
    };

    getAllApplicationsOfDonationAndSet();
  }, [address]);

  useEffect(() => {
    const setApplicationOfApplicationForDonation = async () => {
      if (address) {
        for (
          let applicationId = 0;
          applicationId < allApplicationsOfApplicant.length;
          applicationId++
        ) {
          const application = allApplicationsOfApplicant[applicationId];

          if (application.donationId === Number(donationId)) {
            setApplication(application);
          }
        }
      }
    };

    setApplicationOfApplicationForDonation();
  }, [allApplicationsOfApplicant]);
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

  useEffect(() => {
    const setDataForBarChart = async () => {
      const labels: string[] = [];
      const data: number[] = [];

      const backgroundColors: string[] = [];

      const winningApplicantWalletAddress = latestResultsOfDonation.reduce(
        (max, result) => (result.voteCount > max.voteCount ? result : max),
        latestResultsOfDonation[0] || {
          voteCount: -1,
          applicantWalletAddress: null,
        }
      ).applicantWalletAddress;


      const winner = await getApplicantByWalletAddress(address, {
        _applicantWalletAddress: winningApplicantWalletAddress,
      });

      setWinner(winner)

      for (
        let resultId = 0;
        resultId < latestResultsOfDonation.length;
        resultId++
      ) {
        const result = latestResultsOfDonation[resultId];

        labels.push(String(result.applicantId));

        data.push(result.voteCount);

        if (winner?.walletAddress === result.applicantWalletAddress) {
          backgroundColors.push("rgba(235, 60, 127, 1)");
        } else {
          backgroundColors.push("rgba(235, 60, 127, 0.2)");
        }
      }

      const dataCreated = {
        labels: labels,
        datasets: [
          {
            label: "Voting results",
            data: data,
            fill: true,
            backgroundColor: backgroundColors,
          },
        ],
      };

      setBarChartData(dataCreated);
    };

    setDataForBarChart();
  }, [latestResultsOfDonation]);

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
        <Text fontSize={20}>
          Results so far: {latestResultsOfDonation.length}
        </Text>
      </Box>

      <Box px={4} mb={2}>
        <Divider borderColor="black" />
      </Box>

      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20} fontWeight={"bold"}>
          {donation?.votingIsClosed ? "Voting closed" : "Voting open"}
        </Text>

        {!donation?.votingIsClosed && (
          <Circle
            size="10px"
            bg="#EB3C7F"
            color="white"
            ml={2}
            onClick={() => {
              console.log(latestResultsOfDonation);
            }}
          ></Circle>

          
        )}
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mb={4}>
        <Card variant={"outline"} borderRadius={12} w={"full"} bgColor={"#EB3C7F"}>
          <CardBody p={2}>
            <Text fontSize={16} m={1} color={"white"}>
              {winner?.walletAddress === address ? "You won! Check your balance!": "You did not win! Try another donation!"}
            </Text>
          </CardBody>
        </Card>
      </Box>

      {latestResultsOfDonation.length === 0 ? (
        <Box w={"full"} px={4} className="flex flex-col" mt={4}>
          <Card variant={"outlined"} borderRadius={12} w={"full"}>
            <CardBody p={3}>
              <Box className="flex flex-row items-left items-center relative">
                <Text fontSize={16}>No votes made yet</Text>
              </Box>
            </CardBody>
          </Card>
        </Box>
      ) : (
        <Box
          px={4}
          mb={2}
          className="align-center justify-center flex flex-row"
        >
          <Bar data={barChartData!} />
        </Box>
      )}

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Your pitch statement</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>
              {application?.pitchStatement}
            </Text>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}
