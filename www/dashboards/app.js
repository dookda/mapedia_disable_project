const urleg = "https://engrids.soc.cmu.ac.th/api";
// const urleec = "https://eec-onep.online/api";
const url = "http://localhost:3000";

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

/// chart
var domPie = document.getElementById('chartdiv1');
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

// chart2
var domSex = document.getElementById('chartdiv2');
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
  yAxis: [
    {
      type: 'value'
    }
  ],
};
window.addEventListener('resize', chartSex.resize);

// chart3
var domType = document.getElementById('chartdiv3');
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

// chart4
var domAge = document.getElementById('chartdiv4');
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
  yAxis: [
    {
      type: 'value'
    }
  ],
};
window.addEventListener('resize', chartAge.resize);

// chart4 Edu
var domEdu = document.getElementById('chartdiv5');
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
  yAxis: [
    {
      type: 'value'
    }
  ],
};
window.addEventListener('resize', chartEdu.resize);
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
  optionSex.xAxis = [
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


function showEdu(arr) {
  optionEdu.xAxis = [
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

function showEdu(arr) {
  optionAge.xAxis = [
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

function selectAddress(ad_code) {
  axios.post(`${url}/api/get_by_region`, { address_code: ad_code }).then(async (r) => {
    var d = r.data;
    // set region option
    $('#region').empty().append(`<option value="tam">ทุกภาค</option>`);
    await d.map(i => $('#region').append(`<option value="${i.REGION_CODE}">${i.REGION_NAME_THAI}</option>`))

    // let series = await d.map(i => {
    //   return { ...i, CAT: i.CAT === null ? 'ไม่ระบุ' : i.CAT }
    // })
    console.log(d);
    showTotal(r.data)
    showSex(r.data)
    showType(r.data)
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_region_edu`, { address_code: ad_code }).then(async (r) => {
    console.log(r.data);
    showEdu(r.data)
  })
}

selectAddress("02")

$("#address").on('change', function () {
  var ad_code = $('#address').val()
  console.log(ad_code)
  selectAddress(ad_code)

})

$("#region").on('change', function () {
  var ad_code = $('#address').val()
  var rg_code = $('#region').val()
  console.log(rg_code)
  // let getregion = () => {
  axios.post(`${url}/api/get_by_province`, { region_code: rg_code, address_code: ad_code }).then(async (r) => {
    var d = r.data;
    console.log(d)
    $('#pro').empty().append(`<option value="pro">ทุกจังหวัด</option>`);
    d.map(i => $('#pro').append(`<option value="${i.PROVINCE_CODE}">${i.PROVINCE_NAME}</option>`))
  })

})

$("#pro").on('change', function () {
  var ad_code = $('#address').val()
  var rg_code = $('#region').val()
  var pv_code = $('#pro').val()
  console.log(pv_code)
  // let getregion = () => {
  axios.post(`${url}/api/get_by_amp`, { province_code: pv_code, region_code: rg_code, address_code: ad_code }).then(async (r) => {
    var d = r.data;
    console.log(d)
    $('#amp').empty().append(`<option value="amp">ทุกอำเภอ</option>`);
    d.map(i => $('#amp').append(`<option value="${i.AMPCODE}">${i.DISTRICT_NAME}</option>`))
  })
  if (pv_code == "pro") {
    map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
  } else {
    RemoveLayers();
    axios.get(`${urleg}/eec-api/get-bound/pro/${pv_code}`).then(async (r) => {
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
  var ad_code = $('#address').val()
  var rg_code = $('#region').val()
  var pv_code = $('#pro').val()
  var amp_code = $('#amp').val()
  console.log(amp_code)
  // let getregion = () => {
  axios.post(`${url}/api/get_by_tam`, { amphoe_code: amp_code, province_code: pv_code, region_code: rg_code, address_code: ad_code }).then(async (r) => {
    var d = r.data;
    console.log(d)
    $('#tam').empty().append(`<option value="amp">ทุกตำบล</option>`);
    d.map(i => $('#tam').append(`<option value="${i.TAMCODE}">${i.SUBDISTRICT_NAME}</option>`))
  })
  if (amp_code !== "amp") {
    // map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
  } else {
    RemoveLayers();
    axios.get(`${urleg}/eec-api/get-bound/amp/${amp_code}`).then(async (r) => {
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
  var ad_code = $('#address').val()
  var rg_code = $('#region').val()
  var pv_code = $('#pro').val()
  var amp_code = $('#amp').val()
  var tam_code = $('#tam').val()
  console.log(tam_code)
  // let getregion = () => {
  axios.post(`${url}/api/get_by_tam`, { tambon_code: tam_code, amphoe_code: amp_code, province_code: pv_code, region_code: rg_code, address_code: ad_code }).then(async (r) => {
    var d = r.data;
    console.log(d)
  })
  if (tam_code !== "tam") {
    // map.setView([13.305567, 101.383101], 6);
    RemoveLayers();
    axios.get(`${urleg}/eec-api/get-bound/tam/${tam_code}`).then(async (r) => {
      let geojson = await JSON.parse(r.data.data[0].geom);
      // console.log(geojson);
      let a = L.geoJSON(geojson, {
        style: boundStyle,
        name: "bnd"
      }).addTo(map);
      map.fitBounds(a.getBounds());
    })
  } else {
    RemoveLayers();
    axios.get(`${urleg}/eec-api/get-bound/amp/${amp_code}`).then(async (r) => {
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


