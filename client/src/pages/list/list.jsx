import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useCurrency } from "../../context/CurrencyContext";
import "./list.css";
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/header/Header';
import SearchItem from "../../components/searchitem/Searchitem.jsx";
import FilterButton from "../../components/filterButton/FilterButton.jsx";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [dates, setDates] = useState(location.state.dates || [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [min, setMin] = useState(undefined);  const [max, setMax] = useState(undefined);
  const { selectedCurrency, convertPrice } = useCurrency();

  // Convert min and max prices from selected currency to LKR
  const minLKR = min ? convertPrice(min, selectedCurrency) : undefined;
  const maxLKR = max ? convertPrice(max, selectedCurrency) : undefined;

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${minLKR || 0}&max=${maxLKR || 999999}`
  );

  const handleClick = () => {
    reFetch();
  };

  const isMobile = () => window.innerWidth <= 768;
  const [isMobileView, setIsMobileView] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderSearch = () => (
    <div className="listSearch">
      <h1 className="lsTitle">Search</h1>
      <div className="lsSubtitle">Destination</div>
      <div className="lsItem">
        <input
          placeholder="Destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="lsSubtitle">Check-In Date</div>
      <div className="lsItem">
        <span onClick={() => setOpenDate(!openDate)}>
          {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
        </span>
        {openDate && (
          <DateRange
            onChange={(item) => setDates([item.selection])}
            ranges={dates}
            minDate={new Date()}
          />
        )}
      </div>
      <div className="lsSubtitle">Options</div>
      <div className="lsOptions">
        <div className="lsOptionItem">
          <span className="lsOptionText">Min price per night</span>
          <input
            type="number"
            onChange={(e) => setMin(e.target.value)}
            className="lsOptionInput"
            placeholder={`Min in ${selectedCurrency}`}
          />
        </div>
        <div className="lsOptionItem">
          <span className="lsOptionText">Max price per night</span>
          <input
            type="number"
            onChange={(e) => setMax(e.target.value)}
            className="lsOptionInput"
            placeholder={`Max in ${selectedCurrency}`}
          />
        </div>
        <div className="lsOptionItem">
          <span className="lsOptionText">Adult</span>
          <input
            type="number"
            min={1}
            className="lsOptionInput"
            placeholder={options.adult}
          />
        </div>
        <div className="lsOptionItem">
          <span className="lsOptionText">Children</span>
          <input
            type="number"
            min={0}
            className="lsOptionInput"
            placeholder={options.children}
          />
        </div>
        <div className="lsOptionItem">
          <span className="lsOptionText">Room</span>
          <input
            type="number"
            min={1}
            className="lsOptionInput"
            placeholder={options.room}
          />
        </div>
      </div>
      <button onClick={handleClick}>Search</button>
    </div>
  );  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {!isMobileView && renderSearch()}
          {isMobileView && <FilterButton>{renderSearch()}</FilterButton>}                    <div className="listResult">
                        {loading ? (
                            <LoadingAnimation context="search" />
                        ) : error ? (
              <span style={{ color: "red" }}>Error loading hotels</span>
            ) : data.length === 0 ? (
              <span>No hotels found</span>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default List;
