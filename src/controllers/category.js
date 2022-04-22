const { category } = require("../../models");

// ============== GET CATAGORY ===============
exports.getCategory = async (req, res) => {
    try {
        const categories = await category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(200).send({
            status: "Success",
            message: "Get all category success",
            data: {
                categories
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Get data Failed",
            message: "Server Error",
        });
    }
};

// ============== ADD CATEGORIES ===============
exports.addCategory = async (req, res) => {
    try {
        let newCategory = await category.create(req.body);

        res.status(200).send({
            status: "Success",
            message: "Add Category Success",
            data: {
                category: {
                    id: newCategory.id,
                    name: newCategory.name
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Add Category Failed",
            message: "Server Error",
        });
    }
};

// ============ GET DETAIL PRODUCT ========
exports.getDetailProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const products = await product.findOne({
            where: { id },
            include: [
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        modul: productCategory,
                        as: "bridge",
                    },
                    attributes: {
                        exclude: ["idUser", "createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["idUser", "createdAt", "updatedAt"],
            },
        });

        res.status(200).send({
            status: "Success",
            message: `Get detail product: ${id} success`,
            data: {
                products: products,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Get detail data failed",
            message: "Server Error",
        });
    }
};

// ============ UPDATED PRODUCT ========
exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const data = req.body;
        let updateProduct = await product.update(
            {
                ...data,
                image: req.file.filename,
                idUser: req.user.id,
            },
            { where: { id } }
        );
        console.log('update product: ' + updateProduct)

        updateProduct = JSON.parse(JSON.stringify(updateProduct));

        updateProduct = {
            ...updateProduct,
            image: process.env.FILE_PATH + updateProduct.image,
        };

        res.status(200).send({
            status: "Success",
            message: `Update product at id: ${id} success`,
            data: {
                products: updateProduct,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Updated product failed",
            message: "Server Error",
        });
    }
};

// ============ DELETE CATEGORIES ===========
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await category.destroy({
            where: { id },
        });

        console.log(data)

        res.status(200).send({
            status: "Success",
            message: `Delete category: ${id} success`,
            data: {
                id: { id }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: "Delete category failed",
            message: "Server Error",
        });
    }
};

