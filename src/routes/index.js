const express = require("express");

const router = express.Router();

const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { getProduct, addProduct, getDetailProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { getTransaction, buyProduct } = require("../controllers/transaction");
const { register, login } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const { getCategory, addCategory, deleteCategory, updateCategory, getDetailCategory } = require("../controllers/category");
const { addProfile } = require("../controllers/profile")

// Products
router.get("/products", getProduct);
router.get("/product/:id", getDetailProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// Categories
router.get('/categories', auth, getCategory)
router.get('/category/:id', auth, getDetailCategory)
router.post('/category', auth, addCategory)
router.delete('/category/:id', auth, deleteCategory)
router.patch('/category/:id', auth, updateCategory)

// Transaction
router.get("/transactions", auth, getTransaction);
router.post("/transaction", auth, buyProduct);

// Login & Register
router.post("/register", register);
router.post("/login", login);

// Profile
router.post("/profile", auth, addProfile)

module.exports = router;
