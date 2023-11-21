import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(morgan('dev'));

fs.readdirSync("./src/routes").forEach((file) => {
    const isItDev = process.env.NODE_ENV === "development";
    const route = isItDev ? `./src/routes/${file}` : `./routes/${file.split(".")[0]}`
    import(route).then((route) => {
        app.use("/api", route.default);
    });
});

export default app;
