"use client";
import { Box, Typography } from "@mui/material";
import Resturant from "./Resturant";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const resturantData = [
  {
    name: "Abdisa Dev",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...",
    amount: "2k",
  },
  {
    name: "Abdisa Dev",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...",
    amount: "1k",
  },
  {
    name: "Abdisa Dev",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...",
    amount: "4k",
  },
];

function Resturants() {
  return (
    <>
      <Box
        sx={{
          height: "700px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: "50px",
          rowGap: 10,
          background:
            "linear-gradient(0deg, rgba(255,248,241,1) 0%, rgba(253,209,163,1) 60%, rgba(255,248,241,1) 100%)",
        }}
      >
        <Box ml="100px">
          <Typography variant="h3" fontWeight="bolder">
            Top Resturants
          </Typography>
        </Box>
        <Slider arrows={false} centerPadding="500px" centerMode={true}>
          {resturantData.map((data, index) => (
            <Resturant
              key={index}
              name={data.name}
              amount={data.amount}
              description={data.description}
            />
          ))}
        </Slider>
      </Box>
    </>
  );
}

export default Resturants;
