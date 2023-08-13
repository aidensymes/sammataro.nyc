// Basic Cookie Functions
//////////////////////////////////////////////////////////////////////////////
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Control Popup
//////////////////////////////////////////////////////////////////////////////
function showCookieBar() {
  document.getElementById('cookieBar').style.display = 'block';
}

function hideCookieBar() {
  document.getElementById('cookieBar').style.display = 'none';
  setCookie('alertSeen', true, 365);
}

// Fire on Load
//////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  var seen = getCookie('alertSeen');
  if (seen == '' || seen == null) {
    showCookieBar();
  }
});
