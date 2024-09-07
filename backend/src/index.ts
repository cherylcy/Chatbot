import app from "./app.js";
import { connectToDB } from "./db/connections.js";

// connections and listnerers
const PORT = process.env.PORT || 5000;
connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log("Server Open & Connected To Database"));
  })
  .catch((err) => console.log(err));
