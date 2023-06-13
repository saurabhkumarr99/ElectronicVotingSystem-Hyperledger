const {ClientApplication}=require('./client')
let eciClient=new ClientApplication()
// eciClient.generateAndSubmitTxn(
//     "eci",
//     "Admin",
//     "evschannel",
//     "KBA-EVS",
//     "ConstituencyContract",
//     "queryTxn",
//     "",
//     "readConstituency",
//     "Const1",
    
// ).then(message => {
//     console.log(message.toString())
// })

eciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "ConstituencyContract",
    "queryTxn",
    "",
    "queryAllConstituency",
   ""
    
).then(message => {
    console.log(message.toString())
})

const clientApplication = new ClientApplication();