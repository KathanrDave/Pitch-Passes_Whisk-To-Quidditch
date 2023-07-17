import React from "react";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const AppNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  transition: "background-color 0.7s ease",
  borderRadius: "20px",

  "&.navScrolled": {
    backgroundColor: "rgba(255,255 , 255, 0.5)", 
  },
}));

const ToolbarContainer = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Logo = styled(Typography)(({ theme }) => ({

}));

const NavLinks = styled("div")(({ theme }) => ({
  "& > *": {
    marginRight: theme.spacing(5), 
    textDecoration: "none",
    color: "inherit",
  },
}));

const Profile = styled(Avatar)(({ theme }) => ({
 
}));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <AppNavBar
      position="fixed"
      className={`${isScrolled ? "navScrolled" : ""}`}
    >
      <ToolbarContainer>
        <Logo variant="h6">Logo</Logo>
        <NavLinks>
          <Typography variant="h6" component="a" href="#">
            Link 1
          </Typography>
          <Typography variant="h6" component="a" href="#">
            Link 2
          </Typography>
          <Typography variant="h6" component="a" href="#">
            Link 3
          </Typography>
          <Typography variant="h6" component="a" href="#">
            Link 4
          </Typography>
        </NavLinks>
        <Profile alt="User Profile" src="path_to_profile_image" />
      </ToolbarContainer>
    </AppNavBar>
  );
};

export default Navbar;
