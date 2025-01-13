import { menuArray } from "./data.js"

const menuItems = document.getElementById("menu")
const orderItems = document.getElementById("order")
const payformModal = document.getElementById("pay-form")
const form = document.getElementById("form")

let order = []
const order2 = order
order = []

let totalPrice = 0

//TARGET

document.addEventListener("click", e => {
    if(e.target.dataset.add){
        addItemOrder(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        removeItemOrder(e.target.dataset.remove)
    }else if(e.target.id === "order-btn"){
        paymentModal()
    }else if(e.target.id === "pay-btn"){
        form.addEventListener("submit", function(e){
            e.preventDefault()
            finishedOrder()
        })
    }
})
  

// MENU

function menuList(){
    let menuHTML = ""
    
    menuArray.forEach( item => 
        menuHTML += `
        <div class = "menu-items">
            <div class="emoji-image">
                <img src= "${item.image}" class = "image-item">
            </div>
            <div class = "menu-list">
                <div class = "menu-name">
                    <h1>${item.name}</h1>
                </div>
                <div class = "menu-ingredient">
                    <p>${item.ingredients}</p>
                </div>
                <div class = "menu-price">
                    <h2>€${item.price}</h2>
                </div>
            </div>
                <div class = "order-btn-div">
                    <button class = "add-btn" data-add = "${item.id}">ADD TO CART</button>
                </div>
        </div>
        `
        )
    return menuHTML
}

//ORDER

function orderListHtml(){ 
        return `
        <div class = "order-list">
            <div class = "order-header">
                <h1>Your Order</h1>
            </div>
            <div class = "order-items" id = "order-items">
                <!--ORDER LIST-->
            </div>
            <div class = "order-total">
                <h1>Total Price</h1>
                <h2>€${totalPrice}</h2>
            </div>
            <button class = "order-btn" id = "order-btn">Complete Order</button>
        </div>`     
}

function orderItemsHtml(){
    let orderHtml = ""
    
    order.forEach( item => 
        orderHtml += `
        <div class = "order-container">
            <div class = "order-ingredients">
                <h1>${item.name}</h1>
                <button class = "remove-button" data-remove="${item.id}">remove</button>
            </div>
            <div class = "order-price">
                <h2>€${item.price}</h2>
            </div>
        </div>
        `
        )
    
    return orderHtml
    
}

function addItemOrder(itemId){
    const targetItemObj = menuArray.filter(item => 
        item.id == itemId
    )[0]

    if(!order2.includes(targetItemObj)){
        orderItems.style.display = "block"

        order.push(targetItemObj)
        
        totalPrice += targetItemObj.price
        
        orderRender()
        orderItemsRender()
    }
}

function removeItemOrder(itemId){
    let targetItemObj = menuArray.filter( item =>
        item.id == itemId
        )[0]

    if(order.includes(targetItemObj)){
        order.pop(targetItemObj)

        totalPrice -= targetItemObj.price

        orderRender()
        orderItemsRender()
    }
    
    if(totalPrice === 0){
        orderItems.style.display = "none"
    }
}

//PAYMENT

function paymentModal(){
    payformModal.style.display = "flex"
}

//FINISH ORDER  

function finishedOrder(){

    order = []
    
    payformModal.style.display = "none"

    const nameValue = document.getElementById("text-input").value
    
    orderItems.innerHTML = 
    `
    <div class = "finished-order" id = "finished-order">
        <p>Thanks, ${nameValue}! Your order is on its way!</p>
    </div>
    `
}
// CART ICON

  

//RENDERS

function orderItemsRender(){
    document.getElementById("order-items").innerHTML = orderItemsHtml()
}

function orderRender(){
    orderItems.innerHTML = orderListHtml()
}

function render(){
    menuItems.innerHTML = menuList()
}

render()

