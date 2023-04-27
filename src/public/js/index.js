console.log('Cliente conectado');
const socket = io();
const productsContainer = document.getElementById('products-container');
socket.on('showProducts', data => {
    console.log("Antes"+ JSON.stringify(data));

    productsContainer.innerHTML = ``

    data.forEach(prod => {
        productsContainer.innerHTML += `
        <tr><td><p class="TableText">${prod.id}</p></td>
            <td><p class="TableText">${prod.title}</p></td>
            <td><p class="TableText">${prod.description}</p></td>
            <td><p class="TableText">${prod.price}</p></td>
            <td><p class="TableText">${prod.thumbnail}</p></td>
            <td><p class="TableText">${prod.stock}</p></td>
            <td><p class="TableText">${prod.category}</p></td>
            <td><p class="TableText">${prod.status}</p></td>
            <td><p class="TableText">${prod.code}</p></td>
        </tr>
        `
    })
    console.log("Después"+ JSON.stringify(data));
})
window.addEventListener('beforeunload', function (event) {
    fetch('/realtimeproducts');
});
