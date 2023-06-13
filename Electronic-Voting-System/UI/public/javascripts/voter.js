function addVoter(event) {
    event.preventDefault();
    console.log("addVoter Function")
    const voterId = document.getElementById('voterId').value;
    const voterName = document.getElementById('voterName').value;
    const dob = document.getElementById('dob').value;
    const constituency = document.getElementById('constituency').value;
    
    if (voterId.length == 0 || voterName.length == 0 ) {
        alert("Please enter the data properly");

    }
    else {
        fetch('/createVoter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                VoterId: voterId, 
                VoterName: voterName,
                dob:dob,
                constituency:constituency
            })
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert("Added a new voter");

            } else {
                alert("Error in processing request");
            }

        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    }

}


function readVoter(event) {

    event.preventDefault();
    const readVoterId = document.getElementById('readVoterId').value;

    console.log(readVoterId);

    if (readVoterId.length == 0) {
        alert("Please enter the data properly");
    }
    else {
        fetch('/readVoter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ VoterId: readVoterId })
        })
            .then(function (response) {
                console.log(response);
                if (response.status != 200) {
                    console.log(response.status)
                    // alert("Error in processing request");

                } else {
                    return response.json();
                }
            })
            .then(function (Voterdata) {
                dataBuf = Voterdata["Voterdata"]
                console.log(dataBuf)
                alert(dataBuf);
            })
            .catch(function (err) {
                console.log(err);
                alert("Error in processing request");
            })
    }
}


function VoterHistory(event) {

    event.preventDefault();
    const readVoterId = document.getElementById('VoterHistoryId').value;
    const voterName = document.getElementById('VoterHistoryName').value;
    const dob = document.getElementById('VoterHistorydob').value;

    console.log(readVoterId);

    if (readVoterId.length == 0) {
        alert("Please enter the data properly");
    }
    else {
        fetch('/VoterHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                VoterId: readVoterId,
                VoterName: voterName,
                dob:dob,
                 })
        })
            .then(function (response) {
                console.log(response);
                if (response.status != 200) {
                    console.log(response.status)
                    // alert("Error in processing request");

                } else {
                    return response.json();
                }
            })
            .then(function (Voterdata) {
                dataBuf = Voterdata["Voterdata"]
                console.log(dataBuf)
                //alert(dataBuf);
                displayVoterHistory(JSON.parse(dataBuf));
            })
            .catch(function (err) {
                console.log(err);
                alert("Error in processing request");
            })
    }
}


function enrollVoter(event){
    event.preventDefault();
    console.log("enrollVoter Function")
    const voterId = document.getElementById('voterId2').value;
    const voterName = document.getElementById('voterName2').value;
    const dob = document.getElementById('dob2').value;
   
    if (voterId.length == 0 || voterName.length == 0 ) {
        alert("Please enter the data properly");

    }
    else {
        fetch('/enrollVoter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                VoterId: voterId, 
                VoterName: voterName,
                dob:dob,
            })
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert("Enrolled Successfully ,Please Vote");
                return response.json();
            } else {
                alert("Error in processing request");
            }

        }).then(function (Voterdata) {
            dataBuf = JSON.parse(Voterdata["Voterdata"])
            if(dataBuf.enrolledStatus == "Yes" && dataBuf.voteCasted == "No"){
                document.getElementById("castVote").style.display = "block";
                localStorage.setItem("voterData" ,JSON.stringify(dataBuf));
            }else if(dataBuf.enrolledStatus == "Yes" && dataBuf.voteCasted == "Yes"){
                document.getElementById("msg1").style.display = "block";
            }
            console.log(JSON.stringify(dataBuf))
            //alert(JSON.stringify(dataBuf));
        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    }
}

function castVote(){

    var votingStatus= localStorage.getItem("votingStatus");
    if(votingStatus == null){
        alert("Voting Not Started")
    }else if(votingStatus == "No"){
        alert("Voting Completed")
    }else if(votingStatus == "Yes"){
    window.location.href = "/castVote";
    }
}


function getAllVoter() {

    fetch('/getAllVoter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
    })
        .then(function (response) {
            console.log(response);
            if (response.status != 200) {
                console.log(response.status)
                // alert("Error in processing request");

            } else {
                return response.json();
            }
        })
        .then(function (Voterdata) {
            dataBuf = Voterdata["Voterdata"]
            console.log(dataBuf)
            //alert(dataBuf);
            //return dataBuf;
            localStorage.setItem("allVoter", (dataBuf));
        })
        .catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })

}

function fetchAllVoter(){
getAllVoter();
var allVoter =localStorage.getItem("allVoter");
allVoter=JSON.parse(allVoter);
return allVoter;
}


function displayVoterHistory(data){

    const div = document.getElementById("VoterHistoryBox");
    div.style.display="block";
    div.innerHTML=""
    div.innerHTML=`<h1 style="text-align: center">All Transctions History</h2>`;
   for (const record of data) {
     const txId = record.TxId;
     const timestamp = record.TimeStamp.seconds + "." + record.TimeStamp.nanos / 1000000000;
     const recordDiv = document.createElement("div");
     recordDiv.classList.add("box");
     recordDiv.innerHTML = `
      <div style="border:2px solid blueviolet;margin :5px auto">
      <h2 style="text-align: center">TxId: ${txId}</h2>
      <h3 style="text-align: center">Timestamp: ${timestamp}</h3>
      <h4 style="text-align: center">Record: ${JSON.stringify(record.Record, null, 2)}</h4>
      </div>
   `;
   
   div.appendChild(recordDiv);
  }
}


function createVoterForm(){
    
    const div = document.getElementById("voterform");

    const allcontituency =fetchConstituency();
      
    
    const table = document.createElement("table");
    table.style.padding = "50px 10px"; 
    
    // Add rows to the table
    const row1 = document.createElement("tr");
    const cell1 = document.createElement("td");
    cell1.textContent = "Voter Id";
    row1.appendChild(cell1);
    
    const cell2 = document.createElement("td");
    const input1 = document.createElement("input");
    input1.type = "text";
    input1.id = "voterId";
    cell2.appendChild(input1);
    row1.appendChild(cell2);
    
    table.appendChild(row1);
    const br=document.createElement("br");
    table.appendChild(br);
    
    const row2 = document.createElement("tr");
    row2.style.padding="5px";
    const cell3 = document.createElement("td");
    cell3.textContent = "Voter Name";
    row2.appendChild(cell3);
    
    const cell4 = document.createElement("td");
    const input2 = document.createElement("input");
    input2.type = "text";
    input2.id = "voterName";
    cell4.appendChild(input2);
    row2.appendChild(cell4);

    table.appendChild(row2);
    
    table.appendChild(br);

    const row22 = document.createElement("tr");
    row22.style.padding="5px";
    const cell32 = document.createElement("td");
    cell32.textContent = "DOB";
    row22.appendChild(cell32);
    
    const cell42 = document.createElement("td");
    const input22 = document.createElement("input");
    input22.type = "date";
    input22.id = "dob";
    input22.max="2005-06-15";
    cell42.appendChild(input22);
    row22.appendChild(cell42);
    table.appendChild(br);
    table.appendChild(row22);
    
    table.appendChild(br);
    
    const row9 = document.createElement("tr");
    const cell9 = document.createElement("td");
    cell9.textContent = "Constituency";
    row9.appendChild(cell9);
    
    const select = document.createElement("select");
    select.id="constituency";

    const optionElement = document.createElement("option");
    optionElement.text ="Select";
    select.appendChild(optionElement);

    allcontituency.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.Record.constituencyName;
        optionElement.text = option.Record.constituencyName;
        select.appendChild(optionElement);
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
    button1.textContent = "Add New Voter";
    button1.onclick = addVoter;
    cell8.appendChild(button1);

    const button2 = document.createElement("button");
    button2.type = "reset";
    button2.textContent = "Clear";
    cell8.appendChild(button2);
    row4.appendChild(cell8);
    table.appendChild(row4);
    // Add the table to the document
    div.appendChild(table);

}