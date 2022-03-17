import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const CarouselHome = () => {
    return (
        <Carousel>
      <Carousel.Item>
        <img
          className=" w-100"
          src="/assets/home/home1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to MeFit!</h3>
          <p>Sports app for trainers</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" w-100"
          src="/assets/home/home2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Set your Weekly goals</h3>
          <p>Log in</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className=" w-100"
          src="/assets/home/home3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>New MeFit user</h3>
          <p>Register</p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
    );
};

export default CarouselHome;