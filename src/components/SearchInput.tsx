import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useRef, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({onSearch}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState('');

  // Auto-search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchText);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchText, onSearch]);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (ref.current) onSearch(ref.current.value);
    }}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input 
          ref={ref}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
}

export default SearchInput