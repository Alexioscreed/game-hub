import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { Progress, Box } from "@chakra-ui/react";

const NavigationProgress = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === "loading") {
      setProgress(30);
      const timer = setTimeout(() => setProgress(70), 100);
      return () => clearTimeout(timer);
    } else if (navigation.state === "idle") {
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 200);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  if (progress === 0) return null;

  return (
    <Box position="fixed" top="0" left="0" right="0" zIndex="9999">
      <Progress
        value={progress}
        size="xs"
        colorScheme="blue"
        bg="transparent"
        isIndeterminate={navigation.state === "submitting"}
      />
    </Box>
  );
};

export default NavigationProgress;
