import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.resolve(__dirname, 'products.json');

export function readProducts() {
    const data = fs.readFileSync(productsFilePath, {encoding: 'utf-8', flag: 'r'});
    return JSON.parse(data);
}

export function writeProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
}

/* [{"title":"Silla de oficina","description":"Silla de oficina en excelente estado","price":2000,"thumbnail":["https://i.ibb.co/P9Ytc2W/1-Silla-de-oficina.png"],"stock":20,"category":"Productos del hogar","id":1,"status":true,"code":true},{"title":"Smartwatch","description":"reloj digital deportivo","price":3000,"thumbnail":["https://i.ibb.co/0rzKD6R/23-Smartwatch.png"],"stock":15,"category":"Electrodomésticos","id":2,"status":true,"code":true}] */




