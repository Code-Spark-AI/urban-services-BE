import Location from "../Model/LocationModel.js";

/* 

  GET
    - ALL LOCATIONS
    - SPECIFIC LOCATION BY ID

  POST
    - CREATE A NEW LOCATION
    
  PUT
    - UPDATE A NEW LOCATION

*/

//  |-------------{ ADMIN ACCESS }---------------|

//  POST ROUTES

//  CREATE LOCATION
const createLocation = async (req, res) => {
  try {
    const { city, zipCode, locationStatus } = req.body;
    const newLocation = Location.create({
      city,
      zipCode,
      locationStatus,
    });
    res.status(201).json({
      message: "Location created successfully",
      location: newLocation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server => unable to create a location",
      error: error.message,
    });
  }
};

//  PUT ROUTES

//  UPDATE LOCATION
const updateLocationById = async (req, res) => {
  try {
    const locationId = req.params.Id;
    const { city, zipCode, locationStatus } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      { city, zipCode, locationStatus },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to update location",
      error: error.message,
    });
  }
};

// |-------------{ USER ONLY }---------------|

//  GET ROUTES

//  ALL LOCATIONS
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
  } catch (error) {
    res.status(500).json({
      message: "Sever => failed to get all locations",
      error: error.message,
    });
  }
};

// SINGLE LOCATION BY ID

const getLocationById = async (req, res) => {
  try {
    const locationId = req.params.Id;
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: "Location is not Found." });
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to get the specific location",
      error: error.message,
    });
  }
};

export { createLocation, getAllLocations, getLocationById, updateLocationById };
