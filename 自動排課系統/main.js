/*$(function(){
    $("#coursetable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>")


    var topicCount=topic.length;
    //debugger;
    var milliseconds=24*60*60*1000;
    //new Date(milliseconds)
    //getTime() 屬於 milliseconds
    for(var i=0;i<topicCount;i++){
        $("#coursetable").append(
            `<tr><td>${i+1}</td><td>${(new Date(date.getTime()+7*i*milliseconds)).toLocaleDateString().slice(5)}</td><td>${topic[i]}</td></tr>`
        );
    }
})*/

var Tablestatus = 0;
var count=1;
$('#select').submit(function () {
    //alert( $("#month").val());
    if (Tablestatus) {
        $("#coursetable").remove();
        $("#area").append(
            `<table id="coursetable"></table>`
        );
        Tablestatus=0;
    }
    //  $("#coursetable").remove();
    setnewdate($("#month").val(), $("#day").val());
    $("#coursetable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>")
    Tablestatus=1;
    var topicCount = topic.length;
    //debugger;
    var milliseconds = 24 * 60 * 60 * 1000;
    //new Date(milliseconds)
    //getTime() 屬於 milliseconds
    for (var i = 0; i < topicCount; i++) {
        if (i == 1) {
            $("#coursetable").append(
                `<tr style="color:gray"><td>${i+1}</td><td>${(new Date(date.getTime()+7*i*milliseconds)).toLocaleDateString().slice(5)}</td><td>${topic[i]}</td></tr>`
            );
        } else {
            $("#coursetable").append(
                `<tr><td>${i+1}</td><td>${(new Date(date.getTime()+7*i*milliseconds)).toLocaleDateString().slice(5)}</td><td>${topic[i]}</td></tr>`
            );
        }

    }
})