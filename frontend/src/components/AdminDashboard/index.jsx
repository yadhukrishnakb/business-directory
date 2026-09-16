import { useState, useEffect } from "react";
import AdminBusinessCard from "../AdminBusinessCard";
import AdminNavbar from "../AdminNavbar";
import { ThreeDots, Oval } from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const AdminDashboard = () => {
  const [businessesList, setBusinessesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
  const [saveApiStatus, setSaveApiStatus] = useState(
    apiStatusConstants.initial,
  );
  const [searchInput, setSearchInput] = useState("");
  const [toggleForm, setToggleForm] = useState(false);

  const [nameInput, setName] = useState("");
  const [categoryInput, setCategory] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [phoneInput, setPhone] = useState("");
  const [locationInput, setLocation] = useState("");
  const [servicesInput, setServices] = useState("");
  const [workingHoursInput, setWorkingHours] = useState("");

  const [addApiStatus, setAddApiStatus] = useState(apiStatusConstants.initial);

  const getBusinessesList = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);
      const apiUrl = import.meta.env.VITE_API_URL + "/businesses";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        const formattedData = data.business.map((each) => {
          return { ...each, edit: false };
        });
        setApiStatus(apiStatusConstants.success);
        setBusinessesList(formattedData);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getBusinessesList();
  }, []);

  const editCard = (id) => {
    setBusinessesList((prevState) =>
      prevState.map((each) => {
        if (each._id === id) {
          return {
            ...each,
            edit: true,
          };
        }
        return each;
      }),
    );
  };
  const saveCard = async (id, savedChanges) => {
    /* setBusinessesList((prevState) =>
      prevState.map((each) => {
        if (each._id === id) {
          return { ...each, ...savedChanges, edit: false };
        }
        return each;
      }),
    ); */

    try {
      setSaveApiStatus(apiStatusConstants.inProgress);
      const apiUrl = import.meta.env.VITE_API_URL + "/business/update";
      const options = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, savedChanges }),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSaveApiStatus(apiStatusConstants.success);
        getBusinessesList();
      } else {
        setSaveApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteBusiness = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL + `/business/${id}`;
    const options = {
      method: "DELETE",
    };
    await fetch(apiUrl, options);
    getBusinessesList();
  };

  const onAddBusiness = async (e) => {
    e.preventDefault();
    const newBusiness = {
      name: nameInput,
      category: categoryInput,
      description: descriptionInput,
      phone: phoneInput.split(","),
      location: locationInput,
      services: servicesInput.split(","),
      workingHours: workingHoursInput,
    };

    try {
      setAddApiStatus(apiStatusConstants.inProgress);
      const apiUrl = import.meta.env.VITE_API_URL + "/business/add-business";
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newBusiness),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setAddApiStatus(apiStatusConstants.success);
        getBusinessesList();
        setName("");
        setCategory("");
        setDescription("");
        setPhone("");
        setLocation("");
        setServices("");
        setWorkingHours("");
      } else {
        setAddApiStatus(apiStatusConstants.failure);
        console.log(data.message);
      }
    } catch (err) {
      setAddApiStatus(apiStatusConstants.failure);
      console.log(data.message);
    }
  };

  const renderAddStatus = () => {
    switch (addApiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="add-business-success-container-admin">
            <button type="submit">Add Business</button>
            <p>Business added successfully!</p>
          </div>
        );
      case apiStatusConstants.inProgress:
        return (
          <button type="button" disabled>
            <ThreeDots
              visible={true}
              height="20"
              width="40"
              color="#ffffff"
              radius="6"
              ariaLabel="adding-business"
            />
          </button>
        );
      case apiStatusConstants.failure:
        return (
          <div className="add-business-failure">
            <button type="submit">Try Again</button>
            <p className="something-went-wrong message">
              Failed to add business. Please try again.
            </p>
          </div>
        );
      default:
        return <button type="submit">Add Business</button>;
    }
  };

  const renderBusinessCard = () => {
    const filteredList = businessesList.filter(
      (each) =>
        each.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.services.some((each) =>
          each.toLowerCase().includes(searchInput.toLowerCase()),
        ) ||
        each.location.toLowerCase().includes(searchInput.toLowerCase()),
    );

    if (filteredList.length === 0) {
      return (
        <div className="empty-list-view-admin">
          <img
            src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1787908679/web_search_ndovi7.svg"
            alt="no result"
          />
          <h1>No Businesses Found</h1>
          <p>No business listings match your current search.</p>
        </div>
      );
    }
    return (
      <ul className="admin-business-cards-container">
        {filteredList.map((each) => (
          <AdminBusinessCard
            business={each}
            editCard={editCard}
            saveCard={saveCard}
            saveApiStatus={saveApiStatus}
            apiStatusConstants={apiStatusConstants}
            deleteBusiness={deleteBusiness}
            key={each._id}
          />
        ))}
      </ul>
    );
  };

  const renderLoader = () => {
    return (
      <div className="business-list-loader-admin">
        <Oval
          height={40}
          width={40}
          color="#2563eb"
          secondaryColor="#dbeafe"
          strokeWidth={4}
          strokeWidthSecondary={4}
          visible={true}
          ariaLabel="loading-businesses"
        />
      </div>
    );
  };
  const renderFailure = () => {
    return (
      <div className="failure-container-admin">
        <img
          src="https://res.cloudinary.com/dvzcnvazm/image/upload/v1787904531/No_data-pana_zmhcja.svg"
          alt="Unable to load businesses"
        />
        <h1>Something Went Wrong</h1>
        <p>We couldn't load the business listings. Please try again.</p>
        <button type="button" onClick={() => getBusinessesList()}>
          Try Again
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderBusinessCard();
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  const renderForm = () => (
    <form onSubmit={onAddBusiness} className="add-business-container-admin">
      <h1>Add Business</h1>

      <div className="label-input-container-admin">
        <label htmlFor="name">Business Name</label>
        <input
          id="name"
          value={nameInput}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter business name"
          required={true}
        />
      </div>

      <div className="label-input-container-admin">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          value={categoryInput}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Plumber, Tutor, Electrician"
          required={true}
        />
      </div>

      <div className="label-input-container-admin">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={descriptionInput}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Briefly describe the business"
          required={true}
        />
      </div>

      <div className="label-input-container-admin">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          value={phoneInput}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter contact number"
          required={true}
        />
      </div>

      <div className="label-input-container-admin">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={locationInput}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Thrissur"
          required={true}
        />
      </div>

      <div className="label-input-container-admin">
        <label htmlFor="services">Services</label>
        <input
          id="services"
          value={servicesInput}
          onChange={(e) => setServices(e.target.value)}
          placeholder="e.g. Home repairs, maintenance"
          required={true}
        />
      </div>

      <div className="label-input-container-admin">
        <label htmlFor="working-hours">Working Hours</label>
        <input
          id="working-hours"
          value={workingHoursInput}
          onChange={(e) => setWorkingHours(e.target.value)}
          placeholder="e.g. Mon - Sat, 9 AM - 6 PM"
          required={true}
        />
      </div>
      <div className="add-business-button-container-admin">
        {renderAddStatus()}
      </div>
    </form>
  );

  const handleToggle = () => {
    setAddApiStatus(apiStatusConstants.initial);
    setToggleForm((prevState) => !prevState);
  };
  return (
    <div className="admin-dashboard-bg-container">
      <AdminNavbar />
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Manage Business Listings</h1>
          <p>Add, edit and remove business listings</p>
        </div>

        <div className="admin-dashboard-actions">
          {toggleForm ? (
            <button type="button" onClick={() => handleToggle()}>
              Close
            </button>
          ) : (
            <button type="button" onClick={() => handleToggle()}>
              Add Business
            </button>
          )}

          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search businesses..."
          />
        </div>
        {toggleForm && renderForm()}
      </div>

      <h1 className="business-listings-heading">Business Listings</h1>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
