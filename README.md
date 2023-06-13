# Electronic Voting System


# Description
This is a blockchain-based electronic voting system built on Hyperledger Fabric. It allows ECI Officer to Manage Election and users to vote for candidates in a secure and transparent manner.


## Features

- Secure: The system uses blockchain technology to ensure that votes are secure and cannot be tampered with.
- Transparent: The system is transparent, so voters can see how their votes are counted.
- Scalable: The system can be scaled to handle large numbers of voters.


## Usage

- ECI Oficer -Election Management system

  1- Constituency Management
   
  2- Party Management

  3- Candidate Management

  4-Voter Management

  5- Start Voting

  6- Stop Voting

- Voter

  1- Enroll Voter

  2- Cast Voter

  3- See Voter's Transctions History

  4- See Results by Constituency



## Requirements

- Linux OS/Environment
- Node.js
- Docker
- Git
- Hyperledger Fabric
- Good Internet Connectivity


## Installation

1- Install git

```bash
sudo apt install git
```


2- To install VScode, download the .deb file for Ubuntu from 
[here](https://code.visualstudio.com/download)

```bash
  sudo dpkg -i <file_name>
```
3- Clone this repository.


[https://gitlab.com/saurabhkumarr99/saurabhkumarrai_electronicvotingsystem](https://gitlab.com/saurabhkumarr99/saurabhkumarrai_electronicvotingsystem)



4- Download IBM Blockchain Extension from
[here](https://gitlab.com/CHF_KBA/kba_chf_ibmblockchainplatformextension_vscode/-/raw/main/ibm-blockchain-platform-2.0.8.vsix?inline=false)

```bash
sudo dpkg -i <file_name>
```  

5- In the project directory, run 
```bash
npm install
sudo npm install -g express-generator
```  

6- Open folder Blockchain-Project terminal and
execute
```bash
chmod +x installDependencies.sh
./installDependencies.sh
```  

7- Reboot the system and execute
```bash
./installDependencies.sh bin
``` 

8- In Client Folder Terminal
```bash
npm init
npm install fabric-network@2.2.8
npm install fabric-ca-client@2.2.4
``` 
## Run Locally

1- Open the Electronic-Voting-System -> 
Network folder ->terminal

```bash
./startNetwork.sh
``` 

2- Open Chaincode->KBA-EVS folder in vscod

3-Go to IBM Blockchain Platform and add

- All Wallets
- Environment
- Connect all Gateways
- Package the project with .tar.gz file
- Go to evsChannel add

  package,collections.json

- Deploy smart contracts

4- Open Event folder in vscode and go to terminal and execute
```bash
  node contractEventListener.js
```

5-Open the UI folder in vscode and go to terminal and execute
```bash
  npm start
```

6- Click on http://localhost:3000/

7- To view couchdb http://localhost:7006/_utils/


## Documentation

[Documentation](https://gitlab.com/saurabhkumarr99/saurabhkumarrai_electronicvotingsystem/-/blob/main/ElectronicVotingSystemDoc.pdf)


## Authors

- SAURABH KUMAR RAI



## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://saurabhkumarr99.github.io/MyResume/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/@saurabhkumarr99)

