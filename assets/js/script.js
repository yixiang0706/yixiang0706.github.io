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
                let pageData = {
                    locationName:two[randomChildnumber],
                    weatherElement:[
                        data.records.location[0].weatherElement[0].elementName,
                        data.records.location[0].weatherElement[1].elementName,
                        data.records.location[0].weatherElement[2].elementName,
                        data.records.location[0].weatherElement[3].elementName,
                        data.records.location[0].weatherElement[4].elementName,
                    ],
                    startTime:[
                        data.records.location[0].weatherElement[0].time[0].startTime.toLocaleString().slice(5,16),
                        data.records.location[0].weatherElement[0].time[1].startTime.toLocaleString().slice(5,16),
                        data.records.location[0].weatherElement[0].time[2].startTime.toLocaleString().slice(5,16)
                    ],
                    endTime:[
                        data.records.location[0].weatherElement[0].time[0].endTime.toLocaleString().slice(5,16),
                        data.records.location[0].weatherElement[0].time[1].endTime.toLocaleString().slice(5,16),
                        data.records.location[0].weatherElement[0].time[2].endTime.toLocaleString().slice(5,16)
                    ],
                    WxName:[
                        data.records.location[0].weatherElement[0].time[0].parameter.parameterName,
                        data.records.location[0].weatherElement[0].time[1].parameter.parameterName,
                        data.records.location[0].weatherElement[0].time[2].parameter.parameterName
                    ],
                    MinT:[
                        data.records.location[0].weatherElement[2].time[0].parameter.parameterName,
                        data.records.location[0].weatherElement[2].time[1].parameter.parameterName,
                        data.records.location[0].weatherElement[2].time[2].parameter.parameterName
                    ],
                    MaxT:[
                        data.records.location[0].weatherElement[4].time[0].parameter.parameterName,
                        data.records.location[0].weatherElement[4].time[1].parameter.parameterName,
                        data.records.location[0].weatherElement[4].time[2].parameter.parameterName
                    ],
                    CI:[
                        data.records.location[0].weatherElement[3].time[0].parameter.parameterName,
                        data.records.location[0].weatherElement[3].time[1].parameter.parameterName,
                        data.records.location[0].weatherElement[3].time[2].parameter.parameterName
                    ],
                    Pop:[
                        data.records.location[0].weatherElement[1].time[0].parameter.parameterName,
                        data.records.location[0].weatherElement[1].time[1].parameter.parameterName,
                        data.records.location[0].weatherElement[1].time[2].parameter.parameterName
                    ]
                };
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
                            <th><h2>{{locationName}}</h2></th>
                            <th>{{startTime[0]}}</br>~</br>{{endTime[0]}}</th>
                            <th>{{startTime[1]}}</br>~</br>{{endTime[1]}}</th>
                            <th>{{startTime[2]}}</br>~</br>{{endTime[2]}}</th>
                        <tr>
                        </thead>`
                );//第一欄
                $("#weathertable").append(
                    `<tr>
                        <th>氣候</br>({{weatherElement[0]}})</th>
                        <th>{{WxName[0]}}</th>
                        <th>{{WxName[1]}}</th>
                        <th>{{WxName[2]}}</th>
                    </tr>`
                );//第二欄
                $("#weathertable").append(
                    `<tr>
                        <th>最低溫度</br>({{weatherElement[2]}})</th>
                        <th>{{MinT[0]}}°C</th>
                        <th>{{MinT[1]}}°C</th>
                        <th>{{MinT[2]}}°C</th>
                    </tr>`
                );//第三欄
                $("#weathertable").append(
                    `<tr>
                        <th>最高溫度</br>({{weatherElement[4]}})</th>
                        <th>{{MaxT[0]}}°C</th>
                        <th>{{MaxT[1]}}°C</th>
                        <th>{{MaxT[2]}}°C</th>
                    </tr>`
                );//第四欄
                $("#weathertable").append(
                    `<tr>
                        <th>舒適度</br>({{weatherElement[3]}})</th>
                        <th>{{CI[0]}}</th>
                        <th>{{CI[1]}}</th>
                        <th>{{CI[2]}}</th>
                    </tr>`
                );//第四欄
                $("#weathertable").append(
                    `<tr>
                        <th>降雨機率</br>({{weatherElement[1]}})</th>
                        <th id="th1"></th>
                        <th id="th2"></th>
                        <th id="th3"></th>
                    </tr>`
                );


                const width = 250;
                const height = 250;

                const svg1 = d3.select('#th1').append('svg').attr('width', width).attr('height', height);
                const rootLayer1 = svg1.append('g');
                const pieChartLayer1 = rootLayer1.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
            
                const arc1 = d3.arc()
                    .innerRadius(75)
                    .outerRadius(100);

                // 資料轉為角度資料
                const data1 = [
                    data.records.location[0].weatherElement[1].time[0].parameter.parameterName,
                    100-data.records.location[0].weatherElement[1].time[0].parameter.parameterName
                ];
                const arcs1 = d3.pie()(data1);
                var color = d3.scaleOrdinal(d3.schemeCategory10);  
                // 使用`enter`新增`path`元件並設定繪製圖屬性`d`。
                pieChartLayer1
                    .selectAll('path')
                    .data(arcs1)
                    .enter()
                    .append('path')
                    .attr('d', data1 =>  arc1(data1))
                    .attr('fill', function(d, i) {   
                        return color(i);   
                    })
                    .attr('stroke','black')
                    .attr('stroke-width','2px')


                pieChartLayer1
                .append('g')
                .attr('class', 'text-group')

                pieChartLayer1.select('g').append('text')
                .attr('class', 'value-text')
                .text(`降雨機率 ${data1[0]}%`)
                .attr('text-anchor', 'middle')
                .attr('dy', '.6em')
                


                //第二個-----------------------------------------------------------------------------------------------
                const svg2 = d3.select('#th2').append('svg').attr('width', width).attr('height', height);
                const rootLayer2 = svg2.append('g');
                const pieChartLayer2 = rootLayer2.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
            
                const arc2 = d3.arc()
                    .innerRadius(75)
                    .outerRadius(100);

                // 資料轉為角度資料
                const data2 = [
                    data.records.location[0].weatherElement[1].time[1].parameter.parameterName,
                    100-data.records.location[0].weatherElement[1].time[1].parameter.parameterName
                ];
                const arcs2 = d3.pie()(data2);
                // 使用`enter`新增`path`元件並設定繪製圖屬性`d`。
                pieChartLayer2
                    .selectAll('path')
                    .data(arcs2)
                    .enter()
                    .append('path')
                    .attr('d', data2 =>  arc2(data2))
                    .attr('fill', function(d, i) {   
                        return color(i);   
                    })
                    .attr('stroke','black')
                    .attr('stroke-width','2px')


                pieChartLayer2
                .append('g')
                .attr('class', 'text-group')

                pieChartLayer2.select('g').append('text')
                .attr('class', 'value-text')
                .text(`降雨機率 ${data2[0]}%`)
                .attr('text-anchor', 'middle')
                .attr('dy', '.6em')




                //第三個-----------------------------------------------------------------------------------------------
                const svg3 = d3.select('#th3').append('svg').attr('width', width).attr('height', height);
                const rootLayer3 = svg3.append('g');
                const pieChartLayer3 = rootLayer3.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
            
                const arc3 = d3.arc()
                    .innerRadius(75)
                    .outerRadius(100);

                // 資料轉為角度資料
                const data3 = [
                    data.records.location[0].weatherElement[1].time[2].parameter.parameterName,
                    100-data.records.location[0].weatherElement[1].time[2].parameter.parameterName
                ];
                const arcs3 = d3.pie()(data3);
                // 使用`enter`新增`path`元件並設定繪製圖屬性`d`。
                pieChartLayer3
                    .selectAll('path')
                    .data(arcs3)
                    .enter()
                    .append('path')
                    .attr('d', data3 =>  arc3(data3))
                    .attr('fill', function(d, i) {   
                        return color(i);   
                    })
                    .attr('stroke','black')
                    .attr('stroke-width','2px')


                pieChartLayer3
                .append('g')
                .attr('class', 'text-group')

                pieChartLayer3.select('g').append('text')
                .attr('class', 'value-text')
                .text(`降雨機率 ${data3[0]}%`)
                .attr('text-anchor', 'middle')
                .attr('dy', '.6em')


                const App = Vue.createApp({
                    data(){
                        return pageData;
                    }
                });
                
                App.mount("#weathertable");
            }
         )
    }));
});

