var single;

// Enter your access key.
let access_key = "";

// define from currency, to currency, and amount
let from = "CAD";
let to = "USD";
let amount = 0;

const request = () =>
  $.ajax({
    url:
      "https://data.fixer.io/api/convert?access_key=" +
      access_key +
      "&from=" +
      from +
      "&to=" +
      to +
      "&amount=" +
      amount,
    dataType: "jsonp",
    success: function(json) {
      // access the conversion result in json.result
      // console.log(json.result.toFixed(2));
      if (amount <= 0) {
        document.getElementById("result").innerHTML = "0";
      } else {
        document.getElementById("result").innerHTML = json.result.toFixed(2);
      }
    }
  });

function getSymbol1() {
  from = document.getElementById("dropdownOne").value;
  request();
  return x;
}

function getSymbol2() {
  to = document.getElementById("dropdownTwo").value;
  request();
  return x;
}

$(document).ready(function() {
  $("#myForm").on("submit", function(e) {
    e.preventDefault();
    let x = document.getElementById("initialAmount").value;
    amount = x * 1.1;
    request();
    return x;
  });
});

fetch("http://data.fixer.io/api/symbols?access_key=" + access_key + "&format=1")
  .then(result => {
    return result.json();
  })
  .then(data => {
    single = JSON.stringify(data.symbols).split(",");
    let symbolKeys = Object.keys(data.symbols);
    let symbolValues = Object.values(data.symbols);
    //add to drop menu
    for (var i = 0; i < single.length - 1; i++) {
      if (symbolKeys[i] === "CAD") {
        $("#dropdownOne").append(
          `<option selected value=${symbolKeys[i]}>` +
            symbolKeys[i] +
            ": " +
            symbolValues[i] +
            "</option>"
        );
        $("#dropdownTwo").append(
          `<option value=${symbolKeys[i]}>` +
            symbolKeys[i] +
            ": " +
            symbolValues[i] +
            "</option>"
        );
      } else if (symbolKeys[i] === "USD") {
        $("#dropdownTwo").append(
          `<option selected value=${symbolKeys[i]}>` +
            symbolKeys[i] +
            ": " +
            symbolValues[i] +
            "</option>"
        );
        $("#dropdownOne").append(
          `<option value=${symbolKeys[i]}>` +
            symbolKeys[i] +
            ": " +
            symbolValues[i] +
            "</option>"
        );
      } else {
        $("#dropdownOne").append(
          `<option value=${symbolKeys[i]}>` +
            symbolKeys[i] +
            ": " +
            symbolValues[i] +
            "</option>"
        );
        $("#dropdownTwo").append(
          `<option value=${symbolKeys[i]}>` +
            symbolKeys[i] +
            ": " +
            symbolValues[i] +
            "</option>"
        );
      }
    }
  })
  .catch(error => console.log(error));

// execute the conversion using the "convert" endpoint:
