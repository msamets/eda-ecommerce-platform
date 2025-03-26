import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu as MenuComponent,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person';

const CartIcon = ShoppingCart;
const MenuIcon = Menu;
const PersonIcon = Person;

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Replace hardcoded values with state that would come from a real data source
  const isLoggedIn = false;
  const cartItemCount = 0;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          E-Commerce Platform
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <MenuComponent
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={RouterLink}
                to="/products"
                onClick={handleMenuClose}
              >
                Products
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/cart"
                onClick={handleMenuClose}
              >
                Cart ({cartItemCount})
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Profile
                </MenuItem>
              ) : (
                <MenuItem
                  component={RouterLink}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
              )}
            </MenuComponent>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/products"
              sx={{ mx: 1 }}
            >
              Products
            </Button>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/cart"
              aria-label="shopping cart"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <CartIcon />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/profile"
                aria-label="user profile"
                sx={{ ml: 1 }}
              >
                <PersonIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                sx={{ ml: 1 }}
              >
                Login
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;