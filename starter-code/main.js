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
        switch (option) {
          
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
            //Listado por nombre de TODAS las compañias fundadas en Febrero 2004
            db.collection('companies').find({ $and: [{ "founded_year": 2004 }, { "founded_month": 2 }] }, {name: 1, _id: 0}).toArray((error, result) => {
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
            //Listado por nombre de compañías fundadas de abril a junio de 2004 ordenadas por fecha.
            db.collection('companies').find({ $and: [{ "founded_year": 2004 }, { $and: [{ "founded_month": { $gte: 4 } }, { "founded_month": { $lte: 6 } }] }] }, {name: 1, _id: 0}).sort( { "founded_month": 1, "founded_day": 1 } ).toArray((error, result) => {
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
            //Compañias con oficinas en Barcelona
            db.collection('companies').find({"offices.city": "Barcelona"}).toArray((error, result) => {
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
            //Lista de 10 compañiascon más empleados en orden ascendente (muestra nombre y empleados)
            db.collection('companies').find({}, {name: 1, _id: 0}).sort( {"number_of_employees": -1} ).limit(10).toArray((error, result) => {
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
            //Compañía con nombre Facebook
            db.collection('companies').find({"name": "Facebook"}, {name: 1, _id: 0}).toArray((error, result) => {
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
            //Cuantos empleados tiene Facebook
            db.collection('companies').find({ "name": "Facebook" }, { name: 1, number_of_employees: 1, _id: 0}).toArray((error, result) => {
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
            //Lista de los nombres de todos los productos de Facebook
            db.collection('companies').find({ $and: [{ "name": "Facebook" }, { "products.name": { $exists: true } } ]}, { name: 1, _id: 0 }).toArray((error, result) => {
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
          //   //Lista de gente trabajando en Facebook ahora
          //   db.collection('companies').find()
          //   break;
          
          // case "12":
          //   //Cuanta gente ya no está trabajando en Facebook ya
          //   db.collection('companies').find()
          //   break;
          
          // case "13":
          //   //Lista todas las compañias donde ha trabajado "david-ebersman"
          //   db.collection('companies').find()
          //   break;
          
          // case "14":
          //   //Lista por nombre de los competidores de Facebook
          //   db.collection('companies').find()
          //   break;
          
          case "15":
            //Nombres de las compañias que tienen "social-networking" en tag-list (value of field is a string, check regex operators)
            db.collection('companies').find({ tag_list: { $regex: "social-networking" } }, {name: 1, _id: 0}).toArray((error, result) => {
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
            //Cuantas compañias tienen "social-networking" en tag-list y se han fundado entre 2002 y 2016 incluidos
            db.collection('companies').find({ $and: [{ tag_list: { $regex: "social-networking" } }, { $and: [{ "founded_year": { $gte: 2002 } }, { "founded_year": { $lte: 2016 } }] }] }).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          // case "17":
          //   //Nombres y localizaciones de las compañias que tienen oficinas en Londres
          //   db.collection('companies').find({"offices.city": "London"}, {name: 1, offices: 1, _id: 0}).toArray((error, result) => {
          //     if (error) {
          //       console.log(error);
          //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //     } else {
          //       console.log(result);
          //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //     }
          //   })
          //   break;
          
          case "18":
            //Cuantas compañías que tienen "social-networking" en tag-list y se han fundado entre 2002 y 2016 incluidos tienen oficinas en New York
            db.collection('companies').find({ $and: [{ tag_list: { $regex: "social-networking" } }, { $and: [{ "founded_year": { $gte: 2002 } }, { "founded_year": { $lte: 2016 } }] }, {"offices.city": "New York"}] }).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          // case "19":
          //   //BONUS: Find all the distinct categories, so list all unique categories use distinct method
          //   db.collection('companies').distinct().toArray((error, result) => {
          //     if (error) {
          //       console.log(error);
          //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //     } else {
          //       console.log(result);
          //       rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //     }
          //   })
          //   break;
          
          case "20":
            //BONUS: How many companies mention Google in their overview.
             db.collection('companies').find({ overview: { $regex: "Google" } }).count((error, result) => {
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
            //BONUS: Find companies founded in 2004 and having 5 or more rounds of funding. // CANNOT calculate the average amount raised.
            db.collection('companies').find({ $and: [{'founded_year': 2004}, { $where: "this.funding_rounds.length > 4" } ]}, {name: 1, _id: 0}).toArray((error, result) => {
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
`);
}
