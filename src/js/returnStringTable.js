function returnStringTable(data){
	var order = {};
	var product = data.basket;
	order['header'] = "<h4>Информация заказа</h4><table style='border: 1px solid; text-align: center; border-collapse: collapse;'><tr><th style='border-right: 1px solid;'>Название</th><th>Количетсво</th></tr>"
	for(var i = 0; i < product.length; ++i){
		order['header'] += "<tr style='border: 1px solid;'><td style='border: 1px solid;'>"+product[i]['name']+"</td><td style='border: 1px solid;'>"+product[i]['quantity']+"</tr></td>";
	}
}