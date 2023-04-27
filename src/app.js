import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import cartsRouter from './routes/api/carts.router.js';
import productsRouter from './routes/api/products.router.js';
import viewsRouter from './routes/web/views.router.js'
import { Server } from "socket.io";
import productManager from './manager/productManager.js';

const app = express();
const productManagerInstance = new productManager();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

app.use(express.static(__dirname+"/public"));

app.use('/realtimeproducts', viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const server = app.listen(8080,()=>console.log("Listening on 8080"));

const io = new Server(server)

io.on("connection", async socket => {  
    socket.emit("showProducts", await productManagerInstance.listAll());
});

app.set('socketio', io);
io.sockets.setMaxListeners(20);