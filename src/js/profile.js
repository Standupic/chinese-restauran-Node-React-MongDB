require("setimmediate");
window.$ = window.jQuery = require("jquery");

$(document).ready(function(){
	var orderId = ""
	$.ajax("/profile/" + id,{
		dataType: 'json',
		error: function(){
			console.log("ajax error!");
		},
		success: function(data){
			if(data.length == 0){
				$(".orders h2").after("Вы еще не сделали ни одного заказа. Пожалуйста передите в раздел <a href='/deliver'>меню</a>.")
			}
			var wrapTable = "";
			$.each(data, function(i, el){
				wrapTable+=`
				<div class="wrap_table">
					<span class='date'>${el.date}</span>
					<table style='text-align: center; width: 70%'>
						<tr>
							 <th style='width: 300px; text-align: left; color: #F53A39; font-weight: bold; color: #F53A39;'>Название</th>
	   						 <th style='padding: 3px 5px; color: #F53A39;'>Количество</th>
	   						 <th style="width: 100px; color: #F53A39;">Цена</th>
						</tr>`
				$.each(el.listItem, function(j, val){
					wrapTable+=`
						<tr>
							<td>${val.name}</td>
							<td>${val.quantity}</td>
							<td>${val.price}</td>
						</tr>
					`
				})
				wrapTable+=`
				</table>
				<p class='total'><em>Всего: </em> ${el.total} ₽<p>
				<input type="checkbox" name="${el._id}" value="Стол" data-key="${el._id}" id="${el._id}">
					<label for="${el._id}"><span></span></label>
				</div>`
				
			})
			if(data.length == 0){
				""
			}else{
				wrapTable+=`
					<button class="repeat_order">Повторить</button>
				`
			}
			
			$(".orders .wrap_items").html(wrapTable);
				checkbox()
				sendRepeat()
			}
		})

		function checkbox(){
		
			$("input[type='checkbox']").on("click", function(){
				
				$(this).parent().toggleClass("active")
				$(this).parent().siblings().removeClass("active")
				var arr = $(this).parent().siblings().children();
				
				for(var i = 0 ; i < arr.length; i++){
					$(arr[i]).prop("checked", false)
				}
				orderId = $(this).attr("id");
			})
		}

		function sendRepeat(){
			$(".repeat_order").on("click" ,function(){
				$.ajax('/profile/repeat/'+ orderId, {
					error: function(){
						console.log("ajax error !")
					},
					success: function(data){
						if(data){
							
						}
					}
				})
			})
		}

	})

