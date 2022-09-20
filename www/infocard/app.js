const url = "http://192.168.3.110:3000";


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
  if ($("#disabilitycard").val() == "total") {
    $("#disabilitycard").show();
    $("#reason").hide();
  }
  else if ($("#disabilitycard").val() == "firstcard") {
    $("#disabilitycard").show();
    $("#reason").hide();
  }
  else if ($("#disabilitycard").val() == "expirecard") {
    $("#disabilitycard").show();
    $("#reason").hide();
  }
  else if ($("#disabilitycard").val() == "newcard") {
    $("#disabilitycard").show();
    $("#reason").show();
  } else {
  }
})

$("#disabilitycard").show()
$("#reason").hide()


let getData = () => {
  $("#datatable").dataTable().fnDestroy();
  let service_code = document.getElementById("disabilitycard").value
  let dtDat = document.getElementById("txtDate").value
  let dtArr = dtDat.split("/")
  // let dtTh = `${dtArr[0]}-${dtArr[1]}-${Number(dtArr[2]) + 543}`
  let dtTh = `${dtArr[0]}-${dtArr[1]}-${Number(dtArr[2])}`

  console.log(service_code)
  console.log(dtTh)
  console.log(dtArr)

  loadTable(service_code, dtTh)
}

let loadTable = (service_code, dtTh) => {
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
  let table = $('#datatable').dataTable({
    ajax: {
      url: url + '/api/card_info',
      type: 'POST',
      data: { service_code, dtTh },
      dataSrc: 'data'
    },
    columns: [
      { data: 'REQUEST_DATE' },
      { data: 'ISSUE_DATE' },
      { data: 'REQUEST_FIRST_NAME' },
      { data: 'REQUEST_LAST_NAME' },
      { data: 'PROVINCE_NAME' },
      { data: 'DISTRICT_NAME' },
      { data: 'SUBDISTRICT_NAME' },
    ]
  });
}

// loadTable("CRD_NEW", "20-09-2565")
// const dataTableSearch = new simpleDatatables.DataTable("#datatable", {
//   searchable: true,
//   fixedHeight: true
// });



