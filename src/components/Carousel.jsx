import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../assets/css/Carousel.css';
import { Link } from "react-router-dom";
import NumberFormatter from "./NumberFormater";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Carousels = (props) => {
    const slider = props.data;
    if(slider!= undefined) {
    return (
        <div className="carousel-continent">
            <div className="parent carousel-content">
            <Carousel
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {slider.map((obj, index) => {
                return (
                    <div className="slider" key={index} >
                        <Link to={props.links + obj.id} className="slider-items" onClick={() => { window.location.href = '/product/' + obj.id; }}>
                        <img src={obj.thumbnail} alt="" />
                        <p>{obj.product_description}</p>
                        <div className="price-product">
                            {/* <strong className="price">{obj.price_new}₫</strong> */}
                            <strong><NumberFormatter number={obj.price * (100 - obj.discount)/ 100}/></strong>
                            <p className="price-old black"><NumberFormatter number={obj.price}/></p>
                            <span className="percent">-{obj.discount}%</span>
                        </div>
                        </Link>
                    </div>
                );
                })}
            </Carousel>
            </div>
        </div>
    );}
};
export default Carousels;
