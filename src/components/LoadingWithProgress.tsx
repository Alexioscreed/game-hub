import {
  Box,
  Progress,
  Text,
  VStack,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  isLoading: boolean;
  message?: string;
}

const LoadingWithProgress = ({ isLoading, message = "Loading games..." }: Props) => {
  const [progress, setProgress] = useState(0);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Don't go to 100% until actually loaded
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && progress > 0) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading, progress]);

  if (!isLoading && progress === 0) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      background={bgColor}
      boxShadow="sm"
      padding={4}
    >
      <VStack spacing={3}>
        <HStack spacing={3}>
          <Spinner size="sm" />
          <Text fontSize="sm" color={textColor}>
            {message}
          </Text>
        </HStack>
        <Progress
          value={progress}
          width="100%"
          size="sm"
          colorScheme="blue"
          borderRadius="md"
        />
        <Text fontSize="xs" color={textColor}>
          {Math.round(progress)}%
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingWithProgress;
