//TODO: Please write code in this file.

function insert_data_to_array( array_a ,insert_index, array_b)
{
    //在这里写入代码
	var result = array_a.concat();
    var b = array_b.concat();
  	result.splice(insert_index, 0, b);
	return result;
}


function printInventory() {
	var array_b = [13,1,11];
	var array_a = [9,14,19,27,14,2,8,5,15,12,22,26];
	var x = insert_data_to_array(array_a, 3, array_b);
	console.log(x);
}