const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const hostname = "127.0.0.1";
const port = 5000;
const api_key = process.env.GOOGLE_MATRIX_API_KEY;

const addresses = require("./addresses.json");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const elem_limit = 25; //half element limit

function fetchJSON(url) {
  url = new URL(url);
  //  console.time(url);
  return fetch(url)
    .then((response) => response.json() /*, console.timeEnd(url)*/)
    .catch((err) => console.log(err));
}

async function getDistances() {
  console.log("getDistances");
  var max = addresses.street.length - 1;
  var amount = Math.ceil(max / elem_limit);
  let urls = new Array();
  let maxi = elem_limit;
  if (maxi > max) maxi = max;

  for (let n = 0; n < max; n++) {
    var origin = `${addresses.street[n]}+${addresses.town}+${addresses.country}`;
    var destinations = "";
    for (let x = 0; x < amount; x++) {
      for (let m = x * elem_limit; m < (x + 1) * maxi; m++) {
        if (m == max - 1) {
          destinations += `${addresses.street[m + 1]}+${addresses.town}+${
            addresses.country
          }`;
        } else if (n != m) {
          destinations += `${addresses.street[m]}+${addresses.town}+${addresses.country}|`;
        }
      }
      var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations}&key=${api_key}`;
      url = url.replace(/\s/g, "+");
      urls.push(url);
    }
  }

  let promises = urls.map((url) => fetchJSON(url));
  Promise.all(promises)
    .then((responses) => findFastest(responses))
    .catch((err) => console.log(err));
}

function findFastest(responses) {
  var durations = new Array();
  var fastOrder = new Array();
  var order = new Array();
  for (var n = 0; n < responses.length; n++) {
    durations[n] = new Array(12);
    if (n < responses.length - 1) {
      order.push(n);
    }
    for (
      var m = 0, mf = 0;
      m < responses[n].rows[0].elements.length;
      m++, mf++
    ) {
      if (n == m) mf++;
      durations[n][mf] = responses[n].rows[0].elements[m].duration.value;
    }
  }
  //  console.log(durations);
  var fastest = 999999999;
  let r = 0;
  console.time("main");
  while (true) {
    r++;
    var largestX = -1;
    var largestY;
    //current_time = start-first_point + last_point-finish
    var time =
      durations[durations.length - 1][order[0]] +
      durations[order[order.length - 1]][durations.length - 1];
    for (var x = 0; x < order.length - 1; x++) {
      time += durations[order[x]][order[x + 1]];
      if (order[x] < order[x + 1]) {
        largestX = x;
      }
    }

    if (time < fastest) {
      fastest = time;
      fastOrder = order.slice();
    }

    if (largestX == -1) {
      break;
    }

    for (var y = 0; y < order.length; y++) {
      if (order[largestX] < order[y]) {
        largestY = y;
      }
    }

    var tmp = order[largestX];
    order[largestX] = order[largestY];
    order[largestY] = tmp;

    var tmpArray = order.splice(largestX + 1);
    tmpArray.reverse();
    order = order.concat(tmpArray);
  }
  console.timeEnd("main");
  console.log(r);
  console.log("fastOrder: " + fastOrder);
  getDirections(fastOrder);
}

function getDirections(path) {
  var adr = `https://www.google.com/maps/dir/${
    addresses.street[addresses.street.length - 2]
  }+${addresses.town}+${addresses.country}`;
  for (var n = 0; n < path.length; n++) {
    adr += `/${addresses.street[path[n]]}+${addresses.town}+${
      addresses.country
    }`;
  }
  adr += `/${addresses.street[addresses.street.length - 1]}+${addresses.town}+${
    addresses.country
  }`;
  adr = adr.replace(/\s/g, "+");
  shortUrl(adr);
  return adr;
}

function shortUrl(url) {
  https
    .get(
      `https://www.google.com/maps/rpc/shorturl?authuser=0&hl=lt&gl=lt&pb=!1s${url}`,
      (res) => {
        let data = "";

        // A chunk of data has been recieved.
        res.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        res.on("end", () => {
          try {
            fs.writeFileSync("./short.json", data);
          } catch (err) {
            console.error(err);
          }
          var jsop = JSON.parse(data.replace(")]}'", ""));
          console.log(jsop[0]);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

//getLocations();

//getDistances(); this is the deal


//var data = getDistances();
//var path = findFastest(getDistances());
//console.log(getDistances());
/*
    Find the largest x such that P[x]<P[x+1].
    (If there is no such x, P is the last permutation.)
    Find the largest y such that P[x]<P[y].
    Swap P[x] and P[y].
    Reverse P[x+1 .. n].
*/
