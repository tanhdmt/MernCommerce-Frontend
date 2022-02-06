import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, RootState } from "type";

const Hero = () => {
    const lisImage = useSelector((state: RootState) => state.image.images);
    var images: Image[] = [];
    if (lisImage.Images) {
        images = lisImage.Images.filter((value) => value.position === "0");
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <section className="hero-section">
            <div>
                <Slider {...settings}>
                    {images.length !== 0 ? (
                        images.map((value) => {
                            return (
                                <div
                                    key={value._id}
                                    className="hero-items owl-carousel"
                                >
                                    <div
                                        className="single-hero-items set-bg"
                                        style={{
                                            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/images/${value.image})`,
                                        }}
                                    ></div>
                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </Slider>
            </div>
        </section>
    );
};

export default Hero;
