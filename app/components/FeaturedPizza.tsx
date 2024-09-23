import { Box } from '@mui/material';
import Banner from './Banner';
import PizzaOne from '@/app/assets/pizza-one.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const bannerData = [
  {
    title: 'Make Your First Order and Get 50% off',
    description:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.',
    image: PizzaOne,
    backgroundColor: '#2F2F2F',
  },
  {
    title: 'Make Your First Order and Get 50% off',
    description:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.',
    image: PizzaOne,
    backgroundColor: '#50482B',
  },
  {
    title: 'Make Your First Order and Get 50% off',
    description:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.',
    image: PizzaOne,
    backgroundColor: '#296D60',
  },
];

function FeaturedPizza() {
  return (
    <>
      <Box>
        <Swiper>
          {bannerData.map((banner, index) => (
            <SwiperSlide key={index}>
              <Banner
                title={banner.title}
                image={banner.image}
                backgroundColor={banner.backgroundColor}
                description={banner.description}
                discount='50%'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}

export default FeaturedPizza;
