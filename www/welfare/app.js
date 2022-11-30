const url = "https://engrids.soc.cmu.ac.th/api";


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
  location.href = "./../login/index.html?redirect=welfare";
}

// let gotoProfile = () => {
//   location.href = "./../../form_authen/profile/index.html";
// }

let logOut = () => {
  document.cookie = "dis_ustoken=; max-age=0; path=/;";
  document.cookie = "dis_gid=; max-age=0; path=/;";
  document.cookie = "dis_auth=; max-age=0; path=/;";
  document.cookie = "dis_usrname=; max-age=0; path=/;";
  logIn()
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


$("#checkAll").click(function () {
  $('input:checkbox').not(this).prop('checked', this.checked);
});


// $("#selectmap").click(function () {
//   $("#mapoverview").show();
//   $("#dashboardview").hide();
// })
// $("#selectdash").click(function () {
//   $("#mapoverview").hide();
//   $("#dashboardview").show();
// })
// $("#mapoverview").show()
// $("#dashboardview").hide()


"use strict";
(function () {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    if (document.getElementsByClassName('main-content')[0]) {
      var mainpanel = document.querySelector('.main-content');
      var ps = new PerfectScrollbar(mainpanel);
    };

    if (document.getElementsByClassName('sidenav')[0]) {
      var sidebar = document.querySelector('.sidenav');
      var ps1 = new PerfectScrollbar(sidebar);
    };

    if (document.getElementsByClassName('navbar-collapse')[0]) {
      var fixedplugin = document.querySelector('.navbar:not(.navbar-expand-lg) .navbar-collapse');
      var ps2 = new PerfectScrollbar(fixedplugin);
    };

    if (document.getElementsByClassName('fixed-plugin')[0]) {
      var fixedplugin = document.querySelector('.fixed-plugin');
      var ps3 = new PerfectScrollbar(fixedplugin);
    };
  };
})();

// Verify navbar blur on scroll
if (document.getElementById('navbarBlur')) {
  navbarBlurOnScroll('navbarBlur');
}

// initialization of Popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

// initialization of Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// initialization of Toasts
document.addEventListener("DOMContentLoaded", function () {
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));

  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });

  var toastButtonList = [].slice.call(document.querySelectorAll(".toast-btn"));

  toastButtonList.map(function (toastButtonEl) {
    toastButtonEl.addEventListener("click", function () {
      var toastToTrigger = document.getElementById(toastButtonEl.dataset.target);

      if (toastToTrigger) {
        var toast = bootstrap.Toast.getInstance(toastToTrigger);
        toast.show();
      }
    });
  });
});

//Set Sidebar Color
function sidebarColor(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-color");

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');
  sidebar.setAttribute("data-color", color);

  if (document.querySelector('#sidenavCard')) {
    var sidenavCard = document.querySelector('#sidenavCard');
    let sidenavCardClasses = ['card', 'card-background', 'shadow-none', 'card-background-mask-' + color];
    sidenavCard.className = '';
    sidenavCard.classList.add(...sidenavCardClasses);

    var sidenavCardIcon = document.querySelector('#sidenavCardIcon');
    let sidenavCardIconClasses = ['ni', 'ni-diamond', 'text-gradient', 'text-lg', 'top-0', 'text-' + color];
    sidenavCardIcon.className = '';
    sidenavCardIcon.classList.add(...sidenavCardIconClasses);
  }
}

//Set Sidebar Type
function sidebarType(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-class");
  var bodyWhite = document.querySelector("body:not(.dark-version)");
  var bodyDark = body.classList.contains('dark-version');

  var colors = [];

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
    colors.push(parent[i].getAttribute('data-class'));
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');

  for (var i = 0; i < colors.length; i++) {
    sidebar.classList.remove(colors[i]);
  }

  sidebar.classList.add(color);


  // Remove text-white/text-dark classes
  if (color == 'bg-white') {
    var textWhites = document.querySelectorAll('.sidenav .text-white');
    for (let i = 0; i < textWhites.length; i++) {
      textWhites[i].classList.remove('text-white');
      textWhites[i].classList.add('text-dark');
    }
  } else {
    var textDarks = document.querySelectorAll('.sidenav .text-dark');
    for (let i = 0; i < textDarks.length; i++) {
      textDarks[i].classList.add('text-white');
      textDarks[i].classList.remove('text-dark');
    }
  }

  if (color == 'bg-default' && bodyDark) {
    var textDarks = document.querySelectorAll('.navbar-brand .text-dark');
    for (let i = 0; i < textDarks.length; i++) {
      textDarks[i].classList.add('text-white');
      textDarks[i].classList.remove('text-dark');
    }
  }

  // Remove logo-white/logo-dark

  if ((color == 'bg-white') && bodyWhite) {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;

    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
  } else {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;
    if (navbarBrandImg.includes('logo-ct-dark.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct-dark", "logo-ct");
      navbarBrand.src = navbarBrandImgNew;
    }
  }

  if (color == 'bg-white' && bodyDark) {
    var navbarBrand = document.querySelector('.navbar-brand-img');
    var navbarBrandImg = navbarBrand.src;

    if (navbarBrandImg.includes('logo-ct.png')) {
      var navbarBrandImgNew = navbarBrandImg.replace("logo-ct", "logo-ct-dark");
      navbarBrand.src = navbarBrandImgNew;
    }
  }
}

// Set Navbar Fixed
function navbarFixed(el) {
  let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  const navbar = document.getElementById('navbarBlur');

  if (!el.getAttribute("checked")) {
    toggleNavLinksColor('blur');
    navbar.classList.add(...classes);
    navbar.setAttribute('data-scroll', 'true');
    navbarBlurOnScroll('navbarBlur');
    el.setAttribute("checked", "true");
  } else {
    toggleNavLinksColor('transparent');
    navbar.classList.remove(...classes);
    navbar.setAttribute('data-scroll', 'false');
    navbarBlurOnScroll('navbarBlur');
    el.removeAttribute("checked");
  }
};

// Set Navbar Minimized
function navbarMinimize(el) {
  var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];

  if (!el.getAttribute("checked")) {
    sidenavShow.classList.remove('g-sidenav-pinned');
    sidenavShow.classList.add('g-sidenav-hidden');
    el.setAttribute("checked", "true");
  } else {
    sidenavShow.classList.remove('g-sidenav-hidden');
    sidenavShow.classList.add('g-sidenav-pinned');
    el.removeAttribute("checked");
  }
}

function toggleNavLinksColor(type) {
  let navLinks = document.querySelectorAll('.navbar-main .nav-link')
  let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

  if (type === "blur") {
    navLinks.forEach(element => {
      element.classList.remove('text-body')
    });

    navLinksToggler.forEach(element => {
      element.classList.add('bg-dark')
    });
  } else if (type === "transparent") {
    navLinks.forEach(element => {
      element.classList.add('text-body')
    });

    navLinksToggler.forEach(element => {
      element.classList.remove('bg-dark')
    });
  }
}

// Navbar blur on scroll
function navbarBlurOnScroll(id) {
  const navbar = document.getElementById(id);
  let navbarScrollActive = navbar ? navbar.getAttribute("data-scroll") : false;
  let scrollDistance = 5;
  let classes = ['blur', 'shadow-blur', 'left-auto'];
  let toggleClasses = ['shadow-none'];

  if (window.scrollY > scrollDistance) {
    blurNavbar();
  } else {
    transparentNavbar();
  }

  if (navbarScrollActive == 'true') {
    window.onscroll = debounce(function () {
      if (window.scrollY > scrollDistance) {
        blurNavbar();
      } else {
        transparentNavbar();
      }
    }, 10);
  } else {
    window.onscroll = debounce(function () {
      transparentNavbar();
    }, 10);
  }

  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    var content = document.querySelector('.main-content');
    if (navbarScrollActive == 'true') {
      content.addEventListener('ps-scroll-y', debounce(function () {
        if (content.scrollTop > scrollDistance) {
          blurNavbar();
        } else {
          transparentNavbar();
        }
      }, 10));
    } else {
      content.addEventListener('ps-scroll-y', debounce(function () {
        transparentNavbar();
      }, 10));
    }
  }

  function blurNavbar() {
    navbar.classList.add(...classes)
    navbar.classList.remove(...toggleClasses)

    toggleNavLinksColor('blur');
  }

  function transparentNavbar() {
    navbar.classList.remove(...classes)
    navbar.classList.add(...toggleClasses)

    toggleNavLinksColor('transparent');
  }
}

// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Tabs navigation

var total = document.querySelectorAll('.nav-pills');

function initNavs() {

  total.forEach(function (item, i) {
    var moving_div = document.createElement('div');
    var first_li = item.querySelector('li:first-child .nav-link');
    var tab = first_li.cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);
    item.appendChild(moving_div);

    var list_length = item.getElementsByTagName("li").length;

    moving_div.style.padding = '0px';
    moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
    moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
    moving_div.style.transition = '.5s ease';

    item.onmouseover = function (event) {
      let target = getEventTarget(event);
      let li = target.closest('li'); // get reference
      if (li) {
        let nodes = Array.from(li.closest('ul').children); // get array
        let index = nodes.indexOf(li) + 1;
        item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function () {
          moving_div = item.querySelector('.moving-tab');
          let sum = 0;
          if (item.classList.contains('flex-column')) {
            for (var j = 1; j <= nodes.indexOf(li); j++) {
              sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
            }
            moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
            moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
          } else {
            for (var j = 1; j <= nodes.indexOf(li); j++) {
              sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
            }
            moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
            moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
          }
        }
      }
    }

    if (window.innerWidth < 991) {
      total.forEach(function (item, i) {
        if (!item.classList.contains('flex-column')) {
          item.classList.remove('flex-row');
          item.classList.add('flex-column', 'on-resize');
          let li = item.querySelector(".nav-link.active").parentElement;
          let nodes = Array.from(li.closest('ul').children); // get array
          let index = nodes.indexOf(li) + 1;
          let sum = 0;
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
          }
          var moving_div = document.querySelector('.moving-tab');
          moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
          moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        }
      });
    }
  });
}

setTimeout(function () {
  initNavs();
}, 100);

// Tabs navigation resize

window.addEventListener('resize', function (event) {
  total.forEach(function (item, i) {
    item.querySelector('.moving-tab').remove();
    var moving_div = document.createElement('div');
    var tab = item.querySelector(".nav-link.active").cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);

    item.appendChild(moving_div);

    moving_div.style.padding = '0px';
    moving_div.style.transition = '.5s ease';

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains('flex-column')) {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
      } else {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

      }
    }
  });

  if (window.innerWidth < 991) {
    total.forEach(function (item, i) {
      if (!item.classList.contains('flex-column')) {
        item.classList.remove('flex-row');
        item.classList.add('flex-column', 'on-resize');
        let li = item.querySelector(".nav-link.active").parentElement;
        let nodes = Array.from(li.closest('ul').children); // get array
        let index = nodes.indexOf(li) + 1;
        let sum = 0;
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        var moving_div = document.querySelector('.moving-tab');
        moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';

      }
    });
  } else {
    total.forEach(function (item, i) {
      if (item.classList.contains('on-resize')) {
        item.classList.remove('flex-column', 'on-resize');
        item.classList.add('flex-row');
        let li = item.querySelector(".nav-link.active").parentElement;
        let nodes = Array.from(li.closest('ul').children); // get array
        let index = nodes.indexOf(li) + 1;
        let sum = 0;
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        var moving_div = document.querySelector('.moving-tab');
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
      }
    })
  }
});

// Function to remove flex row on mobile devices
if (window.innerWidth < 991) {
  total.forEach(function (item, i) {
    if (item.classList.contains('flex-row')) {
      item.classList.remove('flex-row');
      item.classList.add('flex-column', 'on-resize');
    }
  });
}

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

// End tabs navigation

// click to minimize the sidebar or reverse to normal
if (document.querySelector('.sidenav-toggler')) {
  var sidenavToggler = document.getElementsByClassName('sidenav-toggler')[0];
  var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];
  var toggleNavbarMinimize = document.getElementById('navbarMinimize');

  if (sidenavShow) {
    sidenavToggler.onclick = function () {
      if (!sidenavShow.classList.contains('g-sidenav-hidden')) {
        sidenavShow.classList.remove('g-sidenav-pinned');
        sidenavShow.classList.add('g-sidenav-hidden');
        if (toggleNavbarMinimize) {
          toggleNavbarMinimize.click();
          toggleNavbarMinimize.setAttribute("checked", "true");
        }
      } else {
        sidenavShow.classList.remove('g-sidenav-hidden');
        sidenavShow.classList.add('g-sidenav-pinned');
        if (toggleNavbarMinimize) {
          toggleNavbarMinimize.click();
          toggleNavbarMinimize.removeAttribute("checked");
        }
      }
    };
  }
}


// Toggle Sidenav
const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
const iconSidenav = document.getElementById('iconSidenav');
const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function () {
      sidenav.classList.remove('bg-white');
    }, 100);
    sidenav.classList.remove('bg-transparent');

  } else {
    body.classList.add(className);
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
    iconSidenav.classList.remove('d-none');
  }
}


// let chart = () => {

am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  /**
   * Define data for each year
   */
  var chartData = {
    "ภูมิภาค": [
      { "sector": "ภาคเหนือ", "size": 6.6 },
      { "sector": "ภาคกลาง", "size": 5.6 },
      { "sector": "ภาคตะวันออกเฉียงเหนือ", "size": 4.6 },
      { "sector": "ภาคใต้", "size": 2.6 },
      { "sector": "กรุงเทพ", "size": 3.6 }]
  };

  // Create chart instance
  var chart = am4core.create("chartdiv1", am4charts.PieChart);

  // Add data
  chart.data = [
    { "sector": "ภาคเหนือ", "size": 6.6 },
    { "sector": "ภาคกลาง", "size": 5.6 },
    { "sector": "ภาคตะวันออกเฉียงเหนือ", "size": 4.6 },
    { "sector": "ภาคใต้", "size": 2.6 },
    { "sector": "กรุงเทพ", "size": 3.6 }
  ];

  // Add label
  chart.innerRadius = 100;
  var label = chart.seriesContainer.createChild(am4core.Label);
  label.text = "ภูมิภาค";
  label.horizontalCenter = "middle";
  label.verticalCenter = "middle";
  label.fontSize = 50;

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "size";
  pieSeries.dataFields.category = "sector";

}); // end am4core.ready()
// }


// let chart = () => {

am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  /**
   * Define data for each year
   */
  var chartData = {
    "เพศ": [
      { "sector": "ชาย", "size": 6.6 },
      { "sector": "หญิง", "size": 5.6 },]
  };

  // Create chart instance
  var chart = am4core.create("chartdiv2", am4charts.PieChart);

  // Add data
  chart.data = [
    { "sector": "ชาย", "size": 6.6 },
    { "sector": "หญิง", "size": 5.6 }
  ];

  // Add label
  chart.innerRadius = 100;
  var label = chart.seriesContainer.createChild(am4core.Label);
  label.text = "เพศ";
  label.horizontalCenter = "middle";
  label.verticalCenter = "middle";
  label.fontSize = 50;

  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "size";
  pieSeries.dataFields.category = "sector";

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  // var slice = pieSeries.slices.template;
  // slice.states.getKey("hover").properties.scale = 1;
  // slice.states.getKey("active").properties.shiftRadius = 0;

}); // end am4core.ready()
// }

// let chart2 = () => {
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create('chartdiv', am4charts.XYChart)
  chart.colors.step = 2;

  chart.legend = new am4charts.Legend()
  chart.legend.position = 'top'
  chart.legend.paddingBottom = 20
  chart.legend.labels.template.maxWidth = 95

  var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  xAxis.dataFields.category = 'category'
  xAxis.renderer.cellStartLocation = 0.1
  xAxis.renderer.cellEndLocation = 0.9
  xAxis.renderer.grid.template.location = 0;

  var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.min = 0;

  function createSeries(value, name) {
    var series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.valueY = value
    series.dataFields.categoryX = 'category'
    series.name = name

    series.events.on("hidden", arrangeColumns);
    series.events.on("shown", arrangeColumns);

    var bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.interactionsEnabled = false
    bullet.dy = 30;
    // bullet.label.text = '{valueY}'
    // bullet.label.fill = am4core.color('#ffffff')

    return series;
  }

  chart.data = [
    {
      category: '0-5 ปี',
      men: 40,
      women: 55
    },
    {
      category: '6-14 ปี',
      men: 30,
      women: 78
    },
    {
      category: '15-21 ปี',
      men: 27,
      women: 40
    },
    {
      category: '15-59 ปี',
      men: 50,
      women: 33
    },
    {
      category: '60 ปีขึ้นไป',
      men: 60,
      women: 40
    }
  ]


  createSeries('men', 'เพศชาย');
  createSeries('women', 'เพศหญิง');

  function arrangeColumns() {

    var series = chart.series.getIndex(0);

    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
    if (series.dataItems.length > 1) {
      var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
      var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
      var delta = ((x1 - x0) / chart.series.length) * w;
      if (am4core.isNumber(delta)) {
        var middle = chart.series.length / 2;

        var newIndex = 0;
        chart.series.each(function (series) {
          if (!series.isHidden && !series.isHiding) {
            series.dummyData = newIndex;
            newIndex++;
          }
          else {
            series.dummyData = chart.series.indexOf(series);
          }
        })
        var visibleCount = newIndex;
        var newMiddle = visibleCount / 2;

        chart.series.each(function (series) {
          var trueIndex = chart.series.indexOf(series);
          var newIndex = series.dummyData;

          var dx = (newIndex - trueIndex + middle - newMiddle) * delta

          series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
        })
      }
    }
  }

}); // end am4core.ready()
// }

/* Enable theme(s) */
am4core.useTheme(am4themes_animated);

/* Create the chart */
var chart = am4core.create("chartdiv3", am4charts.XYChart);

/* Set data */
chart.data = [{
  "category": "ได้รับสิทธิสวัสดิการแห่งรัฐ",
  "men": 200,
  "women": 255
}, {
  "category": "ไม่ได้รับสิทธิสวัสดิการแห่งรัฐ",
  "men": 211,
  "women": 153
}];


/* Add legend */
chart.legend = new am4charts.Legend();

/* Make automatic colors more distinctive by increasing steps */
chart.colors.step = 2;

/* Add category axis */
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
// categoryAxis.title.text = "ช่วงอายุ (ปี)";


/* Add value axis */
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.title.text = "จำนวนคนพิการ (คน)";

/* Add column series */
var series1 = chart.series.push(new am4charts.ColumnSeries());
series1.tooltipText = "{name}: {valueY.value}";
series1.name = "เพศชาย";
series1.dataFields.categoryX = "category";
series1.dataFields.valueY = "men";

/* Add line series */
var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.tooltipText = "{name}: {valueY.value}";
series2.name = "เพศหญิง";
series2.dataFields.categoryX = "category";
series2.dataFields.valueY = "women";

/* Add chart cursor */
chart.cursor = new am4charts.XYCursor();
// chart.cursor.xAxis = categoryAxis;
// chart.cursor.fullWidthLineX = true;
// chart.cursor.lineX.strokeWidth = 0;
// chart.cursor.lineX.fill = am4core.color("#8F3985");
// chart.cursor.lineX.fillOpacity = 0.1;