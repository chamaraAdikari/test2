import React from 'react';
import './amenities.css';

const Amenities = ({ amenities }) => {
  const enabledAmenities = amenities?.filter(amenity => amenity.enabled) || [];

  return (
    <div className="amenitiesContainer">
      <h2 className="amenitiesTitle">Hotel Amenities</h2>
      <div className="amenitiesList">
        {enabledAmenities.map((amenity, index) => (
          <div key={index} className="amenityItem" title={amenity.name}>
            <span className="amenityIcon">{amenity.icon}</span>
            <span className="amenityName">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
