import React, { useEffect, useState } from "react";
import styles from "../Main.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainCarouselCard from "./MainCarouselCard";
import { DestinationConfig, TravelLogConfig, selectTravelLogList } from "slices/mainSlice";
import { useAppSelector } from "app/hooks";

interface ArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface CarouselProps {
  type: string;
  destinations?: DestinationConfig[];
}

const NextArrow = (props: ArrowProps) => {
  const { style, onClick } = props;
  return (
    <div className={styles.carouselBtnRight} style={{ ...style }} onClick={onClick}>
      <svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke="#fff" strokeWidth="1.4" points="1.225,23 12.775,12 1.225,1 "></polyline>
      </svg>
    </div>
  );
};

const PrevArrow = (props: ArrowProps) => {
  const { style, onClick } = props;
  return (
    <div className={styles.carouselBtnLeft} style={{ ...style }} onClick={onClick}>
      <svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke="#fff" strokeWidth="1.4" points="12.775,1 1.225,12 12.775,23 "></polyline>
      </svg>
    </div>
  );
};

const MainCarouselTest = ({ type, destinations }: CarouselProps) => {
  const [hover, setHover] = useState(false);
  const travelLogs = useAppSelector(selectTravelLogList);

  const settings = {
    dots: type === "log" ? true : false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: type === "log" ? 2 : 3,
    slidesToScroll: 1,
    nextArrow: hover ? <NextArrow /> : <></>,
    prevArrow: hover ? <PrevArrow /> : <></>,
  };

  return (
    <div className={styles.carouselContainer} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {type == "log" ? (
        <Slider {...settings} touchMove={false} dotsClass={styles.dotsCss}>
          {travelLogs?.map((travelLog: TravelLogConfig, i: number) => (
            <MainCarouselCard type="log" travelLog={travelLog} key={i} />
          ))}
        </Slider>
      ) : (
        <Slider {...settings} touchMove={false} dotsClass={styles.dotsCss}>
          {destinations?.map((item: DestinationConfig, i: number) => (
            <MainCarouselCard type="destination" item={item} key={i} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MainCarouselTest;
