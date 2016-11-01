/**
 Question : write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
 [
 {quater: 1, totalPrices: xxx, transactionNums: n},
 {....}
 ]
 **/

function sumByQuater(saleItems) {
    var total = [];
    var quatersItem = [];// an Array an array to store all items for each quarter
    var sales;
    var i;
    for(i = 1; i <= 4; i++){
        sales = saleItems.filter(function(item, index){
            return ((item.month <= (i*3)) && (item.month >= 3*(i-1)));
        });
        if(sales.length !== 0)
            quatersItem.push(sales);
    }
    for(i = 0; i < quatersItem.length; i++){
        var totalPrices;
        if(quatersItem[i].length === 1)
            totalPrices = quatersItem[i][0].salePrice;
        else {
            totalPrices = quatersItem[i].reduce(function(prev, cur, index, array){
                return prev.salePrice + cur.salePrice;
            });
        }
        total.push({
            quater: i+1,
            totalPrices:totalPrices,
            transactionNums: quatersItem[i].length
        });
    }
    return total;
}

/**
 Question : write a function to calculate and return a list of average sales for each quarter, expected result like:
 [
 {quater: 1, averagePrices: xxx, transactionNums: n},
 {....}
 ]
 **/

function averageByQuater(saleItems) {
    var total = sumByQuater(saleItems);
    return total.map(function(item, index, array){
        return {
            quater: item.quater,
            averagePrices: item.totalPrices/item.transactionNums,
            transactionNums: item.transactionNums
        };
    });
}