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
            
        </div>
    );
};

export default FeaturedProperties;
