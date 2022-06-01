var Tablestatus = 0;
$(function(){
    $("input").on("click",(function(){
        var date=new Date();
        var milliseconds=24*60*60*1000;
        let one = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D91D96ED-0AC8-4A49-BC96-44DF702117BF&format=JSON&locationName=';
        let two = ['宜蘭縣','花蓮縣','臺東縣','金門縣','連江縣','臺北市','新北市','桃園市','臺中市','臺南市','高雄市','基隆市','新竹縣','新竹市','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','嘉義市','屏東縣'];
        var randomnumber = two.length;
        var randomChildnumber=Math.floor((Math.random()*randomnumber));
        //$("h1").text(two[randomChildnumber]);
        fetch(one+two[randomChildnumber])
        .then(res=> res.json())
        //.then(data=>console.log(data))
        .then(
            data => {
                console.log(data);
                if(Tablestatus){
                    $("#weathertable").remove();
                    $("#area").append(
                        `<table id="weathertable"></table>`
                    );
                    Tablestatus = 0;
                }
                Tablestatus = 1;
                $("#weathertable").append(
                    `<thead>
                        <tr>
                            <th>${two[randomChildnumber]}</th>
                            <th>${(data.records.location[0].weatherElement[0].time[0].startTime).toLocaleString().slice(5,16)}</br>~</br>${(data.records.location[0].weatherElement[0].time[0].endTime).toLocaleString().slice(5,16)}</th>
                            <th>${(data.records.location[0].weatherElement[0].time[1].startTime).toLocaleString().slice(5,16)}</br>~</br>${(data.records.location[0].weatherElement[0].time[1].endTime).toLocaleString().slice(5,16)}</th>
                            <th>${(data.records.location[0].weatherElement[0].time[2].startTime).toLocaleString().slice(5,16)}</br>~</br>${(data.records.location[0].weatherElement[0].time[2].endTime).toLocaleString().slice(5,16)}</th>
                        <tr>
                        </thead>`
                );//第一欄
                $("#weathertable").append(
                    `<tr>
                        <th>氣候</br>(${data.records.location[0].weatherElement[0].elementName})</th>
                        <th>${data.records.location[0].weatherElement[0].time[0].parameter.parameterName}</th>
                        <th>${data.records.location[0].weatherElement[0].time[1].parameter.parameterName}</th>
                        <th>${data.records.location[0].weatherElement[0].time[2].parameter.parameterName}</th>
                    </tr>`
                );//第二欄
                $("#weathertable").append(
                    `<tr>
                        <th>降水機率</br>(${data.records.location[0].weatherElement[1].elementName})</th>
                        <th>${data.records.location[0].weatherElement[1].time[0].parameter.parameterName}%</th>
                        <th>${data.records.location[0].weatherElement[1].time[1].parameter.parameterName}%</th>
                        <th>${data.records.location[0].weatherElement[1].time[2].parameter.parameterName}%</th>
                    </tr>`
                );//第二欄
                $("#weathertable").append(
                    `<tr>
                        <th>最低溫度</br>(${data.records.location[0].weatherElement[2].elementName})</th>
                        <th>${data.records.location[0].weatherElement[2].time[0].parameter.parameterName}°C</th>
                        <th>${data.records.location[0].weatherElement[2].time[1].parameter.parameterName}°C</th>
                        <th>${data.records.location[0].weatherElement[2].time[2].parameter.parameterName}°C</th>
                    </tr>`
                );//第三欄
                $("#weathertable").append(
                    `<tr>
                        <th>最高溫度</br>(${data.records.location[0].weatherElement[4].elementName})</th>
                        <th>${data.records.location[0].weatherElement[4].time[0].parameter.parameterName}°C</th>
                        <th>${data.records.location[0].weatherElement[4].time[1].parameter.parameterName}°C</th>
                        <th>${data.records.location[0].weatherElement[4].time[2].parameter.parameterName}°C</th>
                    </tr>`
                );//第四欄
                $("#weathertable").append(
                    `<tr>
                        <th>舒適度</br>(${data.records.location[0].weatherElement[3].elementName})</th>
                        <th>${data.records.location[0].weatherElement[3].time[0].parameter.parameterName}</th>
                        <th>${data.records.location[0].weatherElement[3].time[1].parameter.parameterName}</th>
                        <th>${data.records.location[0].weatherElement[3].time[2].parameter.parameterName}</th>
                    </tr>`
                );//第四欄
            }
        )
    }));
});