function logout(){
    storage.removeItem("ID");
    window.open("http://127.0.0.1:5500/templates/login.html");
}