'use client'

import React from 'react';
import { Container } from 'rsuite';

//import { useUser } from '@clerk/nextjs';

const CustomLoader = () => {
  //const { isLoaded } = useUser();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true);

  return !isLoaded ? (
    <Container
      className="fixed top-0 left-0 w-full h-full z-50 backdrop-blur-2xl flex justify-center items-center bg-black/7" >
      <div className="Loader" /> 
    </Container>
  ) : null;
};

export default CustomLoader;