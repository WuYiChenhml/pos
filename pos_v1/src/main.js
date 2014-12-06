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
    };
    return false;
}

function ifContains(dataSet, oneData) {
    for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i] == oneData)
            return true;
    };
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


function Item(item) {
    this.name = item.name;
    this.barcode = item.barcode;
    this.unit = item.unit;
    this.price = item.price;
    this.count = 1;
    this.free = 0;

    this.checkBarcode = function(barcode) {
        if (this.barcode == barcode ||
            this.barcode == barcode.substr(0, this.barcode.length)) {
            return true;
        }
        return false;
    }

    this.toString = function() {
        return '\n名称：' + this.name +
            '，数量：' + this.count + this.unit +
            '，单价：' + this.price.toFixed(2) +
            '(元)，小计：' + this.getCost().toFixed(2) + '(元)';
    }

    this.getFreeMessage = function() {
        this.calculateFree();
        if (this.free <= 0)
            return '';
        return '\n名称：' + item.name +
            '，数量：' + item.freeCount + item.unit;
    }

    this.addCount = function(barcode) {
        if (this.barcode == barcode)
            this.count++;
        else if (this.barcode == barcode.substr(0, this.barcode.length)) {
            var positionOfBar = barcode.lastIndexOf('-');
            this.count += parseInt(barcode.substring(positionOfBar + 1, barcode.length));
        }
    }

    this.calculateFree = function() {
        if (flag && this.count > 2) {
            var freeCount = Math.trunc(this.count / 3);
            this.free = this.price * freeCount;
            this.freeCount = freeCount;
            return this.price * (this.count - Math.trunc(this.count / 3));
        }
    }
    return this.price * this.count;
}

function checkIfInFree() {
    var promotions = loadPromotions();
    var IN_FREE_TYPE = 'BUY_TWO_GET_ONE_FREE';
    for (var i = 0; i < promotions.length; i++) {
        if (promotions[i].type == IN_FREE_TYPE &&
            ifContains(promotions[i].barcodes, this.barcode)) {
            flag = true;
            break;
        }
    }
}


function ifContains(dataSet, oneData) {
    for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i] == oneData)
            return true;
    }
    return false;
}
