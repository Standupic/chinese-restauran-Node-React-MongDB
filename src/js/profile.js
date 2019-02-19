require("setimmediate");
window.$ = window.jQuery = require("jquery");

$(document).ready(function(){
	var orderId = "",
	    index = "";
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
					<table style='text-align: center; width: 85%'>
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
				<input type="checkbox" name="${el._id}" value="Стол" data-key="${i}" id="${el._id}">
					<label for="${el._id}"><span></span></label>
				</div>`
				
			})
			if(data.length == 0){
				""
			}else{
				wrapTable+=`
					<button class="repeat_order">Повторить</button>
					<div id="popover" class="">
						<div id="box" class="">
							<div class="out">
								&times;
							</div>
							<h1>Подтверждение заказа</h1>
							<p></p>
						</div>
					</div>
				`
			}
			
			$(".orders .wrap_items").html(wrapTable);
				checkbox()
				sendRepeat()
			}
		})

		function checkbox(){
			var $_wrap_table = $(".orders .wrap_items > .wrap_table");
			var $_inputs = $("input[type='checkbox']");

			$("input[type='checkbox']").on("click", function(){
				if(index == $(this).attr("data-key")){
					$($_wrap_table[index]).removeClass("active")
					$($_inputs[index]).prop("checked", false)
					index = "";
				}else{
					index = $(this).attr("data-key");

					for(var i = 0; i < $_wrap_table.length; i++){
						$($_wrap_table[i]).removeClass("active")
						$($_inputs[i]).removeClass("active")
						$($_inputs[i]).prop("checked", false)
					}
					$($_wrap_table[index]).addClass("active")
					$($_inputs[index]).prop("checked", true)
				}
					orderId = $(this).attr("id");
			})
		}
		function showPopUp(text){
			var $_popover = $("#popover");
			var $_box = $("#box");
			$_popover.addClass("slideIn")
			$_box.addClass("slideIn")
			console.log($_box+" p");
			$("#box p").html(text)
			$("#box .out").on("click", function(){
				$_popover.removeClass("slideIn")
				$("#box").removeClass("slideIn")
				window.location.href = window.location.origin
			})
		}
		function sendRepeat(){
			$(".repeat_order").on("click" ,function(){
				$.ajax({ 
					url:'/profile/repeat/'+ orderId,
					error: function(){
						var text = `К сожалению Ваш заказ не дошел до нас! 
						Пожалуйста позвоните нам <a href='tel:+74957444935' itemprop='telephone'>+ 7(495)744-49-35</a>.`
						showPopUp(text)
					},
					success: function(data){
						var text = "Ваш заказ был продублирован, наш менеджер свяжеться с вами в ближайщее время!"
						if(data){
							showPopUp(text)
						}
					}
				})
			})
		}

	})

