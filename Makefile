data.js: ok data.csv
	node csv2js.js > $@

ok: csv2js.js
	standard
