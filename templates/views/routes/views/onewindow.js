var keystone = require('keystone');
var needle = require('needle');
var cheerio = require('cheerio');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'onewindow';
	locals.filters = {
		liga: req.originalUrl
	};

	locals.title = 'Одно окно';

	view.query('sport', keystone.list('Sport').model.find().sort('sort'));

  view.query('otherservice', keystone.list('Otherservice').model.find().sort('sort'));

	view.query('kontactmodel', keystone.list('Kontact').model.find());

	view.query('postCategory', keystone.list('PostCategory').model.find().sort('-publishedDate'));

  view.query('window', keystone.list('Onewindow').model.find());

	view.render('onewindow');

	url1 = 'https://sport.tut.by/';

	url2 = 'https://hockey.by/';

	// Parsingsport




	needle.get(url1, { parse: true }, function(err,res){
		if (err) throw(err);

		var $ = cheerio.load(res.body);

		var title = $('.col-i .b-mainnews__th ._title').eq(0).text();

		var href = $('.col-i .b-mainnews__th .b-mainnews-pic').eq(0).attr('href');

		var bigImg = 'background-image: url(' + $('.col-i .b-mainnews__th .b-mainnews-pic img').eq(0).attr('src') + ');';

		needle.get(href, function(err,res){
			if (err) throw(err);

			var $ = cheerio.load(res.body);

			var description = $('.b-article #article_body').html();

			var description2 = $('.b-article #article_body p').eq(0).html();

			var parsingauto = new Post.model({
				title: title,
				state: 'Парсер новости',
				img: bigImg,
				description: description,
				description2: description2,
				categories: '5d611b1068c45621f80b98b0'
			});



			keystone.list('Post').model.findOne({ title: title }, function(err, user) {

				if (err || user) {
						console.log('Парсинг - новости спорта, НЕ обновлён');
						return;
				}else {
					console.log('Парсинг - новости спорта, обновлён');
					parsingauto.save(function(err) {
						if (err) throw err;
					});
				}

			});


		});

	});

	// Parsing Hockey

	needle.get(url2, function(err,res){
		if (err) throw(err);

		var $ = cheerio.load(res.body);

		var title = $('.news-block .flex-row .flx-6 .news-midi .title').eq(0).text();

		var href = $('.news-block .flex-row .flx-6 .news-midi .title a').eq(0).attr('href');

		var description2 = $('.news-block .flex-row .flx-6 .news-midi .txt').eq(0).text();

		if ($('.news-block .flex-row .flx-6 .news-midi .img a img').attr('src')) {
			var bigImg = 'background-image: url(https://hockey.by' + $('.news-block .flex-row .flx-6 .news-midi .img a img').attr('src') + ');';
		}else {
			var bigImg = '';
		}

		needle.get(href, function(err,res){
			if (err) throw(err);

			var $ = cheerio.load(res.body);

			var description = $('.node article p').text();

			var parsingauto = new Post.model({
				title: title,
				state: 'Парсер новости',
				img: bigImg,
				description: description,
				description2: description2,
				categories: '5d611b0668c45621f80b98af'
			});

			keystone.list('Post').model.findOne({ title: title }, function(err, user) {

				if (err || user) {
						console.log('Парсинг - новости хоккея, НЕ обновлён');
						return;
				}else {
					console.log('Парсинг - новости хоккея, обновлён');
					parsingauto.save(function(err) {
						if (err) throw err;
					});
				}

			});

		});

	});

		url = 'https://weather.com/ru-BY/weather/today/l/b56197a3bb18ae0c488ea2977ecaf6ee9e38c658698842c4317d647caf30ffdd';

		url3 = 'http://hockey.by/';

		needle.get(url, function(err,res){
				if (err) throw(err);

				var $ = cheerio.load(res.body);

				var weather1 = $('.today_nowcard-section .today_nowcard-temp span').eq(0).text();

				keystone.list('Weather').model.findOneAndUpdate({ _id: '5d6fa871affe672c58a639f0' }, { $set: { weather: weather1 } }, { new: true }, function(err, doc) {

					if (err) {
						console.log('Не удалось обновить погоду-программист неудачник!');
					}

					console.log('Погода успешно обновлена до ' + weather1);
				});

			});

			//Extraliga A parser

			needle.get(url3, function(err,res){
				if (err) throw(err);

				var $ = cheerio.load(res.body);

				var comand1 = $('.StandingsBlock-27 .block-tables .ddst27-0 td').eq(1).text();

				var i1 = $('.StandingsBlock-27 .block-tables .ddst27-0 td').eq(2).text();

				var o1 = $('.StandingsBlock-27 .block-tables .ddst27-0 td').eq(5).text();

				var comand2 = $('.StandingsBlock-27 .block-tables .ddst27-1 td').eq(1).text();

				var i2 = $('.StandingsBlock-27 .block-tables .ddst27-1 td').eq(2).text();

				var o2 = $('.StandingsBlock-27 .block-tables .ddst27-1 td').eq(5).text();

				var comand3 = $('.StandingsBlock-27 .block-tables .ddst27-2 td').eq(1).text();

				var i3 = $('.StandingsBlock-27 .block-tables .ddst27-2 td').eq(2).text();

				var o3 = $('.StandingsBlock-27 .block-tables .ddst27-2 td').eq(5).text();

				var comand4 = $('.StandingsBlock-27 .block-tables .ddst27-3 td').eq(1).text();

				var i4 = $('.StandingsBlock-27 .block-tables .ddst27-3 td').eq(2).text();

				var o4 = $('.StandingsBlock-27 .block-tables .ddst27-3 td').eq(5).text();

				var comand5 = $('.StandingsBlock-27 .block-tables .ddst27-4 td').eq(1).text();

				var i5 = $('.StandingsBlock-27 .block-tables .ddst27-4 td').eq(2).text();

				var o5 = $('.StandingsBlock-27 .block-tables .ddst27-4 td').eq(5).text();

				var comand6 = $('.StandingsBlock-27 .block-tables .ddst27-5 td').eq(1).text();

				var i6 = $('.StandingsBlock-27 .block-tables .ddst27-5 td').eq(2).text();

				var o6 = $('.StandingsBlock-27 .block-tables .ddst27-5 td').eq(5).text();

				var comand7 = $('.StandingsBlock-27 .block-tables .ddst27-6 td').eq(1).text();

				var i7 = $('.StandingsBlock-27 .block-tables .ddst27-6 td').eq(2).text();

				var o7 = $('.StandingsBlock-27 .block-tables .ddst27-6 td').eq(5).text();

				var comand8 = $('.StandingsBlock-27 .block-tables .ddst27-7 td').eq(1).text();

				var i8 = $('.StandingsBlock-27 .block-tables .ddst27-7 td').eq(2).text();

				var o8 = $('.StandingsBlock-27 .block-tables .ddst27-7 td').eq(5).text();

				keystone.list('Standings').model.findOneAndUpdate({ _id: '5d70c250e628ac22b0579eeb' }, { $set:
					{
						comand1: comand1,
						i1: i1,
						o1: o1,
						comand2: comand2,
						i2: i2,
						o2: o2,
						comand3: comand3,
						i3: i3,
						o3: o3,
						comand4: comand4,
						i4: i4,
						o4: o4,
						comand5: comand5,
						i5: i5,
						o5: o5,
						comand6: comand6,
						i6: i6,
						o6: o6,
						comand7: comand7,
						i7: i7,
						o7: o7,
						comand8: comand8,
						i8: i8,
						o8: o8
					}
				}, { new: true }, function(err, doc) {

					if (err) {
						console.log('Не удалось обновить парсинг! - "ЛИГА А"');
					}
					console.log('Парсинг успешно обновлен - "ЛИГА А"');
				});


			});

			//Extraliga B parser

			needle.get(url3, function(err,res){
				if (err) throw(err);

				var $ = cheerio.load(res.body);

				var comand1 = $('.StandingsBlock-28 .block-tables .ddst28-0 td').eq(1).text();

				var i1 = $('.StandingsBlock-28 .block-tables .ddst28-0 td').eq(2).text();

				var o1 = $('.StandingsBlock-28 .block-tables .ddst28-0 td').eq(5).text();

				var comand2 = $('.StandingsBlock-28 .block-tables .ddst28-1 td').eq(1).text();

				var i2 = $('.StandingsBlock-28 .block-tables .ddst28-1 td').eq(2).text();

				var o2 = $('.StandingsBlock-28 .block-tables .ddst28-1 td').eq(5).text();

				var comand3 = $('.StandingsBlock-28 .block-tables .ddst28-2 td').eq(1).text();

				var i3 = $('.StandingsBlock-28 .block-tables .ddst28-2 td').eq(2).text();

				var o3 = $('.StandingsBlock-28 .block-tables .ddst28-2 td').eq(5).text();

				var comand4 = $('.StandingsBlock-28 .block-tables .ddst28-3 td').eq(1).text();

				var i4 = $('.StandingsBlock-28 .block-tables .ddst28-3 td').eq(2).text();

				var o4 = $('.StandingsBlock-28 .block-tables .ddst28-3 td').eq(5).text();

				var comand5 = $('.StandingsBlock-28 .block-tables .ddst28-4 td').eq(1).text();

				var i5 = $('.StandingsBlock-28 .block-tables .ddst28-4 td').eq(2).text();

				var o5 = $('.StandingsBlock-28 .block-tables .ddst28-4 td').eq(5).text();

				var comand6 = $('.StandingsBlock-28 .block-tables .ddst28-5 td').eq(1).text();

				var i6 = $('.StandingsBlock-28 .block-tables .ddst28-5 td').eq(2).text();

				var o6 = $('.StandingsBlock-28 .block-tables .ddst28-5 td').eq(5).text();

				var comand7 = $('.StandingsBlock-28 .block-tables .ddst28-6 td').eq(1).text();

				var i7 = $('.StandingsBlock-28 .block-tables .ddst28-6 td').eq(2).text();

				var o7 = $('.StandingsBlock-28 .block-tables .ddst28-6 td').eq(5).text();

				var comand8 = $('.StandingsBlock-28 .block-tables .ddst28-7 td').eq(1).text();

				var i8 = $('.StandingsBlock-28 .block-tables .ddst28-7 td').eq(2).text();

				var o8 = $('.StandingsBlock-28 .block-tables .ddst28-7 td').eq(5).text();

				var comand9 = $('.StandingsBlock-28 .block-tables .ddst28-8 td').eq(1).text();

				var i9 = $('.StandingsBlock-28 .block-tables .ddst28-8 td').eq(2).text();

				var o9 = $('.StandingsBlock-28 .block-tables .ddst28-8 td').eq(5).text();

				keystone.list('Standings').model.findOneAndUpdate({ _id: '5d70c25ce628ac22b0579eec' }, { $set:
					{
						comand1: comand1,
						i1: i1,
						o1: o1,
						comand2: comand2,
						i2: i2,
						o2: o2,
						comand3: comand3,
						i3: i3,
						o3: o3,
						comand4: comand4,
						i4: i4,
						o4: o4,
						comand5: comand5,
						i5: i5,
						o5: o5,
						comand6: comand6,
						i6: i6,
						o6: o6,
						comand7: comand7,
						i7: i7,
						o7: o7,
						comand8: comand8,
						i8: i8,
						o8: o8,
						comand9: comand9,
						i9: i9,
						o9: o9
					}
				}, { new: true }, function(err, doc) {

					if (err) {
						console.log('Не удалось обновить парсинг! - "ЛИГА Б"');
					}
					console.log('Парсинг успешно обновлен - "ЛИГА Б"');
				});


			});

			//Высшая лига parser

			needle.get(url3, function(err,res){
				if (err) throw(err);

				var $ = cheerio.load(res.body);

				var comand1 = $('.StandingsBlock-30 .block-tables .ddst30-0 td').eq(1).text();

				var i1 = $('.StandingsBlock-30 .block-tables .ddst30-0 td').eq(2).text();

				var o1 = $('.StandingsBlock-30 .block-tables .ddst30-0 td').eq(5).text();

				var comand2 = $('.StandingsBlock-30 .block-tables .ddst30-1 td').eq(1).text();

				var i2 = $('.StandingsBlock-30 .block-tables .ddst30-1 td').eq(2).text();

				var o2 = $('.StandingsBlock-30 .block-tables .ddst30-1 td').eq(5).text();

				var comand3 = $('.StandingsBlock-30 .block-tables .ddst30-2 td').eq(1).text();

				var i3 = $('.StandingsBlock-30 .block-tables .ddst30-2 td').eq(2).text();

				var o3 = $('.StandingsBlock-30 .block-tables .ddst30-2 td').eq(5).text();

				var comand4 = $('.StandingsBlock-30 .block-tables .ddst30-3 td').eq(1).text();

				var i4 = $('.StandingsBlock-30 .block-tables .ddst30-3 td').eq(2).text();

				var o4 = $('.StandingsBlock-30 .block-tables .ddst30-3 td').eq(5).text();

				var comand5 = $('.StandingsBlock-30 .block-tables .ddst30-4 td').eq(1).text();

				var i5 = $('.StandingsBlock-30 .block-tables .ddst30-4 td').eq(2).text();

				var o5 = $('.StandingsBlock-30 .block-tables .ddst30-4 td').eq(5).text();

				var comand6 = $('.StandingsBlock-30 .block-tables .ddst30-5 td').eq(1).text();

				var i6 = $('.StandingsBlock-30 .block-tables .ddst30-5 td').eq(2).text();

				var o6 = $('.StandingsBlock-30 .block-tables .ddst30-5 td').eq(5).text();

				var comand7 = $('.StandingsBlock-30 .block-tables .ddst30-6 td').eq(1).text();

				var i7 = $('.StandingsBlock-30 .block-tables .ddst30-6 td').eq(2).text();

				var o7 = $('.StandingsBlock-30 .block-tables .ddst30-6 td').eq(5).text();

				var comand8 = $('.StandingsBlock-30 .block-tables .ddst30-7 td').eq(1).text();

				var i8 = $('.StandingsBlock-30 .block-tables .ddst30-7 td').eq(2).text();

				var o8 = $('.StandingsBlock-30 .block-tables .ddst30-7 td').eq(5).text();

				var comand9 = $('.StandingsBlock-30 .block-tables .ddst30-8 td').eq(1).text();

				var i9 = $('.StandingsBlock-30 .block-tables .ddst30-8 td').eq(2).text();

				var o9 = $('.StandingsBlock-30 .block-tables .ddst30-8 td').eq(5).text();

				var comand10 = $('.StandingsBlock-30 .block-tables .ddst30-9 td').eq(1).text();

				var i10 = $('.StandingsBlock-30 .block-tables .ddst30-9 td').eq(2).text();

				var o10 = $('.StandingsBlock-30 .block-tables .ddst30-9 td').eq(5).text();

				var comand11 = $('.StandingsBlock-30 .block-tables .ddst30-10 td').eq(1).text();

				var i11 = $('.StandingsBlock-30 .block-tables .ddst30-10 td').eq(2).text();

				var o11 = $('.StandingsBlock-30 .block-tables .ddst30-10 td').eq(5).text();

				var comand12 = $('.StandingsBlock-30 .block-tables .ddst30-11 td').eq(1).text();

				var i12 = $('.StandingsBlock-30 .block-tables .ddst30-11 td').eq(2).text();

				var o12 = $('.StandingsBlock-30 .block-tables .ddst30-11 td').eq(5).text();

				var comand13 = $('.StandingsBlock-30 .block-tables .ddst30-12 td').eq(1).text();

				var i13 = $('.StandingsBlock-30 .block-tables .ddst30-12 td').eq(2).text();

				var o13 = $('.StandingsBlock-30 .block-tables .ddst30-12 td').eq(5).text();

				keystone.list('Standings').model.findOneAndUpdate({ _id: '5d70c268e628ac22b0579eed' }, { $set:
					{
						comand1: comand1,
						i1: i1,
						o1: o1,
						comand2: comand2,
						i2: i2,
						o2: o2,
						comand3: comand3,
						i3: i3,
						o3: o3,
						comand4: comand4,
						i4: i4,
						o4: o4,
						comand5: comand5,
						i5: i5,
						o5: o5,
						comand6: comand6,
						i6: i6,
						o6: o6,
						comand7: comand7,
						i7: i7,
						o7: o7,
						comand8: comand8,
						i8: i8,
						o8: o8,
						comand9: comand9,
						i9: i9,
						o9: o9,
						comand10: comand10,
						i10: i10,
						o10: o10,
						comand11: comand11,
						i11: i11,
						o11: o11,
						comand12: comand12,
						i12: i12,
						o12: o12,
						comand13: comand13,
						i13: i13,
						o13: o13
					}
				}, { new: true }, function(err, doc) {

					if (err) {
						console.log('Не удалось обновить парсинг! - "ВЫСШАЯ ЛИГА"');
					}
					console.log('Парсинг успешно обновлен - "ВЫСШАЯ ЛИГА"');
				});


			});

	// Render the view


};
