const gcdTextField = document.getElementById('gcdTextField')
const gcdTable = document.getElementById('gcdTable')
const gcdDesc = document.getElementById('gcdDesc')

gcdTextField.addEventListener('keyup', e => {
  const gcdString = gcdTextField.value;
  if(!gcdString) {
    clearGCDContent(gcdTable, gcdDesc)
    return;
  }

  const test = gcdString.match(/^\d+(,\d+)*$/) //comma seperated digit
  clearGCDContent(gcdTable, gcdDesc)
  if(!!test) {
    const gcdArr = gcdString.split(',').map((elem)=>parseInt(elem))
    if(gcdArr.length == 2) {
      if(gcdArr[0]>gcdArr[1]) {
        [gcdArr[0], gcdArr[1]] = [gcdArr[1],gcdArr[0]]
      }
      calculateGCD(gcdArr[0], gcdArr[1])
    }else{
      console.warn('Enter only two comma seperated number')
    }
  }else{
    console.warn('Validation failed')
  }
})

const insertBlankCells = (n, row) => {
  for(let i = 0; i < n; i++) {
    row.insertCell(i).innerHTML = '';
  }
}

const calculateGCD = (divisor, divident) => {
  let row = gcdTable.insertRow(-1);
  const initialDivisorCell = row.insertCell(0)
  initialDivisorCell.innerHTML = divisor
  initialDivisorCell.classList.add("divisor")
  
  const MAX_STEP = 20;
  for(let step = 0; step < MAX_STEP; step++) {
    const quotient = Math.floor(divident/divisor)
    const dividentCell = row.insertCell(step+1)
    dividentCell.innerHTML = divident
    dividentCell.classList.add("divident")
    const quotientCell = row.insertCell(step+2)
    quotientCell.innerHTML = quotient
    quotientCell.classList.add("quotient")
    
    const productOfQuotientAndDivisor = quotient*divisor;
    row = gcdTable.insertRow(-1);
    insertBlankCells(step+1, row)
    row.insertCell(step+1).innerHTML = -productOfQuotientAndDivisor
    
    const remainder = divident-productOfQuotientAndDivisor
    row = gcdTable.insertRow(-1);
    insertBlankCells(step+1, row)
    const remCell = row.insertCell(step+1)
    remCell.innerHTML = remainder
    remCell.classList.add("remainder")
  
    if(remainder == 0) {
      console.log('GCD is '+divisor)
      gcdDesc.innerHTML = `GCD of (${gcdTextField.value}) = ${divisor}`
      break;
    }

    divident = divisor
    divisor = remainder
  }
}

const clearGCDContent = (gcdTable, gcdDesc) => {
  let child = gcdTable.lastElementChild;
  while (child) {
      gcdTable.removeChild(child);
      child = gcdTable.lastElementChild;
  }

  gcdDesc.innerHTML = ""
}