import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import { Genre } from "../types";
import getCroppedImageUrl from "../lib/image-utils";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize={{ base: 'xl', lg: '2xl' }} marginBottom={3}>Genres</Heading>
      <List spacing={{ base: 1, lg: 0 }}>
        {data.map((genre) => (
          <ListItem key={genre.id} padding={{ base: "8px 4px", lg: "5px" }}>
            <HStack spacing={{ base: 2, lg: 3 }}>
              <Image
                boxSize={{ base: "24px", lg: "32px" }}
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' fill='%23ddd'/%3E%3C/svg%3E"
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(genre)}
                fontSize={{ base: "md", lg: "lg" }}
                variant="link"
                width="100%"
                justifyContent="flex-start"
                height="auto"
                minHeight={{ base: "32px", lg: "auto" }}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
