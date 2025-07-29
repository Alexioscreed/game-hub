import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  handleGoHome = () => {
    // Use window.location for reliable navigation
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
          padding={8}
        >
          <VStack spacing={4} textAlign="center">
            <Text fontSize="xl" fontWeight="bold">
              Oops! Something went wrong
            </Text>
            <Text color="gray.600">
              {this.state.error?.message || "An unexpected error occurred"}
            </Text>
            <Button
              colorScheme="blue"
              onClick={this.handleGoHome}
            >
              Go Back to Home
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
