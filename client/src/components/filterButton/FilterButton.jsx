import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./filterButton.css";

const FilterButton = ({ children }) => {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const closeFilters = () => {
        setShowFilters(false);
    };    return (
        <>
            <button className="filter-button" onClick={toggleFilters}>
                <FontAwesomeIcon icon={faFilter} />
            </button>
            <div className={`filter-popup ${showFilters ? 'show' : ''}`}>
                <div className="filter-popup-content">
                    <div className="filter-popup-header">
                        <h2>Search Filters</h2>
                        <button className="close-button" onClick={closeFilters}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default FilterButton;
