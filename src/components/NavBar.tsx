import { HStack, Image, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({onSearch}: Props) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
      navigate('/');
    };

    return (
        <HStack padding='10px'>
            <Box 
              cursor="pointer" 
              onClick={handleLogoClick}
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.2s ease"
            >
              <Image src={logo} boxSize='60px' alt="Game Hub Logo" />
            </Box>
            <SearchInput onSearch={onSearch} />
            <ColorModeSwitch />
       </HStack>
  )
}

export default NavBar