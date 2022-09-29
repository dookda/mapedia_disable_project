const url = "http://192.168.3.110:3000";
// const url = "http://localhost:3000";

var currentDate = new Date();
currentDate.setYear(currentDate.getFullYear() + 543);
$(function () {
  $('#txtDate').datepicker({
    format: "dd/mm/yyyy",
    // todayBtn: "linked",
    // clearBtn: true,
    changeMonth: true,
    changeYear: true,
    yearRange: '+443:+543',
    language: 'th-th',
    autoclose: true,
    onSelect: function (date) {
      $("#txtDate").addClass('filled');
    }
  });
  $('#txtDate').datepicker("setDate", currentDate);

});

let getData = () => {
  $("#datatable").dataTable().fnDestroy();
  let age_start = document.getElementById("age_start").value
  let age_end = document.getElementById("age_end").value
  let dtDat = document.getElementById("txtDate").value
  let dtArr = dtDat.split("/")
  let yyyy = `${Number(dtArr[2])}`
  // console.log(yyyy);
  loadData(yyyy, age_start, age_end)
}

let loadData = (year, age_start, age_end) => {
  document.getElementById("m").innerHTML = ''
  document.getElementById("f").innerHTML = ''
  axios.post('/api/get_by_age', { address_code: '01', privilege: '00', year, age_start, age_end }).then(r => {
    // console.log(r);
    // console.log(r.data)
    document.getElementById("m").innerHTML += r.data[0].CNT
    document.getElementById("f").innerHTML += r.data[1].CNT
    showSex(r.data)
  })
}


let addZoro = (d) => {
  return d < 10 ? '0' + d : String(d)
}

const date = new Date();
let yyyy = date.getFullYear();
let mm = date.getMonth()
let dd = date.getDate()

mm = addZoro(mm)
dd = addZoro(dd)


$("#txtDate").val(`${dd}/${mm}/${yyyy}`)

var chartDom = document.getElementById('chart-agesearch');
var Chartsex = echarts.init(chartDom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var optionSex = {
  // title: {
  //   text: 'จำนวนคนพิการจากการค้นหาตามช่วงอายุ'
  // },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 16,
      color: 'black',
      fontWeight: 400
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    fontWeight: "normal",
    fontFamily: "Prompt",
    fontSize: 12
  },
  yAxis: {
    type: 'category',
    data: [''],
    axisLabel: {
      show: true,
      interval: 0,
      fontWeight: "normal",
      fontFamily: "Prompt",
      fontSize: 12
    },
  }
};
window.addEventListener('resize', Chartsex.resize);

async function showSex(arr) {
  // console.log(arr)
  var M, F;
  arr.map((x) => {
    if (x.SEX_CODE == 'M') {
      M = x.CNT
    } else {
      F = x.CNT
    }
  })
  var countsex = M + F;
  $("#countsex").text(countsex)
  // console.log(countsex)
  optionSex.yAxis = [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: false,
        length: 5,
        inside: false
      },
      axisLabel: {
        show: true,
        fontFamily: "Prompt",
        fontSize: 12
      },
      data: ['']
    }
  ]
  optionSex.series = [
    {
      name: 'เพศชาย',
      type: 'bar',
      color: [
        '#7986cb',
      ],
      label: {
        show: true,
        position: 'inside',
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: "16",
        color: "#ffffff"
      },
      data: [M]

    },
    {
      name: 'เพศหญิง',
      type: 'bar',
      color: [
        '#FFC2C7',
      ],
      label: {
        show: true,
        position: 'inside',
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: "16",
        color: "#ffffff"
      },
      data: [F]
    }
  ]


  if (optionSex && typeof optionSex === 'object') {
    Chartsex.setOption(optionSex);
  }
}


