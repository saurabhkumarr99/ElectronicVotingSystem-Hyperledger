

function addConstituency(event) {
    event.preventDefault();
    console.log("addConstituency Function")
    const constituencyId = document.getElementById('constituencyId').value;
    const constituencyName = document.getElementById('constituencyName').value;
    
    
    console.log(constituencyId +constituencyName);
    if (constituencyId.length == 0 || constituencyName.length == 0 ) {
        alert("Please enter the data properly");

    }
    else {
        fetch('/createConstituency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ConstituencyId: constituencyId, ConstituencyName: constituencyName})
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                alert("Added a new constituency");

            } else {
                alert("Error in processing request");
            }

        }).catch(function (err) {
            console.log(err);
            alert("Error in processing request");
        })
    }

}


function readConstituency(event) {

    event.preventDefault();
    const readConstituencyId = document.getElementById('readConstituencyId').value;

    console.log(readConstituencyId);

    if (readConstituencyId.length == 0) {
        alert("Please enter the data properly");
    }
    else {
        fetch('/readConstituency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ConstituencyId: readConstituencyId })
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
            .then(function (Constituencydata) {
                dataBuf = Constituencydata["Constituencydata"]
                console.log(dataBuf)
                alert(dataBuf);
            })
            .catch(function (err) {
                console.log(err);
                alert("Error in processing request");
            })
    }
}


function getAllConstituency() {

        fetch('/getAllConstituency', {
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
            .then(function (Constituencydata) {
                dataBuf = Constituencydata["Constituencydata"]
                console.log(dataBuf)
                //alert(dataBuf);
                //return dataBuf;
                localStorage.setItem("allConstituency", (dataBuf));
            })
            .catch(function (err) {
                console.log(err);
                alert("Error in processing request");
            })

}

function fetchConstituency(){
    getAllConstituency();
    var allConstituency =localStorage.getItem("allConstituency");
    allConstituency=JSON.parse(allConstituency);
    return allConstituency;
}

