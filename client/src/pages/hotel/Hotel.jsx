import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import "./hotel.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList.jsx";
import Footer from "../../components/footer/Footer.jsx";
import useFetch from "../../hooks/useFetch";
import { differenceInDays } from "date-fns";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Reserve from "../../components/reserve/Reserve.jsx";
import { useCurrency } from "../../context/CurrencyContext";
import Amenities from "../../components/amenities/Amenities";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { navigate } = useNavigate();
  const { formatPrice } = useCurrency();
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = dates?.length > 0 ? dayDifference(dates[0].endDate, dates[0].startDate) : 1;
  const basePrice = data?.cheaperstPrice || data?.cheapestPrice || 0;
  const totalPrice = basePrice * days;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    const maxIndex = data.photos?.length - 1 || 0;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? maxIndex : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === maxIndex ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const handleClick = () =>{
     if(user){
       if (data.whatsappNumber) {
         window.open(`https://wa.me/${data.whatsappNumber}`, '_blank');
       } else {
         alert("Sorry, WhatsApp contact is not available for this hotel");
       }
     } else {
       navigate("/register");
     }
  }

  if (loading) return <LoadingAnimation />;
  if (error) return <div>Error loading hotel details</div>;

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && data.photos && (
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
            <div className="sliderWrapper">
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow left" onClick={() => handleMove("l")} />
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow right" onClick={() => handleMove("r")} />
            </div>
          </div>
        )}        <div className="hotelLayout">
          <div className="hotelSidebar">
            <Amenities amenities={data?.amenities} />
          </div>

          <div className="hotelWrapper">
            <button className="bookNow">Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}
            </span>

            {/* Mobile Slider */}
            <div className="mobileSlider">
              <div className="mobileSliderContainer">
                <FontAwesomeIcon icon={faCircleArrowLeft} className="mobileArrow left" onClick={() => handleMove("l")} />
                <img src={data.photos?.[slideNumber]} alt="" className="mobileSliderImg" />
                <FontAwesomeIcon icon={faCircleArrowRight} className="mobileArrow right" onClick={() => handleMove("r")} />
              </div>
            </div>

            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImageWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h2>Perfect for a stay!</h2>
                <h2>
                  <b>{formatPrice(basePrice)}</b> (per night)
                </h2>
                <h2>
                  Total for {days} night(s): <b>{formatPrice(totalPrice)}</b>
                </h2>
                <button onClick={handleClick}>Book Now</button>
              </div>
            </div>
          </div>
        </div>        <MailList />
        <Footer />
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
