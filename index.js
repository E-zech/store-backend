import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import morgan from 'morgan';
import { coloredStatus } from './configs/morganConfig.js';
import { initialDataStart } from './initial-data/initial-data.js';
import { getContent } from './configs/contentConfig.js';
import logMiddleware from './middleware/logMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cardRoutes from './routes/cartRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import dotenv from 'dotenv';

// Environment setup
const env = dotenv.config({ path: './.env' }); // for mongoDb Atlas use path: './prod.env'
const port = env.parsed.PORT || 5000;

// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(env.parsed.REMOTE_URL);
        console.log(chalk.green(`mongodb connection established on port : ${chalk.bgGreen('27017')}`));
        await initialDataStart();
    }
    catch (err) {
        console.error(chalk.bgRed(err));
    }
}
main();

// Express App Config
const app = express();
app.use(express.json());

app.use(cors({
    origin: true,
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.use(express.static("public"));

// Morgan Config
morgan.token('coloredStatus', coloredStatus);
app.use(morgan(':coloredStatus :response-time ms'));

// Routes and Middleware
app.use(logMiddleware);
app.get('/', (req, res) => res.send(`Welcome 😊 \n Project NodeJs + MongoDb, 2024`));
userRoutes(app);
productRoutes(app);
cardRoutes(app);
ordersRoutes(app);

// Server Listening
app.listen(port, () => {
    console.log(chalk.green(`app is listening to port : ${chalk.bgGreen(port)}`));
});

// Error Handling 
app.all("*", async (req, res) => {
    const combinedContent = await getContent(res);
    res.send(combinedContent);
});  