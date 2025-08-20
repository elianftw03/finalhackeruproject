const app = require("./app");
const PORT = process.env.PORT || 5050;
const morgan = require("morgan");
app.use(morgan("dev"));

app.listen(PORT, "localhost", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
