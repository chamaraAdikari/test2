import React from 'react';
import "./amenityToggle.scss";

const AmenityToggle = ({ amenity, onChange, checked }) => {
  return (
    <div className="amenityToggle">
      <label className="amenityLabel">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(amenity.name, e.target.checked)}
          className="amenityCheckbox"
        />
        <span className="amenityIcon">{amenity.icon}</span>
        <span className="amenityName">{amenity.name}</span>
      </label>
    </div>
  );
};

export default AmenityToggle;
