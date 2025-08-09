import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import NavBar from "./NavBar";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback((searchText: string) => {
    // Only navigate if we're on the home page or search changes
    // This prevents interfering with game detail page navigation
    const isOnHomePage = location.pathname === '/';
    const currentSearchParams = new URLSearchParams(location.search);
    const currentSearch = currentSearchParams.get('search') || '';
    
    // Only navigate if search text has actually changed and we're on home page
    // or if we need to go back to home page for a new search
    if (searchText.trim() !== currentSearch) {
      if (searchText.trim()) {
        navigate(`/?search=${encodeURIComponent(searchText)}`, { replace: !isOnHomePage });
      } else if (isOnHomePage) {
        // If search is empty and we're on home, just remove search params
        navigate("/", { replace: true });
      }
    }
  }, [navigate, location]);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main"`,
      }}
      templateColumns="1fr"
      templateRows="auto 1fr"
      minHeight="100vh"
    >
      <GridItem area="nav">
        <NavBar onSearch={handleSearch} />
      </GridItem>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
