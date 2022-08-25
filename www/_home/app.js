const url = "https://engrids.soc.cmu.ac.th/api";
const urleec = "https://eec-onep.online/api";
// const url = 'http://localhost:3700';
const eacGeoserver = "https://engrids.soc.cmu.ac.th/geoserver";
const eecGeoserverWMS = "https://engrids.soc.cmu.ac.th/geoserver/eac/wms?";

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

var map = L.map('map', {
    center: latlng,
    zoom: 6
});


var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    lyr: 'basemap'
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});

const CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eac/wms?", {
    layers: "eac:tam_eac",
    format: "image/png",
    transparent: true,
    name: "lyr",
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eac/wms?", {
    layers: "eac:amp_eac",
    format: "image/png",
    transparent: true,
    name: "lyr",
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eac/wms?", {
    layers: "eac:prov_eac",
    format: "image/png",
    transparent: true,
    name: "lyr",
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

// var baseMap = {
//     "Mapbox": mapbox,
//     "google Hybrid": ghyb,
//     "แผนที่ CartoDB": CartoDB_Positron ,
// }
// var overlayMap = {
//     "ขอบเขตจังหวัด": pro.addTo(map),
//     "ขอบเขตอำเภอ": amp,
//     "ขอบเขตตำบล": tam,
// }

// const lyrControl = L.control.layers(baseMap, overlayMap, {
//     collapsed: true
// }).addTo(map);

let base = {
    ghyb: ghyb,
    CartoDB_Positron: CartoDB_Positron,
    Mapbox: mapbox .addTo(map),

}

let lyr = {
    tam: tam,
    amp: amp,
    pro: pro.addTo(map),
}

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
    console.log($(this).attr('value'))
    let basemap = $(this).attr('value')
    base[`${basemap}`].addTo(map);

    // $(this).removeClass("basemap-style").addClass("basemap-style-active");
})

let getpro = () => {
    // const url = "https://engrids.soc.cmu.ac.th/api";
    // var url = "http://localhost:3000";
    axios.get(url + `/th/province`).then(async (r) => {
        var d = r.data.data;
        d.map(i => {
            $('#pro').append(`<option value="${i.pv_code}">${i.pv_tn}</option>`)
        })
    })
}
getpro()

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

$('#pro').val()

let prov_n = "", prov_c = "", amp_n = "", amp_c = "", tam_n = "", tam_c = "";
$('#pro').on('change', function () {
    var code = $('#pro').val()
    // console.log(code)
    // var url = "http://localhost:3000";
    axios.post(url + `/th/amphoe`, { pv_code: code }).then(async (r) => {
        var d = r.data.data;
        $("#amp").empty().append(`<option value="amp">ทุกอำเภอ</option>`);;
        $("#tam").empty().append(`<option value="tam">ทุกตำบล</option>`);;
        d.map(i => {
            $('#amp').append(`<option value="${i.ap_idn}">${i.ap_tn}</option>`)
        })
        amp_n = d[0].ap_tn
        amp_c = d[0].ap_idn
    })
    prov_n = $('#pro').children("option:selected").text()
    prov_c = $('#pro').children("option:selected").val()
    if (prov_c == "TH") {
        // table.search('').draw();
        $('#num_list_name').html(`ทั้งหมด`);
        $('#area_list_name').html(`ทั้งหมด`);
        map.setView([13.305567, 101.383101], 6);
        RemoveLayers();
    } else {
        // table.search(prov_n).draw();
        $('#num_list_name').html(`ของ จ.${prov_n}`);
        $('#area_list_name').html(`ของ จ.${prov_n}`);
        RemoveLayers();
        axios.get(`${url}/eec-api/get-bound/pro/${code}`).then(async (r) => {
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
$('#amp').on('change', function () {
    var code = $('#amp').val()
    // console.log(code)
    // var url = "http://localhost:3000";
    axios.post(url + `/th/tambon`, { ap_idn: code }).then(async (r) => {
        var d = r.data.data;
        $("#tam").empty().append(`<option value="tam">ทุกตำบล</option>`);
        d.map(i => {
            $('#tam').append(`<option value="${i.tb_idn}">${i.tb_tn}</option>`)
        })
        tam_n = d[0].tb_tn
        tam_c = d[0].tb_idn
    })
    amp_n = $('#amp').children("option:selected").text()
    amp_c = $('#amp').children("option:selected").val()
    if (amp_c !== "amp") {
        // table.search(amp_n).draw();
        $('#num_list_name').html(`ของ อ.${amp_n}`);
        $('#area_list_name').html(`ของ อ.${amp_n}`);

        RemoveLayers();
        axios.get(`${url}/eec-api/get-bound/amp/${amp_c}`).then(async (r) => {
            let geojson = await JSON.parse(r.data.data[0].geom);
            // console.log(geojson);
            let a = L.geoJSON(geojson, {
                style: boundStyle,
                name: "bnd"
            }).addTo(map);
            map.fitBounds(a.getBounds());
        })

    } else {
        // table.search(prov_n).draw();
        $('#num_list_name').html(`ของ จ.${prov_n}`);
        $('#area_list_name').html(`ของ จ.${prov_n}`);
        RemoveLayers();
        axios.get(`${url}/eec-api/get-bound/pro/${prov_c}`).then(async (r) => {
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
$('#tam').on('change', function () {
    tam_n = $('#tam').children("option:selected").text()
    tam_c = $('#tam').children("option:selected").val()
    if (tam_c !== "tam") {
        // table.search(tam_n).draw();
        $('#num_list_name').html(`ของ ต.${tam_n}`);
        $('#area_list_name').html(`ของ ต.${tam_n}`);
        RemoveLayers();
        axios.get(`${url}/eec-api/get-bound/tam/${tam_c}`).then(async (r) => {
            let geojson = await JSON.parse(r.data.data[0].geom);
            // console.log(geojson);
            let a = L.geoJSON(geojson, {
                style: boundStyle,
                name: "bnd"
            }).addTo(map);
            map.fitBounds(a.getBounds());
        })
    } else {
        // table.search(amp_n).draw();
        $('#num_list_name').html(`ของ อ.${amp_n}`);
        $('#area_list_name').html(`ของ อ.${amp_n}`);

        RemoveLayers();
        axios.get(`${url}/eec-api/get-bound/amp/${amp_c}`).then(async (r) => {
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


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

$("#checkAll").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});





