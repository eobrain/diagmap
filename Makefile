.SUFFIXES: .js .ok

.js.ok:
	standard $<
	touch $@

all: data.ok app.ok

data.js: data.csv csv2js.ok
	node csv2js.js > $@
	standard --fix $@



