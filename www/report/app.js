const urleg = "https://engrids.soc.cmu.ac.th/api";
// const url = "http://192.168.3.110:3000";
const url = "http://localhost:3000";

// var options = {
//     chart: {
//         type: 'bar'
//     },
//     series: [{
//         name: 'sales',
//         data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
//     }],
//     xaxis: {
//         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//     }
// }

// var chart = new ApexCharts(document.querySelector("#chart"), options);

// chart.render();

var options = {
    chart: {
        height: 250,
        type: 'radialBar',
        fontFamily: 'Prompt'
    },
    series: [52.27],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 10,
                size: "60%",
                color: "#A5F1E9"
            },

            dataLabels: {
                showOn: "always",
                name: {
                    fontSize: "16px"
                },
                value: {
                    color: "black",
                    fontSize: "30px",
                    show: true
                }
            }
        }
    },
    labels: ['เพศชาย'],
}

var chart = new ApexCharts(document.querySelector("#chart-men"), options);

chart.render();

var options = {
    chart: {
        height: 250,
        type: 'radialBar',
        fontFamily: 'Prompt'
    },
    series: [47.73],
    colors: ["#eb2a7e"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 15,
                size: "60%",
            },

            dataLabels: {
                showOn: "always",
                name: {
                    fontSize: "16px"
                },
                value: {
                    color: "black",
                    fontSize: "30px",
                    show: true
                }
            }
        }
    },
    labels: ['เพศหญิง'],
}

var chart = new ApexCharts(document.querySelector("#chart-girl"), options);

chart.render();

var chartDom = document.getElementById('chart-total');
var myChart = echarts.init(chartDom);
var option;

option = {
    title: {
        // text: 'Referer of a Website',
        // subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        bottom: 'bottom'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'ภาคเหนือ' },
                { value: 735, name: 'ภาคกลาง' },
                { value: 580, name: 'ภาคตะวันออกเฉียงเหนือ' },
                { value: 484, name: 'ภาคใต้' },
                { value: 300, name: 'กรุงเทพมหานคร' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

option && myChart.setOption(option);

var chartDom = document.getElementById('chart-type');
var myChart = echarts.init(chartDom);
var option;

option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ]
};

option && myChart.setOption(option);

var chartDom = document.getElementById('chart-agetype');
var myChart = echarts.init(chartDom);
var option;

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {
        bottom: 'bottom'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
        {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
};

option && myChart.setOption(option);

