
//These variables set the current day format and determines the current hour as an integer (1-24)
$("#currentDay").text(moment().format('dddd, MMMM Do'));
var currentHour = parseInt(moment().format("kk"));

//These variables set the locations of the textArea elements that are children of hour Ids
var hour9Text = $("#hour-9").find("textArea");
var hour10Text = $("#hour-10").find("textArea");
var hour11Text = $("#hour-11").find("textArea");
var hour12Text = $("#hour-12").find("textArea");
var hour13Text = $("#hour-13").find("textArea");
var hour14Text = $("#hour-14").find("textArea");
var hour15Text = $("#hour-15").find("textArea");
var hour16Text = $("#hour-16").find("textArea");
var hour17Text = $("#hour-17").find("textArea");

//This is the list of all hour events, which should start as blank
var hourEventList = ["","","","","","","","",""]

//This checks if there are any events in local storage and, if yes, overrrides those values over the blank strings
if (JSON.parse(localStorage.getItem("savedHourEvents")) != null){
  hourEventList = JSON.parse(localStorage.getItem("savedHourEvents"))
};

//This function iterates through all of the hour blocks and overrides the event text with whatever was found in local storage, if any 
function setHourText() {
    for (var i = 9; i < 18; i++) {
        eval("hour" + i + "Text").val(hourEventList[(i-9)]);
    };
};

//This function checks each hour block and overrides the class, to tell the CSS if the block is a "past" or "present" or "future" class
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

//This runs the top two functions
setHourText();
highlightHours();

//This listens for a click on any ".savebtn" and then grabs the correct "textArea" text, adds it into the hourEventList and then saves the hourEventList into local storage
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

