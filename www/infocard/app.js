const url = "http://192.168.3.110:3000";
// const url = "http://localhost:3000";

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
  let dtArr = dtDat.split("/")
  let dtTh = `${dtArr[0]}-${dtArr[1]}-${Number(dtArr[2]) + 543}`

  if (service_code == "CRD_RENEW") {
    loadTable(service_code2, dtTh)
  } else {
    loadTable(service_code, dtTh)
  }
}

let loadTable = (service_code, dtTh) => {
  let table = $('#datatable').dataTable({
    ajax: {
      url: url + '/api/card_info',
      type: 'POST',
      data: { service_code, dtTh },
      dataSrc: 'data'
    },
    columns: [
      { data: 'REQUEST_SERVICE_CODE' },
      { data: 'REQUEST_DATE' },
      { data: 'CARD_ISSUE_DATE' },
      { data: 'CARD_EXPIRE_DATE' },
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



