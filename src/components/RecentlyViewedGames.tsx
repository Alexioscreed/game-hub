import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import GameCard from "./GameCard";
import useRecentlyViewed from "../hooks/useRecentlyViewed";

const RecentlyViewedGames = () => {
  const { recentGames, clearRecentlyViewed } = useRecentlyViewed();
  const bgColor = useColorModeValue("gray.50", "gray.800");

  if (recentGames.length === 0) return null;

  return (
    <Box
      background={bgColor}
      padding={6}
      borderRadius="lg"
      marginBottom={6}
    >
      <Heading size="md" marginBottom={4} display="flex" justifyContent="space-between" alignItems="center">
        Recently Viewed Games
        <Button size="sm" variant="ghost" onClick={clearRecentlyViewed}>
          Clear All
        </Button>
      </Heading>
      
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacing={3}
      >
        {recentGames.slice(0, 5).map((game) => (
          <Box key={game.id} transform="scale(0.8)">
            <GameCard game={game} />
          </Box>
        ))}
      </SimpleGrid>
      
      {recentGames.length > 5 && (
        <Text fontSize="sm" textAlign="center" marginTop={2} opacity={0.7}>
          +{recentGames.length - 5} more games viewed
        </Text>
      )}
    </Box>
  );
};

export default RecentlyViewedGames;
