function subscribeNewsletter() {
            alert("You've been added to our Newsletter!");
        }

var cart = [];
    var subtotalAmount = 0.00;
    
    function incrementQuantity(itemId) {
        var itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity++;
            updateCart();
        }
    }

    function decrementQuantity(itemId) {
        var itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
            updateCart();
        }
    }
    
    //finds the name of the items that in the same place as 'itemId' then assign it the variable 'itemIndex'. adds an if else loop that adds itemId, itemName, and itemPrice, and quantity to the cart variable
    function addToCart(itemId, itemName, itemPrice) {
        var itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
        } else {
            cart[itemIndex].quantity++;
        }
        updateCart();
    }
    
    //calculates tax
    function calculateTax(subtotal) {
    var taxRate = 0.08;
    return subtotal * taxRate;
    }
    
    function checkout() {
        var cartItemsMessage = 'Shopping Cart:\n';
        cart.forEach(item => {
            cartItemsMessage += `${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });

        var confirmation = confirm(`${cartItemsMessage}\nDo you want to proceed with the purchase?`);

        if (confirmation) {
            alert('Purchase successful!');
        } 
        else {
            alert('Purchase canceled.');
        }
    }
    
    //finds the id with 'cartItems' and 'subtotal amount', assigns it a new variable, same for the rest of the id's. clears the previous cart items and the subtotal amount. a loop that checks the cart and adds to 'li' while updating the subtotal amount
    function updateCart() {
        var cartItemsElement = document.getElementById('cartItems');
        var subtotalAmountElement = document.getElementById('subtotalAmount');
        var taxesElement = document.getElementById('taxes');
        var totalAmountElement = document.getElementById('totalAmount');

        cartItemsElement.innerHTML = '';
        subtotalAmount = 0.00;

        cart.forEach(item => {
            var li = document.createElement('li');
            li.textContent = `${item.name} - $${(item.price * item.quantity).toFixed(2)}`;

            // Add quantity input field
            var quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.addEventListener('change', function () {
                if (this.value < 1) this.value = 1;
                item.quantity = parseInt(this.value);
                updateCart();
            });

            // Add increment and decrement buttons
            var incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.addEventListener('click', function () {
                incrementQuantity(item.id);
            });

            var decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.addEventListener('click', function () {
                decrementQuantity(item.id);
            });

            li.appendChild(quantityInput);
            li.appendChild(incrementButton);
            li.appendChild(decrementButton);

            cartItemsElement.appendChild(li);
            subtotalAmount += item.price * item.quantity;
        });

        var taxAmount = calculateTax(subtotalAmount);
        var totalAmount = subtotalAmount + taxAmount;

        subtotalAmountElement.textContent = subtotalAmount.toFixed(2);
        taxesElement.textContent = taxAmount.toFixed(2);
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }
    
    function sendMessage() {
            alert("Message sent!");
        }
