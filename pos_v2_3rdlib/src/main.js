function printInventory(inputs) {
    var items = loadAllItems();
    count_goods(inputs, items);
    var goods_statistics = calculate_promotion(items, loadPromotions());
    var receipt = generate_receipt(goods_statistics);
    console.log(receipt);
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
    var barcode_in_promotion = _.filter(promotions, {'type':'BUY_TWO_GET_ONE_FREE'})[0].barcodes;
    _.forEach(items, function (item) {
        item.freeCount = _.contains(barcode_in_promotion, item.barcode) ?
            (item.count > 2) ? 1 : 0
            :
            0;
    });
}

function generate_receipt(goods_statistics) {

}