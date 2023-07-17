import React from "react";
import Navbar from "../components/navbar";
import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";

const Content = styled("div")({
  margin: "0 auto",
  color: "#FFFFFF",
  textAlign: "center",
});

const PageWrapper = styled("div")({
  margin: "0",
  padding: "0",
  backgroundColor: "#000000",
  height: "200vh",
  display: "flex",
  flexDirection: "column",
});

const MainContent = styled("div")({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export default function Home() {
  return (
    <PageWrapper>
      <CssBaseline />
      <Navbar />
      <MainContent>
        <Content>Hello, this is the Home profile page</Content>
      </MainContent>
    </PageWrapper>
  );
}
