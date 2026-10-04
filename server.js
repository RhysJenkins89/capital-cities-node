const app = require("./app");
const config = require("./config/config");
const database = require("./database/database");

(async () => {
  try {
    await database();
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}.`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
})();
