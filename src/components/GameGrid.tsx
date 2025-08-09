import { SimpleGrid, Text, Box, Badge, Button, VStack, Spinner, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../types";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { 
    data, 
    error, 
    isLoading, 
    isLoadingMore, 
    count, 
    hasNextPage, 
    loadMoreData 
  } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;

  return (
    <VStack spacing={6} padding="10px">
      {/* Game Count Indicator */}
      {!isLoading && count > 0 && (
        <Box textAlign="center">
          <Badge colorScheme="blue" fontSize="md" padding={2}>
            Showing {data.length.toLocaleString()} of {count.toLocaleString()} games
          </Badge>
        </Box>
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        width="100%"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>

      {/* Load More Button */}
      {!isLoading && hasNextPage && (
        <Button
          onClick={loadMoreData}
          isLoading={isLoadingMore}
          loadingText="Loading more games..."
          colorScheme="blue"
          variant="outline"
          size="lg"
          width="300px"
        >
          Load More Games
        </Button>
      )}

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <HStack spacing={3}>
          <Spinner size="sm" />
          <Text>Loading more games...</Text>
        </HStack>
      )}

      {/* End of Results Message */}
      {!isLoading && !hasNextPage && data.length > 0 && (
        <Text color="gray.500" textAlign="center">
          You've reached the end! All {count.toLocaleString()} games have been loaded.
        </Text>
      )}
    </VStack>
  );
};

export default GameGrid;
