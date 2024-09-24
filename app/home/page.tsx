import { Box } from '@mui/material';
import HeroPage from '../components/HeroPage';
import NavigationBar from '../components/NavigationBar';
import FeaturedPizza from '../components/FeaturedPizza';
import Resturants from '../components/Resturants';
import PopularPizzas from '../components/PopularPizzas';
import FastingPizzas from '../components/FastingPizzas';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <>
      <Box>
        <NavigationBar />
        <HeroPage />
        <FeaturedPizza />
        <Resturants />
        <PopularPizzas />
        <FastingPizzas />
        <Footer />
      </Box>
    </>
  );
}

export default LandingPage;
