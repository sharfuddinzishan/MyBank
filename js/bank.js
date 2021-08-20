document.getElementById('deposite').addEventListener('click', transaction);
document.getElementById('withdraw').addEventListener('click', transaction);

function transaction(event) {
    const typeTransaction = event.target.id
    const inputAmount = getAmountRequest(typeTransaction)
    const previousTotal = getPreviousTotal(typeTransaction)
    const previousBalance = getPreviousBalance()
    const verifyInputAmount = inputAmount === -1 ? true : false
    const verifyBalance = previousBalance < inputAmount && typeTransaction === 'withdraw' ? true : false

    verifyInputAmount ? handleError(typeTransaction) : verifyBalance
        ? handleError(typeTransaction) : processTransaction(typeTransaction)


    function getAmountRequest(typeTransaction) {
        let getInputAmount = document.getElementById(typeTransaction + 'Input').value
        const getInputAmountNumber = parseFloat(getInputAmount)

        if (isNaN(getInputAmountNumber) || getInputAmountNumber <= 0 || isNaN(getInputAmount)) {
            return -1
        }
        return getInputAmountNumber
    }
    function getPreviousTotal(typeTransaction) {
        const getPreviousAmount = parseFloat(document.getElementById(typeTransaction + 'Total').innerText)
        return getPreviousAmount
    }
    function getPreviousBalance() {
        const getBalanceAmount = parseFloat(document.getElementById('balanceTotal').innerText)
        return getBalanceAmount
    }
    function processTransaction(typeTransaction) {
        if (typeTransaction === 'deposite') {
            setAmount()
            document.getElementById('balanceTotal').innerText = inputAmount + previousBalance
        }
        else {
            setAmount()
            document.getElementById('balanceTotal').innerText = previousBalance - inputAmount
        }
    }
    function setAmount() {
        document.getElementById(typeTransaction + 'Total').innerText = inputAmount + previousTotal
        document.getElementById(typeTransaction + 'Input').value = ''
        document.querySelector('#errorMessage').setAttribute('class', 'hidden')
    }
    function handleError(typeTransaction) {
        document.getElementById(typeTransaction + 'Input').value = ''
        document.querySelector('#errorMessage').setAttribute('class', 'block')
    }
}
