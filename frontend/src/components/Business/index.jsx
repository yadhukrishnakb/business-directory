import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar";
import BusinessCard from "../BusinessCard";
import Footer from "../Footer";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
};
const categoriesList = [
  "All",
  "Plumber",
  "Electrician",
  "Tutor",
  "Mechanic",
  "Carpenter",
  "Painter",
  "AC Technician",
  "Computer Repair",
  "Cleaning Service",
];
const locationsList = [
  "All",
  "Thrissur",
  "Kochi",
  "Kozhikode",
  "Kannur",
  "Palakkad",
  "Kottayam",
  "Malappuram",
  "Ernakulam",
  "Thiruvananthapuram",
];

const Business = () => {
  const [businessesList, setBusinessesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoriesList[0]);
  const [activeLocation, setActiveLocation] = useState(locationsList[0]);

  const getBusinesses = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);

      const apiUrl = import.meta.env.VITE_API_URL + "/businesses";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setBusinessesList(data.business);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderOptions = (list) => {
    return list.map((each) => (
      <option value={each} key={each}>
        {each}
      </option>
    ));
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const getFilteredList = () => {
    const filterList = (list, filterItem, filterText) => {
      return filterItem === "All"
        ? list
        : list.filter(
            (each) =>
              each[filterText].toLowerCase() === filterItem.toLowerCase(),
          );
    };

    let filteredList = filterList(businessesList, activeCategory, "category");
    filteredList = filterList(filteredList, activeLocation, "location").filter(
      (each) =>
        each.services.some((eachService) =>
          eachService.toLowerCase().includes(searchInput.toLowerCase()),
        ) ||
        each.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.name.toLowerCase().includes(searchInput.toLowerCase()),
    );

    return filteredList;
  };

  const renderBusinesses = () => {
    const filteredList = getFilteredList();
    if (filteredList.length === 0) {
      return (
        <div className="no-filter-result-container">
          <img
            src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1787908679/web_search_ndovi7.svg"
            alt="No businesses found"
          />
          <h2>No businesses found</h2>
          <p>Try changing your search or filter options.</p>
        </div>
      );
    }

    return (
      <ul className="businesses-list">
        {filteredList.map((each) => (
          <BusinessCard business={each} key={each._id} />
        ))}
      </ul>
    );
  };

  const renderLoader = () => (
    <div className="loader-container">
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#2563eb"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );

  const renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1787904531/No_data-pana_zmhcja.svg"
        alt="Unable to load businesses"
      />

      <h2>Unable to load businesses</h2>

      <p>
        Something went wrong while fetching the businesses. Please try again.
      </p>

      <button type="button" onClick={getBusinesses}>
        Try Again
      </button>
    </div>
  );

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderBusinesses();
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <div className="bg-container">
      <Navbar />
      <div className="header">
        <h1>
          Find Local Businesses & Services <br /> Discover trusted businesses
          and services near you
        </h1>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search businesses, services, or locations..."
        />
      </div>
      <div className="filters-container">
        <div className="filters-header">
          <h2>Filters</h2>

          <button
            type="button"
            className="clear-filter-button"
            onClick={() => {
              setActiveCategory(categoriesList[0]);
              setActiveLocation(locationsList[0]);
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="filters-list">
          <div className="filter-item">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {renderOptions(categoriesList)}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              value={activeLocation}
              onChange={(e) => setActiveLocation(e.target.value)}
            >
              {renderOptions(locationsList)}
            </select>
          </div>
        </div>
      </div>
      <div className="content-container">
        <h1>Businesses</h1>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Business;
