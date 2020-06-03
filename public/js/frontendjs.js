if(document.cookie.includes('csid')) {
    console.log('user is logged in');
    let logButton = document.getElementById('authenticate-button');
    logButton.innerHTML ="Logout";
    logButton.removeAttribute('href');
    logButton.onclick = logoutClick;
}else{
    let logButton = document.getElementById('authenticate-button');
    logButton.innerHTML ="Login";
    logButton.setAttribute('href', '/html/login');
}