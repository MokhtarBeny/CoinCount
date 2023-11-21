import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(morgan('dev'));

fs.readdirSync("./src/routes").forEach((file) => {
    import(`./routes/${file}`).then((route) => {
        app.use("/api", route.default);
    });
});

export default app;
