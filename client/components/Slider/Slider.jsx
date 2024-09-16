"use client"

import React from "react";
import { Container, Row ,Col } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { Sliders } from "../../constants/home";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = ()=>{
    return(
        <Container fluid className="bg-black w-[100%] h-[100%]">
            <Row className="items-center justify-center">
                <Col>
                <Carousel className="my-3"
                showThumbs={false}
                infiniteLoop
                autoPlay
                showStatus={false}
                interval={7000}
                stopOnHover
                emulateTouch
                dynamicHeight
                showArrows
                >
                {Sliders?.map((Slider)=>{
                    return(
                        <img className="d-block w-full" src={Slider.img} alt=""/>
                    )
                })}
                </Carousel>
                </Col>
                <Col xs lg='4' className="text-center">
                <h1 className="text-[3vmax] text-red-500">Huge Sale</h1>
                <h2 className="text-[2vmax] text-white">up to 50% off</h2>
                <h2 className="text-[2vmax] text-white">limited offer!</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Slider;