import appInsights from "applicationinsights";
import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./Product.js";

const app = express();

dotenv.config();

// ---- Application Insights ----
appInsights
  .setup("InstrumentationKey=9d56edda-13f7-4ba9-9461-0cf68d50032b;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/;ApplicationId=f876dbe7-9aa8-4074-84af-31c5984486cf")
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();

let telemetryClient = appInsights.defaultClient;
appInsights.defaultClient.config.samplingPercentage = 33;

// ---- Middleware ----
app.use(express.json());

// ---- CORS ----
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// ---- GET Products ----
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    // Dummy API call for dependency trace
    await axios.get("https://jsonplaceholder.typicode.com/posts/1");

    telemetryClient.commonProperties = {
      test: "This is a custom property I created",
    };

    telemetryClient.trackEvent({ name: "Products Returned" });

    return res.status(200).json({ message: products });
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ---- POST Product ----
app.post("/products", async (req, res) => {
  try {
    const { title, price } = req.body;

    telemetryClient.trackEvent({ name: "Product Added" });

    const product = new Product({ title, price });
    await product.save();

    return res.status(201).json({ message: "Successfully added product" });
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    return res.status(500).json({ error: "Failed to add product" });
  }
});

// ---- Test handled error ----
app.get("/handlederror", (req, res) => {
  try {
    const error = new Error("Dummy handled error");
    throw error;
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    console.log("I handled this error");
    return res.status(500).json({ error: "Dummy handled error captured" });
  }
});

// ---- DB Connect ----
mongoose
  .connect("mongodb+srv://koolkap33_db_user:rIn9OM9wMSZRKriR@cluster0.ibl7k7x.mongodb.net/?appName=Cluster0") 
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB Connection Error:", err));

// ---- Start Server ----
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
