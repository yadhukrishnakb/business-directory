import { useState } from "react";
import { ThreeDots, Oval } from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

/*

const {
    _id,
    name,
    category,
    description,
    phone,
    location,
    services,
    workingHours,
  } = business;

  */

const AdminBusinessCard = ({
  business,
  editCard,
  updateState,
  updateStateAfterDelete,
}) => {
  const [nameInput, setName] = useState(business.name);
  const [categoryInput, setCategory] = useState(business.category);
  const [descriptionInput, setDescription] = useState(business.description);
  const [phoneInput, setPhone] = useState(business.phone.join(","));
  const [locationInput, setLocation] = useState(business.location);
  const [servicesInput, setServices] = useState(business.services.join(","));
  const [workingHoursInput, setWorkingHours] = useState(business.workingHours);
  const [saveApiStatus, setSaveApiStatus] = useState(
    apiStatusConstants.initial,
  );
  const [deleteApiStatus, setDeleteApiStatus] = useState(
    apiStatusConstants.initial,
  );

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onClickEdit = () => {
    editCard(business._id);
  };
  const onClickSaveChanges = async () => {
    const savedChanges = {
      name: nameInput,
      category: categoryInput,
      description: descriptionInput,
      phone: phoneInput.split(","),
      location: locationInput,
      services: servicesInput.split(","),
      workingHours: workingHoursInput,
      edit: false,
    };
    //saveCard(business._id, savedChanges);
    try {
      setSaveApiStatus(apiStatusConstants.inProgress);
      const apiUrl = import.meta.env.VITE_API_URL + "/business/update";
      const options = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: business._id, savedChanges }),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      //console.log("BC", JSON.stringify(data));

      if (response.ok) {
        setSaveApiStatus(apiStatusConstants.success);
        updateState(business._id, data.updatedBusiness);
        //getBusinessesList();
        setTimeout(() => {
          setSaveApiStatus(apiStatusConstants.initial);
        }, 2000);
      } else {
        setSaveApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteBusiness = async () => {
    try {
      setDeleteApiStatus(apiStatusConstants.inProgress);
      const apiUrl = import.meta.env.VITE_API_URL + `/business/${business._id}`;
      const options = {
        method: "DELETE",
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        // setDeleteApiStatus(apiStatusConstants.success);
        updateStateAfterDelete(data.businesses);
      } else {
        setDeleteApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      setDeleteApiStatus(apiStatusConstants.failure);
    }
  };

  const renderSavingStatus = () => {
    switch (saveApiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="save-changes-container-admin">
            <p>Changes Saved!</p>
            <button type="button" onClick={onClickSaveChanges}>
              Save Changes
            </button>
            <button type="button" onClick={onClickEdit}>
              Close
            </button>
          </div>
        );
      case apiStatusConstants.inProgress:
        return (
          <div className="saving-progress-container-admin">
            <p>Saving changes...</p>
            <button type="button">
              <ThreeDots
                visible={true}
                height="20"
                width="35"
                color="#ffffff"
                radius="8"
                ariaLabel="saving-business"
              />
            </button>
          </div>
        );
      case apiStatusConstants.failure:
        return (
          <div className="save-retry-container-admin">
            <p>Something went wrong!</p>
            <button type="button" onClick={onClickSaveChanges}>
              Retry
            </button>
          </div>
        );
      default:
        return (
          <div className="save-changes-container-admin">
            <button type="button" onClick={onClickSaveChanges}>
              Save Changes
            </button>
            <button type="button" onClick={onClickEdit}>
              Close
            </button>
          </div>
        );
    }
  };

  const renderConfirmDeleteButtons = () => {
    return (
      <div className="confirm-button-container-admin">
        <p>Confirm Delete?</p>
        <button type="button" onClick={() => deleteBusiness()}>
          YES
        </button>
        <button type="button" onClick={() => setConfirmDelete(false)}>
          NO
        </button>
      </div>
    );
  };

  const renderLoader = () => (
    <button type="button" disabled={true}>
      <Oval
        visible={true}
        height="24"
        width="24"
        color="#dc2626"
        ariaLabel="delete-loading"
      />
    </button>
  );

  const renderSavedView = () => (
    <li className="saved-view-card">
      <div className="saved-view-card-content">
        <h2>{nameInput}</h2>

        <p className="saved-view-category">{categoryInput}</p>

        <p className="saved-view-description">{descriptionInput}</p>

        <div className="saved-view-details">
          <p>
            <strong>Location:</strong> {locationInput}
          </p>

          <p>
            <strong>Phone:</strong> {phoneInput}
          </p>

          <p>
            <strong>Working Hours:</strong> {workingHoursInput}
          </p>
        </div>

        <div className="saved-view-services">
          <h3>Services</h3>
          <p>{servicesInput}</p>
        </div>
      </div>
      <div className="edit-btn-container">
        <button type="button" onClick={onClickEdit}>
          Edit
        </button>
        {confirmDelete ? (
          renderConfirmDeleteButtons()
        ) : deleteApiStatus === apiStatusConstants.inProgress ? (
          renderLoader()
        ) : (
          <button
            type="button"
            disabled={
              deleteApiStatus === apiStatusConstants.inProgress ? true : false
            }
            onClick={() => setConfirmDelete(true)}
          >
            DELETE
          </button>
        )}
      </div>
    </li>
  );

  const renderEditableCard = () => {
    return (
      <li className="editable-card">
        <div className="label-input-container">
          <label htmlFor="name">Business Name</label>
          <input
            id="name"
            value={nameInput}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            value={categoryInput}
            onChange={(e) => setCategory(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="description">Description</label>
          <input
            value={descriptionInput}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            value={phoneInput}
            onChange={(e) => setPhone(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={locationInput}
            onChange={(e) => setLocation(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="services">Services</label>
          <input
            id="services"
            value={servicesInput}
            onChange={(e) => setServices(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="working-hours">Working Hours</label>
          <input
            id="working-hours"
            value={workingHoursInput}
            onChange={(e) => setWorkingHours(e.target.value)}
            placeholder=""
            required={true}
          />
        </div>
        <div className="save-btn-container">{renderSavingStatus()}</div>
      </li>
    );
  };

  return business.edit ? renderEditableCard() : renderSavedView();
};

export default AdminBusinessCard;
