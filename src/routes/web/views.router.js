import {Router} from 'express'
import productManager from '../../manager/productManager.js';
import { readProducts, writeProducts } from '../../files/utils__products.js';

const router = Router();
const productManagerInstance = new productManager();

//################## Método GET / CON SOCKETS ##################
router.get('/', async (req, res) => { 
    const io = req.app.get('socketio');
    const data = await productManagerInstance.listAll();
    io.emit("showProducts", data);
    res.render('realTimeProducts', { data: readProducts() }); 
});
//################## Método GET CON SOCKETS ##################

export default router;


