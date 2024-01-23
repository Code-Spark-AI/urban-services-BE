import SubCategory from "../Model/SubcategoryModel.js";

/*

  |-------------{ USER ONLY }---------------|

  GET 
    - ALL SUBCATEGORIES
    - SPECIFIC SUBCATEGORIES

  |-------------{ ADMIN ACCESS }---------------|

  POST
     - CREATE SUBCATEGORY

  PUT
     - UPDATE SUBCATEGORY
  DELETE
     - DELETE SUBCATEGORY
*/

// |-------------{ ADMIN ACCESS }---------------|

// POST ROUTES

// CREATE SUBCATEGORY
const createSubCategory = async (req, res) => {
  try {
    const { Subcategoryname, category_id } = req.body;

    const newSubCategory = await SubCategory.create({
      Subcategoryname,
      category_id,
    });

    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to create sub-category",
      error: error.message,
    });
  }
};

// PUT ROUTES

// UPDATE SUBCATEGORY
const updateSubCateegory = async (req, res) => {
  try {
    const subCategoryId = req.params.Id;
    const { Subcategoryname, category_id } = req.body;

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { Subcategoryname, category_id },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: "Sub-category is not found" });
    }

    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to update sub-category",
      error: error.message,
    });
  }
};

// DELETE ROUTES

// DELETE SUBCATEGORY
const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.Id;

    const deletedSubCategory = await SubCategory.findByIdAndDelete(
      subCategoryId
    );

    if (!deletedSubCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    res.status(200).json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to delete sub-category",
      error: error.message,
    });
  }
};

// |-------------{ USER ONLY }---------------|

// GET ROUTES

// ALL SUBCATEGORIES
const getAllSubCategories = async (req, res) => {
  try {
    const {
      location_id,
      category_id,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    let query = {};

    // Validate location_id and category_id
    const isValidObjectId = mongoose.Types.ObjectId.isValid;
    if (location_id && !isValidObjectId(location_id)) {
      return res.status(400).json({ message: "Invalid location_id" });
    }
    if (category_id && !isValidObjectId(category_id)) {
      return res.status(400).json({ message: "Invalid category_id" });
    }

    // Apply optional filters by location_id and category_id
    if (location_id) {
      query.location_id = location_id;
    }
    if (category_id) {
      query.category_id = category_id;
    }

    // Pagination and sorting options
    const skip = (page - 1) * limit;
    const sortOptions = { [sortBy]: sortOrder };

    const subCategories = await SubCategory.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to retrieve sub-categories",
      error: error.message,
    });
  }
};

// SPECIFIC SUBCATEGORY WITH ID

const getSubCategoryById = async (req, res) => {
  try {
    const subCategoryId = req.params.Id;

    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category IS not found" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({
      message: "Server => failed to retrieve sub-category",
      error: error.message,
    });
  }
};

export {
  createSubCategory,
  updateSubCateegory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
};
