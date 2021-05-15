const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const textInput = document.getElementById('text')
const amountInput = document.getElementById('amount')

// dummy list
// const testTransactions = [
//     { id: 1, text: 'Cheese', amount: -20 },
//     { id: 2, text: 'Pizza', amount: -10 },
//     { id: 3, text: 'IceCream', amount: -5 },
//     { id: 4, text: 'PayCheck', amount: 800 }
// ]

// set local storage variable
const localStorageList = JSON.parse(localStorage.getItem('listItems'))

// set array in which list items will be pushed
let listItems = localStorage.getItem('listItems') !== null ? localStorageList : []

// ADD TRANSACTIONS TO DOM LIST
function addTransactionDOM(listItem) {
    // Set sign minus or plus (-/+)
    const sign = listItem.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    // Add class based on value (minus/plus)
    item.classList.add(listItem.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
    ${listItem.text} 
    <span>${sign}${Math.abs(listItem.amount)}</span>
    <button class="delete-btn" onclick="removeListItem(${listItem.id})">x</button>
    `
    list.appendChild(item)
}

// UPDATE BALANCE / INCOME AND EXPENSE
function updateTotal() {
    // get all amount values from transaction array
    const amounts = listItems.map(list => list.amount)
    // console.log(amounts)

    // filter out and sum totals of plus and minus amounts
    const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0)
    const expense = amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0)
    // get total left amount
    const totalAmount = income - Math.abs(expense)
    // assign values to HTML elements
    balance.innerText = totalAmount.toFixed(2) + '$'
    moneyPlus.innerText = income.toFixed(2) + '$'
    moneyMinus.innerText = expense.toFixed(2) + '$'
}

// ADD LIST ITEMS
function addListItem(e) {
    e.preventDefault()

    if (textInput.value.trim() === '' || amount.value.trim() === '') {
        alert('Plase add a text and amount')
    } else {
        const listItem = {
            id: generateID(),
            text: text.value,
            // need to be converted from string to number
            amount: +amount.value
        }

        // console.log(listItem)
        // push object to transactions array
        listItems.push(listItem)
        // call addTransactionDOM and pass and listItem
        addTransactionDOM(listItem)
        // update totals
        updateTotal()
        // update local storage
        updateLocalStorage()
        // clear values
        textInput.value = ''
        amountInput.value = ''
    }
}

// GENERATE RANDOM ID
function generateID() {
    return Math.floor(Math.random() * 1000000)
}

// REMOVE LIST ITEM BY ID
function removeListItem(id) {
    console.log(id)
    // remove passed id with filter
    listItems = listItems.filter(listItem => listItem.id !== id)

    // another solution - remove passed id with splice
    // listItems.map((listItem, idx) => {
    //     if (listItem.id === id) {
    //         listItems.splice(idx, 1)
    //     }
    // })

    // update local storage
    updateLocalStorage()
    // initialize app again
    init()
}

// UPDATE LOCAL STORAGE LIST ITEMS
function updateLocalStorage() {
    localStorage.setItem('listItems', JSON.stringify(listItems))
}

// INIT APP
function init() {
    list.innerHTML = ''
    listItems.forEach(transaction => addTransactionDOM(transaction))

    updateTotal()
}
init()

form.addEventListener('submit', addListItem)