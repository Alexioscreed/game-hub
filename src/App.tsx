import {
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQUery] = useState<GameQuery>({} as GameQuery);
  const [showGenres, setShowGenres] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Grid
      templateAreas={{
        base: `"nav" "aside" "main"`,
        lg: `"nav nav" "aside main"`, //.1024p
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQUery({ ...gameQuery, searchText })}
        />
      </GridItem>
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
              setGameQUery({ ...gameQuery, genre });
              if (isMobile) setShowGenres(false); // Auto-hide on mobile after selection
            }}
          />
        </Collapse>
      </GridItem>
      <GridItem area="main">
        <Box paddingLeft={{ base: 4, lg: 2 }} paddingRight={{ base: 4, lg: 0 }}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={5} direction={{ base: "column", md: "row" }} gap={{ base: 3, md: 0 }}>
            <Box marginRight={{ base: 0, md: 5 }}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlatform={(platform) =>
                  setGameQUery({ ...gameQuery, platform })
                }
              />
            </Box>

            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQUery({ ...gameQuery, sortOrder })
              }
            />
          </Flex>
        </Box>

        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}
export default App;
