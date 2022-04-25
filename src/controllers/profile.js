const { profile } = require("../../models")


// ============ ADD PROFILE ===============
exports.addProfile = async (req, res) => {
    try {
        let data = req.body
        const addProfile = await profile.create({
            ...data,
            idUser: req.user.id
        })

        console.log(addProfile)

        res.status(200).send({
            status: "Success",
            message: "Add profile success",
            data: {
                profile: {
                    addProfile
                }
            }
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: "Failed",
            message: "Server Error",
        });
    }
}