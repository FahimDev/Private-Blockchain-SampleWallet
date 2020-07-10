# Blockchain-Sample
This is just an experimental project which is developed with Hyperledger-Fabric-Framework (JS SDK).Here I just made the Client Wallet application which is a modified version of "Fabcar" sample. Here I made a chaindcode at "/chaincode/fabcar/javascript" and the Wallet application file is at "/fabcar/javascript" .There I develop some features which are search all cars, search cars by name & owner , creat new car record and update or change any record. All this operations are performed in different scripts and function. So for the user I made a "BRTA_Portal.js" file which will act as a menu. So user don't have to remember & write any large CLI command. They can just select those options by number and execute the operations.
When I enroll/register my client as this application becomes the part of Hyperledger-Fabric-Blockchai-Network which runs in the "/test-network" folder.

When you want to test the application you want to turn up the network first from "/fabcar" . There you will find a file "startFabric.sh".Open the Terminal in that directory and run this command 
./startFabric.sh
This will turn up the network from "/test-network" folder.
To run the file you have to configure your system according to the Hyperledger-Fabric documents and download the nodemodles also. 

