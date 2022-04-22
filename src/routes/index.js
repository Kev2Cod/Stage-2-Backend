const express = require("express");

const router = express.Router();

const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { getProduct, addProduct, getDetailProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { getTransaction, addTransaction } = require("../controllers/transaction");
const { register, login } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const { getCategory, addCategory, deleteCategory } = require("../controllers/category");

// Users
router.post("/user", addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Products
router.get("/products", getProduct);
router.get("/product/:id", getDetailProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// Categories
router.get('/categories', auth, getCategory)
router.post('/category', auth, addCategory)
router.delete('/category/:id', auth, deleteCategory)

// Transaction
router.get("/transactions", getTransaction);
router.post("/transaction", addTransaction);

// Login & Register
router.post("/register", register);
router.post("/login", login);

module.exports = router;
