document.addEventListener('DOMContentLoaded', ()=>{
    let entrantes = loadEntrantes();
    let food = loadPlatos();
    let desserts = loadPostres();
    let body = document.querySelector('body');
    let inicialButton = document.createElement('button');
    let arrayFoodSelected = [];
    let totalCuenta = 0;
    
    inicialButton.textContent = 'See menu';
    inicialButton.setAttribute('class', 'btn');

    body.appendChild(inicialButton);

    inicialButton.addEventListener('click', ()=>{
        inicialButton.style.display= "none";
        showCard();
        showFood(entrantes, "Entrantes");
        showFood(food, "Primeros platos");
        showFood(desserts, "Postres");
    });

    function showFood(food, tableTitle){
        let foodTable = createTable();
        let divCarta = document.createElement('div');   
        divCarta.classList.add('cardFood');
        let cardTitle = document.createElement('h2');
        cardTitle.textContent = tableTitle;
        divCarta.append(cardTitle);

        food.forEach(element => {
            let foodItem = createFoodItem(element);
            foodTable.append(foodItem);
        });
             
        divCarta.append(foodTable);
        body.append(divCarta);        
    }

    function createFoodItem(element){
        let foodItem = document.createElement('tr');
        let foodName = document.createElement('td');
        let foodPrice = document.createElement('td');
        let addToCartButton = document.createElement('button');

        addToCartButton.textContent = "ADD TO CART";
        addToCartButton.className = "addCartButton";
        foodItem.classList.add('food');

        foodName.textContent = element.name;
        foodPrice.textContent = element.price + "€";
        addToCartButton.id = "btn-" + element.id;

        addToCartButton.addEventListener('click', () =>{
            if(addToCartButton.className == "addCartButton"){
                totalCuenta += parseFloat(element.price); 
                arrayFoodSelected.push(element);
            }else{
                totalCuenta -= parseFloat(element.price);
            }
            updateCard(addToCartButton.id, element.id);
        });

        foodItem.append(foodName, foodPrice, addToCartButton);
        return foodItem;
    }

    function createOrderFoodItem(element){
        let foodItem = document.createElement('tr');
        let foodName = document.createElement('td');
        let foodPrice = document.createElement('td');
        foodItem.classList.add('food');

        foodName.textContent = element.name;
        foodPrice.textContent = element.price + "€";

        foodItem.append(foodName, foodPrice);
        return foodItem;
    }

    function createTable(){            
        let foodTable = document.createElement('table');
        let trHeader = document.createElement('tr');
        let nameHeader = document.createElement('th');
        let priceHeader = document.createElement('th');
        nameHeader.textContent = 'Nombre';
        priceHeader.textContent = 'Precio';
        trHeader.append(nameHeader, priceHeader);
        foodTable.append(trHeader);

        return foodTable;
    }

    function showCard(){
            let foodTable = document.createElement('table');
            foodTable.id = "orderId";
            let divCarta = document.createElement('div');   
            divCarta.classList.add('cardFoodSelected');
            let cardTitle = document.createElement('h2');
            cardTitle.textContent = "Cuenta";
            divCarta.append(cardTitle);
            foodTable.textContent = "Todavía no has seleccionado ningún plato.";
                             
            divCarta.append(foodTable);
            body.append(divCarta);  

            let btnPay = document.createElement('button');
            btnPay.id = "btnPay";
            btnPay.className = "buttonPay";
            btnPay.style.display = "none";
            divCarta.append(btnPay);
    }

    function updateCard(btnId, id){
        let btnOrder = document.getElementById(btnId);
        let orderTable = document.getElementById('orderId');

        orderTable.innerHTML = "";
        
        if(btnOrder.className == "addCartButton"){
            
            arrayFoodSelected.forEach(element=>{
                let foodItem = createOrderFoodItem(element);
                orderTable.append(foodItem);
            });

            btnOrder.className = "deleteCartButton";
            btnOrder.textContent = "TAKE FROM CART";
        }else{
            btnOrder.className = "addCartButton";
            btnOrder.textContent = "ADD TO CART";
            let found = false;
            let i = 0;
            while(i < arrayFoodSelected.length && !found){
                if(arrayFoodSelected[i].id == id){
                    arrayFoodSelected.splice(i, 1);
                    found = true;
                }
                i++;
            }
            arrayFoodSelected.forEach(element=>{
                let foodItem = createOrderFoodItem(element);
                orderTable.append(foodItem);
            });
        }

        let btnPay = document.getElementById("btnPay");
        if(arrayFoodSelected.length == 0){
            btnPay.style.display = "none";
            orderTable.textContent = "Todavía no has seleccionado ningún plato.";
        }else{
            btnPay.style.display = "block";
        }
            
            btnPay.innerHTML = "";

        btnPay.textContent = "Total a pagar: " + totalCuenta.toFixed(2) + "€";
    }
});