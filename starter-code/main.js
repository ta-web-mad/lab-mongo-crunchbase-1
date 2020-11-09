const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const url = `mongodb://localhost:27017/crunchbase`

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');

      function mainMenu() {
        clear();
        printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option){
          case "1":
           //Listar todas las compañías por nombre
            db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "2":
          //Contar todas las compañías
             db.collection('companies').find({}, {name: 1, _id: 0}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "3":
            //Contar todas las compañías por nombre fundadas en el 2004
              db.collection('companies').find({"funding_rounds.funded_year": 2004}, {name: 1, _id: 0}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "4":
              //Contar todas las compañías por nombre fundadas en el 2004
              db.collection('companies').find({ $and: [{ 'founded_month': 2 }, { 'founded_year': 2004 }] }, {name: 1, _id: 0}).toArray((error, result) => {
                  if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  } else {
                    console.log(result);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  }
                })
            break;
          
            case "5":
              //Contar todas las compañías por nombre fundadas en el 2004 entre abril y junio
              db.collection('companies').find({ $and: [{ 'founded_month': { $gt: 3 } }, { 'founded_month': { $lt: 7 } }, { 'founded_year': { $eq: 2004 } }] }, {name: 1, _id: 0}).sort( { 'founded_month' : 1, 'founded_day' : 1 }).toArray((error, result) => {
                  if (error) {
                    console.log(error);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  } else {
                    console.log(result);
                    rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                  }
                })
            break;
          
              case "6":
                //What companies have offices in "Barcelona".
                db.collection('companies').find({'offices.city' : 'Barcelona' }, {name: 1, _id: 0}).toArray((error, result) => {
                    if (error) {
                      console.log(error);
                      rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                    } else {
                      console.log(result);
                      rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                    }
                  })
            break;
          
            case "7":
              //List the 10 companies with more employees sorted ascending (show name and employees).
              db.collection('companies').find({}, {name: 1, _id: 0}).sort( {'number_of_employees': -1} ).limit(10).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "8":
              //Find the company with the name "Facebook".
              db.collection('companies').find({'name': 'Facebook'}, {name: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "9":
              //How many employees has Facebook?.
              db.collection('companies').find({'name': 'Facebook'}, {name: 1, number_of_employees: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "10":
              //List the name of all the products of Facebook
            db.collection('companies').find({ 'name': 'Facebook' }, { name: 1, 'products.name': 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

              // case "11":
              //   //List the name of all the products of Facebook
              // db.collection('companies').find({ 'name': 'Facebook' }, {name: 1, _id: 0}).toArray((error, result) => {
              //     if (error) {
              //       console.log(error);
              //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              //     } else {
              //       console.log(result);
              //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              //     }
              //   })
              //   break;
          
            //   case "12":
            //   List the name of all the products of Facebook 
            // db.collection('companies').find({ 'name': 'Facebook' }, {name: 1, _id: 0}).toArray((error, result) => {
            //     if (error) {
            //       console.log(error);
            //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            //     } else {
            //       console.log(result);
            //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            //     }
            //   })
            // break;
          
            // case "13":
            //   // List all the companies where "david-ebersman" has worked.
            // db.collection('companies').find({ 'name': 'Facebook' }, {name: 1, _id: 0}).toArray((error, result) => {
            //     if (error) {
            //       console.log(error);
            //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            //     } else {
            //       console.log(result);
            //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            //     }
            //   })
            //   break;
        
            case "15":
              // Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
            db.collection('companies').find({'tag_list': {$regex: 'social-networking'}}, { name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "16":
              // How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
            db.collection('companies').find({ $and: [{'tag_list': {$regex: 'social-networking'}}, { 'founded_year': { $gt: 2001 } }, { 'founded_year': { $lt: 2017 } }  ]}, { name: 1, _id: 0 }).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "17":
              // Names and locations of companies that have offices in London
            db.collection('companies').find({"offices.city": 'London'} , { name: 1, 'offices.country_code': 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "18":
              // How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
            db.collection('companies').find({ $and: [{ 'tag_list': { $regex: 'social-networking' } }, { 'founded_year': { $gt: 2001 } }, { 'founded_year': { $lt: 2017 } }, {"offices.city": 'New York'} ]} , { name: 1, 'offices.country_code': 1, _id: 0 }).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "19":
              // Find all the distinct categories, so list all unique categories use distinct method
            // db.collection('companies').find().count((error, result) => {
            //     if (error) {
            //       console.log(error);
            //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            //     } else {
            //       console.log(result);
            //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
            //     }
            //   })
            // break;
          
            case "20":
              // How many companies mention Google in their overview.
        db.collection('companies').find({ 'overview': { $regex: 'Google' } }, { name: 1, _id: 0 }).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "21":
              // Find companies founded in 2004 and having 5 or more rounds of funding. // Referencia $where encontrada en https://stackoverflow.com/questions/7811163/query-for-documents-where-array-size-is-greater-than-1
        db.collection('companies').find({ $and: [{'founded_year': 2004}, { $where: "this.funding_rounds.length > 5" } ]}, { name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
        }
      });
      }

      mainMenu()
  }
});



function printMenu(){
	console.log(`
0.- Exit
1.- List by name all companies.
2.- How many companies are there?
3.- How many companies were founded in 2004?
4.- List by name all companies founded in february of 2004.
5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
6.- What companies have offices in "Barcelona".
7.- List the 10 companies with more employees sorted ascending (show name and employees).
8.- Find the company with the name "Facebook"
9.- How many employees has Facebook?
10.- List the name of all the products of Facebook
11.- List the people that are working at Facebook right now (check relationships field)
12.- How many people are not working anymore at Facebook
13.- List all the companies where "david-ebersman" has worked.
14.- List by name the competitors of Facebook
15.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
16.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
17.- Names and locations of companies that have offices in London
18.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
19.- Find all the distinct categories, so list all unique categories use distinct method
20.- How many companies mention Google in their overview.
21.- Find companies founded in 2004 and having 5 or more rounds of funding, calculate the average amount raised.
`);
}
