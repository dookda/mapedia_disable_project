const urleg = "https://engrids.soc.cmu.ac.th/api";
const url = "http://192.168.3.110:3000";
// const url = "http://localhost:3000";


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
    maxZoom: 22,
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
  name: "base",
  maxZoom: 22,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  lyr: 'basemap',
  zIndex: 0
});

const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
  name: "base",
  maxZoom: 22,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  lyr: 'basemap',
  zIndex: 0
});

const CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  name: "base",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 22,
  lyr: 'basemap',
  zIndex: 0
});

const tam = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_tambon",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 20,
  // minZoom: 14,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_amphoe",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 18,
  // minZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_province",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 16,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2005 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2005",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2006 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2006",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2007 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2007",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2008 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2008",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2009 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2009",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2010 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2010",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2011 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2011",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2012 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2012",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2013 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2013",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2014 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2014",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_2015 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2015",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const flood_2016 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2016",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const flood_2017 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2017",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const flood_2018 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2018",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const flood_2019 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2019",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const flood_2020 = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:flood_2020",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const floodarea_tambon = L.tileLayer.wms("http://tile.gistda.or.th/geoserver/flood/wms?", {
  layers: "flood:floodarea_tambon",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 2,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const flood_freq_2005_2015_box = L.tileLayer.wms("http://tile.gistda.or.th/geoserver/flood/wms?", {
  layers: "flood:flood_freq_2005_2015_box",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 0,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const th_drought = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_drought",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 0,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const th_cultural = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_cultural",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 0,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const th_msdhslocal = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_msdhslocal",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 0,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const th_village = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_village",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 0,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const th_road = L.tileLayer.wms("http://192.168.3.110:8080/geoserver/depgis/wms?", {
  layers: "depgis:th_road",
  name: "lyr",
  format: "image/png",
  iswms: "wms",
  transparent: true,
  zIndex: 0,
  maxZoom: 22,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

// Instantiate KMZ layer (async)
const kmz = L.kmzLayer().addTo(map);
kmz.load('./wp1822.kmz');


// const baseMaps = {
//   "Mapbox": mapbox,
//   "Google Hybrid": ghyb.addTo(map)
// };

// const overlayMaps = {
//   "ขอบเขตจังหวัด": pro.addTo(map),
//   "ขอบเขตอำเภอ": amp.addTo(map),
//   "ขอบเขตตำบล": tam.addTo(map),
//   "พื้นที่น้ำท่วม 2548": flood_2005,
//   "พื้นที่น้ำท่วม 2549": flood_2006,
//   "พื้นที่น้ำท่วม 2550": flood_2007,
//   "พื้นที่น้ำท่วม 2551": flood_2008,
//   "พื้นที่น้ำท่วม 2552": flood_2009,
//   "พื้นที่น้ำท่วม 2553": flood_2010,
//   "พื้นที่น้ำท่วม 2554": flood_2011,
//   "พื้นที่น้ำท่วม 2555": flood_2012,
//   "พื้นที่น้ำท่วม 2556": flood_2013,
//   "พื้นที่น้ำท่วม 2557": flood_2014,
//   "พื้นที่น้ำท่วม 2558": flood_2015,
//   "พื้นที่น้ำท่วม 2559": flood_2016,
//   "พื้นที่น้ำท่วม 2560": flood_2017,
//   "พื้นที่น้ำท่วม 2561": flood_2018,
//   "พื้นที่น้ำท่วม 2562": flood_2019,
//   "พื้นที่น้ำท่วม 2563": flood_2020.addTo(map),
// };

let lyr = {
  flood_2005: flood_2005,
  flood_2006: flood_2006,
  flood_2007: flood_2007,
  flood_2008: flood_2008,
  flood_2009: flood_2009,
  flood_2010: flood_2010,
  flood_2011: flood_2011,
  flood_2012: flood_2012,
  flood_2013: flood_2013,
  flood_2014: flood_2014,
  flood_2015: flood_2015,
  flood_2016: flood_2016,
  flood_2017: flood_2017,
  flood_2018: flood_2018,
  flood_2019: flood_2019,
  flood_2020: flood_2020,
  floodarea_tambon: floodarea_tambon,
  flood_freq_2005_2015_box: flood_freq_2005_2015_box,
  th_drought: th_drought,
  th_cultural: th_cultural,
  th_village: th_village,
  th_msdhslocal: th_msdhslocal,
  th_road: th_road,
  kmz: kmz,
  tam: tam,
  amp: amp,
  pro: pro.addTo(map),
}

let base = {
  ghyb: ghyb.addTo(map),
  CartoDB_Positron: CartoDB_Positron,
  grod: grod,

}

// const lyrControl = L.control.layers(baseMaps, overlayMaps, {
//   collapsed: true
// }).addTo(map);

$("input[name='basemap']").change(async (r) => {
  await map.eachLayer(i => {
    // console.log(i);
    if (i.options.name == "base") {
      map.removeLayer(i)
    }
  })

  let basemap = $("input[name='basemap']:checked").val();
  base[`${basemap}`].addTo(map);
})

$(".basemap-style").on('click', async function () {
  if ($('.basemap-style').hasClass('basemap-style-active')) {
    $(".basemap-style").removeClass("basemap-style-active")
    $(this).toggleClass('basemap-style-active');
  }

  await map.eachLayer(i => {
    // console.log(i);
    if (i.options.name == "base") {
      map.removeLayer(i)
    }
  })
  // console.log($(this).attr('value'))
  let basemap = $(this).attr('value')
  base[`${basemap}`].addTo(map);

  // $(this).removeClass("basemap-style").addClass("basemap-style-active");
})

$("input[type=checkbox]").change(async () => {
  await map.eachLayer(i => {
    if (i.options.name == "lyr") {
      map.removeLayer(i)
    }
    // console.log(i);
    if (this.value == 'kmz') {
      // map.removeLayer(kmz)
    }

  })
  console.log(this.value)

  let chk = [];
  await $('input[type=checkbox]:checked').each(function () {
    chk.push($(this).val());
  });

  chk.map(i => {
    console.log(i);
    if (lyr[`${i}`]) {
      lyr[`${i}`].addTo(map);
    }
    // if (i == "kmz") {
    //   kmz.load('./wp1822.kmz');
    // }
  })

})


var legend = L.control({ position: "bottomright" });
function showLegend() {
  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    // div.innerHTML += `<div class="mt-2" onClick="hideLegend()">
    //   <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    // </div>`;
    div.innerHTML += ` <i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span></div><br>`;
    div.innerHTML += `<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>`;
    div.innerHTML += `<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>`;
    div.innerHTML += `<i style="background: #1EB0E7; border-radius: 10%; border-width: 1.5px;"></i><span>พื้นที่น้ำท่วม</span><br>`;
    // div.innerHTML += `<i style="background: #1EB0E7; border-radius: 10%;"></i>พื้นที่น้ำท่วม</label></div>`;
    div.innerHTML += `<img src=\"https://flood.gistda.or.th/iconFile/flood-multi-legend2.png\" width=\"400px\" height=\"150px\"></i>น้ำท่วมซ้ำซาก</label></div><br>`;

    div.innerHTML += `<i style="background: #ffffb2; border-radius: 10%; border-width: 1.5px;"></i><span>แล้ง 1 ครั้ง ในรอบ 6 ปี</span><br>`;
    div.innerHTML += `<i style="background: #fd8d3c; border-radius: 10%; border-width: 1.5px;"></i><span>แล้ง 2-3 ครั้ง ในรอบ 6 ปี</span><br>`;
    div.innerHTML += `<i style="background: #bd0026; border-radius: 10%; border-width: 1.5px;"></i><span>แล้งมากกว่า 4 ครั้ง ในรอบ 6 ปี</span><br>`;
    return div;
  };
  legend.addTo(map);
}
// function hideLegend() {
//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend')
//     div.innerHTML += `<div class="mt-2" onClick="showLegend()">
//         <small class="prompt"><span class="kanit" style="font-size: 14px;" >แสดงสัญลักษณ์</span></small> 
//         <i class="fa fa-angle-double-up" aria-hidden="true"></i>
//     </div>`;
//     return div;
//   };
//   legend.addTo(map);
// }
showLegend()

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

// $("#mapview").click(function () {
//   $("#showmap").show();
//   $("#showdataview").hide();
// })
// $("#dataview").click(function () {
//   $("#showmap").hide();
//   $("#showdataview").show();
// })


// $("#showmap").show()
// $("#showdataview").hide()


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


let numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function selectAddress(address_code, privilege) {
  axios.post(`${url}/api/get_by_privilege`, { address_code, privilege }).then(async (r) => {
    $('#getdata').text(`ทั้งหมด`);
    $("#distotal").text(numberWithCommas(Number(r.data[0].TOTAL)))
    $("#f_total").text(numberWithCommas(Number(r.data[0].F)))
    $("#m_total").text(numberWithCommas(Number(r.data[0].M)))
  })

  axios.post(`${url}/api/get_by_country_total`, { address_code, privilege }).then(async (r) => {
    $('#reg').empty().append(`<option value="all">เลือกภาค</option>`);
    r.data.map(i => {
      $('#reg').append(`<option value="${i.REGION_CODE}">${i.REGION_NAME_THAI}</option>`)
      showTotal(r.data)
    })
  })

  axios.post(`${url}/api/get_by_country_sex`, { address_code, privilege }).then(async (r) => {
    r.data.map(i => {
    })
    showSex(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_type`, { address_code, privilege }).then(async (r) => {
    showType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_age`, { address_code, privilege }).then(async (r) => {
    showAge(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_edu`, { address_code, privilege }).then(async (r) => {
    showEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_occ`, { address_code, privilege }).then(async (r) => {
    showOcc(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_agetype`, { address_code, privilege }).then(async (r) => {
    showAgeType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_ageedu`, { address_code, privilege }).then(async (r) => {
    showAgeEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_country_ageocc`, { address_code, privilege }).then(async (r) => {
    showAgeOcc(r.data)
    // console.log(r.data)
  })

}


function selectRegion(address_code, privilege, region_code) {
  axios.post(`${url}/api/get_by_region`, { address_code, privilege, region_code }).then(async (r) => {
    $('#getdata').text(r.data[0].REGION_NAME_THAI);
    $("#distotal").text(numberWithCommas(Number(r.data[0].TOTAL)))
    $("#f_total").text(numberWithCommas(Number(r.data[0].F)))
    $("#m_total").text(numberWithCommas(Number(r.data[0].M)))
  })

  axios.post(`${url}/api/get_by_region_total`, { address_code, privilege, region_code }).then(async (r) => {
    $('#pro').empty().append(`<option value="all">เลือกจังหวัด</option>`);
    r.data.map(i => $('#pro').append(`<option value="${i.PROVINCE_CODE}">${i.PROVINCE_NAME}</option>`))
    showTotal(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_sex`, { address_code, privilege, region_code }).then(async (r) => {
    showSex(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_type`, { address_code, privilege, region_code }).then(async (r) => {
    showType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_age`, { address_code, privilege, region_code }).then(async (r) => {
    showAge(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_edu`, { address_code, privilege, region_code }).then(async (r) => {
    showEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_occ`, { address_code, privilege, region_code }).then(async (r) => {
    showOcc(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_agetype`, { address_code, privilege, region_code }).then(async (r) => {
    showAgeType(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_ageedu`, { address_code, privilege, region_code }).then(async (r) => {
    showAgeEdu(r.data)
    // console.log(r.data)
  })

  axios.post(`${url}/api/get_by_region_ageocc`, { address_code, privilege, region_code }).then(async (r) => {
    showAgeOcc(r.data)
    // console.log(r.data)
  })

}

function selectProvince(address_code, privilege, province_code) {
  axios.post(`${url}/api/get_by_prov`, { address_code, privilege, province_code }).then(async (r) => {
    $('#getdata').html(`ของ จ. ${r.data[0].PROVINCE_NAME}`);
    $("#distotal").text(numberWithCommas(Number(r.data[0].TOTAL)))
    $("#f_total").text(numberWithCommas(Number(r.data[0].F)))
    $("#m_total").text(numberWithCommas(Number(r.data[0].M)))
  })

  axios.post(`${url}/api/get_by_province_total`, { address_code, privilege, province_code }).then(async (r) => {
    $('#amp').empty().append(`<option value="all">เลือกอำเภอ</option>`);
    r.data.map(i => $('#amp').append(`<option value="${i.AMPCODE}">${i.DISTRICT_NAME}</option>`))
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_province_sex`, { address_code, privilege, province_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_province_type`, { address_code, privilege, province_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_province_age`, { address_code, privilege, province_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_province_edu`, { address_code, privilege, province_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_province_occ`, { address_code, privilege, province_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_province_agetype`, { address_code, privilege, province_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_province_ageedu`, { address_code, privilege, province_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_province_ageocc`, { address_code, privilege, province_code }).then(async (r) => {
    showAgeOcc(r.data)
  })
}


function selectAmphoe(address_code, privilege, amphoe_code) {
  axios.post(`${url}/api/get_by_amphoe`, { address_code, privilege, amphoe_code }).then(async (r) => {
    $('#getdata').html(`ของ อ. ${r.data[0].DISTRICT_NAME}`);
    $("#distotal").text(numberWithCommas(Number(r.data[0].TOTAL)))
    $("#f_total").text(numberWithCommas(Number(r.data[0].F)))
    $("#m_total").text(numberWithCommas(Number(r.data[0].M)))
  })

  axios.post(`${url}/api/get_by_amphoe_total`, { address_code, privilege, amphoe_code }).then(async (r) => {
    $('#tam').empty().append(`<option value="all">เลือกตำบล</option>`);
    r.data.map(i => $('#tam').append(`<option value="${i.TAMCODE}">${i.SUBDISTRICT_NAME}</option>`))
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_sex`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_type`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_age`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_edu`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_occ`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_agetype`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_ageedu`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_amphoe_ageocc`, { address_code, privilege, amphoe_code }).then(async (r) => {
    showAgeOcc(r.data)
  })

}

function selectTambon(address_code, privilege, tambon_code) {
  axios.post(`${url}/api/get_by_tambon`, { address_code, privilege, tambon_code }).then(async (r) => {
    $('#getdata').html(`ของ ต. ${r.data[0].SUBDISTRICT_NAME}`);
    $("#distotal").text(numberWithCommas(Number(r.data[0].TOTAL)))
    $("#f_total").text(numberWithCommas(Number(r.data[0].F)))
    $("#m_total").text(numberWithCommas(Number(r.data[0].M)))
  })

  axios.post(`${url}/api/get_by_tambon_total`, { address_code, privilege, tambon_code }).then(async (r) => {
    showTotal(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_sex`, { address_code, privilege, tambon_code }).then(async (r) => {
    showSex(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_type`, { address_code, privilege, tambon_code }).then(async (r) => {
    showType(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_age`, { address_code, privilege, tambon_code }).then(async (r) => {
    showAge(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_edu`, { address_code, privilege, tambon_code }).then(async (r) => {
    showEdu(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_occ`, { address_code, privilege, tambon_code }).then(async (r) => {
    showOcc(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_agetype`, { address_code, privilege, tambon_code }).then(async (r) => {
    showAgeType(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_ageedu`, { address_code, privilege, tambon_code }).then(async (r) => {
    showAgeEdu(r.data)
  })

  axios.post(`${url}/api/get_by_tambon_ageocc`, { address_code, privilege, tambon_code }).then(async (r) => {
    showAgeOcc(r.data)
  })

}

function selectinfo(Category) {
  $('#infoview').empty()
  var Category = Category;
  var privilege = $('#privilege').val();
  var address_code = $('#address').val();
  var region_code = $('#reg').val();
  var province_code = $('#pro').val();
  var amphoe_code = $('#amp').val();
  var tambon_code = $('#tam').val();

  // console.log(add)
  // console.log(region)

  if (Category == "total") {
    if (privilege && address_code && region_code == "all") {
      console.log(privilege)
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_total`, { privilege, address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      console.log(privilege, address_code, region_code)
      axios.post(`${url}/api/get_by_region_total`, { privilege, address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_total`, { privilege, address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_total`, { privilege, address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_total`, { privilege, address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT} : </b> ${i.CNT} คน <br>`)
        })
      })
    }
  }
  else if (Category == "sex") {
    if (privilege && address_code && region_code == "all") {
      // console.log(privilege)
      // console.log(address_code)
      axios.post(`${url}/api/get_by_country_sex`, { privilege, address_code }).then(async (r) => {
        // console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_sex`, { privilege, address_code, region_code }).then(async (r) => {
        // console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_sex`, { privilege, address_code, province_code }).then(async (r) => {
        // console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_sex`, { privilege, address_code, amphoe_code }).then(async (r) => {
        // console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_sex`, { privilege, address_code, tambon_code }).then(async (r) => {
        // console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> เพศชาย ${i.M} คน  เพศหญิง ${i.F} คน  <br>`)
        })
      })
    }
  }
  else if (Category == "type") {
    if (privilege && address_code && region_code == "all") {
      // console.log(address_code)
      axios.post(`${url}/api/get_by_country_type`, { privilege, address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      // console.log(region_code)
      axios.post(`${url}/api/get_by_region_type`, { privilege, address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      // console.log(province_code)
      axios.post(`${url}/api/get_by_province_type`, { privilege, address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      // console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_type`, { privilege, address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      // console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_type`, { privilege, address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
  }
  else if (Category == "age") {
    if (privilege && address_code && region_code == "all") {
      // console.log(address_code)
      axios.post(`${url}/api/get_by_country_age`, { privilege, address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      // console.log(region_code)
      axios.post(`${url}/api/get_by_region_age`, { privilege, address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      // console.log(province_code)
      axios.post(`${url}/api/get_by_province_age`, { privilege, address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      // console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_age`, { privilege, address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      // console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_age`, { privilege, address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> ช่วงอายุ 0-5 ปี: ${i.AGE5} คน <br>  ช่วงอายุ 6-14 ปี: ${i.AGE14
            } คน <br> ช่วงอายุ 15-21 ปี: ${i.AGE21} คน <br> ช่วงอายุ 22-59 ปี: ${i.AGE59} คน <br> ช่วงอายุ 60 ปีขึ้นไป: ${i.AGE60} คน <br>`)
        })
      })
    }

  }
  else if (Category == "edu") {
    if (privilege && address_code && region_code == "all") {
      // console.log(address_code)
      axios.post(`${url}/api/get_by_country_edu`, { privilege, address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_edu`, { privilege, address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_edu`, { privilege, address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_edu`, { privilege, address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_edu`, { privilege, address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }

  }
  else if (Category == "occ") {
    if (privilege && address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_occ`, { privilege, address_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_occ`, { privilege, address_code, region_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_occ`, { privilege, address_code, province_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_occ`, { privilege, address_code, amphoe_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_occ`, { privilege, address_code, tambon_code }).then(async (r) => {
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
    if (privilege && address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_agetype`, { privilege, address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_agetype`, { privilege, address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_agetype`, { privilege, address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_agetype`, { privilege, address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_agetype`, { privilege, address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b> ${i.CAT}:</b> <br> ไม่มีข้อมูล: ${i.TYPE0} คน <br> ทางการเห็น: ${i.TYPE12
            } คน <br> ทางการได้ยินหรือสื่อความหมาย: ${i.TYPE13} คน <br> ทางการเคลื่อนไหวหรือทางร่างกาย: ${i.TYPE14} คน <br> ทางจิตใจหรือพฤติกรรม: ${i.TYPE15} คน <br> ทางสติปัญญา: ${i.TYPE16} คน <br> ทางการเรียนรู้: ${i.TYPE17} คน <br> ทางออทิสติก: ${i.TYPE18} คน <br>`)
        })
      })
    }

  }
  else if (Category == "ageedu") {
    if (privilege && address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_ageedu`, { privilege, address_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_ageedu`, { privilege, address_code, region_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_ageedu`, { privilege, address_code, province_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_ageedu`, { privilege, address_code, amphoe_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_ageedu`, { privilege, address_code, tambon_code }).then(async (r) => {
        console.log(r.data)
        r.data.map(i => {
          $('#infoview').append(` <b>${i.CAT}:</b> <br> สูงกว่าปริญญาตรี: ${i.HIG} คน <br>  ปริญญาตรีหรือเทียบเท่า: ${i.MID
            } คน <br> ต่ำกว่าปริญญาตรี: ${i.LOW} คน <br> อื่นๆ: ${i.OTH} คน <br>`)
        })
      })
    }

  }
  else if (Category == "ageocc") {
    if (privilege && address_code && region_code == "all") {
      console.log(address_code)
      axios.post(`${url}/api/get_by_country_ageocc`, { privilege, address_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code == "all") {
      console.log(region_code)
      axios.post(`${url}/api/get_by_region_ageocc`, { privilege, address_code, region_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code == "all") {
      console.log(province_code)
      axios.post(`${url}/api/get_by_province_ageocc`, { privilege, address_code, province_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code == "all") {
      console.log(amphoe_code)
      axios.post(`${url}/api/get_by_amphoe_ageocc`, { privilege, address_code, amphoe_code }).then(async (r) => {
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
    if (privilege && address_code && region_code !== "all" && province_code !== "all" && amphoe_code !== "all" && tambon_code !== "all") {
      console.log(tambon_code)
      axios.post(`${url}/api/get_by_tambon_ageocc`, { privilege, address_code, tambon_code }).then(async (r) => {
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
  $('#infoview').empty()
  $('#tam').empty()
  $('#amp').empty()
  $('#pro').empty()
  $('#reg').empty()
  document.getElementById("tb").style.visibility = "hidden";
  var address_code = $('#address').val()
  var privilege = $('#privilege').val()
  selectAddress(address_code, privilege)
  console.log(address_code, privilege)

  RemoveLayers();
  axios.get(`${url}/geoapi/get-bound/th/${address_code}`).then(async (r) => {
    let geojson = await JSON.parse(r.data.data[0].geom);
    // console.log(geojson);
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
  var privilege = $('#privilege').val()
  selectRegion(address_code, privilege, region_code)

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
  var privilege = $('#privilege').val()
  selectProvince(address_code, privilege, province_code)

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
  var privilege = $('#privilege').val()
  console.log(amphoe_code)
  selectAmphoe(address_code, privilege, amphoe_code)

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
  var privilege = $('#privilege').val()
  console.log(address_code, privilege, tambon_code);
  selectTambon(address_code, privilege, tambon_code)

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
  // var privilege = $('#privilege').val()
  $("#datatable-search").dataTable().fnDestroy();
  showDataTable({ tambon_code, address_code });
}

let showDataTable = async (json) => {
  $.extend(true, $.fn.dataTable.defaults, {
    "language": {
      "sProcessing": "กำลังดำเนินการ...",
      "sLengthMenu": "แสดง_MENU_ แถว",
      "sZeroRecords": "ไม่พบข้อมูล",
      "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
      "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
      "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
      "sInfoPostFix": "",
      "sSearch": "ค้นหา:",
      "sUrl": "",
      "oPaginate": {
        "sFirst": "เริ่มต้น",
        "sPrevious": "ก่อนหน้า",
        "sNext": "ถัดไป",
        "sLast": "สุดท้าย"
      },
      "emptyTable": "ไม่พบข้อมูล..."
    }
  });
  table = $('#datatable-search').DataTable({
    ajax: {
      url: url + '/api/get_tam_tb',
      type: 'POST',
      data: json,
      dataSrc: 'data'
    },
    columns: [
      {
        data: null,
        render: (data, type, row, meta) => {
          // console.log(meta)
          return `${meta.row + 1}`
        }
      },
      { data: 'MAIMAD_ID' },
      { data: 'FIRST_NAME_THAI' },
      { data: 'LAST_NAME_THAI' },
      {
        data: 'SEX_CODE',
        render: function (data) {
          var a = data;
          if (a == 'M') {
            return '<p> ชาย </p>';
          } else if (a == 'F') {
            return '<p> หญิง </p>';
          } else {
            return '<p> </p>';
          }
        }
      },
      { data: 'BIRTH_DATE' },
      { data: 'AGE_NOW' },
      { data: 'ISSUE_DATE' }
    ],
    dom: 'Bfrtip',
    buttons: [
      'excel', 'print'
    ],
    scrollX: true,
    select: true,
    pageLength: 7,
    responsive: {
      details: true
    }
  });

  table.on('search.dt', function () {
  });
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
