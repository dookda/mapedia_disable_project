var url = 'http://localhost:3000'

let insertUser = async () => {
  let usrname = document.getElementById('usrname').value;
  let pass = document.getElementById('pass').value;
  let pass2 = document.getElementById('pass2').value;

  console.log(usrname, pass, pass2);

  if (pass == pass2) {
    if (pass && usrname) {
      axios.post('/dis-auth/chkusername', { usrname }).then(r => {
        if (r.data == "yes") {
          document.getElementById('notice').innerHTML = `ชื่อนี้ถูกใช้แล้ว`;
        } else {
          axios.post('/dis-auth/insertuser', { usrname, pass }).then(res => {
            document.getElementById('notice').innerHTML = `ลงทะเบียนสำเร็จ`;
            document.getElementById('usrname').value = "";
            document.getElementById('pass').value = "";
            document.getElementById('pass2').value = "";

            setTimeout(() => {
              location.href = "./../login/index.html";
            }, 1000)
          })
        }
      })
    } else {
      document.getElementById('notice').innerHTML = `กรุณาใส่ชื่อและรหัสผ่าน`;
    }
  } else {
    document.getElementById('notice').innerHTML = `กรุณาใส่รหัสผ่านที่เหมือนกัน`;
  }
}