function login(){
    
    var user=document.getElementById("offUser").value;
    var password=document.getElementById("offPass").value;
    if(user == "Admin" && password=="Adminpw"){
        localStorage.setItem("aa","abc");
        buttonDisStatus();  
    }else{
        alert("Wrong Credentials!");
    }
    $('#ModalCenter').modal('hide');
}

function logout(){
    localStorage.setItem("aa","def");
    buttonDisStatus(); 
}

function buttonDisStatus(){
    
    var loginStatus=localStorage.getItem("aa");
    var votingStatus=localStorage.getItem("votingStatus");
    
    if(loginStatus == "abc"){

    document.getElementById("login").style.display="none";
    document.getElementById("logout").style.display="block"; 
    document.getElementById("startVoting").style.display="block";
    document.getElementById("StopVoting").style.display="block";
    if(votingStatus == "Yes" || null){
        stopVoting();
    }else{
        startVoting();
    }
    document.getElementById("ElecMang").style.display="block";

    }else{

        document.getElementById("login").style.display="block";
        document.getElementById("logout").style.display="none";
        document.getElementById("startVoting").style.display="none";
        document.getElementById("StopVoting").style.display="none";
        document.getElementById("ElecMang").style.display="none";
    }
}



function startVoting(){

    localStorage.setItem("votingStatus","Yes");

    document.getElementById("startVoting").disabled = true;

    document.getElementById("StopVoting").disabled = false;

}

function stopVoting(){

    localStorage.setItem("votingStatus","No");

    document.getElementById("startVoting").disabled = false;

    document.getElementById("StopVoting").disabled = true;
}