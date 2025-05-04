window.onload = function(){ 

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null
let resColor = 0
let themeColor = 1

// окно вывода результата
outputElement = document.getElementById("result")
body = document.getElementById("body")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
  if (!selectedOperation) {
      if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
          a += digit
      }
      outputElement.innerHTML = a
  } else {
      if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
          b += digit
          outputElement.innerHTML = b        
      }
  }
}

// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
  button.onclick = function() {
      const digitValue = button.innerHTML
      onDigitButtonClicked(digitValue)
  }
})

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { 
  if (a === '' || b !== '') return
  selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() { 
  if (a === '') return
  if (b !== '' && selectedOperation === '+') {
    a = ((+a) + (+b)).toString()
    b = ''
  }
  selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() { 
  if (a === '') return
  if (b !== '' && selectedOperation === '-') {
    a = ((+a) - (+b)).toString()
    b = ''
  }
  selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() { 
  if (a === '' || b !== '') return
  selectedOperation = '/'
}
document.getElementById("btn_op_percent").onclick = function() { 
    if (a === '' || b !== '') return
    selectedOperation = '%'
}

// кнопка смены знака
document.getElementById("btn_op_sign").onclick = function() {
    if (b !== '') {
        b = (-a).toString()
        outputElement.innerHTML = b
    }
    else if (a !== '') {
        a = (-a).toString()
        outputElement.innerHTML = a
    }
}

// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() { 
  a = ''
  b = ''
  selectedOperation = ''
  expressionResult = ''
  outputElement.innerHTML = 0
}

// кнопка backspace
document.getElementById("btn_op_backspace").onclick = function() {
    if (b !== '') {
        b = b.slice(0, -1)
        if (b !== '' && b !== '-') {
            outputElement.innerHTML = b
        }
        else {
            b = ''
            outputElement.innerHTML = 0
        }
    }
    else if (a !== '') {
        a = a.slice(0, -1)
        if (a !== '' && a !== '-') {
            outputElement.innerHTML = a
        }
        else {
            a = ''
            outputElement.innerHTML = 0
        }
    }
}

// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() {
  if (a === '' || b === '' || !selectedOperation)
      return
      
  switch(selectedOperation) { 
      case 'x':
          expressionResult = (+a) * (+b)
          break;
      case '+':
          expressionResult = (+a) + (+b)
          break;
      case '-':
          expressionResult = (+a) - (+b)
          break;
      case '/':
          expressionResult = (+a) / (+b)
          break;
    case '%':
        expressionResult = (+a) / (+b) * 100
          break;
  }
 
  a = expressionResult.toString()
  b = ''
  selectedOperation = null

  outputElement.innerHTML = a
}

// кнопка вычисления полутона по частоте
document.getElementById("btn_op_semitone").onclick = function() {
    if (a === '' || b !== '') return
    selectedOperation = null
    
    const C0 = 440 * Math.pow(2, -4.75) // Частота ноты C0 (до суб-контр-октавы)
    let noteNum = 12 * (Math.log((+a) / C0) / Math.log(2)) // Номер ноты
    if (noteNum < 0 || noteNum > 100) {
        result = 'error'
    }
    else {
        noteNum = Math.round(noteNum)
        let octave = Math.floor(noteNum / 12)
        let note = noteNum % 12
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        result = `${notes[note]}${octave}`
    }
    
    outputElement.innerHTML = result
  }
 

// кнопка вычисления корня
document.getElementById("btn_op_sqrt").onclick = function() {
    if (a === '' || b !== '') return
    
    a = Math.sqrt(+a).toString()
    b = ''
    selectedOperation = null
    outputElement.innerHTML = a
}

// кнопка возведения в квадрат
document.getElementById("btn_op_square").onclick = function() {
    if (a === '' || b !== '') return
    
    a = ((+a) * (+a)).toString()
    b = ''
    selectedOperation = null
    outputElement.innerHTML = a
}

// кнопка вычисления факториала
document.getElementById("btn_op_factorial").onclick = function() {
    if (a === '' || b !== '') return
    
    if ((+a) >= 22) {
        outputElement.innerHTML = 'error'
        return
    }

    a = factorial(Math.floor((+a))).toString()
    b = ''
    selectedOperation = null
    outputElement.innerHTML = a
}

function factorial(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
}

// кнопка смены цвета окна вывода
document.getElementById("btn_op_res_color").onclick = function() {
    if (resColor) {
        outputElement.classList.remove("res_light")
        outputElement.classList.add("res_dark")
        resColor = 0
    }
    else {
        outputElement.classList.remove("res_dark")
        outputElement.classList.add("res_light")
        resColor = 1
    }
}

// кнопка смены цвета темы
document.getElementById("change_theme").onclick = function() {
    if (themeColor) {
        body.style.color = "#fafafa"
        body.style.background = "#3b4255"
        themeColor = 0
    }
    else {
        body.style.color = "#3b4255"
        body.style.background = "#fafafa"
        themeColor = 1
    }
}

};
