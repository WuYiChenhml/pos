//TODO: Please write code in this file.
function printInventory(inputs) {
    var allItemInfo = countProduct(inputs);
    printResult(allItemInfo);
}

function printResult(allItemInfo) {
    var sum = 0;
    var free = 0;
    var resultString = '***<没钱赚商店>购物清单***';
    var freeString = '\n----------------------\n挥泪赠送商品：';

    for (var i = 0; i < allItemInfo.length; i++) {
        if (allItemInfo[i].hasOwnProperty('count')) {
            sum += getCost.apply(allItemInfo[i]);
            free += allItemInfo[i].free;
            resultString += getItemMessage(allItemInfo[i]);
            freeString += getItemFreeMessage(allItemInfo[i]);
        }
    }

    resultString += freeString;

    resultString += '\n----------------------\n总计：' + sum.toFixed(2) + '(元)';
    resultString += '\n节省：' + free.toFixed(2) + '(元)';
    resultString += '\n**********************';

    console.log(resultString);
}

function countProduct(inputs) {
    var allItemInfo = loadAllItems();

    for (var i = 0; i < inputs.length; i++) {
        var oneItemInfo = findMatchItemInfo(allItemInfo, inputs[i]);
        var positionOfBar = inputs[i].lastIndexOf('-');
        var countFromBarCode = 1;
        if (positionOfBar != -1) {
            countFromBarCode = parseInt(inputs[i].substring(positionOfBar + 1, inputs[i].length));
        }
        oneItemInfo.count = (oneItemInfo.hasOwnProperty('count')) ? oneItemInfo.count + countFromBarCode : countFromBarCode;
    }

    return allItemInfo;
}

function getCost() {
    if (checkIfInFree(this.barcode) && this.count > 2) {
        var freeCount = Math.trunc(this.count / 3);
        this.free = this.price * freeCount;
        this.freeCount = freeCount;
        return this.price * (this.count - Math.trunc(this.count / 3));
    }
    this.free = 0;
    this.freeCount = 0;
    return this.price * this.count;
}

function checkIfInFree(barcode) {
    var promotions = loadPromotions();
    var IN_FREE_TYPE = 'BUY_TWO_GET_ONE_FREE';
    for (var i = 0; i < promotions.length; i++) {
        if (promotions[i].type == IN_FREE_TYPE &&
            ifContains(promotions[i].barcodes, barcode))
            return true;
    }
    ;
    return false;
}

function ifContains(dataSet, oneData) {
    for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i] == oneData)
            return true;
    }
    ;
    return false;
}

function findMatchItemInfo(allItemInfo, barcode) {
    for (var i = 0; i < allItemInfo.length; i++) {
        if (allItemInfo[i].barcode == barcode ||
            allItemInfo[i].barcode == barcode.substr(0, allItemInfo[i].barcode.length)) {
            return allItemInfo[i];
        }
    }
    return null;
}

function getItemMessage(item) {
    return '\n名称：' + item.name +
        '，数量：' + item.count + item.unit +
        '，单价：' + item.price.toFixed(2) +
        '(元)，小计：' + getCost.apply(item).toFixed(2) + '(元)';
}

function getItemFreeMessage(item) {
    if (item.free <= 0)
        return '';
    return '\n名称：' + item.name +
        '，数量：' + item.freeCount + item.unit;
}