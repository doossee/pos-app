import { Order, OrderItem, Food } from '@prisma/client'
import { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } from 'node-thermal-printer'

interface IOrder extends Order {
    orderItems: (OrderItem & {food: Food})[]
}

export const printer1 = new ThermalPrinter({
  type: PrinterTypes.STAR,                                  // Printer type: 'star' or 'epson'
  interface: '/dev/usb/lp0',                       // Printer interface
  characterSet: CharacterSet.PC852_LATIN2,                  // Printer character set
  removeSpecialCharacters: false,                           // Removes special characters - default: false
  lineCharacter: "=",                                       // Set character for lines - default: "-"
  breakLine: BreakLine.WORD,                                // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
  options:{                                                 // Additional options
    timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
  }
})

export const printer2 = new ThermalPrinter({
    type: PrinterTypes.STAR,                                  // Printer type: 'star' or 'epson'
    interface: '/dev/usb/lp1',                       // Printer interface
    characterSet: CharacterSet.PC852_LATIN2,                  // Printer character set
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: "=",                                       // Set character for lines - default: "-"
    breakLine: BreakLine.WORD,                                // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
    options:{                                                 // Additional options
      timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    }
})

export const generatedFunction = (n: number) => {
    var letterIndex = Math.floor((n - 1) / 99);
    var letter = String.fromCharCode((letterIndex % 26) + 65);
    var number = ((n - 1) % 99) + 1;
    return letter + '-' + number;
}

export const printPaper = (order:  IOrder, printer: ThermalPrinter) => {
    printer.alignCenter();
    printer.println('Fish & Chicken');
    printer.alignLeft();

    printer.println(`Номер Заказа: ${generatedFunction(order.id)}`);
    printer.println(`Дата: ${order.created_at.toLocaleDateString()}`);
    printer.println(`Время: ${order.created_at.toLocaleTimeString()}`);
    printer.println(`Номер стола: ${order.table}`);
    printer.println('--------------------------------');
    printer.println('Блюда       кол-во  цена  общая');
    printer.println('--------------------------------');

    order.orderItems.forEach(item => {
        printer.println(`${item.food.name.padEnd(15)} ${item.quantity.toString().padEnd(5)} ${item.food.price.toString().padEnd(5)} ${(item.quantity * item.food.price).toString().padEnd(5)}`);
    });

    printer.println('--------------------------------');
    printer.println(`Общая цена:          ${order.total}`);
    printer.println('--------------------------------');
    printer.println('Спасибо, что пообедали с нами!');


    printer1.cut();
    printer1.execute()
        .then(v => {
            console.log('Принтер работал', v)
        })
        .catch(err => {
            console.log(err)
        });

}