# desafio5-websockets-oliver-zapata

## Pasos para ejecutarlo

- Seleccionar el archivo app.js y abrir en terminal integrada (Es decir abrir la consola)
- Teniéndo NodeJS instalado, instalar la dependencia express con el siguiente comando: npm install express
- Instalar también las dependencias socket.io y handlebars con el comando: npm install socket.io express-handlebars
- Colocar el comando: node app.js estándo en la caperta src, si no se está en el carpeta src entonces colocar: node src/app.js
- Abrir en el navegador las rutas http://localhost:8080/api/products y http://localhost:8080/realtimeproducts 


## Guía de rutas

### http://localhost:8080/api/products

En la ruta http://localhost:8080/api/products se encuentra el método get (sin sockets), en esa ruta se verán los cambios cuando el usuario cree, actualice o borre un producto, pero la página necesita actualizarse para visualizar los cambios. También se le puede colocar un id al final como por ejemplo: http://localhost:8080/api/products/2 y se podra visualizar solo el producto con el id 2. El método que se establece en esta ruta está en el router products.router.js que está en la carpeta "api" dentro de la carpeta "routes" en "src".


### http://localhost:8080/realtimeproducts 

Es casi lo mismo que la ruta anterior solo que no se le puede colocar un id al final y con esa ruta se pueden ver los productos en la tabla en tiempo real, cuando se cree, actualice o borre un producto se verá reflejado en la tabla sin la necesidad que el usuario actualice la página. El método que se establece en esta ruta está en el router views.router.js que está en la carpeta "web" dentro de la carpeta "routes" en "src".


## Guía de métodos

En el archivo principal app.js usa 3 routers:

app.use('/realtimeproducts', viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

### Métodos del router products.router.js
### (Los métodos del router que no son tipo get se usan en una herramienta como postman)

- Método GET<br>
http://localhost:8080/api/products

- Método GET por id<br>
http://localhost:8080/api/products/:pid <br>
Una vez creado un producto se coloca su id como valor en el parámetro :pid

- Método POST<br>
http://localhost:8080/api/products <br>


- Método PUT<br>
http://localhost:8080/api/products/:pid <br>
Se actualizará el producto con el id específicado

- Método DELETE<br>
http://localhost:8080/api/products/:pid <br>
Se borrará el producto con el id específicado


### Métodos del router carts.router.js
### (Todos estos métodos de este router se se usan y visualizan en una herramienta como postman)
- Método POST<br>
http://localhost:8080/api/carts

- Método GET por ID<br>
http://localhost:8080/api/carts/1<br>
Una vez creado un carrito se coloca su id como valor en el parámetro :pid

- Método POST (para pasar un producto al carrito)<br>
http://localhost:8080/api/carts/:cid/product/:pid<br>
Aquí se usa el id del carrito en el parámetro :cid para especificar en que carrito quiero poner el producto, y se usa el id del producto en el parámetro :pid para especificar que producto a poner en el carrito

- Método DELETE (para quitar un producto del carrito)<br>
http://localhost:8080/api/carts/:cid/product/:pid<br>
Al igual que el método anterior se usa el id del carrito en el parámetro :cid para especificar de que carrito eliminar el producto, y se usa el id del producto en el parámetro :pid para especificar que producto eliminar del carrito.<br>
Cuando se elimina un producto con cierta cantidad (por ejemplo 8) esta va disminuyendo, pero si la cantidad es 1 y se ejecuta este método lo borrará al no quedar ninguna cantidad de ese producto

- Método DELETE (para eliminar carrito)<br>
http://localhost:8080/api/carts/:cid<br>
Se borrará el carrito con el carrito con el id específicado


### Métodos del router viewsRouter.js

- Método GET<br>
http://localhost:8080/realtimeproducts

viewsRouter.js solo tiene un método get que muestra todos los productos en tiempo real, y cuando se ejecuta algún método como post, put o delete del router products.router.js mediante una herramienta como postman se pueden ver reflejados los cambios en tiempo real en la tabla, poniéndo la url específicada del método en el navegador.


## Más información sobre el proyecto

- Se ven la lista de productos y la lista de carritos además de en una herramienta como postman también en los archivos products.json y carts.json dentro de la carpeta "files" en "src"

- En el archivo productManager.js está toda la lógica de los métodos de los routers products.router.js y viewsRouter.js. El archivo productManager.js se encuentra dentro de la carpeta "manager" en "src"

- Las vistas usadas para ver las tablas están en "src/views" (la vista home.handlebars es para el get sin sockets y la vista realTimeProducts.handlebars para el get con sockets)