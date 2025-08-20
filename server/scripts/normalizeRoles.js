require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.DB_URI);
  const User = mongoose.model(
    "User",
    new mongoose.Schema({}, { strict: false, collection: "users" })
  );
  const res = await User.updateMany(
    { role: "user" },
    { $set: { role: "regular" } }
  );
  console.log("updated:", res.modifiedCount);
  await mongoose.disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
