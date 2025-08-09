import { SimpleGrid, Text, Box, Badge, Button, VStack, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useInfiniteGames from "../hooks/useInfiniteGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../types";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading, isLoadingMore, count, hasNextPage, loadMore } = useInfiniteGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error}</Text>;

  return (
    <VStack spacing={6} padding="10px">
      {/* Game Count Indicator */}
      {!isLoading && count > 0 && (
        <Box textAlign="center">
          <Badge colorScheme="blue" fontSize="md" padding={2}>
            Showing {data.length} of {count.toLocaleString()} games
          </Badge>
        </Box>
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
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
      {hasNextPage && !isLoading && (
        <Button
          onClick={loadMore}
          isLoading={isLoadingMore}
          loadingText="Loading more games..."
          colorScheme="blue"
          variant="outline"
          size="lg"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Load More Games
        </Button>
      )}

      {/* Loading indicator for load more */}
      {isLoadingMore && (
        <VStack spacing={2}>
          <Spinner size="lg" color="blue.500" />
          <Text fontSize="sm" color="gray.500">Loading more games...</Text>
        </VStack>
      )}
    </VStack>
  );
};

export default GameGrid;
