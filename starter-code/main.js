const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

mongoClient.connect(`mongodb://localhost:27017/crunchbase`, (error, db) => {

  if (error) { console.log('Error trying to connect to the Database:', error) } else { console.log('Connection established correctly!! 😬');

    function mainMenu() {
      clear();
      printMenu();

      rl.question('Type an option: ', (option) => {
        switch (option) {
          case "1":
            // 1.- List by name all companies.
            db.collection('companies').find({}, { name: 1, _id: 0 }).toArray((error, result) => {
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
            // 2.- How many companies are there?
            db.collection('companies').find({}, { name: 1, _id: 0 }).count((error, result) => {
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
            // 3.- How many companies were founded in 2004?
            db.collection('companies').find({ "funding_rounds.funded_year": 2004 }, { name: 1, _id: 0 }).count((error, result) => {
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
              // List by name all companies founded in february of 2004.
              db.collection('companies').find({$and: [{"funding_rounds.founded_year": 2004 }, {"funding_rounds.founded_month": 2 }]}, { name: 1, _id: 0 }).toArray((error, result) => {
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
              // List by name all companies founded in the summer of 2004 (april to june) sorted by date.
              db.collection('companies').find({$and: [{"founded_year": 2004 }, {"founded_month": {$gt: 4}}, {"founded_month": {$lt: 6}} ]}, { name: 1, _id: 0 }).toArray((error, result) => {
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
              // What companies have offices in "Barcelona".
              db.collection('companies').find({offices: {$elemMatch: {city: "Barcelona" }}}, { name: 1, _id: 0 }).toArray((error, result) => {
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
              db.collection('companies').find({}, { name: 1, _id: 0 }).sort({"number_of_employees": 1}).limit(10).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

              case "8":  ////// Teo aqui no se como hacer para que me salga Facebook sin los corchetes
              //Find the company with the name "Facebook"
              db.collection('companies').find({ name: "Facebook"}, { name: 1, _id: 0 }).toArray((error, result) => {
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
              //How many employees has Facebook?
              db.collection('companies').find({ name: "Facebook"}, {"number_of_employees": 1}, { name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

              case "10": ///// Teo me sale el Array de objetos pero no el nombre, he buscado el metodo pretty(), que se supone que lo pone para leerlo de forma facil para humanos o eso he entendido, pero no me sale como quiero. 
              // Aparte ahora no se que he tocado que aun dejandolo como antes me da un error brutal que me saca del node.....:-(
              //db.collection('companies').find({ name: "Facebook"},{ "products.name": 1}, {name: 1, _id: 0 }).pretty().toArray((error, result) => {


              //List the name of all the products of Facebook
              db.collection('companies').find({ name: "Facebook"},{ "products.name": 1}, {name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

              case "11": //// por que me sale lo mismo poniendo .toArray o poniendo count???
              //List the people that are working at Facebook right now (check relationships field)
              db.collection('companies').find({ name: "Facebook"}, {"relationships": 1}, { name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

              case "12": // creo que funciona pero por algo que me faltara no sale...
              //List all the companies where "david-ebersman" has worked.
              db.collection('companies').find({ relationships: {$elemMatch:{person: "david-ebersman"}}}, { name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;

              case "13": 
              //List by name the competitors of Facebook
              db.collection('companies').find({ name: "Facebook"}, {"competitions.competitor.name": 1}, { name: 1, _id: 0 }).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;
              

          // Code here next cases!
        }
      });
    }

    mainMenu()
  }
});



function printMenu() {
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
    12.- List all the companies where "david-ebersman" has worked.
    13.- List by name the competitors of Facebook
    14.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
    15.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
    16.- Names and locations of companies that have offices in London
    17.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
    `
  );
}
