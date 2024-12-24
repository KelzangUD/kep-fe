import React from "react";
import { Container } from "@mui/material";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import Feature from "../layout/Feature";
import FeedbackPortal from "../layout/FeedBackPortal";
import Footer from "../layout/Footer";
import { useCommon } from "../contexts/CommonContext";

const Home = () => {
  const { isMdUp } = useCommon();
  return (
    <>
      <>
        {isMdUp ? (
          <Container>
            <Header />
            <Hero />
            <Feature />
            <FeedbackPortal />
            <Footer />
          </Container>
        ) : (
          <>
            <Header />
            <Hero />
            <Feature />
            <FeedbackPortal />
            <Footer />
          </>
        )}
      </>
    </>
  );
};

export default Home;
