

$("#currentDay").text(moment().format('dddd, MMMM Do'));
var currentHour = parseInt(moment().format("kk"));
console.log(currentHour)
var hour9Text = $("#hour-9").find("textArea");
var hour10Text = $("#hour-10").find("textArea");
var hour11Text = $("#hour-11").find("textArea");
var hour12Text = $("#hour-12").find("textArea");
var hour13Text = $("#hour-13").find("textArea");
var hour14Text = $("#hour-14").find("textArea");
var hour15Text = $("#hour-15").find("textArea");
var hour16Text = $("#hour-16").find("textArea");
var hour17Text = $("#hour-17").find("textArea");

var hourEventList = ["","","","","","","","",""]


if (JSON.parse(localStorage.getItem("savedHourEvents")) != null){
  hourEventList = JSON.parse(localStorage.getItem("savedHourEvents"))
};

function setHourText() {
    for (var i = 9; i < 18; i++) {
        eval("hour" + i + "Text").val(hourEventList[(i-9)]);
    };
};

function highlightHours () {
    for (var i = 9; i < 18; i++) {
        if (currentHour === i){
            $(("#hour-" + i)).attr("class", "row time-block present");
        };
        if (currentHour > i){
            $(("#hour-" + i)).attr("class", "row time-block past");
        };
        if (currentHour < i){
            $(("#hour-" + i)).attr("class", "row time-block future");
        };
    }
};


setHourText();
highlightHours();

$(".saveBtn").on( "click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    var textAreaToBeSaved = $(this).parent().find("textArea");
    var num = $(this).parent().attr("id").slice(5);
    var newEvent = textAreaToBeSaved.val();
    hourEventList[(num-9)] = newEvent;
    setHourText();
    localStorage.setItem('savedHourEvents', JSON.stringify(hourEventList));
    }
);

