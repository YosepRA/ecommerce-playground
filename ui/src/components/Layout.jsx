import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './Header.jsx';

function Layout({ children }) {
  return (
    <Box>
      <Header />

      <Container component="main" maxWidth="lg" sx={{ pt: 4, pb: 10 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
