let form =document.querySelector('form'); 
let description =document.querySelector('#description'); 
let amount =document.querySelector('#amount'); 
let ul =document.querySelector('#expenseList'); 
let array = [];
let object ;
form.addEventListener('submit',event=>{
    event.preventDefault()
object={
    description:description.value,
    amount:amount.value,
}
array.push(object)
renderscreen()
    console.log(description.value);
    console.log(amount.value);
});
function renderscreen() {
    ul.innerHTML=``;
    array.map((item,index)=>{
        ul.innerHTML += `
        <li>
      Description: ${item.description}</br>
      Amount: ${item.amount}</br>
     <button onclick="deleted(${index})">delete</button>
     <button onclick="edit(${index})">edit</button>
        </li>
        `
    });
};

function deleted(i) {
    array.splice(i,1)
    renderscreen()
};

function edit(i) {
    let updateDescription = prompt(`description`);
    let updateAmount = +prompt(`updateAmount`);
    if (updateDescription !== ``) {
        array[i].description = updateDescription;
    }
    if (updateAmount !== ``) {
        array[i].amount = updateAmount;
    }
    renderscreen();
}
