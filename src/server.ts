require("dotenv").config(); // Load environment variables

import app from "./services/app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
