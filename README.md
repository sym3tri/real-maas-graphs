This illustrates how to hit the Rackspace cloud monitoring API to load real metric data and graph it using [glimpse.js](https://github.com/racker/glimpse.js).


## Setup
- clone this repo
- run `npm install`
- run `scripts/web-server.js`
- clone `https://github.com/sym3tri/monprox` (a simple pass-thru proxy that does auth for you)
- put your creds into `monprox/config.json`
- run `node monprox.js`
- point your browser to `http://localhost:8000`
