// Init

const router = require("express").Router();

//AGENT ROUTES
router.use("/agents", require("./agents"));

// Export
module.exports = router;