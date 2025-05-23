import "./Reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useCurrency } from "../../context/CurrencyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { formatPrice } = useCurrency();

  // --- FIXED getDatesInRange function ---
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const datesArray = [];

    const date = new Date(start);
    while (date <= end) {
      datesArray.push(date.getTime()); // <-- Corrected: store timestamps
      date.setDate(date.getDate() + 1);
    }

    return datesArray;
  };

  // Call it properly
  const allDates =
    Array.isArray(dates) &&
    dates.length > 0 &&
    dates[0]?.startDate &&
    dates[0]?.endDate
      ? getDatesInRange(dates[0].startDate, dates[0].endDate)
      : [];
  
  const isAvailable = (roomNumber) => {
    const ifFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );

    return !ifFound;
  }

  const handleSelect = (e) => {
    if (!e || !e.target) return;
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(roomId => {
          const res = axios.put(`/rooms/availability/${roomId}`, {dates: allDates});
          return res.data;
          // ...your logic here...
        })
      );
      setOpen(false)
      navigate("/")
    } catch (err) {
      // ...handle error...
    }
  };

  return (
    <div className="reserve">
      <div
        className="rContainer"
        style={{
          background: "#fff",
          backgroundColor: "#fff",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          borderRadius: "12px"
        }}
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="rSelect">Select your room:</span>
        {loading ? (
          "Loading..."
        ) : error ? (
          "Error loading rooms"
        ) : (
          Array.isArray(data) &&
          data.map((item, index) => (
            <div className="rItem" key={index}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{formatPrice(item.price)}</div>
                <div className="room">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="roomNumberItem" key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
