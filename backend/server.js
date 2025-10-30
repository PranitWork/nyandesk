require("dotenv").config();

const http = require("http");
const setupSocketServer = require("./src/socket/socket.server")
const app = require("./src/app")
const connectDB = require("./src/db/db")

const httpsServer = http.createServer(app);

setupSocketServer(httpsServer);


connectDB();



httpsServer.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
