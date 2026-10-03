// import * as dotenv from "dotenv";
// dotenv.config();

// const { URI, PORT, SECRET_ACCESS_TOKEN } = process.env;

// export { URI, PORT, SECRET_ACCESS_TOKEN };

const config = {
  port: process.env.port || 3000,
  corsOrigin:
    process.env.NODE_ENV === "production"
      ? "https://cities.rhysjenkins.uk"
      : "http://localhost:5173",
};

module.exports = config;
