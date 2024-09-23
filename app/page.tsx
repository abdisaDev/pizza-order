import HeroPage from './components/HeroPage';
import NavigationBar from './components/NavigationBar';
import FeaturedPizza from './components/FeaturedPizza';

export default function Home() {
  return (
    <>
      <h1 className='text-3xl'>
        <NavigationBar />
        <HeroPage />
        <FeaturedPizza />
      </h1>
    </>
  );
}
