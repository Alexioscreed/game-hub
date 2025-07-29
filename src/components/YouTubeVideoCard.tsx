import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaPlay, FaYoutube } from 'react-icons/fa';
import useYouTubeVideo from '../hooks/useYouTubeVideo';
import { getYouTubeEmbedUrl } from '../services/youtube-service';

interface Props {
  gameName: string;
  compact?: boolean;
}

const YouTubeVideoCard: React.FC<Props> = ({ gameName, compact = false }) => {
  const { video, isLoading, error } = useYouTubeVideo(gameName);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  if (isLoading) {
    return (
      <Box width="100%" maxWidth={compact ? "200px" : "300px"}>
        <Skeleton height={compact ? "112px" : "169px"} borderRadius="md" />
        <Skeleton height="20px" mt={2} />
      </Box>
    );
  }

  if (error || !video) {
    return null; // Don't show anything if no video found
  }

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  return (
    <>
      <Box
        position="relative"
        width="100%"
        maxWidth={compact ? "200px" : "300px"}
        cursor="pointer"
        onClick={onOpen}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Box position="relative">
          <Image
            src={video.thumbnail}
            alt={video.title}
            borderRadius="md"
            width="100%"
            height={compact ? "112px" : "169px"}
            objectFit="cover"
          />
          
          {/* Play button overlay */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="blackAlpha.700"
            borderRadius="full"
            p={2}
          >
            <FaPlay color="white" size={compact ? 16 : 20} />
          </Box>

          {/* YouTube logo */}
          <Box
            position="absolute"
            bottom={2}
            right={2}
            bg="red.600"
            borderRadius="sm"
            px={1}
            py={0.5}
          >
            <FaYoutube color="white" size={12} />
          </Box>
        </Box>

        <VStack align="start" spacing={1} mt={2}>
          <Text
            fontSize={compact ? "xs" : "sm"}
            fontWeight="medium"
            noOfLines={2}
            lineHeight="tight"
          >
            {video.title}
          </Text>
          <Text fontSize="xs" color={textColor}>
            {video.channelTitle}
          </Text>
        </VStack>
      </Box>

      {/* Video Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{video.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box position="relative" paddingBottom="56.25%" height={0}>
              {isVideoLoading && (
                <Skeleton
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                />
              )}
              <iframe
                src={getYouTubeEmbedUrl(video.id)}
                title={video.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleVideoLoad}
              />
            </Box>
            <HStack mt={4} spacing={2}>
              <Text fontSize="sm" color={textColor}>
                Channel: {video.channelTitle}
              </Text>
              <Text fontSize="sm" color={textColor}>
                •
              </Text>
              <Text fontSize="sm" color={textColor}>
                {new Date(video.publishedAt).toLocaleDateString()}
              </Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default YouTubeVideoCard;
