const url = "http://192.168.3.110:3000";
// const url = "http://localhost:3000";


let getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
let logIn = () => {
  location.href = "./../login/index.html?redirect=agesearch";
}

// let gotoProfile = () => {
//   location.href = "./../../form_authen/profile/index.html";
// }

let logOut = () => {
  document.cookie = "dis_ustoken=; max-age=0; path=/;";
  document.cookie = "dis_gid=; max-age=0; path=/;";
  document.cookie = "dis_auth=; max-age=0; path=/;";
  document.cookie = "dis_usrname=; max-age=0; path=/;";
  gotoLogin()
}


const ustoken = getCookie("dis_ustoken");
const gid = getCookie("dis_gid");
const auth = getCookie("dis_auth");
const usrname = getCookie("dis_usrname");

if (ustoken) {
  // $('#profile').html(`<a href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i><span>${usrname}</span></a>`)
  // $('#login').html(`<a href="#" onclick="logOut()"><i class="bx bx-log-out"></i><span>ออกจากระบบ</span></a>`)
  document.getElementById("profile").innerHTML = ` <li class="nav-item">
    <a class="nav-link active" aria-controls="" role="button" aria-expanded="false">
      <span class="nav-link-text ms-1 text-xs"> ${usrname} </span>
    </a>
  </li>`
  document.getElementById("login").innerHTML = ` <li class="nav-item">
    <a href="#" class="nav-link active" aria-controls="" role="button" aria-expanded="false" onclick="logOut()">
      <span class="nav-link-text ms-1 text-xs"> ออกจากระบบ </span>
    </a>
  </li>`
} else {
  document.getElementById("login").innerHTML = ` <li class="nav-item">
    <a href="#" class="nav-link active" aria-controls="" role="button" aria-expanded="false" onclick="logIn()">
      <span class="nav-link-text ms-1 text-xs"> เข้าสู่ระบบ </span>
    </a>
  </li>`
  // logIn()
}


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
let numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let loadData = (year, age_start, age_end) => {
  document.getElementById("m").innerHTML = ''
  document.getElementById("f").innerHTML = ''
  document.getElementById("countsex").innerHTML = ''
  axios.post('/api/get_by_age', { address_code: '01', privilege: '00', year, age_start, age_end }).then(r => {
    // console.log(r);
    // console.log(r.data)
    document.getElementById("m").innerHTML = numberWithCommas(r.data[0].CNT)
    document.getElementById("f").innerHTML = numberWithCommas(r.data[1].CNT)
    document.getElementById("countsex").innerHTML = numberWithCommas(r.data[0].CNT + r.data[1].CNT)
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
        fontSize: 12,
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
        color: "#ffffff",
        formatter: '{c0}'
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
        color: "#ffffff",
        formatter: '{c0}'
      },
      data: [F]
    }
  ]


  if (optionSex && typeof optionSex === 'object') {
    Chartsex.setOption(optionSex);
  }
}


