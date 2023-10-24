// пример номера паспорта:

// AN125684
// AN687246

// Определи, есть ли во входной строке номер паспорта.
function hasPasport(inputString) {
  const regex = /AN\d{5}/gm;
  return regex.test(inputString);
}
const str2 = "Привет! Вот мой номер паспорта AN68724";
console.log(
  hasPasport(str2) // true
);
// hasPasport("Привет! Вот мой номер паспорта 687246"); // false
// hasPasport("AN125684 это мой номер паспорта"); // true

// Найди и верни номер паспорта из строки. В ином случае верни пустую строку
function grabPasport(inputString) {
  const regex = /AN\d{6}/gm;
  let text = inputString.match(regex)
  if (text) {
    return text[0]
    
  }else{
    return ''
  }
}
console.log(grabPasport(str2));
// grabPasport("Был найден паспорт AN687246"); // AN687246

// Найди и верни все телефонные номера, что есть в строке.

function hasPhoneNumber(inputString) {
  const regex = /[а-я]/gm
  let text = inputString.replaceAll(regex,' ')
 let arr = text.split(' ')
 return arr.filter(e=>{
  return e != ''
 })

}

const str = "+996550050505средислов996555010101естьномерателефонов773022002";
console.log(
  hasPhoneNumber(str) //[+996550050505, 996555010101,773022002]

);

// Зашифруй номера телефонов. Example: +996-XXX-XX-ХХ-30.
const numbers = "+996-550-05-05-05, +996-555-01-01-01, +996-773-02-20-02";

function hideAllPhoneNumber(inputString) {
  const regex = /\+\d{3}-\d{3}-\d{2}-\d{2}-/gm
  let text = inputString.replaceAll(regex,"+996-XXX-XX-XX-")
    return text
}
console.log(

  hideAllPhoneNumber(numbers) // +996-XXX-XX-ХХ-05, +996-XXX-XX-ХХ-01, +996-XXX-XX-ХХ-02
);

// Отформатируй все номера телефонов, чтобы использовались правильные разделители:
// '996550050505', '550050505' , '+996.550.05.05.05' и '0550050505' должны превратиться в '+996-550-05-05-05'.

function formatPhoneNumber(string) { 
  const str = '+996'
  const regex = /\+\d{3}-\d{3}-\d{2}-\d{2}-\d{2}/gm
  string.split('',3)
}
formatPhoneNumber()

module.exports = {
  hasPasport,
  grabPasport,
  hasPhoneNumber,
  hideAllPhoneNumber,
  formatPhoneNumber,
};
