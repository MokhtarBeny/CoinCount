import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
const os = require('os');

const app = express();



app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());




fs.readdirSync("./src/routes").forEach((file) => {
    const isItDev = process.env.NODE_ENV === "development";
    const route = isItDev ? `./src/routes/${file}` : `./routes/${file.split(".")[0]}`
    import(route).then((route) => {
        app.use("/api", route.default);
    });
});


app.get("/api/health", (req, res) => {
    try {
        const uptime = process.uptime(); 
        const memoryUsage = process.memoryUsage();
        const healthInfo = {
            uptime: `${Math.floor(uptime / 60)} minutes ${Math.floor(uptime % 60)} seconds`,
            environment: process.env.NODE_ENV || 'development',
            health: "ok",
            system: {
                cpuLoad: os.loadavg(),
                memoryUsage: memoryUsage,
                freeMemory: os.freemem(),
                totalMemory: os.totalmem(),
            },
        };

        res.type('application/json').status(200).send(healthInfo);
    } catch (error) {
        res.status(500).send("Error");
    }
});





export default app;
