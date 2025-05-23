import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("/hotels?featured=true");
    const { formatPrice } = useCurrency();

    if (loading) return <LoadingAnimation />;
    if (error) return <div>Error loading featured properties: {error.message}</div>;

    return (
        <div className="fp">
            {data && data.length > 0 ? (
                <>
                    {data.map((item) => (
                        <div className="fpItem" key={item._id}>
                            <img 
                                src={item.photos?.[0] || "https://via.placeholder.com/150"} 
                                alt={item.name} 
                                className="fpImg" 
                            />
                            <Link to={`/hotels/${item._id}`} className="fpName">
                                {item.name}
                            </Link>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">
                                Starting from {formatPrice(item.cheaperstPrice || item.cheapestPrice || 0)}
                            </span>
                            {item.rating && (
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <div>No featured properties available</div>
            )}
        </div>
    );
};

export default FeaturedProperties;