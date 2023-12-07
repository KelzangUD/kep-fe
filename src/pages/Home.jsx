import React from 'react';
import {Container} from '@mui/material';
import Header from '../layout/Header';
import Hero from '../layout/Hero';
import Feature from '../layout/Feature';
import Contact from '../layout/Contact';
import Footer from '../layout/Footer';

const Home = () => {
  return (
    <Container>
      <Header />
      <Hero />
      <Feature />
      <Contact />
      <Footer />
    </Container>
  )
}

export default Home;

