import HeroPage from "./components/HeroPage";
import NavigationBar from "./components/NavigationBar";
import FeaturedPizza from "./components/FeaturedPizza";
import Resturants from "./components/Resturants";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <HeroPage />
      <FeaturedPizza />
      <Resturants />
    </>
  );
}
