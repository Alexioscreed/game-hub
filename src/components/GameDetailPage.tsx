import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  Badge,
  VStack,
  Spinner,
  Button,
  useColorModeValue,
  SimpleGrid,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useGame from "../hooks/useGame";
import useFavorites from "../hooks/useFavorites";
import useRecentlyViewed from "../hooks/useRecentlyViewed";
import getCroppedImageUrl from "../services/image-url";
import PlatformIconList from "./PlatformIconList";
import CrtiticScore from "./CrtiticScore";
import Emoji from "./Emoji";

const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { game, isLoading, error } = useGame(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const heartColor = useColorModeValue("red.500", "red.300");

  // Add to recently viewed when game loads
  useEffect(() => {
    if (game) {
      addToRecentlyViewed({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        parent_platforms: game.parent_platforms,
        metacritic: game.metacritic,
        rating_top: game.rating_top,
      });
    }
  }, [game, addToRecentlyViewed]);

  if (isLoading) 
    return (
      <Box textAlign="center" padding={8}>
        <Spinner size="xl" />
        <Text marginTop={4}>Loading game details...</Text>
      </Box>
    );

  if (error) 
    return (
      <Box textAlign="center" padding={8}>
        <Text color="red.500">Error: {error}</Text>
        <Button marginTop={4} onClick={() => navigate("/")}>
          Back to Games
        </Button>
      </Box>
    );

  if (!game) 
    return (
      <Box textAlign="center" padding={8}>
        <Text>Game not found</Text>
        <Button marginTop={4} onClick={() => navigate("/")}>
          Back to Games
        </Button>
      </Box>
    );

  return (
    <Box padding={{ base: 4, lg: 8 }} maxWidth="1200px" margin="0 auto">
      <HStack justifyContent="space-between" marginBottom={6}>
        <Button onClick={() => navigate("/")}>
          ← Back to Games
        </Button>
        
        <IconButton
          aria-label={isFavorite(game.id) ? "Remove from favorites" : "Add to favorites"}
          icon={isFavorite(game.id) ? <FaHeart /> : <FaRegHeart />}
          colorScheme={isFavorite(game.id) ? "red" : "gray"}
          onClick={() => toggleFavorite({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            parent_platforms: game.parent_platforms,
            metacritic: game.metacritic,
            rating_top: game.rating_top,
          })}
        />
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Image Section */}
        <Box>
          <Image
            src={getCroppedImageUrl(game.background_image)}
            alt={game.name}
            borderRadius="lg"
            width="100%"
            height="400px"
            objectFit="cover"
          />
        </Box>

        {/* Details Section */}
        <VStack align="start" spacing={4}>
          <Heading size="xl">
            {game.name}
            <Emoji rating={game.rating_top} />
          </Heading>

          <HStack spacing={4}>
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform) || []}
            />
            <CrtiticScore score={game.metacritic} />
          </HStack>

          {/* Release Date */}
          {game.released && (
            <Box>
              <Text fontWeight="bold" color={textColor}>
                Release Date:
              </Text>
              <Text>{new Date(game.released).toLocaleDateString()}</Text>
            </Box>
          )}

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <Box>
              <Text fontWeight="bold" color={textColor} marginBottom={2}>
                Genres:
              </Text>
              <HStack flexWrap="wrap">
                {game.genres.map((genre) => (
                  <Badge key={genre.id} colorScheme="blue" variant="subtle">
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
            </Box>
          )}

          {/* Publishers */}
          {game.publishers && game.publishers.length > 0 && (
            <Box>
              <Text fontWeight="bold" color={textColor} marginBottom={2}>
                Publishers:
              </Text>
              <Text>{game.publishers.map((p) => p.name).join(", ")}</Text>
            </Box>
          )}

          {/* Website Link */}
          {game.website && (
            <Box>
              <Link href={game.website} isExternal color="blue.400">
                Visit Official Website
              </Link>
            </Box>
          )}
        </VStack>
      </SimpleGrid>

      {/* Description */}
      {game.description_raw && (
        <Box marginTop={8}>
          <Heading size="md" marginBottom={4}>
            About This Game
          </Heading>
          <Box
            background={cardBg}
            padding={6}
            borderRadius="lg"
            boxShadow="base"
          >
            <Text lineHeight="tall" whiteSpace="pre-wrap">
              {game.description_raw}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GameDetailPage;
