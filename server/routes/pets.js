const router = require("express").Router();
const ctrl = require("../controllers/pets");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const petSchema = require("../validators/pet");

router.get("/", ctrl.getAll);

router.get("/favorites", auth, role("regular"), ctrl.getFavorites);
router.patch("/:id/favorite", auth, role("regular"), ctrl.toggleFavorite);

router.get("/my-pets", auth, role("shelter", "admin"), ctrl.getMyPets);

router.post(
  "/",
  auth,
  role("shelter", "admin"),
  validate(petSchema),
  ctrl.create
);
router.put(
  "/:id",
  auth,
  role("shelter", "admin"),
  validate(petSchema),
  ctrl.update
);
router.patch("/:id", auth, role("shelter", "admin"), ctrl.patch);
router.delete("/:id", auth, role("shelter", "admin"), ctrl.remove);

router.get("/:id", ctrl.getOne);

module.exports = router;
