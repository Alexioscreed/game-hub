import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import NavBar from "./NavBar";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback((searchText: string) => {
    // Navigate to home page with search query
    if (location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(searchText)}`, { replace: false });
    }
    // If already on home page, the search will be handled by HomePage component
  }, [navigate, location.pathname]);

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
