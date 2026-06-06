import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";
import authRouter from "./routes/auth.route.js";
import menuRouter from "./routes/menu.route.js";
import cartRouter from "./routes/cart.route.js";
import apiKeysRouter from "./routes/api_keys.route.js";
import ordersRouter from "./routes/orders.route.js";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

const swaggerDocs = YAML.load('./docs/docs.yml');

app.use(express.json());

app.use(logger);

app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/carts", cartRouter);
app.use("/api/keys", apiKeysRouter);
app.use("/api/orders", ordersRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

database.on("error", (error) => console.log(error));
database.once("connected", () => {
	console.log("Database connected");
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});

app.use(errorHandler);
