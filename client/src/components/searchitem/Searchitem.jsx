import "./searchitem.css"; // Correct CSS import
import React from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";

const SearchItem = ({ item }) => {  const { formatPrice } = useCurrency();
  const formattedPrice = formatPrice(item.cheaperstPrice || item.cheapestPrice || 0);

  return (
    <div className="searchItem">
      <img
        src={item.photos?.[0] || "https://cf.bstatic.com/static/img/hotel/max1024x768/322/322673530.jpg"}
        alt={item.name}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from Udamaluwa</span>
        <span className="siSubtitle">A/C rooms available!</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free Cancelation</span>
        <span className="siCancelOptSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">          <span className="siPrice">
            {formattedPrice}
          </span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;