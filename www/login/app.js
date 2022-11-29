// var url = 'http://localhost:3000'
var url_string = window.location;
var url = new URL(url_string);
var redirect = url.searchParams.get("redirect");

redirect == '' ? redirect : "dashboards";

let register = () => {
  location.href = "./../register/index.html";
}

let setCookie = (cvalue, gid, auth, usrname, exmins) => {
  const d = new Date();
  d.setTime(d.getTime() + (exmins * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = "dis_ustoken=" + cvalue + ";" + expires + ";path=/";
  document.cookie = "dis_gid=" + gid + ";" + expires + ";path=/";
  document.cookie = "dis_auth=" + auth + ";" + expires + ";path=/";
  document.cookie = "dis_usrname=" + usrname + ";" + expires + ";path=/";
}

let login = async () => {
  let usrname = document.getElementById('usrname').value;
  let pass = document.getElementById('pass').value;

  if (pass && usrname) {
    axios.post('/dis-auth/getuser', { usrname, pass }).then(r => {
      console.log(r.data.data);
      if (r.data.data !== "invalid") {
        setCookie(r.data.data, r.data.gid, r.data.auth, r.data.usrname, 1)
        document.getElementById('notice').innerHTML = `ยืนยันตัวตนสำเร็จกำลังพาท่านเข้าสู้หน้า dashboard`;
        setTimeout(() => {
          location.href = "./../" + redirect + "/index.html";
          // console.log(r.data.data, r.data.gid, r.data.auth, r.data.usrname);
        }, 1000)
      } else {
        document.getElementById('notice').innerHTML = `ชื่อหรือรหัสผ่านไม่ถูกต้อง`;
      }
    })
  } else {
    document.getElementById('notice').innerHTML = `กรุณาใส่ชื่อและรหัสผ่าน`;
  }

}