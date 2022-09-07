$("#arabico").hide();
$("#romano").hide();

$(document).ready(function () {
  $("#back1").click(function () {
    $("#arabico").hide();
    $("#romano").hide();
    $("#choice").show();
  });
  $("#back2").click(function () {
    $("#arabico").hide();
    $("#romano").hide();
    $("#choice").show();
  });
  $("#arabicos").click(function () {
    $("#choice").hide();
    $("#arabico").show();
  });
  $("#romanos").click(function () {
    $("#choice").hide();
    $("#romano").show();
  });
});

const numberMap = {
  //Unidade
  0: [
    "", //0
    "I", //1
    "II", //2
    "III", //3
    "IV", //4
    "V", //5
    "VI", //6
    "VII", //7
    "VIII", //8
    "IX", //9
  ],
  //Dezena
  1: [
    "", //10
    "X", //10
    "XX", //20
    "XXX", //30
    "XL", //40
    "L", //50
    "LX", //60
    "LXX", //70
    "LXXX", //80
    "XC", //90
  ],
  2: [
    "",
    "C", //100
    "CC", //200
    "CCC", //300
    "CD", //400
    "D", //500
    "DC", //600
    "DCC", //700
    "DCCC", //800
    "CM", //900
  ],
  3: [
    "",
    "M", //1000
    "MM", //2000
    "MMM", //3000
  ],
};
//Maximum number is 3999

function ArabicForRoman() {
  var number = document.getElementById("decimal1").value;
  number = number.replace(/[^0-9\.]+/g, "");
  if (number == "") return "";

  var number = parseInt(number);

  if (number > 3999) {
    return "MAXIMUM NUMBER IS: '3999'";
  }

  //Find out if it is Unit, Tens, Hundreds, Thousands
  var orderNumber = Number(number).toString();
  var orderLength = orderNumber.length;

  var unitTwentyHundred = orderLength - 1;

  var newOrder = "";
  for (var i = unitTwentyHundred; i >= 0; i--) {
    newOrder = newOrder + orderNumber.charAt(i);
  }

  var finalCast = "";
  for (var i = unitTwentyHundred; i >= 0; i--) {
    var auxVar = parseInt(newOrder.charAt(i));
    finalCast = finalCast + numberMap[i][auxVar];
  }

  return finalCast;
}

function romanToDecimal() {
  var result = 0;
  var ln = null;
  var algarismos = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  var number = document.getElementById("roman2").value.toUpperCase();

  for (var i = number.length - 1; i >= 0; i--) {
    var char = number.charAt(i);
    if (
      number.charAt(i - 1) == char &&
      number.charAt(i - 2) == char &&
      number.charAt(i - 3) == char
    ) {
      return "Undefined";
    }
    for (var key in algarismos) {
      if (char === key) {
        var nc = parseInt(algarismos[key]);
        if (ln !== null) {
          if (nc < ln) {
            nc = nc * -1;
          }
        }

        result = result + nc;
        ln = nc;
      }
    }
  }
  return result;
}

document.getElementById("decimal1").addEventListener("keyup", function () {
  var romanNumber = ArabicForRoman(this.value);

  document.getElementById("roman1").value = romanNumber;

  var numberCheck = this.value.replace(/[^0-9\.]+/g, "");
  if (numberCheck == "") return false;
});

document.getElementById("roman2").addEventListener("keyup", function () {
  var arabicNumber = romanToDecimal(this.value);

  document.getElementById("decimal2").value = arabicNumber;

  var numberCheck = this.value.replace(/[^0-9\.]+/g, "");
  if (numberCheck == "") return false;
});
