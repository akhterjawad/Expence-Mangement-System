let form = document.querySelector('form');
let description = document.querySelector('#description');
let amount = document.querySelector('#amount');
let totalAmount = document.querySelector('#totalAmount');
let search = document.querySelector('#search');
let ul = document.querySelector('#expenseList');
let object;

let array;
let getData = JSON.parse(localStorage.getItem('SendData'));
if (getData) {
    array = getData
} else {
    array = [];
};
renderscreen(array);

// Handle form submission to add an expense
form.addEventListener('submit', event => {
    event.preventDefault();
    object = {
        description: description.value,
        amount: +amount.value,
    };
    array.push(object);
    localStorage.setItem('SendData', JSON.stringify(array))
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
        <li class="mb-2">
            <div class="flex justify-between items-center">
                <div>
                    <strong>Description:</strong> ${item.description}<br>
                    <strong>Amount:</strong> ${item.amount}
                </div>
                <div>
                    <button class="btn btn-sm btn-error mr-2" onclick="deleted(${index})">Delete</button>
                    <button class="btn btn-sm btn-warning" onclick="edit(${index})">Edit</button>
                </div>
            </div>
        </li>
        `;
    });

    totalAmount.innerHTML = total;
}

// Function to delete an expense
function deleted(i) {
    array.splice(i, 1);
    updateLocalstorage();
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
    updateLocalstorage();
    renderscreen(array);
}

// Search functionality
search.addEventListener('input', () => {
    const query = search.value.toLowerCase();
    const filteredExpenses = array.filter(expense => expense.description.toLowerCase().includes(query));
    renderscreen(filteredExpenses);
});

function updateLocalstorage() {
    localStorage.setItem(`SendData`, JSON.stringify(getData))
};