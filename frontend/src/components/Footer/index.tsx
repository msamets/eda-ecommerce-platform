import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              E-Commerce Platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A modern, scalable e-commerce platform built with microservices architecture
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 4 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Shop
              </Typography>
              <Link href="/products" color="inherit" display="block">Products</Link>
              <Link href="/categories" color="inherit" display="block">Categories</Link>
              <Link href="/deals" color="inherit" display="block">Deals</Link>
            </Box>

            <Box>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Account
              </Typography>
              <Link href="/profile" color="inherit" display="block">My Account</Link>
              <Link href="/orders" color="inherit" display="block">Orders</Link>
              <Link href="/wishlist" color="inherit" display="block">Wishlist</Link>
            </Box>

            <Box>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Help
              </Typography>
              <Link href="/faq" color="inherit" display="block">FAQ</Link>
              <Link href="/shipping" color="inherit" display="block">Shipping</Link>
              <Link href="/contact" color="inherit" display="block">Contact Us</Link>
            </Box>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} E-Commerce Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;