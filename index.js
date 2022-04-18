
// make an object to call properties 

var state = {
    balance: 10000000, 
    income: 300000,
    expense: 2200,
    transactions: [
        {id: uniqueId(), name: 'Salary', amount: 1000000, type: 'income'},
        {id: uniqueId(), name: 'Buy Grocery', amount: 50, type: 'expense'},
        {id: uniqueId(), name: 'Haircut', amount: 25, type: 'expense'},
    ]
}

var balance = document.getElementById("balance");
var income = document.getElementById("income");
var expense = document.getElementById("expense");
var transactions = document.getElementById("transaction");
var incomeBtn = document.getElementById("incomeBtn");
var expenseBtn = document.getElementById("expenseBtn");
var nameInput = document.getElementById("name");
var amountInput = document.getElementById("amount");

// one function to call other functions
function init(){
    updateState();
    initListeners();
}


function uniqueId(){
    return Math.round(Math.random() * 1000000);
}


// event listener function to listen for income and expense events
function initListeners(){
    incomeBtn.addEventListener('click', (onAddIncomeClick));
    expenseBtn.addEventListener('click', (onAddExpenseClick));
}


function onAddIncomeClick(e){
    addTransaction(nameInput.value, amountInput.value, 'income')
}

function addTransaction(name, amount, type){
    var name = nameInput.value;
    var amount = amountInput.value;
    if(name !== '' && amount !== ''){
        var transaction =  {
            id: uniqueId(),
            name: name, 
            amount: parseInt(amount ), 
            type: type
        };

        state.transactions.push(transaction);
        updateState();
    } else {
        alert('Please enter valid name & amount');
    }

    nameInput.value = '';
    amountInput.value = '';

}

function onAddExpenseClick(e){
   addTransaction(nameInput.value, amountInput.value, 'expense')
}

function onDeleteClick(event){
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    // debugger;
    for(var i = 0; i < state.transactions.length; i++){
        if(state.transactions[i].id === id){
             deleteIndex = i;
             break;
        }
    }

    state.transactions.splice(deleteIndex, 1)
}

// function to update & calculate display for balance

function updateState(){
    var balance = 0;
    var income = 0;
    var expense = 0;
    var item;
    for(let i = 0; i < state.transactions.length; i++){
    // item to become an index for transactions 
        item = state.transactions[i];

        if(item.type == 'income'){
            income += item.amount;
        } else if(item.type == 'expense'){
            expense += item.amount;
        }
    }

    balance = income - expense;
    state.balance = balance;
    state.income = income;
    state.expense = expense;

    console.log(balance, income, expense);

    render();
}


// function to dynamically append div & li 


function render(){
    balance.innerHTML = `$${state.balance}.00`;
    income.innerHTML  = `$${state.income}.00`;
    expense.innerHTML = `$${state.expense}.00`;

    var transaction, container, amount, item, btnEl;

    transactions.innerHTML = '';

    /* created a for loop to loop through each transaction
    and created an LI for each transaction */
    for(var i = 0; i < state.transactions.length; i++){
        item = state.transactions[i]
        transaction = document.createElement('li');
        transaction.append(state.transactions[i].name)
        transactions.appendChild(transaction);

        container = document.createElement('div');

        btnEl = document.createElement('button');

        btnEl.setAttribute('data-id', item.id)

        btnEl.innerHTML = 'X';

        container.appendChild(btnEl)

        amount = document.createElement('span')

        if(item.type == 'income'){
            amount.classList.add('income-amt')
        } else if(item.type === 'expense') {
            amount.classList.add('expense-amt')
        }

       btnEl.addEventListener('click', onDeleteClick)

       amount.innerHTML = `$${item.amount}`;

       container.appendChild(amount);

       transaction.appendChild(container)
    }
}







init();