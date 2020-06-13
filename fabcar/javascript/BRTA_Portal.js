const find = require('./query.js');
const invoke = require('./invoke.js');

console.log("**********Welcome to BRTA**********");
    console.log("                    _______________              ");
    console.log("                   / /----|  |----|\             ");
    console.log("                  / /     |  |    | \            ");
    console.log("   ______________/ /______|  |____|  \__________ ");    
    console.log("  /     ____                          ____      |");
    console.log(" /     /    \                        /    \     |");
    console.log("/_____/      \______________________/      \____|");
    console.log("      \      /                      \      /     ");
    console.log("       \____/                        \____/      ");

    console.log(" ----------------Menu----------------");
    console.log(" ###Select option & press 'enter'###");
    console.log("|_____________________________________|");
    console.log("# press 1 to view Vehicle Record");
    console.log("# press 2 to search info by Vehicle Serical");
    console.log("# press 3 to Identify Stolen Engine");
    console.log("# press 4 to Create New Vehicle Record");
    console.log("# press 5 to Change Vehicle Owner");
    console.log("# press 6 to Change Vehicle Color");
    console.log("# press 7 to Change Vehicle Engine Serial Number");

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
});

rl.on('line',(userInput) => {
    console.clear();

    if(userInput.trim() == '1'){
        console.log('view all');
        find('all');
    }
    else 
    {
        var values = userInput.split(" "); 

        if(values[0] == '2'){

            console.log('Provide Vehicle Serial Number:');

            if(values[1] != null){
                console.log(values[1]);
                find(values[1]);
            }
            else{
                console.log('[Example: 2 CARX] *press Enter*');
            }

        }
        else if(values[0] == '3'){
            console.log('Investigating....');
            console.log('stolen engine');
        }
        else if(values[0] == '4'){
            console.log('add vehicle');

            if(values[1] != null){
                invoke(values);
            }
            else{
                console.log('[Example:4 CARX brandName vehicleModel vehicleColor ownerName registrationNumber bodyNumber engineNumber]\n *press Enter*');
            }
        }
        else if(values[0] == '5'){
            console.log('Change Vehicle Owner Name:');

            if(values[1] != null){
                invoke(values);
            }
            else{
                console.log('[Example:5 CARX newOwnerName] *press Enter*');
            }
        }
        else if(values[0] == '6'){
            console.log('Change Vehicle Color:');

            if(values[1] != null){
                //console.log(values[1]);
                invoke(values);
            }
            else{
                console.log('[Example:6 CARX colorName] *press Enter*');
            }

        }
        else if(values[0] == '7'){
            console.log('Change Engine Serial Number:');

            if(values[1] != null){
                console.log(values[1]);
            }
            else{
                console.log('[Example:7 INZ-BXXXX] *press Enter*');
            }

        }
    }

});