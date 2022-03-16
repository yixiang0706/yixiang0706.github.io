$(function(){
    $("input").on("click",(function(){
        //alert("Hi");
        //debugger;
        //("h1").text("Hello");
        var randomnumber = $("li").length;
        var randomChildnumber=Math.floor((Math.random()*randomnumber));
        $("h1").text($("li").eq(randomChildnumber).text());
        if(randomChildnumber==0){
            $( "img" ).attr({
                src: "拉麵.jpg",
              });
        }
        else if(randomChildnumber==1){
        $( "img" ).attr({
            src: "滷肉飯.jpg",
          });
        }
        else{
        $( "img" ).attr({
            src: "水餃.jpg",
          });
        }
    }));
});