import HeroPage from './components/HeroPage';
import NavigationBar from './components/NavigationBar';
import FeaturedPizza from './components/FeaturedPizza';
import Resturants from './components/Resturants';
import PopularPizzas from './components/PopularPizzas';
import FastingPizzas from './components/FastingPizzas';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <HeroPage />
      <FeaturedPizza />
      <Resturants />
      <PopularPizzas />
      <FastingPizzas />
      <Footer />
    </>
  );
}
