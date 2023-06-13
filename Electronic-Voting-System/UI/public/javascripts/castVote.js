var voter=JSON.parse(localStorage.getItem("voterData"));

function createForm() {
  
var allCandidate=fetchCandidate();


const table = document.createElement("table");

// Add rows to the table
const row1 = document.createElement("tr");
const cell1 = document.createElement("td");
cell1.textContent = "Voter Id";
row1.appendChild(cell1);

const cell2 = document.createElement("td");
const input1 = document.createElement("input");
input1.type = "text";
input1.id = "voterId5";
input1.value = voter.Id;
input1.readOnly = true;
cell2.appendChild(input1);
row1.appendChild(cell2);

table.appendChild(row1);
const br=document.createElement("br");
table.appendChild(br);

const row2 = document.createElement("tr");
const cell3 = document.createElement("td");
cell3.textContent = "Voter Name";
row2.appendChild(cell3);

const cell4 = document.createElement("td");
const input2 = document.createElement("input");
input2.type = "text";
input2.id = "voterName5";
input2.value = voter.voterName;
input2.readOnly = true;
cell4.appendChild(input2);
row2.appendChild(cell4);
table.appendChild(row2);

table.appendChild(br);

const row3 = document.createElement("tr");
const cell5 = document.createElement("td");
cell5.textContent = "DOB";
row3.appendChild(cell5);

const cell6 = document.createElement("td");
const input3 = document.createElement("input");
input3.type = "date";
input3.id = "dob5";
input3.value = voter.dob;
input3.readOnly = true;
cell6.appendChild(input3)
row3.appendChild(cell6);
table.appendChild(row3);

table.appendChild(br);


const row33 = document.createElement("tr");
const cell53 = document.createElement("td");
cell53.textContent = "Constituency";
row33.appendChild(cell53);

const cell63 = document.createElement("td");
const input33 = document.createElement("input");
input33.type = "Constituency";
input33.id = "Constituency";
input33.value = voter.constituency;
input33.readOnly = true;
cell63.appendChild(input33)
row33.appendChild(cell63);
table.appendChild(row33);

table.appendChild(br);

const row9 = document.createElement("tr");
const cell9 = document.createElement("td");
cell9.textContent = "Candidates";
row9.appendChild(cell9);

const select = document.createElement("select");
select.id="candidates";
select.onchange = function() {
    var info=this.value.split("-");
    voter.candidateName=info[1];
    alert(info[0]+","+info[1]);
    localStorage.setItem("candId",info[0]);
};
    
const optionElement = document.createElement("option");
optionElement.text = "Select";
select.appendChild(optionElement);

allCandidate.forEach(candidate => {
    if(candidate.Record.constituency == voter.constituency){
    const optionElement = document.createElement("option");
    optionElement.value = candidate.Record.candidateId+"-"+candidate.Record.candidateName;
    optionElement.text = candidate.Record.candidateName;
    select.appendChild(optionElement);
}
});

row9.appendChild(select);
table.appendChild(row9);

table.appendChild(br);

const row4 = document.createElement("tr");
const cell7 = document.createElement("td");
cell7.textContent = "";
row4.appendChild(cell7);

const cell8 = document.createElement("td");
const button1 = document.createElement("button");
button1.textContent = "Vote";
button1.onclick = submitVote;
cell8.appendChild(button1);

const button2 = document.createElement("button");
button2.type = "reset";
button2.textContent = "Clear";
cell8.appendChild(button2);
row4.appendChild(cell8);
table.appendChild(row4);

// Add the table to the document
document.body.appendChild(table);

}

function submitVote(event){
    event.preventDefault();
    console.log("submitVote Function")
    const voterId = voter.Id;
    const candidateName = voter.candidateName;
    const candidateId =localStorage.getItem("candId");
    //alert(voterId+","+candidateName+","+candidateId +","+voter.candidateName)
   
    if (candidateName.length == 0 ) {
        alert("Please select a candidate");

    }
    else {
        fetch('/submitVote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                VoterId: voterId, 
                candidateName: candidateName,
                candidateId :candidateId
            })
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
               // alert("Your Vote Recorded Successfully");
                return response.json();
            } else {
                alert("Error in processing request");
            }

        }).then(function (Voterdata){
            RecordVote(event);
        })
        .then(function (Voterdata) {
            
           // window.location.href = "/"
        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    }
}



function RecordVote(event){
     event.preventDefault();
     console.log("RecordVote Function")

     const candidateId =localStorage.getItem("candId");
    // alert(candidateId )
   
  
        fetch('/RecordVote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                candidateId :candidateId
            })
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert("Your Vote Recorded Successfully");
                return response.json();
            } else {
                alert("Error in processing request");
            }

        }).then(function (Voterdata) {
            
            window.location.href = "/"
        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    
}