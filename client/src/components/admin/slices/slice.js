import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  createProduct: {},
  categories: [],
  newCategory: {},
  imageFilesData: null,
  imageUrls: [],
  updateProduct: {},
  deleteProductId: "",
  categoryInfo: null,
  targetCategoryId: "",
  openEditCategoryModal: false,
  deleteCategoryId: "",
  openDeleteCategoryModal: false,
  allOrders: [],
  updatedOrder: "",
};

export const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    getProducts: (state) => {
      state.isLoading = true;
    },
    storeProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    createProduct: (state, action) => {
      state.isLoading = true;
      state.createProduct = action.payload;
    },
    fetchCategories: (state) => {
      state.isLoading = true;
    },
    storeCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    createCategory: (state, action) => {
      state.isLoading = true;
      state.newCategory = action.payload;
    },
    getImageFilesData: (state, action) => {
      state.isLoading = true;
      state.imageFilesData = action.payload;
    },
    storeImageFileUrls: (state, action) => {
      state.imageUrls = action.payload;
      state.isLoading = false;
    },
    storeUpdateProductInfo: (state, action) => {
      state.isLoading = true;
      state.updateProduct = action.payload;
    },
    handleDeleteProduct: (state, action) => {
      state.isLoading = true;
      state.deleteProductId = action.payload;
    },

    getCategoryDataById: (state, action) => {
      state.isLoading = true;
      state.targetCategoryId = action.payload;
      state.openEditCategoryModal = true;
    },
    storeCategoryInfo: (state, action) => {
      state.categoryInfo = action.payload?.category;
      state.isLoading = false;
    },
    closeEditCategoryModal: (state) => {
      state.openEditCategoryModal = false;
    },
    updateCategory: (state, action) => {
      state.categoryInfo = action.payload;
    },
    deleteCategory: (state, action) => {
      state.isLoading = true;
      state.openDeleteCategoryModal = true;
      state.deleteCategoryId = action.payload;
    },
    closeDeleteCategoryModal: (state) => {
      state.openDeleteCategoryModal = false;
    },
    resetData: (state, action) => {
      state.imageFilesData = null;
      state.updateProduct = {};
      state.imageUrls = [];
      state.createProduct = {};
      state.deleteProductId = "";
      state.deleteCategoryId = "";
    },
    fetchAllOrders: (state) => {
      state.isLoading = true;
    },
    storeAllOrders: (state, action) => {
      state.allOrders = action.payload;
      state.isLoading = false;
    },
    updateOrder: (state, action) => {
      state.updatedOrder = action.payload;
    },
  },
});

export const AdminProducts = (state) => state.adminProducts;

export default AdminProductsSlice;
