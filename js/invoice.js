//data
const products = [
    {
        id : 1,
        name : "apple",
        price : 500
    },
    {
        id : 2,
        name : "orange",
        price : 600
    },
    {
        id : 3,
        name : "banana",
        price : 200
    },
    {
        id : 4,
        name : "mango",
        price : 900
    },
    {
        id : 5,
        name : "pineapple",
        price : 1500
    }

];

//selectors
const invoiceNumber = document.querySelector("#invoiceNumber");
const invoiceDate = document.querySelector("#invoiceDate");
const selectProduct = document.querySelector("#selectProduct");
const quantity = document.querySelector("#quantity");
const newListFrom = document.querySelector("#newListFrom");
const rows = document.querySelector("#rows");
const costTotal = document.querySelector("#costTotal");

//generate invoice number
const getRandomId = (min = 100000, max = 999999) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return  Math.floor(Math.random() * (max - min + 1)) + min;
};

//calculate cost Total
function calculateCostTotal(){
    // const allCost = document.querySelectorAll(".cost");
    // let total = 0;
    // allCost.forEach(cost => total += parseFloat(cost.innerText))
    let total = [...document.querySelectorAll('.cost')].reduce((pv,cv)=>pv+parseFloat(cv.innerText),0)
    costTotal.innerText = total ;

    const msg = new SpeechSynthesisUtterance();
    msg.text = "Total Cost  is "+total+" dollar";
    window.speechSynthesis.speak(msg);
}

products.forEach(product => selectProduct.append(new Option(product.name,product.id)) )
invoiceNumber.value = getRandomId()
invoiceDate.valueAsDate = new Date()

newListFrom.addEventListener('submit',e => {
    e.preventDefault()

    const formData = new FormData(newListFrom);

    let currentProduct = products.find(product => product.id === parseInt(formData.get("product")));

    // const tr = document.createElement('tr');
    //
    // tr.innerHTML = `
    //     <td>1</td>
    //     <td>${currentProduct.name}</td>
    //     <td class="text-end">${currentProduct.price}</td>
    //     <td class="text-end">${formData.get('quantity')}</td>
    //     <td class="text-end">${ currentProduct.price * formData.get('quantity') }</td>
    // `;
    //
    // rows.append(tr);

    const currentRows = document.querySelectorAll("tr[product-id]");
    const isExist = [...currentRows]
        .find(row=>row.getAttribute('product-id') == currentProduct.id);
    if(isExist){

        const currentRowQuantity = isExist.querySelector(".row-quantity");
        currentRowQuantity.innerText = parseFloat(currentRowQuantity.innerText) + parseFloat(formData.get('quantity'));
        isExist.querySelector(".cost").innerText = currentRowQuantity.innerText * currentProduct.price;

    }else{
        let row = rows.insertRow();
        row.setAttribute('product-id',currentProduct.id);
        let cell1 = row.insertCell();
        cell1.innerHTML = `<button class="btn btn-outline-danger btn-sm del-row"><i class="bi bi-trash3 pe-none"></i></button>`;
        let cell2 = row.insertCell();
        cell2.innerText = currentProduct.name

        let cell3 = row.insertCell();
        cell3.innerText = currentProduct.price
        cell3.classList.add("text-end");

        let cell4 = row.insertCell();
        cell4.innerText = formData.get('quantity')
        cell4.classList.add("text-end",'row-quantity');

        let cell5 = row.insertCell();
        cell5.innerText = currentProduct.price * formData.get('quantity')
        cell5.classList.add("text-end",'cost');

    }
    newListFrom.reset();
    calculateCostTotal()

    // console.log(selectProduct.value,quantity.valueAsNumber)
})

rows.addEventListener('click',function (e){
    if (e.target.classList.contains('del-row')){
        // console.dir(e.target.parentElement.parentElement)
        // console.log(e.target.closest("tr"))
        if(confirm('Are U sure to Delete?')){
            e.target.closest("tr").remove()
            calculateCostTotal()
            console.log("del")
        }
    }
});