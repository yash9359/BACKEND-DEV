// beta tum schema leke aoo // models ki user js file see
// .. ka matlb iss folder ke bahar se
const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json({
            error: "invalid id",
        });
    }

    // bina return ke bhi sidh res.json bhej sakte but return is a good parctice uske niche wala code nahi chalega\
    return res.json(user);
}
async function editUserById(req, res) {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { lastName: "Changed" },
        { new: true }
    );
    return res.json({ status: "Success", user: updatedUser });
}
async function deleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });

}

async function handleCreateUserById(req, res) {


    const body = req.body;

    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are req.." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });



    return res.status(201).json({ msg: "Success",id: result.id });


}

module.exports = {
    handleGetAllUsers,
    getUserById,
    editUserById,
    deleteUserById,
    handleCreateUserById,
};
