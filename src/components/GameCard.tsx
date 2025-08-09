import React from "react";
import { Game } from "../types";
import { 
  Card, 
  CardBody, 
  HStack, 
  Heading, 
  Image, 
  IconButton,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PlatformIconList from "./PlatformIconList";
import CrtiticScore from "./CrtiticScore";
import getCroppedImageUrl from "../lib/image-utils";
import Emoji from "./Emoji";
import useFavorites from "../hooks/useFavorites";
import useRecentlyViewed from "../hooks/useRecentlyViewed";

interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const heartColor = useColorModeValue("red.500", "red.300");
  const heartHoverColor = useColorModeValue("red.600", "red.400");

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on favorite button
    if ((e.target as HTMLElement).closest('[data-favorite-button]')) {
      return;
    }
    
    // Add to recently viewed and navigate to game detail page
    addToRecentlyViewed(game);
    navigate(`/games/${game.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(game);
  };

  return (
    <Card 
      cursor="pointer" 
      onClick={handleClick}
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ 
        transform: "translateY(-4px)", 
        boxShadow: "lg" 
      }}
      position="relative"
    >
      {/* Favorite Button */}
      <IconButton
        aria-label={isFavorite(game.id) ? "Remove from favorites" : "Add to favorites"}
        icon={isFavorite(game.id) ? <FaHeart /> : <FaRegHeart />}
        size="sm"
        position="absolute"
        top={2}
        right={2}
        zIndex={2}
        background="rgba(0, 0, 0, 0.7)"
        color={isFavorite(game.id) ? heartColor : "white"}
        _hover={{
          background: "rgba(0, 0, 0, 0.8)",
          color: isFavorite(game.id) ? heartHoverColor : "gray.300",
        }}
        onClick={handleFavoriteClick}
        data-favorite-button
      />
      
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform) || []}
          />
          <CrtiticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">{game.name}<Emoji rating={game.rating_top}/></Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
