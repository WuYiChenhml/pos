function printInventory(inputs) {
    var items = loadAllItems();
    count_goods(inputs, items);
    calculate_promotion(items, loadPromotions());
    console.log(generate_receipt(items));
}

function count_goods(inputs, items) {
    _.forEach(inputs, function (oneInput) {
        _.forEach(_.filter(items, function (oneItem) {
            return oneInput.split('-')[0] === oneItem.barcode;
        }), function (oneItem) {
            oneItem.count = (oneItem.count === undefined) ? 0 : oneItem.count;
            oneItem.count += (oneInput.split('-')[1] === undefined) ? 1 : _.parseInt(oneInput.split('-')[1]);
        });
    });
}

function calculate_promotion(items, promotions) {
    var barcode_in_promotion = _.filter(promotions, {'type': 'BUY_TWO_GET_ONE_FREE'})[0].barcodes;
    _.forEach(items, function (item) {
        item.freeCount = _.contains(barcode_in_promotion, item.barcode) ?
            (item.count > 2) ? 1 : 0
            :
            0;
    });
}

function generate_receipt(items) {
    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    var expectText =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n';

    var count_valid = _.filter(items, function (item) {
        return item.count;
    });
    var free_valid = _.filter(items, function (item) {
        return item.freeCount;
    });

    _.forEach(count_valid, function (item) {
        expectText += '名称：' + item.name + '，数量：' + item.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + ((item.count - item.freeCount) * item.price).toFixed(2) + '(元)\n';
    });
    expectText +=
        '----------------------\n' +
        '挥泪赠送商品：\n';
    _.forEach(free_valid, function (item) {
        expectText += '名称：' + item.name + '，数量：' + item.freeCount + item.unit + '\n';
    });

    var sum = 0, free_sum = 0;
    _.forEach(count_valid, function (item) {
        sum += (item.count - item.freeCount) * item.price;
        free_sum += item.freeCount * item.price
    });

    expectText +=
        '----------------------\n' +
        '总计：' + sum.toFixed(2) + '(元)\n' +
        '节省：' + free_sum.toFixed(2) + '(元)\n' +
        '**********************';

    return expectText;
}