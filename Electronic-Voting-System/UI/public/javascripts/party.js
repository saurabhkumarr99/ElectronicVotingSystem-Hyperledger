function addParty(event) {
    event.preventDefault();
    console.log("addParty Function")
    const partyId = document.getElementById('partyId').value;
    const partyName = document.getElementById('partyName').value;
    
    console.log(partyId +partyName);
    if (partyId.length == 0 || partyName.length == 0 ) {
        alert("Please enter the data properly");

    }
    else {
        fetch('/createParty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ PartyId: partyId, PartyName: partyName})
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert("Added a new party");

            } else {
                alert("Error in processing request");
            }

        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    }

}


function readParty(event) {

    event.preventDefault();
    const readPartyId = document.getElementById('readPartyId').value;

    console.log(readPartyId);

    if (readPartyId.length == 0) {
        alert("Please enter the data properly");
    }
    else {
        fetch('/readParty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ PartyId: readPartyId })
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
            .then(function (Partydata) {
                dataBuf = Partydata["Partydata"]
                console.log(dataBuf)
                alert(dataBuf);
            })
            .catch(function (err) {
                console.log(err);
                alert("Error in processing request");
            })
    }
}


function getAllParty() {

    fetch('/getAllParty', {
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
        .then(function (Partydata) {
            dataBuf = Partydata["Partydata"]
            //console.log(dataBuf)
            //alert(dataBuf);
            //return dataBuf;
            localStorage.setItem("allParty", dataBuf);
        })
        .catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })

}

function fetchAllParty(){
    getAllParty();
    var allParty=localStorage.getItem("allParty");
    allParty=JSON.parse(allParty);
    return allParty;
}
