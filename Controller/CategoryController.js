import Category from "../Model/CategoryModel.js";

/*      
    |-------------{ ADMIN ACCESS }---------------|

    POST
    
     - CREATE CATEGORY

    PUT

     - UPDATE CATEGORY

    DELETE

     - DELETE CATEGORY
    

    |------------{ USER ONLY }--------------------|
    GET

     - ALL CATEGORIES
     - SPECIFIC CATEGORY BY ID 
     - CATEGORY BY SPECIFIC LOCATION

*/

// |-------------{ ADMIN ACCESS }---------------|

//  POST ROUTES

//  CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { CategoryName, Description, locations } = req.body;

    if (!CategoryName) {
      return res.status(400).json({ message: "CategoryName must be required" });
    }
    const newCategory = await Category.create({
      CategoryName,
      Description,
      locations: locations || [],
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to create category",
      error: error.message,
    });
  }
};

// PUT ROUTES

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.Id;
    const { CategoryName, Description, locations } = req.body;
    if (!CategoryName) {
      return res.status(400).json({ message: "CategoryName must be required" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { CategoryName, Description, locations: locations || [] }, // Ensure locations is an array, default to empty array
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ updatedCategory, message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to update category",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY LOCATION ARRAY
const updateCategoryLocation = async (req, res) => {
  try {
    const categoryId = req.params.Id;
    const { locations } = req.body;

    // Validate that locations is an array
    if (!Array.isArray(locations)) {
      return res.status(400).json({ message: "Locations must be an array" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { locations },
      { new: true }
    ).populate("locations");

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update category locations",
      error: error.message,
    });
  }
};

// DELETE ROUTES

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.Id;
    const isDeletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!isDeletedCategory) {
      return res.status(404).json({ message: "Category is not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to delete category",
      error: error.message,
    });
  }
};

// |------------{ USER ONLY }--------------------|

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("location");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server => failed to get categories" });
  }
};

// Get a specific category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.Id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category is not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server => Failed to get the specifc category" });
  }
};

// Get a categories by location
const getCategoriesWithLocation = async (req, res) => {
  try {
    const { location_id } = req.params.Id;
    let query = {};
    // optional filter by location_id
    if (location_id) {
      query.locations = { $in: [location_id] };
    }
    const categories = await Category.find(query).populate("locations");

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to get categories",
      error: error.message,
    });
  }
};
export {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesWithLocation,
  getCategoryById,
  updateCategoryLocation,
  updateCategory,
};
