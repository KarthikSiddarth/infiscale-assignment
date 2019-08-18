/*
  'El' suffixed to variable names in init and other functions is short for 'Element'
*/


window.onload = init

function init() {
  const qtyInputElements = document.querySelectorAll('.content__body__basket-item-qty')
  const basketItemEl = document.querySelectorAll('.content__body__basket-item')
  const allCostEl = document.querySelectorAll('.content__body__basket-item-cost')
  const subTotalEl = document.querySelector('.subtotal-price')
  const vatEl = document.querySelector('.vat-value')
  const totalCostEl = document.querySelector('.total-price')
  basketItemEl.forEach(
    itemEl => {
      itemEl.lastElementChild.onclick =
        () => onDeletePress(itemEl, subTotalEl, vatEl, totalCostEl)
    })
  qtyInputElements.forEach(qtyEl => {
    qtyEl.addEventListener('input',
      (e) => onQtyInput(e.target.value, qtyEl, subTotalEl, vatEl, totalCostEl, allCostEl))
  })
}

function onDeletePress(itemEl, subTotalEl, vatEl, totalCostEl) {
  itemEl.remove()
  const allCostEl = document.querySelectorAll('.content__body__basket-item-cost')
  if(allCostEl.length === 0) {
    const btnEl = document.querySelector('.btn')
    btnEl.classList.add('btn--disabled')
  }
  const subTotal = calculateSubtotal(allCostEl)
  const vat = calculateVAT(subTotal)
  subTotalEl.textContent = subTotal
  vatEl.textContent = vat
  totalCostEl.textContent = calculateTotalCost(subTotal, vat)
}

function onQtyInput(value, qtyEl, subTotalEl, vatEl, totalCostEl, allCostEl) {
  const costElement = document.getElementById(`${qtyEl.id}-cost`)
  const price = document.getElementById(`${qtyEl.id}-price`).textContent
  const qty = value > 0 ? value : 0
  qtyEl.value = qty
  costElement.innerHTML = (parseInt(qty) * parseFloat(price)).toFixed(2)
  const subTotal = calculateSubtotal(allCostEl)
  const vat = calculateVAT(subTotal)
  subTotalEl.textContent = subTotal
  vatEl.textContent = vat
  totalCostEl.textContent = calculateTotalCost(subTotal, vat)
}

function calculateSubtotal(elements) {
  const costs = Array.from(elements).map((el => el.textContent))
  return costs.length ? parseFloat(costs.reduce((a, b) => parseFloat(a) + parseFloat(b))).toFixed(2) : 0
}

function calculateVAT(subTotal) {
  vatPercentage = 20
  return parseFloat(((subTotal / 100) * 20)).toFixed(2)
}

function calculateTotalCost(subTotal, vat) {
  return parseFloat((parseFloat(subTotal) + parseFloat(vat))).toFixed(2)
}
