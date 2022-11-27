var url = 'http://localhost:3000'

let insertUser = async () => {
  let usrname = document.getElementById('usrname').value
  let pass = document.getElementById('pass').value
  let pass2 = document.getElementById('pass2').value

  if (pass == pass2) {
    axios.post('/dis-auth/chkusername', { usrname }).then(r => {
      if (r.data == "yes") {
        document.getElementById('notice').innerHTML = `ชื่อนี้ถูกใช้แล้ว`
      } else {
        axios.post('/dis-auth/insertuser', { usrname, pass }).then(res => {
          console.log(res);
        })
      }
    })
  } else {
    // console.log("pass not match");
    document.getElementById('notice').innerHTML = `กรุณาใส่รหัสผ่านที่เหมือนกัน`;
  }

}