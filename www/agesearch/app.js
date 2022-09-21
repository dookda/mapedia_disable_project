// const url = "http://192.168.3.110:3000";
const url = "http://localhost:3000";

$(function () {
  $('#txtDate').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: "linked",
    clearBtn: true,
    language: 'th-th',
    autoclose: true
  });
});

let getData = () => {
  $("#datatable").dataTable().fnDestroy();
  let age_start = document.getElementById("age_start").value
  let age_end = document.getElementById("age_end").value
  let dtDat = document.getElementById("txtDate").value
  let dtArr = dtDat.split("/")
  let yyyy = `${Number(dtArr[2])}`
  console.log(yyyy);
  loadData(yyyy, age_start, age_end)
}

let loadData = (year, age_start, age_end) => {
  // console.log(yyyy, age_start, age_end);
  axios.post('/api/get_by_age', { address_code: '01', privilege: '00', year, age_start, age_end }).then(r => {
    console.log(r);
  })
}

let addZoro = (d) => {
  return d < 10 ? '0' + d : String(d)
}

const date = new Date();
let yyyy = date.getFullYear();
let mm = date.getMonth()
let dd = date.getDate()

// yyyy2 = String(yyyy + 543)
mm = addZoro(mm)
dd = addZoro(dd)


$("#txtDate").val(`${dd}/${mm}/${yyyy}`)



