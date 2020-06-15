/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const query = main;
module.exports = query;
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main(query) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        
    if(query[0] == '4')
    {
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        await contract.submitTransaction('createCar', query[1], query[2], query[3], query[4], query[5], query[6], query[7], query[8]);
        console.log('New Vehicle has been added');
        //const car = JSON.parse(updatedInfo.toString());
        console.log('New Vehicle Information:');
        const updatedInfo = await contract.evaluateTransaction('queryCar', query[1])
        const info = JSON.parse(updatedInfo.toString());
                console.log('#############################'+query[1]+'#############################');
                console.log('-----------------------Vehicle  Details-----------------------');
                console.log('Brand: '+info.make);
                console.log('Model: '+info.model);
                console.log('Color: '+info.color);
                console.log('Owner: '+info.owner);
                console.log('Registration Number: '+info.regNum);
                console.log('-------------------------------------------------------------');
                console.log('Chassis ID: '+info.bodyNum);
                console.log('Engine ID: '+info.engNum);
                console.log('##############################################################');

    }    
    else if(query[0] == '5')   
    { 
        //-------------start: ChangeCarOwner------------  
        const previousInfo = await contract.evaluateTransaction('queryCar', query[1])
        const car1 = JSON.parse(previousInfo.toString());
        //console.log('Previous Information: ' + previousInfo);
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        await contract.submitTransaction('changeCarOwner', query[1], query[2]);
        console.log('Change has been submitted. The name of the car owner of '+query[1]+' has been changed' );

        const updatedInfo = await contract.evaluateTransaction('queryCar', query[1])
        const car2 = JSON.parse(updatedInfo.toString());
        console.log('Previous Information:: [Vehicle Owner] ' + car1.owner);
        console.log('Updated Information: [Vehicle Owner] ' + car2.owner);
        //-------------end: ChangeCarOwner------------
    }
        //console.log(query);
    else if(query[0] == '6')
    {
        //-------------start: ChangeCarColor------------
        const previousInfo = await contract.evaluateTransaction('queryCar', query[1])
        const car1 = JSON.parse(previousInfo.toString());
        //console.log('Previous Information: ' + previousInfo);
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        await contract.submitTransaction('changeCarColor', query[1], query[2]);
        console.log('Change has been submitted. The Color of the '+query[1]+' has been changed' );

        //updatedInfo.color;


        const updatedInfo = await contract.evaluateTransaction('queryCar', query[1])
        const car2 = JSON.parse(updatedInfo.toString());
        console.log('Previous Information: [Vehicle Color] ' + car1.color);
        console.log('Updated Information: [Vehicle Color] ' + car2.color);
        //-------------end: ChangeCarColor------------
    }
    else if(query[0] == '7')
    {   
        //------------start: CheckEveryEngine-------- 
        var otherEngine = 'INZ-BXXXX';
        var otherCar = 'CARX';
        var found = '0';
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
        //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        const info = JSON.parse(result.toString());
        info.forEach(element => {            
            otherEngine = element.Record.engNum;
            if(query[2] == otherEngine){
                found = '1';
                otherCar = element.Key;
                console.log('Engine Found!');
            }
        });
        //------------end: CheckEveryEngine--------     
        
        if(found == '0'){
            
            //-------------start: ChangeCarEng------------
            const previousInfo = await contract.evaluateTransaction('queryCar', query[1])
            const car1 = JSON.parse(previousInfo.toString());
            // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
            await contract.submitTransaction('changeCarEng', query[1], query[2]);
            console.log('Change has been submitted. Engine number of '+query[1]+' has been changed' );

            const updatedInfo = await contract.evaluateTransaction('queryCar', query[1])
            const car2 = JSON.parse(updatedInfo.toString());
            console.log('Previous Information: [Vehicle Engine] ' + car1.engNum);
            console.log('Updated Information: [Vehicle Engine] ' + car2.engNum);
            //-------------end: ChangeCarEng------------

        }
        else{
            console.log('This Engine belongs to '+otherCar+' vehicle.Please try again.');
        }
        
    }

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit your Action. Error: ${error}`);
        process.exit(1);
    }
}

//main();
