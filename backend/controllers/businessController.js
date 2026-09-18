const Business = require("../models/Business");

const getBusinesses = async (request, response) => {
  try {
    const business = await Business.find();
    if (business.length === 0) {
      return response.status(404).json({ message: "Empty!" });
    }
    return response.status(200).json({ business });
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

const updateBusiness = async (request, response) => {
  try {
    const { id, savedChanges } = request.body;
    //console.log(request.body);
    const updatedBusiness = await Business.findOneAndUpdate(
      { _id: id },
      { $set: savedChanges },
      { returnDocument: "after" },
    );

    if (!updatedBusiness) {
      return response.status(404).json({ message: "Business not found" });
    }

    return response
      .status(200)
      .json({ message: "Changes Saved", updatedBusiness });
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

const deleteBusiness = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBusiness = await Business.findOneAndDelete({ _id: id });

    if (!deletedBusiness) {
      return response.status(404).json({ message: "Business Not Found" });
    }

    const businesses = await Business.find();

    return response
      .status(200)
      .json({ message: "Business deleted successfully!", businesses });
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

const addBusiness = async (request, response) => {
  try {
    const {
      name,
      category,
      description,
      phone,
      location,
      services,
      workingHours,
    } = request.body;
    const addedBusiness = new Business({
      name,
      category,
      description,
      phone,
      location,
      services,
      workingHours,
    });

    // console.log(addedBusiness);

    const savedBusiness = await addedBusiness.save();
    return response
      .status(201)
      .json({ message: "Business added successfully!", savedBusiness });
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

module.exports = { getBusinesses, updateBusiness, deleteBusiness, addBusiness };
