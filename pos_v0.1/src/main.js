//TODO: 请补完下面的函数以完成需求.
function printInventory(inputs) {
    var allItems = countProdut(inputs);
    printResult(allItems);
}

function printResult(allItems) {
	var sum = 0;
    var resultString = '***<没钱赚商店>购物清单***';

    for (var id in Object.keys(allItems)) {
        var item = allItems[Object.keys(allItems)[id]];
        sum += item.getCost();
        resultString += '\n' + getItemMessage(item);
    }

    resultString += '\n----------------------\n总计：' + sum.toFixed(2) + '(元)';
    resultString += '\n**********************';

    console.log(resultString);
}

function getItemMessage(item) {
	return '名称：' + item.name +
        '，数量：' + item.count + item.unit +
        '，单价：' + item.price.toFixed(2) +
        '(元)，小计：' + item.getCost().toFixed(2) + '(元)';
}

function countProdut(inputs) {
    var allItems = [];
    for (var i = 0; i < inputs.length; i++) {
        if (allItems.hasOwnProperty(inputs[i].barcode)) {
            allItems[inputs[i].barcode].count++;
        }
        else {
            var temp = inputs[i];
            temp.count = 1;
            temp.getCost = function() { return this.price*this.count; }
            allItems[inputs[i].barcode] = temp;
        }
    }
    return allItems;
}
