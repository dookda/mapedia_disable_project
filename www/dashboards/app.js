const urleg = "https://engrids.soc.cmu.ac.th/api";
// const urleec = "https://eec-onep.online/api";
const url = "http://192.168.3.110:3000";

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
var dom1 = document.getElementById('chartdiv1');
var myChart1 = echarts.init(dom1, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app1 = {};

var option1;

option1 = {
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
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
};

if (option1 && typeof option1 === 'object') {
  myChart1.setOption(option1);
}

window.addEventListener('resize', myChart1.resize);

// chart2
var dom2 = document.getElementById('chartdiv2');
var myChart2 = echarts.init(dom2, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app2 = {};

var option2;

option2 = {
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
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
};

if (option2 && typeof option2 === 'object') {
  myChart2.setOption(option2);
}

window.addEventListener('resize', myChart2.resize);

/// DOM 
async function showByAddress(arr) {
  let series = arr.map(x => ({ value: x.CNT, category: x.REGION_NAME_THAI }))
  await console.log(series);
  await seriesRegion.data.setAll(series);
  await seriesRegion.appear(1000, 100);
}

async function showBySex(arr) {
  let series = await arr.map(x => ({ europe: x.F, namerica: x.M, year: x.REGION_NAME_THAI }))
  await console.log(series);

}

function selectAddress(ad_code) {
  axios.post(`${url}/api/get_by_region`, { address_code: ad_code }).then(async (r) => {
    var d = r.data;
    console.log(d);
    $('#region').empty().append(`<option value="tam">ทุกภาค</option>`);
    await d.map(i => $('#region').append(`<option value="${i.REGION_CODE}">${i.REGION_NAME_THAI}</option>`))

    let series = await d.filter(i => i.REGION_CODE != null)
    showByAddress(series)
    showBySex(series)
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


