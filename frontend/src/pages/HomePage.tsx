import React from 'react';
import { Typography, Box, Button, Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// This would come from an API in a real app
const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with long battery life.',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200?text=Headphones',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and more with this smartwatch.',
    price: 249.99,
    image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
  },
  {
    id: 3,
    name: 'Laptop',
    description: 'Powerful laptop for work and entertainment with high-resolution display.',
    price: 999.99,
    image: 'https://via.placeholder.com/300x200?text=Laptop',
  },
];

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 2,
          borderRadius: 2,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our E-Commerce Platform
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Discover amazing products with great deals
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={RouterLink}
          to="/products"
        >
          Shop Now
        </Button>
      </Box>

      {/* Featured Products */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/products/${product.id}`}
                  >
                    View Details
                  </Button>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {['Electronics', 'Clothing', 'Home & Kitchen', 'Books'].map((category) => (
            <Grid key={category}>
              <Box
                component={RouterLink}
                to={`/products?category=${category.toLowerCase()}`}
                sx={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    {category}
                  </Typography>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'secondary.light',
          color: 'white',
          py: 6,
          px: 2,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Join Our Newsletter
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Subscribe to get special offers, free giveaways, and product launches.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Subscribe Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;