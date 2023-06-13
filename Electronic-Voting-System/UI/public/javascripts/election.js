
function displayCandidates(){
    var allCandidate=fetchCandidate();
    //alert(JSON.stringify(allCandidate));
    createCandidateTable(allCandidate);
}

function createCandidateTable(data) {

  var loginStatus=localStorage.getItem("aa");

    // Create a table element
const table = document.createElement("table");
table.className="myTable";

// Create a thead element
const thead = document.createElement("thead");

// Create a tr element
const tr = document.createElement("tr");

// Add the headers to the tr element
tr.appendChild(document.createElement("th")).textContent = "Asset Type";
tr.appendChild(document.createElement("th")).textContent = "Candidate ID";
tr.appendChild(document.createElement("th")).textContent = "Candidate Name";
tr.appendChild(document.createElement("th")).textContent = "Constituency";
tr.appendChild(document.createElement("th")).textContent = "Party";
tr.appendChild(document.createElement("th")).textContent = "Total Votes";
    
// if(loginStatus == "abc"){
//   tr.appendChild(document.createElement("th")).textContent = "Delete";
// }

// Append the tr element to the thead element
thead.appendChild(tr);
table.appendChild(thead);

// Create a tbody element
const tbody = document.createElement("tbody");

// Loop through the data array
for (const item of data) {
  // Create a tr element
  const tr = document.createElement("tr");

  // Add the data to the tr element
  tr.appendChild(document.createElement("td")).textContent = item.Record.assetType;
  tr.appendChild(document.createElement("td")).textContent = item.Record.candidateId;
  tr.appendChild(document.createElement("td")).textContent = item.Record.candidateName;
  tr.appendChild(document.createElement("td")).textContent = item.Record.constituency;
  tr.appendChild(document.createElement("td")).textContent = item.Record.party;
  tr.appendChild(document.createElement("td")).textContent = item.Record.totalVotes;
  // if(loginStatus == "abc"){
  //   var Dbtn=document.createElement("button");
  //   Dbtn.textContent="Delete";
  //   Dbtn.className="btn btn-danger";
  //   Dbtn.addEventListener("click", function() {
  //     deleteCandidate(item.Record.candidateId);
  //   }, false);
  //   Dbtn.click="myFun()";
  //   tr.appendChild(Dbtn);
  // }

  // Append the tr element to the tbody element
  tbody.appendChild(tr);
}

// Append the tbody element to the table element
table.appendChild(tbody);

// Create the footer
const footer = document.createElement("tfoot");
footer.style.backgroundColor = "#37bbe7";
const tr1 = document.createElement("tr");


// Add the total number of constituencies to the footer
const td = document.createElement("td");
td.textContent = `Total candidates: ${data.length}`;
td.style.fontSize = "1.2em";
tr1.appendChild(td);

// Append the footer to the table
footer.appendChild(tr1);
table.appendChild(footer);


// Append the table element to the document
document.getElementById("cont1").innerHTML="";
document.getElementById("cont1").appendChild(table);
}

function getAllCand(allCandidate,constituency){
  
  var totalCand=[];
  var count=0;
  
  for(const cand of allCandidate){
    
    if(cand.Record.constituency == constituency){
      totalCand.push(cand);
      count++;
    } 
  }
  return count;
}

function AllCand(allCandidate,constituency){
  
  var totalCand=[];
  var tbl=`
  <table>
  <thead>
  <tr>
  <th>Candidate ID</th>
  <th>Candidate Name</th>
  <th>Party</th>
  <th>Total Votes</th></tr>
  </thead>
  <tbody>
`;
  for(const cand of allCandidate){
    
    if(cand.Record.constituency == constituency){
     
      var r=`<tr>
             <td>${cand.Record.candidateId}</td>
             <td>${cand.Record.candidateName}</td>
             <td>${cand.Record.party}</td>
             <td>${cand.Record.totalVotes}</td>
             </tr>`;
       tbl=tbl+r;      
    } 
  }
  tbl=tbl+`</tbody></table>`;
  return tbl;
}

function winner(allCandidate,constituency){
   
  var candidates=[];

  for(const cand of allCandidate){
    if(cand.Record.constituency == constituency){
      candidates.push(cand);
    } 
  }

  if(candidates.length == 0){
    return "No Candidate"
  }
  var winner=candidates[0];
  var draw=false;
  

  for(var i=1;i<candidates.length;i++){
     if(candidates[i].Record.totalVotes == winner.Record.totalVotes){
        draw=true;
     }else  if(candidates[i].Record.totalVotes > winner.Record.totalVotes){
        draw=false;
        winner =candidates[i];
     }
  }
  //console.log(JSON.stringify(winner));

  var votingStatus= localStorage.getItem("votingStatus");

    if(votingStatus == null){
        return "Voting Not Started";
    }else if(votingStatus == "Yes"){
       return "Voting Live ";
    }else if(votingStatus == "No"){
  
      if(draw){
         return "Draw";
      }else if(winner.Record.totalVotes == 0){
         return "No Winner -0 votes"
      }else{
         return winner.Record.candidateName + " - "+winner.Record.totalVotes+" votes";
      }
   }

}



function constituencyCandidateData(totalCandidate ,id){

  
const table = document.createElement("table");

// Create a thead element
const thead = document.createElement("thead");

// Create a tr element
const tr = document.createElement("tr");

// Add the headers to the tr element

tr.appendChild(document.createElement("th")).textContent = "Candidate ID";
tr.appendChild(document.createElement("th")).textContent = "Candidate Name";
tr.appendChild(document.createElement("th")).textContent = "Party";
tr.appendChild(document.createElement("th")).textContent = "Total Votes";

// Append the tr element to the thead element
thead.appendChild(tr);
table.appendChild(thead);

// Create a tbody element
const tbody = document.createElement("tbody");

// Loop through the data array
for (const item of totalCandidate) {
  console.log(JSON.stringify(item)+","+id);

  // Create a tr element
  const tr = document.createElement("tr");

  // Add the data to the tr element
  tr.appendChild(document.createElement("td")).textContent = item.Record.candidateId;
  tr.appendChild(document.createElement("td")).textContent = item.Record.candidateName;
  tr.appendChild(document.createElement("td")).textContent = item.Record.party;
  tr.appendChild(document.createElement("td")).textContent = item.Record.totalVotes;

  // Append the tr element to the tbody element
  tbody.appendChild(tr);
}

// Append the tbody element to the table element
table.appendChild(tbody);



// Append the table element to the document
document.getElementById("cst"+id).innerHTML="";
document.getElementById("cst"+id).appendChild(table);
}

function displayConstituency(){
    var allVoter =fetchAllVoter();
    var allCandidate =fetchCandidate();
    var allConstituency =fetchConstituency();
    createConstituencyTable(allConstituency ,allCandidate ,allVoter);
}

function createConstituencyTable(data,allCandidate ,allVoter){
    // Create a table element
const table = document.createElement("table");
table.className="myTable";

// Create the table header
const thead = document.createElement("thead");
const tr = document.createElement("tr");

// Add the table headers
tr.appendChild(document.createElement("th")).textContent = "Asset Type";
tr.appendChild(document.createElement("th")).textContent = "Constituency ID";
tr.appendChild(document.createElement("th")).textContent = "Constituency Name";
tr.appendChild(document.createElement("th")).textContent = "All Voters";
tr.appendChild(document.createElement("th")).textContent = "All Candidates";
tr.appendChild(document.createElement("th")).textContent = "Winner";
tr.appendChild(document.createElement("th")).textContent = "Records";


// Append the table header to the table
thead.appendChild(tr);
table.appendChild(thead);

// Create the table body
const tbody = document.createElement("tbody");

// Loop through the data array and add rows to the table body
for (const row of data) {
  const tr = document.createElement("tr");

  var totalVoters=totalVoter(allVoter,row.Record.constituencyName);
  var totalCandidate=getAllCand(allCandidate,row.Record.constituencyName);
  var winnerName=winner(allCandidate, row.Record.constituencyName);
  var cstId=row.Record.constituencyId;
  var cstName=row.Record.constituencyName;
  var tbl=AllCand(allCandidate,row.Record.constituencyName);

  // Add the data to the table row
  tr.appendChild(document.createElement("td")).textContent = row.Record.assetType;
  tr.appendChild(document.createElement("td")).textContent = cstId;
  tr.appendChild(document.createElement("td")).textContent = cstName;
  tr.appendChild(document.createElement("td")).textContent = totalVoters;
  tr.appendChild(document.createElement("td")).textContent = totalCandidate;
  tr.appendChild(document.createElement("td")).textContent = winnerName;
  var btn=document.createElement("button");
  btn.textContent="Recods";
  btn.className="btn btn-primary";
  btn.dataset.toggle = "modal";
  btn.dataset.target = "#exampleModalCenter"+row.Record.constituencyId;
 
  tr.appendChild(btn);
  // Append the table row to the table body
   
  var div =document.createElement("div");
  div.innerHTML=`<div class="modal fade" id="exampleModalCenter${cstId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header" ">
        <h4 class="modal-title" id="exampleModalLongTitle" style="text-align: center;">Constituency : ${cstName}</h4></br>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h4 class="modal-title" id="exampleModalLongTitle">Total Voters : ${totalVoters}</h4></br>
        <h4 class="modal-title" id="exampleModalLongTitle">Total Candidates :${totalCandidate}</h4></br>
        <h4 class="modal-title" id="exampleModalLongTitle">Winner: ${winnerName}</h4></br>
        <div>${tbl}</div>
      </div>
      <div class="modal-footer">
       
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>`;


  tbody.appendChild(div);

  tbody.appendChild(tr);

  //constituencyCandidateData(totalCandidate ,cstId);
}

// Append the table body to the table
table.appendChild(tbody);


// Create the footer
const footer = document.createElement("tfoot");
footer.style.backgroundColor = "#37bbe7";
const tr1 = document.createElement("tr");


// Add the total number of constituencies to the footer
const td = document.createElement("td");
td.textContent = `Total constituencies: ${data.length}`;
td.style.fontSize = "1.2em";
tr1.appendChild(td);

// Append the footer to the table
footer.appendChild(tr1);
table.appendChild(footer);


// Append the footer to the table
footer.appendChild(tr1);
table.appendChild(footer);



// Append the table to the document
document.getElementById("cont1").innerHTML="";
document.getElementById("cont1").appendChild(table);

}





function displayParty(){
    var allParty =fetchAllParty();
    createPartyTable(allParty);
}

function createPartyTable(data){
    // Create a table element
const table = document.createElement("table");
table.className="myTable";

// Create the table header
const thead = document.createElement("thead");
const tr = document.createElement("tr");

// Add the table headers
tr.appendChild(document.createElement("th")).textContent = "Asset Type";
tr.appendChild(document.createElement("th")).textContent = "Party ID";
tr.appendChild(document.createElement("th")).textContent = "Party Name";

// Append the table header to the table
thead.appendChild(tr);
table.appendChild(thead);

// Create the table body
const tbody = document.createElement("tbody");

// Loop through the data array and add rows to the table body
for (const row of data) {
  const tr = document.createElement("tr");

  // Add the data to the table row
  tr.appendChild(document.createElement("td")).textContent = row.Record.assetType;
  tr.appendChild(document.createElement("td")).textContent = row.Record.partyId;
  tr.appendChild(document.createElement("td")).textContent = row.Record.partyName;

  // Append the table row to the table body
  tbody.appendChild(tr);
}

// Append the table body to the table
table.appendChild(tbody);


// Create the footer
const footer = document.createElement("tfoot");
footer.style.backgroundColor = "#37bbe7";
const tr1 = document.createElement("tr");


// Add the total number of constituencies to the footer
const td = document.createElement("td");
td.textContent = `Total parties: ${data.length}`;
td.style.fontSize = "1.2em";
tr1.appendChild(td);

// Append the footer to the table
footer.appendChild(tr1);
table.appendChild(footer);

// Append the table to the document
document.getElementById("cont1").innerHTML="";
document.getElementById("cont1").appendChild(table);

}





function displayVoter(){
    var allVoter =fetchAllVoter();
    createVoterTable(allVoter);
}

function createVoterTable(data){
    // Create a table element
const table = document.createElement("table");
table.className="myTable";

// Create the table header
const thead = document.createElement("thead");
const tr = document.createElement("tr");

// Add the table headers
tr.appendChild(document.createElement("th")).textContent = "Asset Type";
tr.appendChild(document.createElement("th")).textContent = "Voter ID";
tr.appendChild(document.createElement("th")).textContent = "Voter Name";
tr.appendChild(document.createElement("th")).textContent = "Constituency";

// Append the table header to the table
thead.appendChild(tr);
table.appendChild(thead);

// Create the table body
const tbody = document.createElement("tbody");

// Loop through the data array and add rows to the table body
for (const row of data) {
  const tr = document.createElement("tr");

  // Add the data to the table row
  tr.appendChild(document.createElement("td")).textContent = row.Record.assetType;
  tr.appendChild(document.createElement("td")).textContent = row.Record.Id;
  tr.appendChild(document.createElement("td")).textContent = row.Record.voterName;
  tr.appendChild(document.createElement("td")).textContent = row.Record.constituency;

  // Append the table row to the table body
  tbody.appendChild(tr);
}

// Append the table body to the table
table.appendChild(tbody);


// Create the footer
const footer = document.createElement("tfoot");
footer.style.backgroundColor = "#37bbe7";
const tr1 = document.createElement("tr");


// Add the total number of constituencies to the footer
const td = document.createElement("td");
td.textContent = `Total voters: ${data.length}`;
td.style.fontSize = "1.2em";
tr1.appendChild(td);

// Append the footer to the table
footer.appendChild(tr1);
table.appendChild(footer);

// Append the table to the document
document.getElementById("cont1").innerHTML="";
document.getElementById("cont1").appendChild(table);

}

function totalVoter(allVoter,constituency){
 
  var count =0;
  for(const voter of allVoter){
   
    if(voter.Record.constituency == constituency){
      count++;
    } 
  }
 return count;
}

