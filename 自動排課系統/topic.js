var topic=[
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性"
];

var date=new Date();

function setnewdate(month,day){
    date.setMonth(month-1,day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
};

setnewdate(2,9);
//debugger;