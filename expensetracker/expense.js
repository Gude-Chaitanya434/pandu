document.getElementById('expenseform').addEventListener('submit', function(event) {
    event.preventDefault();
    addExpense();
});

let expenses = [];

function addExpense() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const expense = { amount, category, date };
    expenses.push(expense);
    renderExpenses();
    renderSummary();
    document.getElementById('expenseform').reset();
}

function renderExpenses() {
    const tbody = document.getElementById('expenseTable').querySelector('tbody');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        
        const amountCell = document.createElement('td');
        amountCell.textContent = expense.amount.toFixed(2);
        row.appendChild(amountCell);

        const categoryCell = document.createElement('td');//HTMl table cell element
        categoryCell.textContent = expense.category;
        row.appendChild(categoryCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = expense.date;
        row.appendChild(dateCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editExpense(index));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(index));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    document.getElementById('date').value = expense.date;

    expenses.splice(index, 1);
    renderExpenses();
    renderSummary();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
    renderSummary();
}

function renderSummary() {
    const summaryList = document.getElementById('summaryList');
    summaryList.innerHTML = '';

    const categoryTotals = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = 0;
        }
        acc[expense.category] += expense.amount;
        return acc;
    }, {});

    for (const [category, total] of Object.entries(categoryTotals)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: ${total.toFixed(2)};
        summaryList.appendChild(listItem);`
    }
}