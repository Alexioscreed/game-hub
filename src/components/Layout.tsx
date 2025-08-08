import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import NavBar from "./NavBar";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback((searchText: string) => {
    // Always navigate to home page with search query, even if already on home page
    // This ensures the URL params are updated and HomePage can react to the change
    if (searchText.trim()) {
      navigate(`/?search=${encodeURIComponent(searchText)}`, { replace: false });
    } else {
      // If search is empty, navigate to home without search params
      navigate("/", { replace: false });
    }
  }, [navigate]);

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
