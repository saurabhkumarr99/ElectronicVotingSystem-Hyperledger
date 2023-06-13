const {ClientApplication}=require('./client')
let eciClient=new ClientApplication()
eciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "CandidateContract",
    "queryTxn",
    "",
    "readCandidate",
    "1",
    
).then(message => {
    console.log(message.toString())
})

const clientApplication = new ClientApplication();