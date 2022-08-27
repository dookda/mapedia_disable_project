const urleg = "https://engrids.soc.cmu.ac.th/api";
// const urleec = "https://eec-onep.online/api";
const url = "http://192.168.3.110:3000";
// const url = "http://localhost:3000";

let latlng = {
  lat: 13.305567,
  lng: 101.383101
};
let map = L.map("map", {
  center: latlng,
  zoom: 6
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

/// chart total
var domPie = document.getElementById('chart-total');
var chartPie = echarts.init(domPie, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var appPie = {};
var optionPie = {
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'value'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'value'
    }
  ],
};
window.addEventListener('resize', chartAgeOcc.resize);


/// DOM 
async function showTotal(arr) {
  optionPie.series = [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionSex.series = [
    {
      name: 'Male',
      type: 'bar',
      stack: 'Sex',
      label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.M)
    }, {
      name: 'Female',
      type: 'bar',
      stack: 'Sex',
      label: { show: true },
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionType.series = [
    {
      name: 'TYPE0',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE0)
    }, {
      name: 'TYPE11',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE11)
    }, {
      name: 'TYPE12',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE12)
    }, {
      name: 'TYPE13',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE13)
    }, {
      name: 'TYPE14',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE14)
    }, {
      name: 'TYPE15',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE15)
    }, {
      name: 'TYPE16',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE16)
    }, {
      name: 'TYPE17',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE17)
    }, {
      name: 'TYPE18',
      type: 'bar',
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionAge.series = [
    {
      name: '0-5',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE5)
    }, {
      name: '6-14',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE14)
    }, {
      name: '15-21',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE21)
    }, {
      name: '22-59',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.AGE59)
    }, {
      name: '>= 60',
      type: 'bar',
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionEdu.series = [
    {
      name: 'สูงกว่าปริญญาตรี',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.HIG)
    }, {
      name: 'ปริญญาตรีหรือเทียบเท่า',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.MID)
    }, {
      name: 'ต่ำกว่าปริญญาตรี',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.LOW)
    }, {
      name: 'อื่น ๆ',
      type: 'bar',
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionOcc.series = [
    {
      name: 'occ_001',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_001)
    }, {
      name: 'occ_002',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_002)
    }, {
      name: 'occ_003',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_003)
    }, {
      name: 'occ_004',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_004)
    }, {
      name: 'occ_005',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_005)
    }, {
      name: 'occ_006',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_006)
    }, {
      name: 'occ_007',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_007)
    }, {
      name: 'occ_008',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_008)
    }, {
      name: 'occ_009',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_009)
    }, {
      name: 'occ_010',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_010)
    }, {
      name: 'occ_011',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_011)
    }, {
      name: 'occ_012',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_012)
    }, {
      name: 'occ_013',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_013)
    }, {
      name: 'occ_014',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_014)
    }, {
      name: 'occ_015',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_015)
    }, {
      name: 'occ_016',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_016)
    }, {
      name: 'occ_017',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_017)
    }, {
      name: 'occ_018',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_018)
    }, {
      name: 'occ_019',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_019)
    }, {
      name: 'occ_020',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_020)
    }, {
      name: 'occ_999',
      type: 'bar',
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionAgeType.series = [
    {
      name: 'TYPE0',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE0)
    }, {
      name: 'TYPE11',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE11)
    }, {
      name: 'TYPE12',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE12)
    }, {
      name: 'TYPE13',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE13)
    }, {
      name: 'TYPE14',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE14)
    }, {
      name: 'TYPE15',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE15)
    }, {
      name: 'TYPE16',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE16)
    }, {
      name: 'TYPE17',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.TYPE17)
    }, {
      name: 'TYPE18',
      type: 'bar',
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
      data: arr.map(x => x.CAT)
    }
  ]

  optionAgeEdu.series = [
    {
      name: 'สูงกว่าปริญญาตรี',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.HIG)
    }, {
      name: 'ปริญญาตรีหรือเทียบเท่า',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.MID)
    }, {
      name: 'ต่ำกว่าปริญญาตรี',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.LOW)
    }, {
      name: 'อื่น ๆ',
      type: 'bar',
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
      data: arr.map(x => x.CAT)
    }
  ]
  optionAgeOcc.series = [
    {
      name: 'occ_001',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_001)
    }, {
      name: 'occ_002',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_002)
    }, {
      name: 'occ_003',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_003)
    }, {
      name: 'occ_004',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_004)
    }, {
      name: 'occ_005',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_005)
    }, {
      name: 'occ_006',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_006)
    }, {
      name: 'occ_007',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_007)
    }, {
      name: 'occ_008',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_008)
    }, {
      name: 'occ_009',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_009)
    }, {
      name: 'occ_010',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_010)
    }, {
      name: 'occ_011',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_011)
    }, {
      name: 'occ_012',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_012)
    }, {
      name: 'occ_013',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_013)
    }, {
      name: 'occ_014',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_014)
    }, {
      name: 'occ_015',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_015)
    }, {
      name: 'occ_016',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_016)
    }, {
      name: 'occ_017',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_017)
    }, {
      name: 'occ_018',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_018)
    }, {
      name: 'occ_019',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_019)
    }, {
      name: 'occ_020',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_020)
    }, {
      name: 'occ_999',
      type: 'bar',
      stack: 'Type',
      // label: { show: true },
      emphasis: { focus: 'series' },
      data: arr.map(x => x.OCC_999)
    }
  ]

  if (optionAgeOcc && typeof optionAgeOcc === 'object') {
    chartAgeOcc.setOption(optionAgeOcc);
  }
}

function selectAddress(address_code) {
  axios.post(`${url}/api/get_by_country_total`, { address_code }).then(async (r) => {
    $('#reg').empty().append(`<option value="all">เลือกภาค</option>`);
    r.data.map(i => $('#reg').append(`<option value="${i.REGION_CODE}">${i.REGION_NAME_THAI}</option>`))
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_country_sex`, { address_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_country_type`, { address_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_country_age`, { address_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_country_edu`, { address_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_country_occ`, { address_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_country_agetype`, { address_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_country_ageedu`, { address_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_country_ageocc`, { address_code }).then(async (r) => {
    showAgeOcc(r.data)
  })

}

function selectRegion(address_code, region_code) {
  axios.post(`${url}/api/get_by_region_total`, { address_code, region_code }).then(async (r) => {
    $('#pro').empty().append(`<option value="all">เลือกจังหวัด</option>`);
    r.data.map(i => $('#pro').append(`<option value="${i.PROVINCE_CODE}">${i.PROVINCE_NAME}</option>`))
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_region_sex`, { address_code, region_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_region_type`, { address_code, region_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_region_age`, { address_code, region_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_region_edu`, { address_code, region_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_region_occ`, { address_code, region_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_region_agetype`, { address_code, region_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_region_ageedu`, { address_code, region_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_region_ageocc`, { address_code, region_code }).then(async (r) => {
    showAgeOcc(r.data)
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

selectAddress("01")

$("#address").on('change', function () {
  $('#tam').empty()
  $('#amp').empty()
  $('#pro').empty()
  $('#reg').empty()
  var address_code = $('#address').val()
  selectAddress(address_code)

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
  console.log(tambon_code);
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
  }
})

$("#checkAll").click(function () {
  $('input:checkbox').not(this).prop('checked', this.checked);
});


