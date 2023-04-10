import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Card, Box } from "@mui/material";

export default function Home() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const images = [
    { src: "./sample/b1.gif", alt: "w1" },
    { src: "./sample/b2.gif", alt: "w2" },
    { src: "./sample/b3.gif", alt: "w3" },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ paddingTop: "55px", position: "relative", height: "100%" }}>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={1000}
        selectedItem={activeSlide}
        onChange={setActiveSlide}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} className="d-block w-100" alt={image.alt} />
          </div>
        ))}
      </Carousel>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 255px);"
      >
        <Link
          to="/Templates"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card sx={{ minWidth: 350, minHeight: 80, marginRight: 20, borderRadius:4}}>
              <img src="/sample/templates.png" alt="templates" />
          </Card>
        </Link>
        <Link
          to="/Components"
          style={{ textDecoration: "none", color: "inherit" }}
        > 
          <Card sx={{ minWidth: 350, minHeight: 80 ,borderRadius:4}}>
              <img src="/sample/components.png" alt="components" />
          </Card>
        </Link>
      </Box>
    </Box>
  );
}
