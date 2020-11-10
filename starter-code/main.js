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
            //Contar todas las compañías
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
            //Contar todas las compañías por nombre fundadas en el 2004
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
            //Listar por nombre, todas las compañías fundadas en febrero de 2004
            db.collection('companies').find({ $and: [{ founded_year: 2004 }, { founded_month: 2 }] }, { name: 1, _id: 0 }).toArray((error, result) => {
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
            //Listar por nombre, todas las compañías fundadas en verano de 2004 (de abril a junio) y ordenadas por fecha
            db.collection('companies').find({ $and: [{ founded_year: 2004 }, { founded_month: { $gte: 4 } }, { founded_month: { $lte: 6 } }] }, { name: 1, _id: 0 }).sort({ founded_month: 1 }).toArray((error, result) => {
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
            //¿Qué compañias tienen oficinas en Barcelona?
            db.collection('companies').find({ offices: { $elemMatch: { city: "Barcelona" } } }, { name: 1, _id: 0 }).toArray((error, result) => {
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
            //Enumere las 10 empresas con más empleados ordenados de forma ascendente (mostrar nombre y empleados).
              db.collection('companies').find({ number_of_employees: { $type: 'int' } }, { name: 1, _id: 0}).sort({number_of_employees: -1}).toArray((error, result) => {
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
            //Busque la empresa con el nombre "Facebook"
            db.collection('companies').find({ name: "Facebook" }).toArray((error, result) => {
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
            //¿Cuantos empleados tiene Facebook?
            db.collection('companies').find({ name: "Facebook" }, { number_of_employees: 1, _id: 0 }).toArray((error, result) => {
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
            //Lista todos los nombres de los productos de Facebook
            db.collection('companies').find({ name: "Facebook" }, { "products.name": 1, _id: 0 }).toArray((error, result) => {
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
          //   //Enumere las personas que están trabajando en Facebook en este momento (marque el campo de relaciones)
          //     db.collection('companies').find({name: "Facebook"}, { "relationships.is_past: false": 1, _id: 0 }).toArray((error, result) => {
          //       if (error) {
          //         console.log(error);
          //         rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //       } else {
          //         console.log(result);
          //         rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //       }
          //     })
          //   break;
          // case "12":
          //   //Cuántas personas ya no trabajan en Facebook
          //     db.collection('companies').find().toArray((error, result) => {
          //       if (error) {
          //         console.log(error);
          //         rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //       } else {
          //         console.log(result);
          //         rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
          //       }
          //     })
          //   break;
          case "13":
            //Listar todas las empresas en las que ha trabajado "david-ebersman"
            db.collection('companies').find({ relationships: { $elemMatch: { "person.permalink": "david-ebersman" } } }, { name: 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;
          case "14":
            //Listar por nombre los competidores de Facebook
            db.collection('companies').find({ name: "Facebook" }, { "competitions.competitor.name": 1, _id: 0 }).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              } else {
                console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
              }
            })
            break;
          case "15":
            //Nombres de las empresas que tienen "redes sociales" en la lista de etiquetas (tenga en cuenta que el valor del campo es una cadena de verificación de operadores de expresiones regulares)
            db.collection('companies').find({ tag_list: "social-networking" }, { name: 1, _id: 0 }).toArray((error, result) => {
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
            //¿Cuántas empresas tienen "social-networking" en la "tag_list" y se fundaron entre 2002 y 2016 inclusive?
            db.collection('companies').find({$and: [{ tag_list: "social-networking" }, {founded_year: {$gte: 2002}}, {founded_year: {$lte: 2016}}]}, { name: 1, _id: 0 }).count((error, result) => {
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
            //Nombres y ubicaciones de empresas que tienen oficinas en Londres
            db.collection('companies').find({offices: {$elemMatch: {city: "London"}}}, {name: 1, offices: 1, _id: 0}).toArray((error, result) => {
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
            //Cuántas empresas tienen "social-networking" en "tag_list", se fundaron entre 2002 y 2016 inclusive y tienen oficinas en Nueva York?
            db.collection('companies').find({$and: [{ tag_list: "social-networking" }, {founded_year: {$gte: 2002}}, {founded_year: {$lte: 2016}}, {offices: {$elemMatch: {city: "New York"}}}]}, { name: 1, _id: 0 }).count((error, result) => {
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
