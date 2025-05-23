import "./home.css"; // Fixed the import path
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import Featured from "../../components/featured/Featured.jsx";
import PropertyList from "../../components/propertyList/PropertyList.jsx"; // Corrected the case of the file name
import FeaturedProperties from "../../components/featuredProperties/featuredProperties.jsx";
import MailList from "../../components/mailList/MailList.jsx"; // Corrected the case of the file name
import Footer from "../../components/footer/Footer.jsx"; // Corrected the case of the file name

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
      <Featured />
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList />
      <h1 className="homeTitle">What our guests love</h1>
      <FeaturedProperties />
      <MailList />
      <Footer />
      </div>
    </div>
  );
}

export default Home;