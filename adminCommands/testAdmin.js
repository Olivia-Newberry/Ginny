//generate secret key
//generate secret key
//generate secret key
function generateSecretKey() {
    var text = "";  //declare variable  text    //declare variable  text
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";  //declare variable  possible
    for (var i = 0; i < 32; i++) {  //for loop
        text += possible.charAt(Math.floor(Math.random() * possible.length));  //declare variable  text
    }  //for loop
    return text;  //return text
}  //function generateSecretKey
