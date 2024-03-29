let expenses = [];
let total = 0;


window.addEventListener('load', () => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        expenses = storedExpenses;
        expenses.forEach(expense => {
            total += expense.amount;
            addExpenseToTable(expense);
        });
        updateTotalAmount();
    }
});

let categorySelect = document.getElementById('select-catetory');
const inputValue = document.getElementById('amountInput');
const totalAmount = document.getElementById('total-amount');
const tBody = document.getElementById('t-body');
const addBtn = document.getElementById('add-btn');

function addExpenseToTable(expense) {
    const newRow = tBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn');
    deleteCell.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        const index = expenses.findIndex(exp => exp === expense);
        if (index !== -1) {
            expenses.splice(index, 1);
        }
        tBody.removeChild(newRow);
        total -= expense.amount;
        updateTotalAmount();
        saveExpensesToLocalStorage();
    });
}

function updateTotalAmount() {
    totalAmount.textContent = total;
}

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

addBtn.addEventListener('click', () => {
    const category = categorySelect.value;
    const amount = Number(inputValue.value);

    expenses.push({ category, amount });
    total += amount;

    addExpenseToTable({ category, amount });
    updateTotalAmount();
    saveExpensesToLocalStorage();
});
