import React from 'react';
import {Container} from '@mui/material';
import Header from '../layout/Header';
import Hero from '../layout/Hero';
import Feature from '../layout/Feature';
import FeedbackPortal from '../layout/FeedBackPortal';
import Footer from '../layout/Footer';

const Home = () => {
  return (
    <Container>
      <Header />
      <Hero />
      <Feature />
      <FeedbackPortal />
      <Footer />
    </Container>
  )
}

export default Home;

