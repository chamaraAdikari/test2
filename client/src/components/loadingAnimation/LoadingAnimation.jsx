import { useState, useEffect } from 'react';
import './loadingAnimation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSuitcase, 
    faPlane, 
    faTaxi, 
    faLocationDot, 
    faUmbrella, 
    faUmbrellaBeach, 
    faCompass,
    faPhone,
    faComment,
    faHotel
} from '@fortawesome/free-solid-svg-icons';

const LoadingAnimation = ({ context = "default" }) => {
    const [currentIcon, setCurrentIcon] = useState(0);
    const icons = [faSuitcase, faPlane, faTaxi, faLocationDot, faUmbrella, 
        faUmbrellaBeach, faCompass, faPhone, faComment, faHotel];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % icons.length);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loadingContainer">
            <div className="loadingCircle">
                {icons.map((icon, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={icon}
                        className={`loadingIcon ${currentIcon === index ? 'active' : ''}`}
                    />
                ))}
            </div>            <p className="loadingText">
                {context === "search" ? "Fetching hotels..." : "Loading amazing places..."}
            </p>
        </div>
    );
};

export default LoadingAnimation;
