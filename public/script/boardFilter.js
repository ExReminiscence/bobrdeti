$(".boardPage__left__content__info__desc p").text(function (i, text) {
    if (text.length >= 220) {
        text = text.substring(0, 220);
        var lastIndex = text.lastIndexOf(" ");
        text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
});



			var boardPage__left__content = document.querySelector('.boardPage__left__content');
			var boardPage__left__menuDiv__menu__item__a = document.querySelectorAll('.boardPage__left__menuDiv__menu__item a');


			for (let i = 0; i < boardPage__left__menuDiv__menu__item__a.length; i++) {
				boardPage__left__menuDiv__menu__item__a[i].onclick = (e) => {
					e.preventDefault();
					if (boardPage__left__menuDiv__menu__item__a[i].innerText == 'Продам') {
						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardTypeProdam}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
						boardPage__left__menuDiv__menu__item__a[0].style.color = "#FEBF14";
						boardPage__left__menuDiv__menu__item__a[1].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[2].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[3].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[4].style.color = "#0C8D87";
					} else if (boardPage__left__menuDiv__menu__item__a[i].innerText == 'Купить') {
						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardTypeBuy}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
						boardPage__left__menuDiv__menu__item__a[2].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[3].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[4].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[0].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[1].style.color = "#FEBF14";
					}
					else if (boardPage__left__menuDiv__menu__item__a[i].innerText == 'Меняю') {
						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardTypeObmen}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
						boardPage__left__menuDiv__menu__item__a[1].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[0].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[3].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[4].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[2].style.color = "#FEBF14";
					}
					else if (boardPage__left__menuDiv__menu__item__a[i].innerText == 'Барахолка') {
						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardTypeBaraholka}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
						boardPage__left__menuDiv__menu__item__a[2].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[1].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[0].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[4].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[3].style.color = "#FEBF14";
					}
					else if (boardPage__left__menuDiv__menu__item__a[i].innerText == 'Благотворительность') {
						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardTypeBlago}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
						boardPage__left__menuDiv__menu__item__a[2].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[1].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[0].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[3].style.color = "#0C8D87";
						boardPage__left__menuDiv__menu__item__a[4].style.color = "#FEBF14";
					}
				}
			}


						/*----------------------------------BOARD CATEGORY FILTER---------------------------------*/

			var boardPage__left__content = document.querySelector('.boardPage__left__content');
			var boardPage__left__menuDiv__menu__item__input = document.querySelectorAll('.boardPage__right__filter input ');

			for (let i = 0; i < boardPage__left__menuDiv__menu__item__input.length; i++) {
				boardPage__left__menuDiv__menu__item__input[i].onclick = (e) => {

					if ( i== 0 ) {

						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardANY}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';

						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardNEW}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}} {{#each data.posts.results}}{{#if board}}{{#if boardBY}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
					} else if (i == 1){

						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardNEW}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';

						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardNEW}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
					}
					else if (i == 2){
						boardPage__left__content.innerHTML = '{{#each data.posts.results}}{{#if board}}{{#if boardBY}}<div class="boardPage__left__content__item"><div class="d-flex board__item">{{#if image}}<div class="boardPage__left__content__item__img"><img src="{{{cloudinaryUrl image crop="fit" }}}" alt=""></div> {{/if}}<div class="boardPage__left__content__item__info"><div class="boardPage__left__content__info"><div class="d-flex name__cost"><h2 class="boardPage__left__content__info__name"><a href="{{postUrl slug}}">{{title}}</a></h2><div class="boardPage__left__content__info__cost">{{{cost}}}</div></div><div class="boardPage__left__content__info__desc">{{{content}}}</div><p  class="boardPage__left__content__info__date">{{moment publishedDate "weekday"}} {{time}}</p></div></div></div></div>{{/if}}{{/if}}{{/each}}';
						$(".boardPage__left__content__info__desc p").text(function (i, text) {
							if (text.length >= 220) {
								text = text.substring(0, 220);
								var lastIndex = text.lastIndexOf(" ");
								text = text.substring(0, lastIndex) + ' ...';
							}
							$(this).text(text);
						});
					}

				}
			}



			/*----------------------------------BOARD CATEGORY FILTER----------------------------------------*/


			/*BOARD COST FILTER*/

			function costFilter(){
				var currentMinCost = document.getElementById('minCost').value; // получаем значение мин цены в инпуте
				var currentMaxCost = document.getElementById('maxCost').value; // получаем значение макс цены в инпуте
				var numbercurrentMinCost = parseInt(currentMinCost,10); // преобразуем в целое число
				var numbercurrentMaxCost = parseInt(currentMaxCost,10); // преобразуем в целое число
				var itemCost = document.querySelectorAll('.boardPage__left__content__info__cost p'); // получаем цены всех элементов
				var itemBoard = document.querySelectorAll('.boardPage__left__content__item'); // получаем все элементы

				for(var i=0; i < itemCost.length; i++){  // проходим по ценам всех элементов
					var numCost = parseInt(itemCost[i].innerText, 10); // проходим по ценам всех элементов
					if( numbercurrentMinCost > 1){ // если есть значение минимальной цены
						if (numCost >= numbercurrentMinCost) {  //если значение цены больше или равно значению минимальной цены
							itemBoard[i].style.display = "block";
						} else {
							itemBoard[i].style.display = "none";
						}
					}

					if (numbercurrentMaxCost > 1 ) { //если значение цены максимальной цены
						if (numCost <= numbercurrentMaxCost) { //если значение цены меньше или равно значению максимальной цены
							itemBoard[i].style.display = "block";
						} else {
							itemBoard[i].style.display = "none";
						}
					}

					if(numbercurrentMinCost > 1 && numbercurrentMaxCost > 1){ //если в фильтре есть минимальная цена и максимальная
						if (numCost <= numbercurrentMaxCost && numCost >= numbercurrentMinCost) {
							itemBoard[i].style.display = "block";
						} else {
							itemBoard[i].style.display = "none";
						}
					}
				}

			}




			/*BOARD COST FILTER*/



