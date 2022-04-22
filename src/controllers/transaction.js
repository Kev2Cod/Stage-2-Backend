const { transaction, product, user } = require("../../models")


exports.getTransaction = async(req, res) =>{
    try {
        const data = await transaction.findAll({
            attributes:{
                exclude:['idProduct','idBuyer','idSeller','createdAt', 'updatedAt']
            },
            include:[
                {
                    model: product,
                    as: "product",
                    attributes:{
                        exclude:['desc','price','qty','idUser','createdAt', 'updatedAt']
                    }
                },
                {
                    model: user,
                    as: "buyer",
                    attributes:{
                        exclude:['password','idUser','createdAt', 'updatedAt']
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes:{
                        exclude:['password','idUser','createdAt', 'updatedAt']
                    }
                }
            ]
        })
        
        res.status(200).send({
            status : "Get data Transaction Success",
            data,
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
          status: "Get data Transactions Failed",
          message: "Server Error",
        });
    }
}

exports.addTransaction = async(req, res) => {
    try {
        const data = req.body
        await transaction.create(data)
        
        res.status(200).send({
            status : "Success",
            message : "Add Transaction Success",
            data,
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
          status: "Add Transactions Failed",
          message: "Server Error",
        });
    }
}
