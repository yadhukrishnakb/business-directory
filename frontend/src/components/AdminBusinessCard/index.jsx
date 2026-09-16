import { useState } from "react";
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
  saveCard,
  saveApiStatus,
  deleteBusiness,
}) => {
  const [nameInput, setName] = useState(business.name);
  const [categoryInput, setCategory] = useState(business.category);
  const [descriptionInput, setDescription] = useState(business.description);
  const [phoneInput, setPhone] = useState(business.phone.join(","));
  const [locationInput, setLocation] = useState(business.location);
  const [servicesInput, setServices] = useState(business.services.join(","));
  const [workingHoursInput, setWorkingHours] = useState(business.workingHours);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const onClickEdit = () => {
    editCard(business._id);
  };
  const onClickSaveChanges = () => {
    const savedChanges = {
      name: nameInput,
      category: categoryInput,
      description: descriptionInput,
      phone: phoneInput.split(","),
      location: locationInput,
      services: servicesInput.split(","),
      workingHours: workingHoursInput,
    };
    saveCard(business._id, savedChanges);
  };

  const renderSavingStatus = () => {
    switch (saveApiStatus) {
      case apiStatusConstants.inProgress:
        return <p>Saving Changes..</p>;
      case apiStatusConstants.failure:
        return (
          <button type="button" onClick={onClickSaveChanges}>
            Retry
          </button>
        );
      default:
        return (
          <button type="button" onClick={onClickSaveChanges}>
            Save Changes
          </button>
        );
    }
  };

  const renderConfirmDeleteButtons = () => {
    return (
      <div className="confirm-button-container-admin">
        <button type="button" onClick={() => deleteBusiness(business._id)}>
          YES
        </button>
        <button type="button" onClick={() => setConfirmDelete(false)}>
          NO
        </button>
      </div>
    );
  };

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
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)}>
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
