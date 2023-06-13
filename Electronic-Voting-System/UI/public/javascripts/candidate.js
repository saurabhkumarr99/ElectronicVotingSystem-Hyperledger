
function createCandidateForm(){

    const allcontituency =fetchConstituency();
    const allParty=fetchAllParty();
      
    
    const table = document.createElement("table");
    table.style.padding = "50px 10px"; 
    
    // Add rows to the table
    const row1 = document.createElement("tr");
    const cell1 = document.createElement("td");
    cell1.textContent = "Candidate Id";
    row1.appendChild(cell1);
    
    const cell2 = document.createElement("td");
    const input1 = document.createElement("input");
    input1.type = "text";
    input1.id = "candidateId5";
    cell2.appendChild(input1);
    row1.appendChild(cell2);
    
    table.appendChild(row1);
    const br=document.createElement("br");
    table.appendChild(br);
    
    const row2 = document.createElement("tr");
    row2.style.padding="5px";
    const cell3 = document.createElement("td");
    cell3.textContent = "Candidate Name";
    row2.appendChild(cell3);
    
    const cell4 = document.createElement("td");
    const input2 = document.createElement("input");
    input2.type = "text";
    input2.id = "candidateName5";
    cell4.appendChild(input2);
    row2.appendChild(cell4);
    table.appendChild(row2);
    
    table.appendChild(br);
    
    const row9 = document.createElement("tr");
    const cell9 = document.createElement("td");
    cell9.textContent = "Constituency";
    row9.appendChild(cell9);
    
    const select = document.createElement("select");
    select.id="constituency";

    allcontituency.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.Record.constituencyName;
        optionElement.text = option.Record.constituencyName;
        select.appendChild(optionElement);
    });
    row9.appendChild(select);
    table.appendChild(row9);
    
    table.appendChild(br);
    
    const row11 = document.createElement("tr");
    const cell11 = document.createElement("td");
    cell11.textContent = "Party";
    row11.appendChild(cell11);
    
    const select1 = document.createElement("select");
    select1.id="party";

    allParty.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.Record.partyName;
        optionElement.text = option.Record.partyName;
        select1.appendChild(optionElement);
    });
    row11.appendChild(select1);
    table.appendChild(row11);
    
    
    table.appendChild(br);
    
    const row4 = document.createElement("tr");
    const cell7 = document.createElement("td");
    cell7.textContent = "";
    row4.appendChild(cell7);

    const cell8 = document.createElement("td");
    const button1 = document.createElement("button");
    button1.textContent = "Add New Candidate";
    button1.onclick = addCandidate;
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


function addCandidate(event) {
    event.preventDefault();
    console.log("addCandidate Function")
    const candidateId = document.getElementById('candidateId5').value;
    const candidateName = document.getElementById('candidateName5').value;
    const constituency= document.getElementById('constituency').value;
    const party = document.getElementById('party').value;
   
    //alert(candidateId+candidateName+constituency+party);
    //console.log(candidateId +candidateName);
    if (candidateId.length == 0 || candidateName.length == 0 ) {
        alert("Please enter the data properly");

    }
    else {
        fetch('/createCandidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ CandidateId: candidateId, 
                CandidateName: candidateName,
                constituency:constituency,
                party:party})
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert("Added a new candidate");

            } else {
                alert("Error in processing request");
            }

        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    }

}


function readCandidate(event) {

    event.preventDefault();
    const readCandidateId = document.getElementById('readCandidateId').value;

    console.log(readCandidateId);

    if (readCandidateId.length == 0) {
        alert("Please enter the data properly");
    }
    else {
        fetch('/readCandidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ CandidateId: readCandidateId })
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
            .then(function (Candidatedata) {
                dataBuf = Candidatedata["Candidatedata"]
                console.log(dataBuf)
                alert(dataBuf);
            })
            .catch(function (err) {
                console.log(err);
                alert("Error in processing request");
            })
    }
}


function getAllCandidate() {

    fetch('/getAllCandidate', {
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
        .then(function (Candidatedata) {
            dataBuf = Candidatedata["Candidatedata"]
            console.log(dataBuf)
            //alert(dataBuf);
            //return dataBuf;
            localStorage.setItem("allCandidate", (dataBuf));
        })
        .catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })

}


function fetchCandidate(){
getAllCandidate();
var allCandidate =localStorage.getItem("allCandidate");
allCandidate=JSON.parse(allCandidate);
return allCandidate;
}


function deleteCandidate(candidateId) {
    
    console.log("addCandidate Function")
    

    
        fetch('/deleteCandidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ CandidateId: candidateId})
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert(" candidate deleted");

            } else {
                alert("Error in processing request");
            }

        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    
  

}