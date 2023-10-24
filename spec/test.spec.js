const {
  hasPasport,
  grabPasport,
  hasPhoneNumber,
  hideAllPhoneNumber,
  formatPhoneNumber,
} = require("../regExp");
const { test, expect } = require("@jest/globals");
 
describe("Тесты для функции grabPasport", () => {
  test("Номер паспорта в начале строки", () => {
    expect(hasPasport("AN125684 это мой номер паспорта")).toBe(true);
  });

  test("Номер паспорта в конце строки", () => {
    expect(hasPasport("Мой номер паспорта: AN098765")).toBe(true);
  });

  test("Номер паспорта в середине строки ", () => {
    expect(hasPasport("Это номер паспорта: AN123456AB, вот он.")).toBe(true);
  });

  test("Номер паспорта отсутствует", () => {
    expect(hasPasport("Привет! Вот мой номер паспорта 687246")).toBe(false);
  });

  test("Номер паспорта на пустой строке", () => {
    expect(hasPasport("")).toBe(false);
  });

  test("Номер паспорта на строке без цифр", () => {
    expect(hasPasport("Это просто текст без номера паспорта")).toBe(false);
  });

  test("Номер паспорта на строке только с цифрами", () => {
    expect(hasPasport("123456")).toBe(false);
  });

  test("Номер паспорта в начале строки", () => {
    expect(grabPasport("Был найден паспорт AN687246")).toBe("AN687246");
  });
});

describe("Тесты для функции grabPasport", () => {
  test("Номер паспорта в начале строки", () => {
    expect(grabPasport("Был найден паспорт AN687246")).toBe("AN687246");
  });

  test("Номер паспорта в конце строки", () => {
    expect(grabPasport("Паспорт: AN987654 был найден")).toBe("AN987654");
  });

  test("Номер паспорта в середине строки", () => {
    expect(grabPasport("Это номер паспорта: AN456789, был найден.")).toBe(
      "AN456789"
    );
  });

  test("Номер паспорта отсутствует", () => {
    expect(grabPasport("Паспорта не было найдено")).toBe("");
  });

  test("Номер паспорта на пустой строке", () => {
    expect(grabPasport("")).toBe("");
  });
});

describe("Тесты для функции hasPhoneNumber", () => {
  test("Найти и вернуть все телефонные номера в строке", () => {
    const str =
      "+996550050505средислов996555010101естьномерателефонов773022002";
    const expectedPhoneNumbers = ["+996550050505", "996555010101", "773022002"];
    expect(hasPhoneNumber(str)).toEqual(expectedPhoneNumbers);
  });

  test("Найти и вернуть телефонный номер в начале строки", () => {
    const str = "+996550050505 и еще текст";
    expect(hasPhoneNumber(str)).toEqual(["+996550050505"]);
  });

  test("Найти и вернуть телефонный номер в конце строки", () => {
    const str = "Текст и номер: 773022002";
    expect(hasPhoneNumber(str)).toEqual(["773022002"]);
  });

  test("Найти и вернуть телефонный номер в середине строки", () => {
    const str = "Телефон: 996555010101, и еще что-то";
    expect(hasPhoneNumber(str)).toEqual(["996555010101"]);
  });

  test("Найти и вернуть несколько телефонных номеров", () => {
    const str = "+996550050505 и 996555010101 и 773022002";
    expect(hasPhoneNumber(str)).toEqual([
      "+996550050505",
      "996555010101",
      "773022002",
    ]);
  });

  test("Найти и вернуть телефонные номеры в строке без пробелов", () => {
    const str = "+996550050505996555010101773022002";
    expect(hasPhoneNumber(str)).toEqual([
      "+996550050505",
      "996555010101",
      "773022002",
    ]);
  });
});//

describe("Тесты для функции hideAllPhoneNumber", () => {
  test("Скрыть все номера телефонов в строке", () => {
    const numbers = "+996-550-05-05-05, +996-555-01-01-01, +996-773-02-20-02";
    const expectedHiddenNumbers =
      "+996-XXX-XX-XX-05, +996-XXX-XX-XX-01, +996-XXX-XX-XX-02";
    expect(hideAllPhoneNumber(numbers)).toBe(expectedHiddenNumbers);
  });

  test("Скрыть номер телефона в начале строки", () => {
    const numbers = "+996-550-05-05-05 и еще текст";
    const expectedHiddenNumbers = "+996-XXX-XX-XX-05 и еще текст";
    expect(hideAllPhoneNumber(numbers)).toBe(expectedHiddenNumbers);
  });

  test("Скрыть номер телефона в конце строки", () => {
    const numbers = "Текст и номер: +996-555-01-01-01";
    const expectedHiddenNumbers = "Текст и номер: +996-XXX-XX-XX-01";
    expect(hideAllPhoneNumber(numbers)).toBe(expectedHiddenNumbers);
  });

  test("Скрыть номер телефона в середине строки", () => {
    const numbers = "Телефон: +996-773-02-20-02, и еще что-то";
    const expectedHiddenNumbers = "Телефон: +996-XXX-XX-XX-02, и еще что-то";
    expect(hideAllPhoneNumber(numbers)).toBe(expectedHiddenNumbers);
  });

  test("Скрыть несколько номеров в строке", () => {
    const numbers = "+996-550-05-05-05 и +996-555-01-01-01";
    const expectedHiddenNumbers = "+996-XXX-XX-XX-05 и +996-XXX-XX-XX-01";
    expect(hideAllPhoneNumber(numbers)).toBe(expectedHiddenNumbers);
  });

  test("Скрыть номеры в строке без пробелов", () => {
    const numbers = "+996-550-05-05-05+996-555-01-01-01+996-773-02-20-02";
    const expectedHiddenNumbers =
      "+996-XXX-XX-XX-05+996-XXX-XX-XX-01+996-XXX-XX-XX-02";
    expect(hideAllPhoneNumber(numbers)).toBe(expectedHiddenNumbers);
  });
});

describe("Тесты для функции formatPhoneNumber", () => {
  test("Отформатировать номер телефона с кодом страны", () => {
    const phoneNumber = "+996550050505";
    const formattedPhoneNumber = "+996-550-05-05-05";
    expect(formatPhoneNumber(phoneNumber)).toBe(formattedPhoneNumber);
  });

  test("Отформатировать номер телефона без кода страны", () => {
    const phoneNumber = "550050505";
    const formattedPhoneNumber = "+996-550-05-05-05";
    expect(formatPhoneNumber(phoneNumber)).toBe(formattedPhoneNumber);
  });

  test("Отформатировать короткий номер телефона без кода страны", () => {
    const phoneNumber = "0550050505";
    const formattedPhoneNumber = "+996-550-05-05-05";
    expect(formatPhoneNumber(phoneNumber)).toBe(formattedPhoneNumber);
  });

  test("Отформатировать номер телефона с другими разделителями", () => {
    const phoneNumber = "+996.550.05.05.05";
    const formattedPhoneNumber = "+996-550-05-05-05";
    expect(formatPhoneNumber(phoneNumber)).toBe(formattedPhoneNumber);
  });

  test("Отформатировать номер телефона с разделителями и кодом страны", () => {
    const phoneNumber = "+996-550-05-05-05";
    const formattedPhoneNumber = "+996-550-05-05-05";
    expect(formatPhoneNumber(phoneNumber)).toBe(formattedPhoneNumber);
  });
});
