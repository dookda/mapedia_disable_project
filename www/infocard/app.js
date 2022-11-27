const url = "http://192.168.3.110:3000";
// const url = "http://localhost:3000";


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
// });

$("#disabilitycard").on('change', function () {
  if ($("#disabilitycard").val() == "CRD_NEW") {
    $("#disabilitycard").show();
    $("#reason").hide();
  } else if ($("#disabilitycard").val() == "CRD_EXP") {
    $("#disabilitycard").show();
    $("#reason").hide();
  } else if ($("#disabilitycard").val() == "CRD_RENEW") {
    $("#disabilitycard").show();
    $("#reason").show();
  }
})

$("#disabilitycard").show()
$("#reason").hide()


let getData = () => {
  $("#datatable").dataTable().fnDestroy();
  let service_code = document.getElementById("disabilitycard").value
  let service_code2 = document.getElementById("disabilitycard2").value
  let dtDat = document.getElementById("txtDate").value
  let procode = document.getElementById("procode").value
  let dtArr = dtDat.split("/")
  // let dtTh = `${dtArr[0]}-${dtArr[1]}-${Number(dtArr[2]) + 543}`
  let dtTh = `${dtArr[0]}-${dtArr[1]}-${Number(dtArr[2])}`

  // console.log(service_code)
  // console.log(dtTh)
  // console.log(dtArr)

  if (service_code == "CRD_RENEW") {
    loadTable(service_code2, dtTh, procode)
  } else {
    loadTable(service_code, dtTh, procode)
  }
}

axios.post(`${url}/api/getallprov`).then(async (r) => {
  $('#procode').empty()
  let objArr = r.data.sort((a, b) => a.PROVINCE_NAME.localeCompare(b.PROVINCE_NAME))
  $('#procode').append(`<option value="">ทุกจังหวัด</option>`)
  objArr.map(i => {
    $('#procode').append(`<option value="${i.PROVINCE_CODE}">${i.PROVINCE_NAME}</option>`)
  })
})

var table;
let loadTable = (service_code, dtTh, procode) => {
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

  table = $('#datatable').DataTable({
    ajax: {
      url: url + '/api/card_info',
      type: 'POST',
      data: { service_code, dtTh, procode },
      dataSrc: 'data'
    },
    columns: [
      {
        data: 'REQUEST_SERVICE_CODE',
        render: function (data) {
          var a = data;
          if (a == 'CRD_NEW') {
            return '<p> ทำบัตรประจำตัวครั้งแรก </p>';
          } else if (a == 'CRD_EXP') {
            return '<p> บัตรหมดอายุ </p>';
          } else if (a == 'CRD_RENEW') {
            return '<p> ต่ออายุบัตร</p>';
          } else if (a == 'CRD_LOS') {
            return '<p> บัตรสูญหาย </p>';
          } else if (a == 'CRD_DEC') {
            return '<p> บัตรชำรุด </p>';
          } else if (a == 'CRD_EDT') {
            return '<p> แก้ไขข้อมูลสำคัญ </p>';
          } else {
            return '<p> </p>';
          }
        }
      },
      { data: 'REQUEST_DATE' },
      { data: 'CARD_ISSUE_DATE' },
      { data: 'CARD_EXPIRE_DATE' },
      { data: 'REQUEST_FIRST_NAME' },
      { data: 'REQUEST_LAST_NAME' },
      { data: 'PROVINCE_NAME' },
      { data: 'DISTRICT_NAME' },
      { data: 'SUBDISTRICT_NAME' },
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

  // table.on('search.dt', function () {
  //   let data = table.rows({ search: 'applied' }).data()
  //   console.log(data)
  // });

  // $('#pro').on('keyup change', function () {
  //   table.search('');
  //   table.columns().search('')
  //   table.column($(this).data('columnIndex')).search(this.value).draw();
  // });

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
getData()




