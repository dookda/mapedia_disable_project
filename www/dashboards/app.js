const urleg = "https://engrids.soc.cmu.ac.th/api";
// const url = "http://192.168.3.110:3000";
const url = "http://localhost:3000";

let latlng = {
  lat: 13.305567,
  lng: 101.383101
};
let map = L.map("map", {
  center: latlng,
  zoom: 5
});
const mapbox = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1
  }
);

const ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"]
});

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eac/wms?", {
  layers: "eac:tam_eac",
  format: "image/png",
  transparent: true,
  maxZoom: 18,
  // minZoom: 14,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eac/wms?", {
  layers: "eac:amp_eac",
  format: "image/png",
  transparent: true,
  maxZoom: 14,
  // minZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eac/wms?", {
  layers: "eac:prov_eac",
  format: "image/png",
  transparent: true,
  maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const baseMaps = {
  "Mapbox": mapbox,
  "Google Hybrid": ghyb.addTo(map)
};

const overlayMaps = {
  "ขอบเขตจังหวัด": pro.addTo(map),
  "ขอบเขตอำเภอ": amp,
  "ขอบเขตตำบล": tam,
};

const lyrControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(map);


let RemoveLayers = () => {
  map.eachLayer(i => {
    // console.log(i);
    i.options.name == "bnd" ? map.removeLayer(i) : null;
  })
}
var boundStyle = {
  "color": "#ff7800",
  "fillColor": "#fffcf5",
  "weight": 5,
  "opacity": 0.45,
  "fillOpacity": 0.25
};

let getdata = () => {
  axios.post(`${url}/api/get_distotal`).then(async (r) => {
    d = r.data;
    // console.log(d)
    $("#distotal").text(Number(r.data[0].TOTAL))
    $("#f_total").text(Number(r.data[0].F))
    $("#m_total").text(Number(r.data[0].M))
  })
}
getdata()

/// chart total
var domPie = document.getElementById('chart-total');
var chartPie = echarts.init(domPie, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appPie = {};
var optionPie = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 24,
      color: 'black',
      fontWeight: 600
    },
    // text: 'ข้อมูลคนพิการXX',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'item',
    formatter: '{b}: {c} คน ({d}%)',
  },
  toolbox: {
    show: true,
    //orient: 'vertical',
    left: 'left',
    bottom: 'bottom',
    feature: {
      dataView: {
        readOnly: true,
        textStyle: {
          fontFamily: 'Prompt',
          fontSize: 14,
          color: 'black',
          fontWeight: 400
        },
      },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 40,
    bottom: 20,

  }
};
window.addEventListener('resize', chartPie.resize);

// chart Sex
var domSex = document.getElementById('chart-sex');
var chartSex = echarts.init(domSex, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appSex = {};
var optionSex = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามเพศ',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    top: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    // top: '12%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartSex.resize);

// chart Type
var domType = document.getElementById('chart-type');
var chartType = echarts.init(domType, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appType = {};
var optionType = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามประเภทความพิการ',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    type: 'scroll',
    orient: 'horizontal',
    right: 10,
    left: 10,
    bottom: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    top: '12%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartType.resize);

// chart Age
var domAge = document.getElementById('chart-age');
var chartAge = echarts.init(domAge, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appAge = {};
var optionAge = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามช่วงอายุ',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    top: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '11%',
    top: '12%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartAge.resize);

// chart Edu
var domEdu = document.getElementById('chart-edu');
var chartEdu = echarts.init(domEdu, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appEdu = {};
var optionEdu = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามการศึกษา',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    top: 'bottom'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '12%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartEdu.resize);


// chart Occ
var domOcc = document.getElementById('chart-occ');
var chartOcc = echarts.init(domOcc, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appOcc = {};
var optionOcc = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามอาชีพ',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 12,
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    type: 'scroll',
    orient: 'horizontal',
    right: 10,
    left: 10,
    bottom: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    top: '12%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartOcc.resize);


//  chart AgeType
var domAgeType = document.getElementById('chart-agetype');
var chartAgeType = echarts.init(domAgeType, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appAgeType = {};
var optionAgeType = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามช่วงอายุและประเภทความพิการ',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    type: 'scroll',
    orient: 'horizontal',
    right: 10,
    left: 10,
    bottom: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    top: '12%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'value',
      barWidth: 40,
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartAgeType.resize);

//  chart AgeEdu
var domAgeEdu = document.getElementById('chart-ageedu');
var chartAgeEdu = echarts.init(domAgeEdu, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appAgeEdu = {};
var optionAgeEdu = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามช่วงอายุและการศึกษา',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    top: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    top: '12%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartAgeEdu.resize);

//  chart AgeOcc
var domAgeOcc = document.getElementById('chart-ageocc');
var chartAgeOcc = echarts.init(domAgeOcc, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appAgeOcc = {};
var optionAgeOcc = {
  title: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 22,
      color: 'black',
      fontWeight: 600
    },
    text: 'ข้อมูลคนพิการตามช่วงอายุและอาชีพ',
    left: 'left'
  },
  tooltip: {
    textStyle: {
      fontFamily: 'Prompt',
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    textStyle: {
      fontFamily: 'Prompt',
      fontSize: 14,
      color: 'black',
      fontWeight: 400
    },
    type: 'scroll',
    orient: 'horizontal',
    right: 10,
    left: 10,
    bottom: 'bottom'
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    top: '12%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 0,
        fontWeight: "normal",
        fontFamily: "Prompt",
        fontSize: 12
      },
    }
  ],
};
window.addEventListener('resize', chartAgeOcc.resize);

/// DOM 
async function showTotal(arr) {
  optionPie.series = [
    {
      name: 'รายละเอียด',
      type: 'pie',
      color: [
        '#5E227F',
        '#d7bdff',
        '#f3dbff',
        '#D22780',
        '#EB548C',
        // '#EA7369',
        // '#F0A58F',
        // '#FCEAE6',
      ],
      center: ['40%', '50%'],
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontFamily: "Prompt",
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: arr.map(x => ({ value: x.CNT, name: x.CAT }))
    }
  ]
  if (optionPie && typeof optionPie === 'object') {
    chartPie.setOption(optionPie);
  }
}

async function showSex(arr) {
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionSex.series = [
    {
      name: 'เพศชาย',
      type: 'bar',
      color: [
        '#b39ddb',
      ],
      stack: 'Sex',
      emphasis: { focus: 'series' },
      data: arr.map(x => x.M)
    }, {
      name: 'เพศหญิง',
      type: 'bar',
      color: [
        '#f8bbd0',
      ],
      stack: 'Sex',
      emphasis: { focus: 'series' },
      data: arr.map(x => x.F)
    }
  ]

  if (optionSex && typeof optionSex === 'object') {
    chartSex.setOption(optionSex);
  }
}


function showType(arr) {
  optionType.yAxis = [
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
      data: arr.map(x => x.CAT)
    }
  ]
  optionType.series = [
    {
      name: 'ไม่มีข้อมูล',
      type: 'bar',
      stack: 'Type',
      color: [
        '#5E227F',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE0)
    }, {
      name: 'ทางการเห็น',
      type: 'bar',
      color: [
        '#d7bdff',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE12)
    }, {
      name: 'ทางการได้ยินหรือสื่อความหมาย',
      type: 'bar',
      color: [
        '#f3dbff',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE13)
    }, {
      name: 'ทางการเคลื่อนไหวหรือทางร่างกาย',
      type: 'bar',
      color: [
        '#D22780',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE14)
    }, {
      name: 'ทางจิตใจหรือพฤติกรรม',
      type: 'bar',
      color: [
        '#EB548C',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE15)
    }, {
      name: 'ทางสติปัญญา',
      type: 'bar',
      color: [
        '#5E227F',

      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE16)
    }, {
      name: 'ทางการเรียนรู้',
      type: 'bar',
      color: [
        '#d7bdff',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE17)
    }, {
      name: 'ทางออทิสติก',
      type: 'bar',
      color: [
        '#f3dbff',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE18)
    }
  ]

  if (optionType && typeof optionType === 'object') {
    chartType.setOption(optionType);
  }
}

function showAge(arr) {
  optionAge.yAxis = [
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionAge.series = [
    {
      name: '0-5 ปี',
      type: 'bar',
      color: [
        // '#116530',
        '#5E227F ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE5)
    }, {
      name: '6-14 ปี',
      type: 'bar',
      color: [
        '#E1EACD',

      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE14)
    }, {
      name: '15-21 ปี',
      type: 'bar',
      color: [
        '#BAD8B6',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE21)
    }, {
      name: '22-59 ปี',
      type: 'bar',
      color: [
        '#61B390',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE59)
    }, {
      name: '60 ปีขึ้นไป',
      type: 'bar',
      color: [
        '#01352C',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE60)
    }
  ]

  if (optionAge && typeof optionAge === 'object') {
    chartAge.setOption(optionAge);
  }
}

function showEdu(arr) {
  optionEdu.yAxis = [
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionEdu.series = [
    {
      name: 'สูงกว่าปริญญาตรี',
      type: 'bar',
      color: [
        '#5E227F',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.HIG)
    }, {
      name: 'ปริญญาตรีหรือเทียบเท่า',
      type: 'bar',
      color: [
        '#2e4783',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.MID)
    }, {
      name: 'ต่ำกว่าปริญญาตรี',
      type: 'bar',
      color: [

        '#a2d0fc',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.LOW)
    }, {
      name: 'อื่นๆ',
      type: 'bar',
      color: [
        '#82b6e9',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OTH)
    }
  ]

  if (optionEdu && typeof optionEdu === 'object') {
    chartEdu.setOption(optionEdu);
  }
}

function showOcc(arr) {
  optionOcc.yAxis = [
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

      data: arr.map(x => x.CAT)
    }
  ]

  optionOcc.series = [
    {
      name: 'รับราชการ',
      type: 'bar',
      color: [
        '#850E35',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_001)
    }, {
      name: 'รัฐวิสาหกิจ',
      type: 'bar',
      color: [
        '#D52057 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_002)
    }, {
      name: 'รับจ้าง',
      type: 'bar',
      color: [
        '#331A11 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_003)
    }, {
      name: 'กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย',
      type: 'bar',
      color: [
        '#F5E4E1 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_004)
    }, {
      name: 'กำลังศึกษา',
      type: 'bar',
      color: [
        '#F4970B',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_005)
    }, {
      name: 'เกษตรกรรม',
      type: 'bar',
      color: [
        '#850E35 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_006)
    }, {
      name: 'คอมพิวเตอร์',
      type: 'bar',
      color: [
        '#D52057 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_007)
    }, {
      name: 'นวดแผนโบราณ',
      type: 'bar',
      color: [
        '#331A11 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_008)
    }, {
      name: 'ค้าขาย',
      type: 'bar',
      color: [
        '#F5E4E1 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_010)
    }, {
      name: 'ค้าสลาก',
      type: 'bar',
      color: [
        '#F4970B ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_011)
    }, {
      name: 'พนักงานบริษัท',
      type: 'bar',
      color: [
        '#850E35 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_012)
    }, {
      name: 'ไม่ระบุอาชีพ',
      type: 'bar',
      color: [
        '#D52057 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_013)
    }, {
      name: 'ลูกจ้าง',
      type: 'bar',
      color: [
        '#331A11 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_014)
    }, {
      name: 'ไม่ได้ประกอบอาชีพ',
      type: 'bar',
      color: [
        '#F5E4E1 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_015)
    }, {
      name: 'ลูกจ้างเอกชน',
      type: 'bar',
      color: [
        '#F4970B ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_016)
    }, {
      name: 'ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ',
      type: 'bar',
      color: [
        '#850E35 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_017)
    }, {
      name: 'รับราชการ/รัฐวิสาหกิจ',
      type: 'bar',
      color: [
        '#D52057 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_019)
    }, {
      name: 'หัตถกรรม',
      type: 'bar',
      color: [
        '#331A11 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_020)
    }, {
      name: 'อื่นๆ',
      type: 'bar',
      color: [
        '#F5E4E1 ',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_999)
    }
  ]

  if (optionOcc && typeof optionOcc === 'object') {
    chartOcc.setOption(optionOcc);
  }
}

function showAgeType(arr) {
  optionAgeType.xAxis = [
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionAgeType.series = [
    {
      name: 'ไม่มีข้อมูล',
      type: 'bar',
      color: [
        '#FF165D'
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE0)
    }, {
      name: 'ทางการเห็น',
      type: 'bar',
      color: [
        '#FF9A00'
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE12)
    }, {
      name: 'ทางการได้ยินหรือสื่อความหมาย',
      type: 'bar',
      color: [
        '#F6F7D7',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE13)
    }, {
      name: 'ทางการเคลื่อนไหวหรือทางร่างกาย',
      type: 'bar',
      color: [
        '#3EC1D3',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE14)
    }, {
      name: 'ทางจิตใจหรือพฤติกรรม',
      type: 'bar',
      color: [
        '#FF165D',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE15)
    }, {
      name: 'ทางสติปัญญา',
      type: 'bar',
      color: [
        '#FF9A00'
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE16)
    }, {
      name: 'ทางการเรียนรู้',
      type: 'bar',
      color: [
        '#F6F7D7',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE17)
    }, {
      name: 'ทางออทิสติก',
      type: 'bar',
      color: [
        '#3EC1D3',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE18)
    }
  ]

  if (optionAgeType && typeof optionAgeType === 'object') {
    chartAgeType.setOption(optionAgeType);
  }
}

function showAgeEdu(arr) {
  optionAgeEdu.xAxis = [
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionAgeEdu.series = [
    {
      name: 'สูงกว่าปริญญาตรี',
      type: 'bar',
      color: [
        '#00204A',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.HIG)
    }, {
      name: 'ปริญญาตรีหรือเทียบเท่า',
      type: 'bar',
      color: [
        '#FD5F00',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.MID)
    }, {
      name: 'ต่ำกว่าปริญญาตรี',
      type: 'bar',
      color: [
        '#005792',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.LOW)
    }, {
      name: 'อื่นๆ',
      type: 'bar',
      color: [
        '#D9FAFF',
      ],
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OTH)
    }
  ]

  if (optionAgeEdu && typeof optionAgeEdu === 'object') {
    chartAgeEdu.setOption(optionAgeEdu);
  }
}

function showAgeOcc(arr) {
  optionAgeOcc.xAxis = [
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
      data: arr.map(x => x.CAT)
    }
  ]
  optionAgeOcc.series = [
    {
      name: 'รับราชการ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F25287',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_001)
    }, {
      name: 'รัฐวิสาหกิจ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F7D9D9',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_002)
    }, {
      name: 'รับจ้าง',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F9F3F3',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_003)
    }, {
      name: 'กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย',
      type: 'bar',
      stack: 'Type',
      color: [
        '#E4FBFF',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_004)
    }, {
      name: 'กำลังศึกษา',
      type: 'bar',
      stack: 'Type',
      color: [
        '#B8B5FF',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_005)
    }, {
      name: 'เกษตรกรรม',
      type: 'bar',
      stack: 'Type',
      color: [
        '#7868E6',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_006)
    }, {
      name: 'คอมพิวเตอร์',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F25287',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_007)
    }, {
      name: 'นวดแผนโบราณ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F7D9D9',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_008)
    }, {
      name: 'ค้าขาย',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F9F3F3',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_010)
    }, {
      name: 'ค้าสลาก',
      type: 'bar',
      stack: 'Type',
      color: [
        '#E4FBFF',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_011)
    }, {
      name: 'พนักงานบริษัท',
      type: 'bar',
      stack: 'Type',
      color: [
        '#B8B5FF',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_012)
    }, {
      name: 'ไม่ระบุอาชีพ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#7868E6',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_013)
    }, {
      name: 'ลูกจ้าง',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F25287',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_014)
    }, {
      name: 'ไม่ได้ประกอบอาชีพ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F7D9D9',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_015)
    }, {
      name: 'ลูกจ้างเอกชน',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F9F3F3',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_016)
    }, {
      name: 'ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#E4FBFF',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_017)
    }, {
      name: 'รับราชการ/รัฐวิสาหกิจ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#B8B5FF',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_019)
    }, {
      name: 'หัตถกรรม',
      type: 'bar',
      stack: 'Type',
      color: [
        '#7868E6',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_020)
    }, {
      name: 'อื่นๆ',
      type: 'bar',
      stack: 'Type',
      color: [
        '#F25287',
      ],
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_999)
    }
  ]

  if (optionAgeOcc && typeof optionAgeOcc === 'object') {
    chartAgeOcc.setOption(optionAgeOcc);
  }
}

// function selectAddress(address_code) {
//   $('#reg').empty().append(`<option value="tam">ทุกภาค</option>`);
//   var a = [{ CAT: 'กำแพงเพชร', CNT: 14654, LOW: 13379, MID: 110, HIG: 0 }
//     , { CAT: 'ตาก', CNT: 9516, LOW: 8797, MID: 131, HIG: 0 }
//     , { CAT: 'นครสวรรค์', CNT: 21648, LOW: 19645, MID: 326, HIG: 0 }
//     , { CAT: 'น่าน', CNT: 14444, LOW: 13119, MID: 172, HIG: 0 }
//     , { CAT: 'พะเยา', CNT: 16431, LOW: 14237, MID: 196, HIG: 0 }
//     , { CAT: 'พิจิตร', CNT: 13393, LOW: 12668, MID: 113, HIG: 0 }
//     , { CAT: 'พิษณุโลก', CNT: 19521, LOW: 17993, MID: 319, HIG: 0 }
//     , { CAT: 'ลำปาง', CNT: 19269, LOW: 17653, MID: 340, HIG: 0 }
//     , { CAT: 'ลำพูน', CNT: 12163, LOW: 10970, MID: 191, HIG: 0 }
//     , { CAT: 'สุโขทัย', CNT: 18085, LOW: 16686, MID: 182, HIG: 0 }
//     , { CAT: 'อุตรดิตถ์', CNT: 16130, LOW: 15288, MID: 216, HIG: 0 }
//     , { CAT: 'อุทัยธานี', CNT: 7393, LOW: 6823, MID: 77, HIG: 0 }
//     , { CAT: 'เชียงราย', CNT: 18744, LOW: 15304, MID: 284, HIG: 0 }
//     , { CAT: 'เชียงใหม่', CNT: 23320, LOW: 20872, MID: 698, HIG: 0 }
//     , { CAT: 'เพชรบูรณ์', CNT: 13689, LOW: 12344, MID: 143, HIG: 0 }
//     , { CAT: 'แพร่', CNT: 17544, LOW: 16637, MID: 136, HIG: 0 }
//     , { CAT: 'แม่ฮ่องสอน', CNT: 3473, LOW: 2823, MID: 59, HIG: 0 }
//   ]
//   a.map(i => $('#reg').append(`<option value="${i.CNT}">${i.CAT}</option>`))
//   let series = a.filter(i => i.CAT != null)
//   showTotal(series)

//   var b = [{ CAT: 'กำแพงเพชร', M: 12232, F: 11588 }
//     , { CAT: 'ตาก', M: 7112, F: 6480 }
//     , { CAT: 'นครสวรรค์', M: 14412, F: 12807 }
//     , { CAT: 'น่าน', M: 9431, F: 8545 }
//     , { CAT: 'พะเยา', M: 10119, F: 9959 }
//     , { CAT: 'พิจิตร', M: 9148, F: 9011 }
//     , { CAT: 'พิษณุโลก', M: 12606, F: 11764 }
//     , { CAT: 'ลำปาง', M: 15032, F: 14204 }
//     , { CAT: 'ลำพูน', M: 9233, F: 8946 }
//     , { CAT: 'สุโขทัย', M: 10306, F: 10876 }
//     , { CAT: 'อุตรดิตถ์', M: 8850, F: 9314 }
//     , { CAT: 'อุทัยธานี', M: 5013, F: 4578 }
//     , { CAT: 'เชียงราย', M: 17607, F: 14983 }
//     , { CAT: 'เชียงใหม่', M: 23153, F: 20093 }
//     , { CAT: 'เพชรบูรณ์', M: 13528, F: 11660 }
//     , { CAT: 'แพร่', M: 10005, F: 10130 }
//     , { CAT: 'แม่ฮ่องสอน', M: 3546, F: 3006 }
//   ]
//   b.map(i => $('#reg').append(`<option value="${i.M},${i.F}">${i.CAT}</option>`))
//   let series2 = b.filter(i => i.CAT != null)
//   showSex(series2)

//   var c = [{ CAT: 'กำแพงเพชร', TYPE0: 1, TYPE11: 0, TYPE12: 2112, TYPE13: 3599, TYPE14: 16377, TYPE15: 1399, TYPE16: 1888, TYPE17: 348, TYPE18: 110 }
//     , { CAT: 'ตาก', TYPE0: 0, TYPE11: 0, TYPE12: 1151, TYPE13: 3304, TYPE14: 7627, TYPE15: 1031, TYPE16: 1230, TYPE17: 386, TYPE18: 116 }
//     , { CAT: 'นครสวรรค์', TYPE0: 2, TYPE11: 0, TYPE12: 2807, TYPE13: 4213, TYPE14: 17863, TYPE15: 2092, TYPE16: 2345, TYPE17: 409, TYPE18: 162 }
//     , { CAT: 'น่าน', TYPE0: 0, TYPE11: 0, TYPE12: 2095, TYPE13: 4500, TYPE14: 9777, TYPE15: 962, TYPE16: 1458, TYPE17: 160, TYPE18: 92 }
//     , { CAT: 'พะเยา', TYPE0: 0, TYPE11: 0, TYPE12: 1429, TYPE13: 4666, TYPE14: 12344, TYPE15: 1214, TYPE16: 1428, TYPE17: 273, TYPE18: 96 }
//     , { CAT: 'พิจิตร', TYPE0: 1, TYPE11: 0, TYPE12: 1620, TYPE13: 3594, TYPE14: 11616, TYPE15: 1253, TYPE16: 1387, TYPE17: 486, TYPE18: 75 }
//     , { CAT: 'พิษณุโลก', TYPE0: 1, TYPE11: 0, TYPE12: 2193, TYPE13: 3834, TYPE14: 16407, TYPE15: 1559, TYPE16: 2108, TYPE17: 414, TYPE18: 147 }
//     , { CAT: 'ลำปาง', TYPE0: 28, TYPE11: 0, TYPE12: 1633, TYPE13: 7048, TYPE14: 17281, TYPE15: 1745, TYPE16: 2168, TYPE17: 401, TYPE18: 131 }
//     , { CAT: 'ลำพูน', TYPE0: 2, TYPE11: 0, TYPE12: 1445, TYPE13: 3990, TYPE14: 11053, TYPE15: 1364, TYPE16: 1034, TYPE17: 221, TYPE18: 67 }
//     , { CAT: 'สุโขทัย', TYPE0: 1, TYPE11: 0, TYPE12: 2555, TYPE13: 3595, TYPE14: 13661, TYPE15: 1351, TYPE16: 1424, TYPE17: 380, TYPE18: 67 }
//     , { CAT: 'อุตรดิตถ์', TYPE0: 2, TYPE11: 0, TYPE12: 2211, TYPE13: 3172, TYPE14: 11546, TYPE15: 958, TYPE16: 1375, TYPE17: 448, TYPE18: 114 }
//     , { CAT: 'อุทัยธานี', TYPE0: 3, TYPE11: 0, TYPE12: 1021, TYPE13: 1441, TYPE14: 6168, TYPE15: 746, TYPE16: 873, TYPE17: 151, TYPE18: 46 }
//     , { CAT: 'เชียงราย', TYPE0: 0, TYPE11: 0, TYPE12: 2363, TYPE13: 9447, TYPE14: 16617, TYPE15: 2028, TYPE16: 2889, TYPE17: 352, TYPE18: 182 }
//     , { CAT: 'เชียงใหม่', TYPE0: 2, TYPE11: 0, TYPE12: 3069, TYPE13: 11462, TYPE14: 24553, TYPE15: 3009, TYPE16: 3477, TYPE17: 854, TYPE18: 434 }
//     , { CAT: 'เพชรบูรณ์', TYPE0: 6, TYPE11: 0, TYPE12: 2905, TYPE13: 3832, TYPE14: 15354, TYPE15: 2291, TYPE16: 2376, TYPE17: 371, TYPE18: 137 }
//     , { CAT: 'แพร่', TYPE0: 0, TYPE11: 0, TYPE12: 1011, TYPE13: 2653, TYPE14: 14735, TYPE15: 968, TYPE16: 1118, TYPE17: 93, TYPE18: 77 }
//     , { CAT: 'แม่ฮ่องสอน', TYPE0: 0, TYPE11: 0, TYPE12: 743, TYPE13: 1822, TYPE14: 3379, TYPE15: 482, TYPE16: 667, TYPE17: 173, TYPE18: 39 }
//   ]
//   c.map(i => $('#reg').append(`<option value="${i.TYPE0},${i.TYPE11},${i.TYPE12},${i.TYPE13},${i.TYPE14},${i.TYPE15},${i.TYPE16},${i.TYPE17},${i.TYPE18}">${i.CAT}</option>`))
//   let series3 = c.filter(i => i.CAT != null)
//   showType(series3)

//   var d = [{ CAT: 'กำแพงเพชร', AGE5: 43, AGE14: 331, AGE21: 444, AGE59: 6677, AGE60: 16795 }
//     , { CAT: 'ตาก', AGE5: 44, AGE14: 368, AGE21: 489, AGE59: 4039, AGE60: 8992 }
//     , { CAT: 'นครสวรรค์', AGE5: 66, AGE14: 494, AGE21: 572, AGE59: 8006, AGE60: 18565 }
//     , { CAT: 'น่าน', AGE5: 32, AGE14: 240, AGE21: 296, AGE59: 4294, AGE60: 13307 }
//     , { CAT: 'พะเยา', AGE5: 18, AGE14: 195, AGE21: 241, AGE59: 4704, AGE60: 15183 }
//     , { CAT: 'พิจิตร', AGE5: 31, AGE14: 237, AGE21: 292, AGE59: 4785, AGE60: 13359 }
//     , { CAT: 'พิษณุโลก', AGE5: 57, AGE14: 423, AGE21: 552, AGE59: 6936, AGE60: 16992 }
//     , { CAT: 'ลำปาง', AGE5: 37, AGE14: 294, AGE21: 475, AGE59: 6791, AGE60: 22302 }
//     , { CAT: 'ลำพูน', AGE5: 22, AGE14: 138, AGE21: 281, AGE59: 3797, AGE60: 14419 }
//     , { CAT: 'สุโขทัย', AGE5: 32, AGE14: 245, AGE21: 305, AGE59: 5374, AGE60: 15691 }
//     , { CAT: 'อุตรดิตถ์', AGE5: 30, AGE14: 247, AGE21: 349, AGE59: 4034, AGE60: 13887 }
//     , { CAT: 'อุทัยธานี', AGE5: 33, AGE14: 195, AGE21: 210, AGE59: 2833, AGE60: 6501 }
//     , { CAT: 'เชียงราย', AGE5: 54, AGE14: 544, AGE21: 714, AGE59: 8808, AGE60: 22432 }
//     , { CAT: 'เชียงใหม่', AGE5: 127, AGE14: 818, AGE21: 983, AGE59: 10190, AGE60: 31364 }
//     , { CAT: 'เพชรบูรณ์', AGE5: 79, AGE14: 540, AGE21: 599, AGE59: 8258, AGE60: 16082 }
//     , { CAT: 'แพร่', AGE5: 19, AGE14: 182, AGE21: 194, AGE59: 4349, AGE60: 15626 }
//     , { CAT: 'แม่ฮ่องสอน', AGE5: 27, AGE14: 193, AGE21: 246, AGE59: 1946, AGE60: 4201 }
//   ]
//   d.map(i => $('#reg').append(`<option value="${i.AGE5},${i.AGE14},${i.AGE21},${i.AGE59},${i.AGE60}">${i.CAT}</option>`))
//   let series4 = d.filter(i => i.CAT != null)
//   showAge(series4)

//   var e = [{ CAT: 'กำแพงเพชร', CNT: 15085, LOW: 13603, MID: 116, HIG: 0, LOW: 13603, MID: 116, OTH: 1366 }
//     , { CAT: 'ตาก', CNT: 9837, LOW: 8869, MID: 138, HIG: 0, LOW: 8869, MID: 138, OTH: 830 }
//     , { CAT: 'นครสวรรค์', CNT: 22044, LOW: 19958, MID: 334, HIG: 0, LOW: 19958, MID: 334, OTH: 1752 }
//     , { CAT: 'น่าน', CNT: 14633, LOW: 13169, MID: 178, HIG: 0, LOW: 13169, MID: 178, OTH: 1286 }
//     , { CAT: 'พะเยา', CNT: 16674, LOW: 14337, MID: 198, HIG: 0, LOW: 14337, MID: 198, OTH: 2139 }
//     , { CAT: 'พิจิตร', CNT: 13928, LOW: 12879, MID: 121, HIG: 0, LOW: 12879, MID: 121, OTH: 928 }
//     , { CAT: 'พิษณุโลก', CNT: 19838, LOW: 17942, MID: 322, HIG: 0, LOW: 17942, MID: 322, OTH: 1574 }
//     , { CAT: 'ลำปาง', CNT: 19860, LOW: 17741, MID: 350, HIG: 0, LOW: 17741, MID: 350, OTH: 1769 }
//     , { CAT: 'ลำพูน', CNT: 12646, LOW: 11205, MID: 200, HIG: 0, LOW: 11205, MID: 200, OTH: 1241 }
//     , { CAT: 'สุโขทัย', CNT: 18503, LOW: 16972, MID: 192, HIG: 0, LOW: 16972, MID: 192, OTH: 1339 }
//     , { CAT: 'อุตรดิตถ์', CNT: 16487, LOW: 15408, MID: 221, HIG: 0, LOW: 15408, MID: 221, OTH: 858 }
//     , { CAT: 'อุทัยธานี', CNT: 7540, LOW: 6922, MID: 78, HIG: 0, LOW: 6922, MID: 78, OTH: 540 }
//     , { CAT: 'เชียงราย', CNT: 18645, LOW: 15531, MID: 296, HIG: 0, LOW: 15531, MID: 296, OTH: 2818 }
//     , { CAT: 'เชียงใหม่', CNT: 23479, LOW: 20861, MID: 701, HIG: 0, LOW: 20861, MID: 701, OTH: 1917 }
//     , { CAT: 'เพชรบูรณ์', CNT: 13984, LOW: 12563, MID: 154, HIG: 0, LOW: 12563, MID: 154, OTH: 1267 }
//     , { CAT: 'แพร่', CNT: 17774, LOW: 16689, MID: 139, HIG: 0, LOW: 16689, MID: 139, OTH: 946 }
//     , { CAT: 'แม่ฮ่องสอน', CNT: 3519, LOW: 2837, MID: 60, HIG: 0, LOW: 2837, MID: 60, OTH: 622 }
//   ]
//   e.map(i => $('#reg').append(`<option value="${i.CNT},${i.LOW},${i.MID},${i.HIG},${i.LOW}",${i.MID},${i.OTH}">${i.CAT}</option>`))
//   let series5 = e.filter(i => i.CAT != null)
//   showEdu(series5)

//   var f = [{ CAT: 'กำแพงเพชร', OCC_001: 3, OCC_002: 0, OCC_003: 1294, OCC_004: 37, OCC_005: 2, OCC_006: 1505, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 2, OCC_011: 0, OCC_012: 0, OCC_013: 1421, OCC_014: 92, OCC_015: 1803, OCC_016: 5, OCC_017: 299, OCC_018: 0, OCC_019: 16, OCC_020: 0, OCC_999: 17835 }
//     , { CAT: 'ตาก', OCC_001: 0, OCC_002: 0, OCC_003: 697, OCC_004: 18, OCC_005: 0, OCC_006: 1098, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 3, OCC_011: 0, OCC_012: 0, OCC_013: 669, OCC_014: 39, OCC_015: 773, OCC_016: 1, OCC_017: 125, OCC_018: 0, OCC_019: 21, OCC_020: 0, OCC_999: 10493 }
//     , { CAT: 'นครสวรรค์', OCC_001: 12, OCC_002: 0, OCC_003: 755, OCC_004: 61, OCC_005: 0, OCC_006: 1158, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 5, OCC_011: 0, OCC_012: 0, OCC_013: 1672, OCC_014: 101, OCC_015: 4881, OCC_016: 12, OCC_017: 453, OCC_018: 0, OCC_019: 22, OCC_020: 0, OCC_999: 18575 }
//     , { CAT: 'น่าน', OCC_001: 7, OCC_002: 0, OCC_003: 238, OCC_004: 24, OCC_005: 0, OCC_006: 1008, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 969, OCC_014: 26, OCC_015: 2920, OCC_016: 5, OCC_017: 46, OCC_018: 0, OCC_019: 12, OCC_020: 0, OCC_999: 12920 }
//     , { CAT: 'พะเยา', OCC_001: 2, OCC_002: 1, OCC_003: 370, OCC_004: 24, OCC_005: 0, OCC_006: 1018, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 1067, OCC_014: 22, OCC_015: 4082, OCC_016: 6, OCC_017: 80, OCC_018: 0, OCC_019: 8, OCC_020: 0, OCC_999: 13664 }
//     , { CAT: 'พิจิตร', OCC_001: 4, OCC_002: 0, OCC_003: 1340, OCC_004: 23, OCC_005: 0, OCC_006: 1127, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 956, OCC_014: 68, OCC_015: 1949, OCC_016: 1, OCC_017: 210, OCC_018: 0, OCC_019: 26, OCC_020: 0, OCC_999: 13044 }
//     , { CAT: 'พิษณุโลก', OCC_001: 9, OCC_002: 0, OCC_003: 599, OCC_004: 45, OCC_005: 0, OCC_006: 915, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 1, OCC_011: 0, OCC_012: 0, OCC_013: 1716, OCC_014: 74, OCC_015: 2478, OCC_016: 11, OCC_017: 163, OCC_018: 0, OCC_019: 18, OCC_020: 0, OCC_999: 18943 }
//     , { CAT: 'ลำปาง', OCC_001: 1, OCC_002: 0, OCC_003: 741, OCC_004: 9, OCC_005: 0, OCC_006: 1085, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 1967, OCC_014: 94, OCC_015: 1508, OCC_016: 1, OCC_017: 161, OCC_018: 0, OCC_019: 35, OCC_020: 0, OCC_999: 24402 }
//     , { CAT: 'ลำพูน', OCC_001: 11, OCC_002: 1, OCC_003: 1335, OCC_004: 7, OCC_005: 0, OCC_006: 1260, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 1, OCC_012: 0, OCC_013: 757, OCC_014: 85, OCC_015: 2850, OCC_016: 8, OCC_017: 205, OCC_018: 0, OCC_019: 29, OCC_020: 0, OCC_999: 12137 }
//     , { CAT: 'สุโขทัย', OCC_001: 6, OCC_002: 0, OCC_003: 865, OCC_004: 9, OCC_005: 0, OCC_006: 1657, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 723, OCC_014: 44, OCC_015: 3438, OCC_016: 6, OCC_017: 163, OCC_018: 0, OCC_019: 19, OCC_020: 0, OCC_999: 14723 }
//     , { CAT: 'อุตรดิตถ์', OCC_001: 9, OCC_002: 0, OCC_003: 915, OCC_004: 19, OCC_005: 0, OCC_006: 1190, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 688, OCC_014: 48, OCC_015: 3363, OCC_016: 6, OCC_017: 239, OCC_018: 0, OCC_019: 20, OCC_020: 0, OCC_999: 12053 }
//     , { CAT: 'อุทัยธานี', OCC_001: 5, OCC_002: 0, OCC_003: 213, OCC_004: 9, OCC_005: 0, OCC_006: 432, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 467, OCC_014: 23, OCC_015: 1488, OCC_016: 7, OCC_017: 37, OCC_018: 0, OCC_019: 4, OCC_020: 0, OCC_999: 7087 }
//     , { CAT: 'เชียงราย', OCC_001: 7, OCC_002: 0, OCC_003: 1081, OCC_004: 23, OCC_005: 1, OCC_006: 2293, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 1, OCC_011: 0, OCC_012: 0, OCC_013: 1195, OCC_014: 77, OCC_015: 2249, OCC_016: 11, OCC_017: 141, OCC_018: 0, OCC_019: 58, OCC_020: 0, OCC_999: 25420 }
//     , { CAT: 'เชียงใหม่', OCC_001: 9, OCC_002: 1, OCC_003: 2070, OCC_004: 43, OCC_005: 0, OCC_006: 1846, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 6, OCC_011: 0, OCC_012: 0, OCC_013: 2849, OCC_014: 164, OCC_015: 2639, OCC_016: 2, OCC_017: 383, OCC_018: 0, OCC_019: 85, OCC_020: 0, OCC_999: 33395 }
//     , { CAT: 'เพชรบูรณ์', OCC_001: 0, OCC_002: 0, OCC_003: 966, OCC_004: 30, OCC_005: 0, OCC_006: 1212, OCC_007: 1, OCC_008: 0, OCC_009: 0, OCC_010: 1, OCC_011: 0, OCC_012: 0, OCC_013: 1648, OCC_014: 97, OCC_015: 1925, OCC_016: 10, OCC_017: 198, OCC_018: 0, OCC_019: 23, OCC_020: 0, OCC_999: 19453 }
//     , { CAT: 'แพร่', OCC_001: 1, OCC_002: 0, OCC_003: 1021, OCC_004: 51, OCC_005: 0, OCC_006: 1286, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 2, OCC_011: 0, OCC_012: 0, OCC_013: 1277, OCC_014: 39, OCC_015: 2825, OCC_016: 3, OCC_017: 178, OCC_018: 0, OCC_019: 37, OCC_020: 0, OCC_999: 13657 }
//     , { CAT: 'แม่ฮ่องสอน', OCC_001: 0, OCC_002: 0, OCC_003: 233, OCC_004: 9, OCC_001: 0, OCC_002: 0, OCC_003: 233, OCC_004: 9, OCC_005: 0, OCC_006: 782, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 1, OCC_011: 0, OCC_012: 0, OCC_013: 304, OCC_014: 17, OCC_015: 881, OCC_016: 2, OCC_017: 60, OCC_018: 0, OCC_019: 11, OCC_020: 0, OCC_999: 4315 }
//   ]
//   f.map(i => $('#reg').append(`<option value="${i.OCC_001},${i.OCC_002},${i.OCC_003},${i.OCC_004},${i.OCC_005}",${i.OCC_006},${i.OCC_007}",${i.OCC_008},${i.OCC_009}",${i.OCC_010},${i.OCC_011}",${i.OCC_012}",${i.OCC_013},${i.OCC_014}",${i.OCC_015},${i.OCC_016}",${i.OCC_017},${i.OCC_018}",${i.OCC_019}",${i.OCC_020},${i.OCC_999}">${i.CAT}</option>`))
//   let series6 = f.filter(i => i.CAT != null)
//   showOcc(series6)

//   var g = [{ CAT: '0-5 ปี', TYPE0: 0, TYPE11: 0, TYPE12: 26, TYPE13: 160, TYPE14: 301, TYPE15: 27, TYPE16: 374, TYPE17: 106, TYPE18: 86 }
//     , { CAT: '6-14 ปี', TYPE0: 0, TYPE11: 0, TYPE12: 266, TYPE13: 1079, TYPE14: 1816, TYPE15: 244, TYPE16: 2726, TYPE17: 1010, TYPE18: 923 }
//     , { CAT: '15-21 ปี', TYPE0: 0, TYPE11: 0, TYPE12: 378, TYPE13: 1174, TYPE14: 2167, TYPE15: 365, TYPE16: 3719, TYPE17: 1105, TYPE18: 595 }
//     , { CAT: '22-59 ปี', TYPE0: 20, TYPE11: 0, TYPE12: 6943, TYPE13: 14432, TYPE14: 49509, TYPE15: 13371, TYPE16: 16890, TYPE17: 2630, TYPE18: 432 }
//     , { CAT: '60 ปีขึ้นไป', TYPE0: 29, TYPE11: 0, TYPE12: 24750, TYPE13: 59327, TYPE14: 172565, TYPE15: 10445, TYPE16: 5536, TYPE17: 1069, TYPE18: 56 }]

//   g.map(i => $('#reg').append(`<option value="${i.TYPE0},${i.TYPE11},${i.TYPE12},${i.TYPE13},${i.TYPE14}",${i.TYPE15},${i.TYPE16}",${i.TYPE17},${i.TYPE18}">${i.CAT}</option>`))
//   let series7 = g.filter(i => i.CAT != null)
//   showAgeType(series7)

//   var h = [{ CAT: '0-5 ปี', LOW: 24, MID: 0, HIG: 0, OTH: 20 }
//     , { CAT: '6-14 ปี', LOW: 1919, MID: 0, HIG: 0, OTH: 593 }
//     , { CAT: '15-21 ปี', LOW: 4686, MID: 2, HIG: 0, OTH: 388 }
//     , { CAT: '22-59 ปี', LOW: 64607, MID: 2158, HIG: 0, OTH: 5057 }
//     , { CAT: '60 ปีขึ้นไป', LOW: 166250, MID: 1638, HIG: 0, OTH: 17134 }]

//   h.map(i => $('#reg').append(`<option value="${i.LOW},${i.MID},${i.HIG},${i.OTH}">${i.CAT}</option>`))
//   let series8 = h.filter(i => i.CAT != null)
//   showAgeEdu(series8)

//   var k = [{ CAT: '0-5 ปี', OCC_001: 0, OCC_002: 0, OCC_003: 0, OCC_004: 0, OCC_005: 0, OCC_006: 0, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 2, OCC_014: 0, OCC_015: 4, OCC_016: 0, OCC_017: 0, OCC_018: 0, OCC_019: 0, OCC_020: 0, OCC_999: 745 }
//     , { CAT: '6-14 ปี', OCC_001: 0, OCC_002: 0, OCC_003: 1, OCC_004: 0, OCC_005: 0, OCC_006: 4, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 1, OCC_011: 0, OCC_012: 0, OCC_013: 0, OCC_014: 0, OCC_015: 219, OCC_016: 0, OCC_017: 1, OCC_018: 0, OCC_019: 0, OCC_020: 0, OCC_999: 5458 }
//     , { CAT: '15-21 ปี', OCC_001: 0, OCC_002: 0, OCC_003: 67, OCC_004: 1, OCC_005: 0, OCC_006: 25, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 0, OCC_011: 0, OCC_012: 0, OCC_013: 92, OCC_014: 7, OCC_015: 665, OCC_016: 0, OCC_017: 4, OCC_018: 0, OCC_019: 0, OCC_020: 0, OCC_999: 6381 }
//     , { CAT: '22-59 ปี', OCC_001: 15, OCC_002: 1, OCC_003: 8181, OCC_004: 105, OCC_005: 3, OCC_006: 9796, OCC_007: 0, OCC_008: 0, OCC_009: 0, OCC_010: 6, OCC_011: 0, OCC_012: 0, OCC_013: 6601, OCC_014: 1001, OCC_015: 6227, OCC_016: 68, OCC_017: 1676, OCC_018: 0, OCC_019: 217, OCC_020: 0, OCC_999: 61924 }
//     , { CAT: '60 ปีขึ้นไป', OCC_001: 71, OCC_002: 2, OCC_003: 6484, OCC_004: 335, OCC_005: 0, OCC_006: 11047, OCC_007: 1, OCC_008: 0, OCC_009: 0, OCC_010: 15, OCC_011: 1, OCC_012: 0, OCC_013: 13650, OCC_014: 102, OCC_015: 34937, OCC_016: 29, OCC_017: 1460, OCC_018: 0, OCC_019: 227, OCC_020: 0, OCC_999: 197608 }
//   ]
//   k.map(i => $('#reg').append(`<option value="${i.OCC_001},${i.OCC_002},${i.OCC_003},${i.OCC_004},${i.OCC_005}",${i.OCC_006},${i.OCC_007}",${i.OCC_008},${i.OCC_009}",${i.OCC_010},${i.OCC_011}",${i.OCC_012}",${i.OCC_013},${i.OCC_014}",${i.OCC_015},${i.OCC_016}",${i.OCC_017},${i.OCC_018}",${i.OCC_019}",${i.OCC_020},${i.OCC_999}">${i.CAT}</option>`))
//   let series9 = k.filter(i => i.CAT != null)
//   showAgeOcc(series9)

// }

function selectAddress(address_code, privilege) {
  console.log(address_code, privilege)
  axios.post(`${url}/api/get_by_country_total`, { address_code, privilege }).then(async (r) => {
    $('#reg').empty().append(`<option value="all">เลือกภาค</option>`);
    r.data.map(i => {
      $('#reg').append(`<option value="${i.REGION_CODE}">${i.REGION_NAME_THAI}</option>`)
      showTotal(r.data)
      // console.log(r.data)
    })

  })

  axios.post(`${url}/api/get_by_country_sex`, { address_code }).then(async (r) => {
    r.data.map(i => {
    })
    showSex(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_type`, { address_code }).then(async (r) => {
    showType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_age`, { address_code }).then(async (r) => {
    showAge(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_edu`, { address_code }).then(async (r) => {
    showEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_occ`, { address_code }).then(async (r) => {
    showOcc(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_agetype`, { address_code }).then(async (r) => {
    showAgeType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_ageedu`, { address_code }).then(async (r) => {
    showAgeEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_ageocc`, { address_code }).then(async (r) => {
    showAgeOcc(r.data)
    // console.log(r.data)
  })

}


function selectRegion(address_code, region_code) {
  axios.post(`${url}/api/get_by_region_total`, { address_code, region_code }).then(async (r) => {
    $('#pro').empty().append(`<option value="all">เลือกจังหวัด</option>`);
    r.data.map(i => $('#pro').append(`<option value="${i.PROVINCE_CODE}">${i.PROVINCE_NAME}</option>`))
    showTotal(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_sex`, { address_code, region_code }).then(async (r) => {
    showSex(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_type`, { address_code, region_code }).then(async (r) => {
    showType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_age`, { address_code, region_code }).then(async (r) => {
    showAge(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_edu`, { address_code, region_code }).then(async (r) => {
    showEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_occ`, { address_code, region_code }).then(async (r) => {
    showOcc(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_agetype`, { address_code, region_code }).then(async (r) => {
    showAgeType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_ageedu`, { address_code, region_code }).then(async (r) => {
    showAgeEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_ageocc`, { address_code, region_code }).then(async (r) => {
    showAgeOcc(r.data)
    // console.log(r.data)
  })

}

function selectProvince(address_code, province_code) {
  axios.post(`${url}/api/get_by_province_total`, { address_code, province_code }).then(async (r) => {
    $('#amp').empty().append(`<option value="all">เลือกอำเภอ</option>`);
    r.data.map(i => $('#amp').append(`<option value="${i.AMPCODE}">${i.DISTRICT_NAME}</option>`))
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_province_sex`, { address_code, province_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_province_type`, { address_code, province_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_province_age`, { address_code, province_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_province_edu`, { address_code, province_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_province_occ`, { address_code, province_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_province_agetype`, { address_code, province_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_province_ageedu`, { address_code, province_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_province_ageocc`, { address_code, province_code }).then(async (r) => {
    showAgeOcc(r.data)
  })
}


function selectAmphoe(address_code, amphoe_code) {
  axios.post(`${url}/api/get_by_amphoe_total`, { address_code, amphoe_code }).then(async (r) => {
    $('#tam').empty().append(`<option value="all">เลือกตำบล</option>`);
    r.data.map(i => $('#tam').append(`<option value="${i.TAMCODE}">${i.SUBDISTRICT_NAME}</option>`))
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_sex`, { address_code, amphoe_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_type`, { address_code, amphoe_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_age`, { address_code, amphoe_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_edu`, { address_code, amphoe_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_occ`, { address_code, amphoe_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_agetype`, { address_code, amphoe_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_ageedu`, { address_code, amphoe_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_ageocc`, { address_code, amphoe_code }).then(async (r) => {
    showAgeOcc(r.data)
  })

}

function selectTambon(address_code, tambon_code) {
  axios.post(`${url}/api/get_by_tambon_total`, { address_code, tambon_code }).then(async (r) => {
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_sex`, { address_code, tambon_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_type`, { address_code, tambon_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_age`, { address_code, tambon_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_edu`, { address_code, tambon_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_occ`, { address_code, tambon_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_agetype`, { address_code, tambon_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_ageedu`, { address_code, tambon_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_ageocc`, { address_code, tambon_code }).then(async (r) => {
    showAgeOcc(r.data)
  })

}

function selectinfo(Category) {
  $('#infoview').empty()
  var Category = Category;
  var address_code = $('#address').val();
  var region_code = $('#reg').val();
  var province_code = $('#pro').val();
  var amphoe_code = $('#amp').val();
  var tambon_code = $('#tam').val();

  // console.log(add)
  // console.log(region)

  if (Category == "total") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_total`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_total`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_total`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_total`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_total`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
  }
  else if (Category == "sex") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_sex`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_sex`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_sex`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_sex`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_sex`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
  }
  else if (Category == "type") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_type`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_type`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_type`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_type`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_type`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
  }
  else if (Category == "age") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_age`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_age`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_age`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_age`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_age`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }

  }
  else if (Category == "edu") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_edu`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_edu`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_edu`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_edu`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_edu`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }

  }
  else if (Category == "occ") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_occ`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
            คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
            ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
            รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_occ`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_occ`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_occ`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_occ`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }


  }
  else if (Category == "agetype") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_agetype`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_agetype`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_agetype`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_agetype`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_agetype`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }

  }
  else if (Category == "ageedu") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_ageedu`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_ageedu`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_ageedu`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_ageedu`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_ageedu`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }

  }
  else if (Category == "ageocc") {
    if (address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_ageocc`, { address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
            คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
            ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
            รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_ageocc`, { address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_ageocc`, { address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_ageocc`, { address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
    if (address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_ageocc`, { address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> รับราชการ: ${i.OCC_001} คน <br> รัฐวิสาหกิจ: ${i.OCC_002
            } คน <br> รับจ้าง: ${i.OCC_003} คน <br> กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย: ${i.OCC_004} คน <br> กำลังศึกษา: ${i.OCC_005} คน <br> เกษตรกรรม: ${i.OCC_006} คน <br> 
          คอมพิวเตอร์: ${i.OCC_007} คน <br> นวดแผนโบราณ: ${i.OCC_008} คน <br> ค้าขาย: ${i.OCC_010} คน <br> ค้าสลาก: ${i.OCC_011} คน <br> พนักงานบริษัท: ${i.OCC_012} คน <br> 
          ไม่ระบุอาชีพ: ${i.OCC_013} คน <br> ลูกจ้าง: ${i.OCC_014} คน <br> ไม่ได้ประกอบอาชีพ: ${i.OCC_015} คน <br> ลูกจ้างเอกชน: ${i.OCC_016} คน <br> ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ: ${i.OCC_017} คน <br> 
          รับราชการ/รัฐวิสาหกิจ: ${i.OCC_019} คน <br> หัตถกรรม: ${i.OCC_020} คน <br> อื่นๆ: ${i.OCC_999} คน <br>`)
        })
      })
    }
  }
}

selectAddress("01", "00")

$("#privilege").on('change', function () {
  $('#inforeg').empty()
  $('#tam').empty()
  $('#amp').empty()
  $('#pro').empty()
  $('#reg').empty()
  document.getElementById("tb").style.visibility = "hidden";
  var address_code = $('#address').val()
  var privilege = $('#privilege').val()
  selectAddress(address_code, privilege)

  RemoveLayers();
  axios.get(`${url}/geoapi/get-bound/th/${address_code}`).then(async (r) => {
    let geojson = await JSON.parse(r.data.data[0].geom);
    console.log(geojson);
    let a = L.geoJSON(geojson, {
      style: boundStyle,
      name: "bnd"
    }).addTo(map);
    map.fitBounds(a.getBounds());
  })

})

$("#address").on('change', function () {
  $('#infoview').empty()
  $('#tam').empty()
  $('#amp').empty()
  $('#pro').empty()
  $('#reg').empty()
  document.getElementById("tb").style.visibility = "hidden";
  var address_code = $('#address').val()
  var privilege = $('#privilege').val()
  selectAddress(address_code, privilege)

  RemoveLayers();
  axios.get(`${url}/geoapi/get-bound/th/${address_code}`).then(async (r) => {
    let geojson = await JSON.parse(r.data.data[0].geom);
    console.log(geojson);
    let a = L.geoJSON(geojson, {
      style: boundStyle,
      name: "bnd"
    }).addTo(map);
    map.fitBounds(a.getBounds());
  })

})

$("#reg").on('change', function () {
  $('#tam').empty()
  $('#amp').empty()
  $('#pro').empty()
  document.getElementById("tb").style.visibility = "hidden";
  var address_code = $('#address').val()
  var region_code = $('#reg').val()
  selectRegion(address_code, region_code)

  if (region_code == "all") {
    map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
  } else {
    RemoveLayers();
    axios.get(`${url}/geoapi/get-bound/reg/${region_code}`).then(async (r) => {
      let geojson = await JSON.parse(r.data.data[0].geom);
      // console.log(geojson);
      let a = L.geoJSON(geojson, {
        style: boundStyle,
        name: "bnd"
      }).addTo(map);
      map.fitBounds(a.getBounds());
    })
  }
})

$("#pro").on('change', function () {
  $('#tam').empty()
  $('#amp').empty()
  document.getElementById("tb").style.visibility = "hidden";
  var address_code = $('#address').val()
  var province_code = $('#pro').val()
  selectProvince(address_code, province_code)

  if (province_code == "all") {
    map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
  } else {
    RemoveLayers();
    axios.get(`${url}/geoapi/get-bound/pro/${province_code}`).then(async (r) => {
      let geojson = await JSON.parse(r.data.data[0].geom);
      // console.log(geojson);
      let a = L.geoJSON(geojson, {
        style: boundStyle,
        name: "bnd"
      }).addTo(map);
      map.fitBounds(a.getBounds());
    })
  }
})

$("#amp").on('change', function () {
  $('#tam').empty()
  document.getElementById("tb").style.visibility = "hidden";
  var address_code = $('#address').val()
  var amphoe_code = $('#amp').val()
  selectAmphoe(address_code, amphoe_code)

  if (amphoe_code == "all") {
    map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
  } else {
    RemoveLayers();
    axios.get(`${url}/geoapi/get-bound/amp/${amphoe_code}`).then(async (r) => {
      let geojson = await JSON.parse(r.data.data[0].geom);
      // console.log(geojson);
      let a = L.geoJSON(geojson, {
        style: boundStyle,
        name: "bnd"
      }).addTo(map);
      map.fitBounds(a.getBounds());
    })
  }
})

$("#tam").on('change', function () {
  var address_code = $('#address').val()
  var tambon_code = $('#tam').val()
  console.log(address_code, tambon_code);
  selectTambon(address_code, tambon_code)

  if (tambon_code == "all") {
    map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
  } else {
    RemoveLayers();
    axios.get(`${url}/geoapi/get-bound/tam/${tambon_code}`).then(async (r) => {
      let geojson = await JSON.parse(r.data.data[0].geom);
      // console.log(geojson);
      let a = L.geoJSON(geojson, {
        style: boundStyle,
        name: "bnd"
      }).addTo(map);
      map.fitBounds(a.getBounds());
    })
    loadTable()
  }
})

let loadTable = () => {
  document.getElementById("tb").style.visibility = "visible";
  var address_code = $('#address').val()
  var tambon_code = $('#tam').val()
  $("#tab").dataTable().fnDestroy();
  showDataTable({ tambon_code, address_code });
}

let showDataTable = async (json) => {
  // $.extend(true, $.fn.dataTable.defaults, {
  //   "language": {
  //     "sProcessing": "กำลังดำเนินการ...",
  //     "sLengthMenu": "แสดง_MENU_ แถว",
  //     "sZeroRecords": "ไม่พบข้อมูล",
  //     "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
  //     "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
  //     "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
  //     "sInfoPostFix": "",
  //     "sSearch": "ค้นหา:",
  //     "sUrl": "",
  //     "oPaginate": {
  //       "sFirst": "เริ่มต้น",
  //       "sPrevious": "ก่อนหน้า",
  //       "sNext": "ถัดไป",
  //       "sLast": "สุดท้าย"
  //     },
  //     "emptyTable": "ไม่พบข้อมูล..."
  //   }
  // });
  let table = $('#tab').DataTable({
    ajax: {
      url: url + '/api/get_tam_tb',
      type: 'POST',
      data: json,
      dataSrc: 'data'
    },
    columns: [
      { data: 'MAIMAD_ID' },
      { data: 'ADDRESS_CODE' },
      // {
      //   data: null,
      //   "render": function (data, type, row) { return Number(data.pm25).toFixed(1) }
      // }
    ],
    // columnDefs: [
    //   { className: 'text-center', targets: [0, 2, 3, 4, 5, 6, 7, 8] },
    // ],
    dom: 'Bfrtip',
    // buttons: [
    //   'excel', 'print'
    // ],
    scrollX: true,
    select: true,
    pageLength: 7,
    responsive: {
      details: true
    }
  });

  // table.on('search.dt', function () {
  //   resp = table.rows({ search: 'applied' }).data();
  //   getsta_2(resp);
  //   mapAQI()
  //   $('#paramiter').prop('selectedIndex', 0);
  // });
}

document.getElementById("tb").style.visibility = "hidden";

$("#checkAll").click(function () {
  $('input:checkbox').not(this).prop('checked', this.checked);
});


// Preloader
$(window).on('load', function () {
  if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}