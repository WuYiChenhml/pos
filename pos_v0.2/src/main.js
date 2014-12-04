//TODO: Please write code in this file.
function printInventory(inputs) {
    var allItemInfo = countProduct(inputs);
    printResult(allItemInfo);
}

function printResult(allItemInfo) {
    var sum = 0;
    var resultString = '***<没钱赚商店>购物清单***';

    for (var i = 0; i < allItemInfo.length; i++) {
        if (allItemInfo[i].hasOwnProperty('count')) {
            sum += allItemInfo[i].getCost();
            resultString += '\n' + getItemMessage(allItemInfo[i]);
        }
    }

    resultString += '\n----------------------\n总计：' + sum.toFixed(2) + '(元)';
    resultString += '\n**********************';

    console.log(resultString);
}

function countProduct(inputs) {
    var allItemInfo = loadAllItems();

    for (var i = 0; i < inputs.length; i++) {
        var oneItemInfo = findMatchItemInfo(allItemInfo, inputs[i]);
        oneItemInfo.count = (oneItemInfo.hasOwnProperty('count')) ? oneItemInfo.count + 1 : 1;
        oneItemInfo.getCost = function() {
        	return this.price * this.count;
        }
    }

    return allItemInfo;
}

function findMatchItemInfo(allItemInfo, barcode) {
    for (var i = 0; i < allItemInfo.length; i++) {
        if (allItemInfo[i].barcode == barcode) {
            return allItemInfo[i];
        }
    }
    return null;
}

function getItemMessage(item) {
    return '名称：' + item.name +
        '，数量：' + item.count + item.unit +
        '，单价：' + item.price.toFixed(2) +
        '(元)，小计：' + item.getCost().toFixed(2) + '(元)';
}