import { readProducts, writeProducts } from '../files/utils__products.js';

//------------ Función para verificar si la propiedad thumbnail está repetida  ------------
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
//------------ Función para verificar si la propiedad thumbnail está repetida  ------------

class productManager {
    constructor() {
        this.productsArray = readProducts();
    }

//################## Listar por ID ##################
    list(idProd) {
        return this.productsArray.findIndex(prod => prod.id === idProd);
    }
//################## Listar por ID ##################


//################## Listar todo ##################
    listAll() {
        return [...this.productsArray];
    }
//################## Listar todo ##################


//################## Actualizar ##################
    update(idProd, product){

        if ('id' in product) {
            console.error({ status: 'error', error: 'It is not allowed to set the id field manually' });
            return;
        }
    
        if ('status' in product) {
            console.error({ status: 'error', error: 'It is not allowed to set the status field manually' });
            return;
        }
    
        if ('code' in product) {
            console.error({ status: 'error', error: 'It is not allowed to set the code field manually' });
            return;
        }

        const allowedProperties = new Set(['title', 'description', 'price', 'thumbnail', 'stock', 'category']);
        for (const property in product) {
            if (!allowedProperties.has(property)) {
                console.error({ status: 'error', error: `Property ${property} is not allowed, only 'title', 'description', 'price', 'thumbnail', 'stock', 'category' properties are allowed` })
                return;
            }
        }
        
        const prod = product;
        const productsArrayId = idProd;

        const index = this.productsArray.findIndex(p => p.id === productsArrayId);

        const existingProduct = this.productsArray.find((p, i) =>
        i !== index &&
        (p.title === prod.title ||
        p.description === prod.description ||
        arraysEqual(p.thumbnail, prod.thumbnail))
        );

        if(!prod.title || !prod.description || !prod.price || !prod.thumbnail || !prod.stock ||!prod.category) {
            console.error({ status: 'error', error: 'incomplete values' })
            return;
        }

        if(!Array.isArray(prod.thumbnail)){
            console.error({ status: 'error', error: 'thumbnail must be an array' });
            return;
        }

        if (index !== -1) {
            if (!existingProduct) {
                prod.status = true;
                prod.code = true;
                prod.id = productsArrayId;
                this.productsArray[index] = prod;
                writeProducts(this.productsArray);
                console.log({ status: 'success', message: 'product updated' });
                return;
            } else {
                let errorMessage = 'There is already a product with';
                if (existingProduct.title === prod.title) {
                    errorMessage += ` the title "${prod.title}"`;
                }
                if (existingProduct.description === prod.description) {
                    errorMessage += ` the description "${prod.description}"`;
                }
                if (arraysEqual(existingProduct.thumbnail, prod.thumbnail)) {
                    errorMessage += ` the thumbnail "${prod.thumbnail}"`;
                }

                console.error({ status: 'error', message: errorMessage });
                return;
            }
        } else {
            console.error({ status: 'error', message: 'The product does not exist' });
            return;
        }
    }
//################## Actualizar ##################


//################## Crear ##################
    create(product){

        if ('id' in product) {
            console.error({ status: 'error', error: 'It is not allowed to set the id field manually' });
            return;
        }
    
        if ('status' in product) {
            console.error({ status: 'error', error: 'It is not allowed to set the status field manually' });
            return;
        }
    
        if ('code' in product) {
            console.error({ status: 'error', error: 'It is not allowed to set the code field manually' });
            return;
        }

        const allowedProperties = new Set(['title', 'description', 'price', 'thumbnail', 'stock', 'category']);
        for (const property in product) {
            if (!allowedProperties.has(property)) {
                console.error({ status: 'error', error: `Property ${property} is not allowed, only 'title', 'description', 'price', 'thumbnail', 'stock', 'category' properties are allowed` })
                return;
            }
        }

        const maxId = Math.max(0, ...this.productsArray.map(p => p.id));
        product.id = maxId + 1;

        const existingProduct = this.productsArray.find((p, i) =>
        i !== product.id &&
        (p.title === product.title ||
        p.description === product.description ||
        arraysEqual(p.thumbnail, product.thumbnail))
        );

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.stock ||!product.category ) {
            console.error({ status: 'error', error: 'incomplete values' })
            return;
        }

        if(!Array.isArray(product.thumbnail)){
            console.error({ status: 'error', error: 'thumbnail must be an array' });
            return;
        }

        if (existingProduct) {
            let errorMessage = 'There is already a product with';
            if (existingProduct.title === product.title) {
                errorMessage += ` the title "${product.title}"`;
            }
            if (existingProduct.description === product.description) {
                errorMessage += ` the description "${product.description}"`;
            }
            if (arraysEqual(existingProduct.thumbnail, product.thumbnail)) {
                errorMessage += ` the thumbnail "${product.thumbnail}"`;
            }
            console.error({ status: 'error', message: errorMessage });
            return;
        } else {
            product.status = true;
            product.code = true;
            this.productsArray.push(product);
    
            writeProducts(this.productsArray);
            console.log({ status: 'success', product })
            return;
        }
    }
//################## Crear ##################


//################## Eliminar ##################
    delete(idProd){
            const index = this.productsArray.findIndex(prod => prod.id === idProd)
            
            if(index !== -1) {
                this.productsArray.splice(index, 1);
        
                this.productsArray.forEach((p, index) => {
                    p.id = index + 1;
                });
                writeProducts(this.productsArray);
            } 
    }
//################## Eliminar ##################
}

export default productManager;