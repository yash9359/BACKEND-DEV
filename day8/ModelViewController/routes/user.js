const express = require("express");

const {
    handleGetAllUsers,
    handleCreateUserById,
    getUserById,
    editUserById,
    deleteUserById,
} = require("../controllers/user");
// yaha app.get direct const app = express() se kaam nahi chalega
const router = express.Router();

/// REST API
router.route("/").get(handleGetAllUsers).post(handleCreateUserById);

router
    .route("/:id")
    .get(getUserById)
    .patch(editUserById)
    .delete(deleteUserById);

module.exports = router;
