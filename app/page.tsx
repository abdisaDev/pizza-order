import HeroPage from "./components/HeroPage";
import NavigationBar from "./components/NavigationBar";
import FeaturedPizza from "./components/FeaturedPizza";
import Resturant from "./components/Resturant";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <HeroPage />
      <FeaturedPizza />
      <Resturant />
    </>
  );
}
