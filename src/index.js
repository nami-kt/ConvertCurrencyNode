const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  var formular = "<form action='/' method='post'>";
  formular += "<select name='crypto'>";
  formular += "<option value='BTC'>Bitcoin</option>";
  formular += "<option value='LTC'>Litecoin</option>";
  formular += "<option value='XMR'>Monero</option>";
  formular += "</select>";

  formular += "<select name='fiat'>";
  formular += "<option value='USD'>USD</option>";
  formular += "<option value='EUR'>EUR</option>";
  formular += "<option value='CZK'>CZK</option>";
  formular += "</select>";

  formular += "<button type='submit' name='button'>Zjisti!</button>";

  formular += "</form>";
  res.send(formular);
});

app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var flat = req.body.flat;
  var amount = req.body.amount;

  var options = {
    url:
      "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2",
    method: "GET",
    qs: {
      from: crypto,
      to: flat,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;

    res.send(
      "<h1>Aktualni cena za " +
        amount +
        " " +
        crypto +
        " " +
        " je " +
        price +
        " " +
        flat +
        "</h1>"
    );
  });

  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";

  url += crypto;
  url += flat;

  request(url, function(error, response, body) {
    var data = JSON.parse(body);

    res.send("<h1>" + data.last + "</h1>");
  });

  console.log(crypto + flat);
});

app.ListeningStateChangedEvent(8080, function() {
  console.log("Server bezi na portu 8080");
});
