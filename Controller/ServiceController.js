import Service from "../Model/ServiceModel.js";

/*

  |-------------{ ADMIN ACCESS }---------------|

    POST
     - CREATE SERVICE

    PUT
     - UPDATE SERVICE
    DELETE
     - DELETE SERVICE
  |-------------{ USER ONLY }---------------|

    GET 
     - ALL SERVICES
     - SPECIFIC SERVICE WITH ID

*/

// |-------------{ ADMIN ACCESS }---------------|

// POST ROUTES

// CREATE SERVICE
const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      location_id,
      category_id,
      sub_category_id,
      price,
      ratings,
      employee,
      companyName,
      duration,
      tags,
    } = req.body;
    const newService = Service.create({
      name,
      description,
      location_id,
      category_id,
      sub_category_id,
      price,
      ratings,
      employee,
      companyName: companyName || "",
      duration,
      tags,
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to create service",
      error: error.message,
    });
  }
};

// PUT ROUTES

// UPDATE SERVICE
const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const existingService = await Service.findById(serviceId);

    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    const {
      name,
      description,
      location_id,
      category_id,
      sub_category_id,
      price,
      ratings,
      employee,
      companyName,
      duration,
      tags,
    } = req.body;

    // UPDATE PROPERTIES
    existingService.set({
      name,
      description,
      location_id,
      category_id,
      sub_category_id,
      price,
      ratings,
      employee,
      companyName,
      duration,
      tags,
    });
    const updatedService = await existingService.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to update service",
      error: error.message,
    });
  }
};

// DELETE ROUTES

// DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.Id;
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService)
      return res.status(404).json({ message: "Service is not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Service => failed to delete service",
      error: error.message,
    });
  }
};

// |-------------{ USER ONLY }---------------|

// GET ROUTES

// ALL SERVICES
const getAllServices = async (req, res) => {
  try {
    const {
      location_id,
      category_id,
      sub_category_id,
      keyword,
      page,
      sort,
      order,
      page_size,
    } = req.body;
    let query = {};

    // Optional filters
    if (location_id) {
      query.location_id = location_id;
    }
    if (category_id) {
      query.category_id = category_id;
    }
    if (sub_category_id) {
      query.sub_category_id = sub_category_id;
    }
    if (keyword) {
      query.name = { $regx: keyword, $options: "i" };
    }

    //  Pagination
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * page_size;

    //  Sorting
    const sortField = sort || "createdAt";
    const sortOrder = order === "desc" ? -1 : 1;

    const services = await Service.find(query)
      .skip(skip)
      .limit(page_size || 16)
      .sort({ [sortField]: sortOrder });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to get services",
      error: error.message,
    });
  }
};

// SPECIFIC SERVICE WITH ID
const getSingleService = async (req, res) => {
  try {
    const serviceId = req.params.Id;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service is not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to get service",
      error: error.message,
    });
  }
};

export {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getSingleService,
};
