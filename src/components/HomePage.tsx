import {
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Genre, Platform, GameQuery } from "../types";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import GameHeading from "./GameHeading";
import RecentlyViewedGames from "./RecentlyViewedGames";

const HomePage = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [showGenres, setShowGenres] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const toast = useToast();

  // Handle URL search parameters
  useEffect(() => {
    const searchText = searchParams.get("search");
    if (searchText) {
      setGameQuery(prev => ({ ...prev, searchText }));
    }
  }, [searchParams]);

  // Clear all filters function
  const clearAllFilters = () => {
    setGameQuery({} as GameQuery);
    navigate("/"); // Clear URL params as well
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = gameQuery.genre || gameQuery.platform || gameQuery.sortOrder || gameQuery.searchText;

  return (
    <Grid
      templateAreas={{
        base: `"aside" "main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
      gap={4}
    >
      <GridItem area="aside" paddingX={{ base: 4, lg: 5 }} paddingY={{ base: 0, lg: 0 }}>
        {isMobile && (
          <Box paddingY={4}>
            <Button
              onClick={() => setShowGenres(!showGenres)}
              variant="outline"
              size="sm"
              width="100%"
              rightIcon={showGenres ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              {showGenres ? "Hide Genres" : "Show Genres"}
            </Button>
          </Box>
        )}
        
        <Collapse in={!isMobile || showGenres} animateOpacity>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => {
              setGameQuery({ ...gameQuery, genre });
              if (isMobile) setShowGenres(false);
            }}
          />
        </Collapse>
      </GridItem>

      <GridItem area="main">
        <Box paddingLeft={{ base: 4, lg: 2 }} paddingRight={{ base: 4, lg: 0 }}>
          {/* Recently Viewed Games */}
          <RecentlyViewedGames />
          
          <GameHeading gameQuery={gameQuery} />
          
          <Flex marginBottom={5} direction={{ base: "column", md: "row" }} gap={{ base: 3, md: 0 }} align={{ base: "stretch", md: "center" }}>
            <Flex direction={{ base: "column", sm: "row" }} gap={{ base: 2, sm: 5 }} flex={1}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
              />

              <SortSelector
                sortOrder={gameQuery.sortOrder}
                onSelectSortOrder={(sortOrder) =>
                  setGameQuery({ ...gameQuery, sortOrder })
                }
              />
            </Flex>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={clearAllFilters}
                marginTop={{ base: 2, md: 0 }}
              >
                Clear All Filters
              </Button>
            )}
          </Flex>
        </Box>

        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
