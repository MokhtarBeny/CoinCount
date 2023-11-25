import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

const app = express();
app.use(morgan('dev'));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors());


fs.readdirSync("./src/routes").forEach((file) => {
    const isItDev = process.env.NODE_ENV === "development";
    const route = isItDev ? `./src/routes/${file}` : `./routes/${file.split(".")[0]}`
    import(route).then((route) => {
        app.use("/api", route.default);
    });
});

export default app;
