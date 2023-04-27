import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartsFilePath = path.resolve(__dirname, 'carts.json');

export function readCarts() {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
}

export function writeCarts(carts) {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
}



