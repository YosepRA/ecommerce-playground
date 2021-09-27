import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'primary.contrastText',
              textDecoration: 'none',
            }}
          >
            <Typography variant="h6" component="div">
              Ecommerce Playground
            </Typography>
          </Link>

          <Button color="inherit" component={RouterLink} to="/cart">
            Cart
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
