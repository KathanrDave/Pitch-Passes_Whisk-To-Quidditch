import React, { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "97vh",
  backgroundColor: "#FFFFFF",
  margin: 0,
  padding: 0,
});

const BoxContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "35%",
  height: "75%",
  backgroundColor: "#ECECEC",
  borderRadius: 15,
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  "@media (max-width: 768px)": {
    width: "90%",
  },
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme, selected }) => ({
  margin: theme.spacing(2),
  color: selected ? "#FFFFFF" : "#982649",
  backgroundColor: selected ? "#982649" : "transparent",
  "&:hover": {
    backgroundColor: selected ? "#662537" : "#982649",
    color: "#FFFFFF",
  },
  width: "100%",
}));

const NavigationButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: theme.spacing(2),
}));

const NavigationButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: "#982649",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "#982649",
    color: "#FFFFFF",
  },
}));

const LandingPage = () => {
  const [containerIndex, setContainerIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  const handleBackClick = () => {
    if (containerIndex > 0) {
      setContainerIndex(containerIndex - 1);
    }
  };
  const handleNextClick = () => {
    if (containerIndex < containerContents.length - 1) {
      if (containerIndex === 0) {
        if (!selectedRole) {
          alert("Please select a role (Admin or User).");
          return;
        }
      }
      setContainerIndex(containerIndex + 1);
    }
  };

  const ContainerContent1 = () => {
    return (
      <>
        <TextFieldStyled
          label="First Name"
          variant="outlined"
          sx={{ mx: 2, mb: 5 }}
        />
        <TextFieldStyled
          label="Last Name"
          variant="outlined"
          sx={{ mx: 2, mb: 5 }}
        />
        <ButtonContainer>
          <ButtonStyled
            variant="contained"
            selected={selectedRole === "Admin"}
            onClick={() => handleRoleSelect("Admin")}
          >
            Admin
          </ButtonStyled>
          <ButtonStyled
            variant="contained"
            selected={selectedRole === "User"}
            onClick={() => handleRoleSelect("User")}
          >
            User
          </ButtonStyled>
        </ButtonContainer>
      </>
    );
  };

  const containerContents = [
    {
      title: "Container no. 1",
      content: <ContainerContent1 />,
    },
    {
      title: "Container no. 2",
      content: (
        <>
          <Typography>Content for Container no. 2</Typography>
        </>
      ),
    },
    {
      title: "Container no. 3",
      content: (
        <>
          <Typography>Content for Container no. 3</Typography>
        </>
      ),
    },
    {
      title: "Container no. 4",
      content: (
        <>
          <Typography>Content for Container no. 4</Typography>
        </>
      ),
    },
    {
      title: "Container no. 5",
      content: (
        <>
          <Typography>Content for Container no. 5</Typography>
        </>
      ),
    },
  ];
  const { title, content } = containerContents[containerIndex];
  return (
    <Container>
      <BoxContainer>
        <Typography variant="h6">{title}</Typography>
        <div>{content}</div>
        <ButtonContainer>
          <NavigationButtonContainer>
            {containerIndex > 0 && (
              <NavigationButtonStyled
                variant="contained"
                onClick={handleBackClick}
              >
                Back
              </NavigationButtonStyled>
            )}
            {containerIndex < containerContents.length - 1 && (
              <>
                {containerIndex === 0 && (
                  <NavigationButtonStyled variant="contained">
                    <Typography>Skip</Typography>
                    <Typography>Choose randomly</Typography>
                  </NavigationButtonStyled>
                )}
                <NavigationButtonStyled
                  variant="contained"
                  onClick={handleNextClick}
                >
                  Next
                </NavigationButtonStyled>
              </>
            )}
          </NavigationButtonContainer>
        </ButtonContainer>
      </BoxContainer>
    </Container>
  );
};

export default LandingPage;
