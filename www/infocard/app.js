
$(function () {
  $('#txtDate').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: "linked",
    clearBtn: true,
    language: 'th-th',
    autoclose: true
  });
});

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
  let dtTh = `${dtArr[0]}-${dtArr[1]}-${Number(dtArr[2]) + 543}`

  loadTable(service_code, dtTh)
}

let loadTable = (service_code, dtTh) => {
  let table = $('#datatable').dataTable({
    ajax: {
      url: '/api/card_info',
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

loadTable("CRD_NEW", "01-04-2553")
// const dataTableSearch = new simpleDatatables.DataTable("#datatable", {
//   searchable: true,
//   fixedHeight: true
// });



