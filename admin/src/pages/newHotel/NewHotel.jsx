import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import AmenityToggle from "../../components/amenityToggle/AmenityToggle";

// Durations in minutes
const DURATIONS = {
  "1 Minute": 1,
  "1 Day": 24 * 60,
  "12 Months": 12 * 30 * 24 * 60,
  "15 Months": 15 * 30 * 24 * 60,
  "24 Months": 24 * 30 * 24 * 60,
  "48 Months": 48 * 30 * 24 * 60
};

// Define default amenities
const DEFAULT_AMENITIES = [
  { name: "TV", icon: "📺", enabled: false },
  { name: "Pool", icon: "🏊", enabled: false },
  { name: "Wi-Fi", icon: "📶", enabled: false },
  { name: "Air Conditioning", icon: "❄️", enabled: false },
  { name: "Gym", icon: "🏋️‍♂️", enabled: false },
  { name: "Spa", icon: "🧖‍♀️", enabled: false },
  { name: "Parking", icon: "🚗", enabled: false },
  { name: "Pet Friendly", icon: "🐶", enabled: false },
  { name: "Restaurant", icon: "🍽️", enabled: false },
  { name: "Bar", icon: "🍷", enabled: false },
  { name: "Laundry", icon: "🧺", enabled: false },
  { name: "Room Service", icon: "🛎️", enabled: false },
  { name: "Wheelchair Access", icon: "♿", enabled: false },
  { name: "24/7 Reception", icon: "🕐", enabled: false },
  { name: "Non-Smoking", icon: "🚭", enabled: false }
];

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [duration, setDuration] = useState("12 Months");
  const [error, setError] = useState(null);
  const [amenities, setAmenities] = useState(DEFAULT_AMENITIES);
  const navigate = useNavigate();

  const { data, loading } = useFetch("/rooms");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleAmenityChange = (name, checked) => {
    setAmenities(prev => 
      prev.map(amenity => 
        amenity.name === name ? { ...amenity, enabled: checked } : amenity
      )
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dcl3rxgav/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      // Calculate expiration date based on selected duration
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + DURATIONS[duration]);

      const newhotel = {
        ...info,
        rooms,
        photos: list,
        amenities,
        expiresAt: expiresAt.toISOString(),
      };

      const response = await axios.post("/hotels", newhotel, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200) {
        navigate("/hotels");
      }
    } catch (err) {
      console.error("Error creating hotel:", err);
      setError(err.response?.data?.message || "Error creating hotel");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="formInput">
                <label>Listing Duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  {Object.keys(DURATIONS).map(dur => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Amenities</label>
                {amenities.map((amenity) => (
                  <AmenityToggle
                    key={amenity.name}
                    amenity={amenity}
                    onChange={handleAmenityChange}
                  />
                ))}
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
              {error && <div style={{color: "red", marginTop: "10px"}}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
