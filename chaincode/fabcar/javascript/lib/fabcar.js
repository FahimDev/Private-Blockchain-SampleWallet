/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                color: 'Red Wine',
                make: 'Toyota',
                model: 'Premio',
                owner: 'Mahir Faisal',
                regNum:'RajshahiMetro 19-1769',
                bodyNum: 'NZI-1021',
                engNum:'INZ-B1021',
            },
            {
                color: 'Red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Shihab Rahman',
                regNum:'DhakaMetro 16-1569',
                bodyNum: 'NZI-1022',
                engNum:'INZ-B1022',
            },
            {
                color: 'Purple',
                make: 'Tata',
                model: 'Nano',
                owner: 'Shisir Islam',
                regNum:'DhakaMetro 11-1963',
                bodyNum: 'NZI-1023',
                engNum:'INZ-B1023',
            },
            {
                color: 'Yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
                regNum:'ChottoMetro 12-1963',
                bodyNum: 'NZI-1024',
                engNum:'INZ-B1024',
            },
            {
                color: 'Silver',
                make: 'Tesla',
                model: 'CyberTruck',
                owner: 'Steve Jobber',
                regNum:'DhakaMetro 13-1963',
                bodyNum: 'NZI-1025',
                engNum:'INZ-B1025',
            },
            {
                color: 'White',
                make: 'Toyota',
                model: 'Corolla',
                owner: 'Romynul Shuvo',
                regNum:'DhakaMetro 14-1963',
                bodyNum: 'NZI-1026',
                engNum:'INZ-B1026',          
            },
            {
                color: 'Silver',
                make: 'Toyota',
                model: 'Corolla',
                owner: 'Bevan',
                regNum:'RajshahiMetro 15-1963',
                bodyNum: 'NZI-1026',
                engNum:'INZ-B1026',          
            },
            {
                color: 'Black',
                make: 'Honda',
                model: 'Vasal',
                owner: 'Antonin Islam',
                regNum:'RajshahiMetro 16-1963',
                bodyNum: 'NZI-1027',
                engNum:'INZ-B1027',          
            },
            {
                color: 'Silver',
                make: 'Toyota',
                model: 'Allion A15',
                owner: 'Ariful Islam Fahim',
                regNum:'DhakaMetro 17-1963',
                bodyNum: 'NZI-1028',
                engNum:'INZ-B1028',          
            },
            {
                color: 'Black',
                make: 'Toyota',
                model: 'Noah',
                owner: 'Mik Mohi',
                regNum:'DhakaMetro 18-1963',
                bodyNum: 'NZI-1029',
                engNum:'INZ-B1029',          
            },
            {
                color: 'White',
                make: 'Nissan ',
                model: 'Bluebird',
                owner: 'Salman A Auntor',
                regNum:'ChottoMetro 18-1647',
                bodyNum: 'NZI-1030',
                engNum:'INZ-B1030',          
            },
            {
                color: 'Blue',
                make: 'TATA ',
                model: 'ACE',
                owner: 'Sumaita',
                regNum:'ChottoMetro 19-1547',
                bodyNum: 'NZI-1031',
                engNum:'INZ-B1031',          
            },
            {
                color: 'White',
                make: 'Proton ',
                model: 'Saga',
                owner: 'Tanzin',
                regNum:'ChottoMetro 19-1467',
                bodyNum: 'NZI-1032',
                engNum:'INZ-B1032',          
            },
            
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }
    
    async queryDingDong(ctx) {
    
        console.log("trustMe");
        return "HelloWorld";
    }

    async createCar(ctx, carNumber, make, model, color, owner, regNum, bodyNum, engNum) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
            regNum,
            bodyNum,
            engNum, 
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
    
    async changeCarColor(ctx, carNumber, newColor) {
        console.info('============= START : changeCarColor ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.color = newColor;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarColor ===========');
    }
    async changeCarEng(ctx, carNumber, newEng) {
        console.info('============= START : changeCarEngine ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());

        //--------------Start : CheckEveryEngine--------------
        found = 1;
            for(i=0;i<=12;i++)
            {
                cars = "CAR"+i;
                const carAsBytes = await ctx.stub.getState(cars); // get the car from chaincode state
                const otherCar = JSON.parse(carAsBytes.toString());

                if(car.engNum != otherCar.engNum)
                {
                    found = 0;
                }
                else 
                {
                    found = 1; 
                }
            }      
                if( found == 0)
                {
                    car.engNum = newEng;
                    await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
                }
                else{
                    throw new Error(`${car.engNum} This Engine belongs to the car number : ${cars}. Please check the Engine`);
                }    
            //--------------End : CheckEveryEngine--------------

        console.info('============= END : changeCarEngine ===========');
    }
    /*
    async changeCarReg(ctx, carNumber, newCarNumber) {
        console.info('============= START : changeCarRegistrationNumber ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.color = newCarNumber;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarRegistrationNumber ===========');
    }
    */

}

module.exports = FabCar;
