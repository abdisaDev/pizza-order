"use client";
import { Box, Typography } from "@mui/material";
import Banner from "./Banner";
import PizzaOne from "@/app/assets/pizza-one.svg";
import PizzaTwo from "@/app/assets/pizza-two.svg";
import PizzaThreeOne from "@/app/assets/pizza-three.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerData = [
  {
    title: "Make Your First Order and Get 50% off",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    image: PizzaOne,
    backgroundColor: "#2F2F2F",
  },
  {
    title: "Make Your First Order and Get 50% off",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    image: PizzaTwo,
    backgroundColor: "#50482B",
  },
  {
    title: "Make Your First Order and Get 50% off",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    image: PizzaThreeOne,
    backgroundColor: "#296D60",
  },
];

function FeaturedPizza() {
  return (
    <>
      <Box>
        <Box sx={{ ml: 20 }}>
          <Typography variant="h3" fontWeight="bolder">
            Featured Pizza
          </Typography>
        </Box>
        <Slider
          autoplaySpeed={2000}
          autoplay={true}
          dots={true}
          adaptiveHeight={true}
          centerMode={true}
          arrows={false}
        >
          {bannerData.map((banner, index) => (
            <Banner
              key={index}
              title={banner.title}
              image={banner.image}
              backgroundColor={banner.backgroundColor}
              description={banner.description}
              discount="50%"
            />
          ))}
        </Slider>
      </Box>
    </>
  );
}

export default FeaturedPizza;
