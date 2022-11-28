// const urleg = "https://engrids.soc.cmu.ac.th/api";
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
    location.href = "./../login/index.html?redirect=report";
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
        text: '',
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
    legend: {
        textStyle: {
            fontFamily: 'Prompt',
            fontSize: 14,
            color: 'black',
            fontWeight: 400
        },
        top: 'bottom'
    }
};
window.addEventListener('resize', chartSex.resize);


// chart region
var domPie = document.getElementById('chart-region');
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
        left: 'center'
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
        // bottom: 20,
        bottom: 'bottom'
    }
};
window.addEventListener('resize', chartPie.resize);

var domType = document.getElementById('chart-type');
var chartType = echarts.init(domType, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var optionType = {

    yAxis: {
        type: 'value'
    },

};

window.addEventListener('resize', chartType.resize);

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
        text: '',
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

// chart Edu
var domEdu = document.getElementById('chart-edu');
var chartEdu = echarts.init(domEdu, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var optionEdu = {
    title: {
        textStyle: {
            fontFamily: 'Prompt',
            fontSize: 24,
            color: 'black',
            fontWeight: 600
        },
        // text: 'ข้อมูลคนพิการXX',
        left: 'center'
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
        // bottom: 20,
        bottom: 'bottom'
    }
};
window.addEventListener('resize', chartEdu.resize);

// chart Occ
var domOcc = document.getElementById('chart-occ');
var chartOcc = echarts.init(domOcc, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var optionOcc = {
    title: {
        textStyle: {
            fontFamily: 'Prompt',
            fontSize: 24,
            color: 'black',
            fontWeight: 600
        },
        // text: 'ข้อมูลคนพิการXX',
        left: 'center'
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
        // bottom: 20,
        bottom: 'bottom'
    }
};
window.addEventListener('resize', chartOcc.resize);


async function showSex(arr) {
    // console.log(arr);
    optionSex.series = [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold',
                    fontFamily: 'Prompt'
                }
            },
            labelLine: {
                show: false
            },
            data: arr.map(x => ({ value: x.VALUE, name: x.NAME == "M" ? "ผู้ชาย" : "ผู้หญิง" }))
        }
    ]

    if (optionSex && typeof optionSex === 'object') {
        chartSex.setOption(optionSex);
    }
}


function showRegion(arr) {
    optionPie.series = [
        {
            name: 'รายละเอียด',
            type: 'pie',

            center: ['50%', '50%'],
            selectedMode: 'single',
            // radius: '50%',
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
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
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


function showType(arr) {
    // console.log();

    optionType.xAxis = {
        type: 'category',
        data: Object.keys(arr[0])
    },
        optionType.series = [
            {
                data: Object.values(arr[0]),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    if (optionType && typeof optionType === 'object') {
        chartType.setOption(optionType);
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

function showEdu(arr) {
    optionEdu.series = [
        {
            name: 'รายละเอียด',
            type: 'pie',

            center: ['50%', '50%'],
            selectedMode: 'single',
            // radius: '50%',
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
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            labelLine: {
                show: false
            },
            data: arr.map(x => ({ value: x.value, name: x.name }))
        }
    ]
    if (optionEdu && typeof optionEdu === 'object') {
        chartEdu.setOption(optionEdu);
    }
}

function showOcc(arr) {
    optionOcc.series = [
        {
            name: 'รายละเอียด',
            type: 'pie',

            center: ['50%', '50%'],
            selectedMode: 'single',
            // radius: '50%',
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
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            labelLine: {
                show: false
            },
            data: arr.map(x => ({ value: x.value, name: x.name }))
        }
    ]
    if (optionOcc && typeof optionOcc === 'object') {
        chartOcc.setOption(optionOcc);
    }
}

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let getData = () => {
    let dtxt = document.getElementById("dtxt").value

    axios.post(`${url}/api_report/get_by_region`, { address_code: "02", privilege: "00", dtxt }).then(async (r) => {
        showRegion(r.data)
    })

    axios.post(`${url}/api_report/get_by_sex`, { address_code: "02", privilege: "00", dtxt }).then(async (r) => {
        showSex(r.data)

        document.getElementById("total").innerHTML = numberWithCommas(r.data[0].VALUE + r.data[1].VALUE)
        document.getElementById("m").innerHTML = numberWithCommas(r.data[0].VALUE)
        document.getElementById("f").innerHTML = numberWithCommas(r.data[1].VALUE)
    })

    axios.post(`${url}/api_report/get_by_type`, { address_code: "02", privilege: "00", dtxt }).then(async (r) => {
        showType(r.data)
    })

    axios.post(`${url}/api_report/get_by_agetype`, { address_code: "02", privilege: "00", dtxt }).then(async (r) => {
        showAgeType(r.data)
        // console.log(r.data);
    })

    axios.post(`${url}/api_report/get_by_edu`, { address_code: "02", privilege: "00", dtxt }).then(async (r) => {
        let a = [];
        for (const [key, value] of Object.entries(r.data[0])) {
            key == "HIG" ? a.push({ value: value, name: 'สูงกว่าปริญญาตรี' }) : null
            key == "MID" ? a.push({ value: value, name: 'ปริญญาตรีหรือเทียบเท่า' }) : null
            key == "LOW" ? a.push({ value: value, name: 'ต่ำกว่าปริญญาตรี' }) : null
            key == "OTH" ? a.push({ value: value, name: 'อื่นๆ' }) : null
        }
        showEdu(a)
    })

    axios.post(`${url}/api_report/get_by_occ`, { address_code: "02", privilege: "00", dtxt }).then(async (r) => {
        let a = [];
        for (const [key, value] of Object.entries(r.data[0])) {
            key == "OCC_001" ? a.push({ value: value, name: 'รับราชการ' }) : null
            key == "OCC_002" ? a.push({ value: value, name: 'รัฐวิสาหกิจ' }) : null
            key == "OCC_003" ? a.push({ value: value, name: 'รับจ้าง' }) : null
            key == "OCC_004" ? a.push({ value: value, name: 'กิจการส่วนตัว/อาชีพอิสระ/ค้าขาย' }) : null
            key == "OCC_005" ? a.push({ value: value, name: 'กำลังศึกษา' }) : null
            key == "OCC_006" ? a.push({ value: value, name: 'เกษตรกรรม' }) : null
            key == "OCC_007" ? a.push({ value: value, name: 'คอมพิวเตอร์' }) : null
            key == "OCC_008" ? a.push({ value: value, name: 'นวดแผนโบราณ' }) : null
            key == "OCC_010" ? a.push({ value: value, name: 'ค้าขาย' }) : null
            key == "OCC_011" ? a.push({ value: value, name: 'ค้าสลาก' }) : null
            key == "OCC_012" ? a.push({ value: value, name: 'พนักงานบริษัท' }) : null
            // key=="OCC_013"? a.push({ value: value, name: 'ไม่ระบุอาชีพ' }): null
            key == "OCC_014" ? a.push({ value: value, name: 'ลูกจ้าง' }) : null
            key == "OCC_015" ? a.push({ value: value, name: 'ไม่ได้ประกอบอาชีพ' }) : null
            key == "OCC_016" ? a.push({ value: value, name: 'ลูกจ้างเอกชน' }) : null
            key == "OCC_017" ? a.push({ value: value, name: 'ผู้ประกอบกิจการส่วนตัว/อาชีพอิสระ/ธุรกิจ' }) : null
            key == "OCC_019" ? a.push({ value: value, name: 'รับราชการ/รัฐวิสาหกิจ' }) : null
            key == "OCC_020" ? a.push({ value: value, name: 'หัตถกรรม' }) : null
            key == "OCC_999" || key == "OCC_013" ? a.push({ value: value, name: 'อื่นๆ' }) : null
        }
        console.log(a);
        showOcc(a)
    })
}

getData()




