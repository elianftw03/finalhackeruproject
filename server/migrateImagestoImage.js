const mongoose = require("mongoose");
const Pet = require("./models/Pet");
require("dotenv").config();

mongoose.connect(process.env.DB_URI).then(async () => {
  const pets = await Pet.find({
    images: { $exists: true, $not: { $size: 0 } },
  });

  for (const pet of pets) {
    const firstImage = pet.images[0];
    if (firstImage) {
      pet.image = firstImage;
      delete pet.images;
      await pet.save();
      console.log(`✅ Fixed pet: ${pet.name}`);
    }
  }

  console.log("✅ Done updating pets.");
  process.exit();
});
