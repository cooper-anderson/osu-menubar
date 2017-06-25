#!/usr/local/bin/node

http = require("http");

let key = ""; //API key, found here: https://osu.ppy.sh/p/api
let users = ["titanknox", "FoxyGrandpa"]; //A list of the users you want to view, in quotation marks and separated by commas
let mode = 0; //(0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)

function format(name="", value=0, index=1) {
	console.log("--".repeat(index) + name + ": " + value);
}

function output(data) {
	console.log(data.username);
	format("rank", data.pp_rank);
	format("level", data.level);
	format("accuracy", Number(data.accuracy).toPrecision(4));
	format("ranked score", data.ranked_score);
	format("total score", data.total_score);
	format("pp count", data.pp_raw);
	console.log("--counts");
	format("plays", data.playcount, 2);
	console.log("-------")
	format("ranked SS", data.count_rank_ss, 2);
	format("ranked S", data.count_rank_s, 2);
	format("ranked A", data.count_rank_a, 2);
	console.log("-------")
	format("300s hit", data.count300, 2);
	format("100s hit", data.count100, 2);
	format("50s hit", data.count50, 2);
	console.log("-----")
	format("country rank", data.pp_country_rank + ' ' + data.country);
	format("user id", data.user_id);
}

console.log("osu!");
console.log("---");

for (let user of users) {
	let request = http.request({host: "osu.ppy.sh", path: `/api/get_user?k=${key}&u=${user}&m=${mode}`}, function (res) {
		var data = '';
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function () {
			// console.log(data);
			output(JSON.parse(data)[0]);
		});
	});
	request.on('error', function (e) {
		console.log(e.message);
	});
	request.end();
}

