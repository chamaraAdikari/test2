import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType");

    if (loading) return <LoadingAnimation />;
    if (error) return <div className="pList">Error loading properties</div>;

    const images = [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c1/4c/boutique-hotels.jpg?w=1200&h=-1&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/632899030.jpg?k=9501f27db8c483de48bc383c4b99ec8ffd22eb15b47dbd73305458379bec6598&o=&hp=1",
        "https://browntownresort.com/wp-content/uploads/2022/11/Himalyan-Suites1-min-1.jpg",
        "https://im.proptiger.com/1/3232159/6/scape-villas-elevation-146125154.jpeg",
        "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20201116185103/Srinikethana-Homestay.jpg"
    ];
    
    return(
        <div className="pList">
           {data &&
              images.map((img, i) => (
                <div className="pListItem" key={i}>
                  <img
                    src={img}
                    alt=""
                    className="pListImg"
                  />
                  <div className="pListTitles">
                    <h2>{data[i]?.type}</h2>
                    <h3>{data[i]?.count} {data[i]?.type}</h3>
                  </div>
                </div>
              ))}
        </div>
    )
}

export default PropertyList;