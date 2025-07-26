const router = require("express").Router();
const validate = require("../middleware/validate");
const schema = require("../validators/auth");
const auth = require("../controllers/auth");

router.post("/register", validate(schema.register), auth.register);
router.post("/login", validate(schema.login), auth.login);

module.exports = router;
