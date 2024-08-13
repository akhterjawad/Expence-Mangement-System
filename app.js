let form = document.querySelector('form');
let description = document.querySelector('#description');
let amount = document.querySelector('#amount');
let totalAmount = document.querySelector('#totalAmount');
let search = document.querySelector('#search');
let ul = document.querySelector('#expenseList');
let object;

let array = JSON.parse(localStorage.getItem('sandData')) || [];
renderscreen(array);

// Handle form submission to add an expense
form.addEventListener('submit', event => {
    event.preventDefault();
    object = {
        description: description.value,
        amount: +amount.value,
    };
    array.push(object);
    localStorage.setItem('sandData',JSON.stringify(array))
    console.log(array);
    renderscreen(array);
    amount.value = ``;
    description.value = ``;
});


// Function to render the expense list on the screen
function renderscreen(expenseArray) {
    let total = 0;
    ul.innerHTML = ``;
    totalAmount.innerHTML = ``;  // Reset the totalAmount content

    expenseArray.map((item, index) => {
        total += item.amount;
        ul.innerHTML += `
        <li>
            Description: ${item.description}</br>
            Amount: ${item.amount}</br>
            <button onclick="deleted(${index})">delete</button>
            <button onclick="edit(${index})">edit</button>
        </li>
        `;
    });

    totalAmount.innerHTML = total;
}

// Function to delete an expense
function deleted(i) {
    array.splice(i, 1);
    renderscreen(array);
}

// Function to edit an expense
function edit(i) {
    let updateDescription = prompt(`Enter new description:`, array[i].description);
    let updateAmount = prompt(`Enter new amount:`, array[i].amount);

    if (updateDescription && updateDescription.trim() !== ``) {
        array[i].description = updateDescription;
    }
    if (updateAmount && updateAmount.trim() !== ``) {
        array[i].amount = +updateAmount;
    }
    renderscreen(array);
}

// Search functionality
search.addEventListener('input', () => {
    const query = search.value.toLowerCase();
    const filteredExpenses = array.filter(expense => expense.description.toLowerCase().includes(query));
    renderscreen(filteredExpenses);
});



// let form = document.querySelector('form');
// let description = document.querySelector('#description');
// let amount = document.querySelector('#amount');
// let totalAmount = document.querySelector('#totalAmount');
// let search = document.querySelector('#search');
// let ul = document.querySelector('#expenseList');
// let object;

// // Retrieve stored data and ensure it's in JSON format
// let storedData = localStorage.getItem('sandData');
// let array = storedData ? JSON.parse(storedData) : [];

// // Render the expenses on the screen
// renderscreen(array);

// // Handle form submission to add an expense
// form.addEventListener('submit', event => {
//     event.preventDefault();
//     object = {
//         description: description.value,
//         amount: +amount.value,
//     };
//     array.push(object);
//     localStorage.setItem('sandData', JSON.stringify(array));
//     console.log(array);
//     renderscreen(array);
//     amount.value = '';
//     description.value = '';
// });

// // Function to render the expense list on the screen
// function renderscreen(expenseArray) {
//     let total = 0;
//     ul.innerHTML = '';
//     totalAmount.innerHTML = '';  // Reset the totalAmount content

//     expenseArray.map((item, index) => {
//         total += item.amount;
//         ul.innerHTML += `
//         <li>
//             Description: ${item.description}<br>
//             Amount: ${item.amount}<br>
//             <button onclick="deleted(${index})">delete</button>
//             <button onclick="edit(${index})">edit</button>
//         </li>
//         `;
//     });

//     totalAmount.innerHTML = total.toFixed(2);
// }

// // Function to delete an expense
// function deleted(i) {
//     array.splice(i, 1);
//     localStorage.setItem('sandData', JSON.stringify(array)); // Update localStorage after deletion
//     renderscreen(array);
// }

// // Function to edit an expense
// function edit(i) {
//     let updateDescription = prompt('Enter new description:', array[i].description);
//     let updateAmount = prompt('Enter new amount:', array[i].amount);

//     if (updateDescription && updateDescription.trim() !== '') {
//         array[i].description = updateDescription;
//     }
//     if (updateAmount && updateAmount.trim() !== '') {
//         array[i].amount = +updateAmount;
//     }
//     localStorage.setItem('sandData', JSON.stringify(array)); // Update localStorage after editing
//     renderscreen(array);
// }

// // Search functionality
// search.addEventListener('input', () => {
//     const query = search.value.toLowerCase();
//     const filteredExpenses = array.filter(expense => expense.description.toLowerCase().includes(query));
//     renderscreen(filteredExpenses);
// });
