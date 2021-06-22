const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

mongoClient.connect(`mongodb://localhost:27017/crunchbase`, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database:', error);
  } else {
    console.log('Connection established correctly!! 😬');

    function mainMenu() {
      clear();
      printMenu();

      rl.question('Type an option: ', option => {
        switch (option) {
          case '1':
            // 1.- List by name all companies.
            db.collection('companies')
              .find({}, { name: 1, _id: 0 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          case '2':
            // 2.- How many companies are there?
            db.collection('companies')
              .find({}, { name: 1, _id: 0 })
              .count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          case '3':
            // 3.- How many companies were founded in 2004?
            db.collection('companies')
              .find({ 'funding_rounds.funded_year': 2004 }, { name: 1, _id: 0 })
              .count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          case '4':
            // 4.- List by name all companies founded in february of 2004.
            db.collection('companies')
              .find(
                {
                  $and: [{ founded_year: 2004, founded_month: 2 }],
                },
                { name: 1, _id: 0 }
              )
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
          case '5':
            // 4.- List by name all companies founded in february of 2004.
            db.collection('companies')
              .find({ $and: [{ founded_year: 2004 }, { founded_month: { $gte: 4 } }, { founded_month: { $lte: 6 } }] }, { name: 1, _id: 0 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 6.- What companies have offices in "Barcelona".
          case '6':
            db.collection('companies')
              .find({ 'offices.city': { $in: ['Barcelona'] } }, { name: 1, _id: 0 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 7.- List the 10 companies with more employees sorted ascending (show name and employees).
          case '7':
            db.collection('companies')
              .find({ number_of_employees: { $gte: 1 } }, { name: 1, _id: 0, number_of_employees: 1 })
              .limit(10)
              .sort({ number_of_employees: -1 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 8.- Find the company with the name "Facebook"
          case '8':
            db.collection('companies')
              .find({ name: 'Facebook' })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 9.- How many employees has Facebook?
          case '9':
            db.collection('companies')
              .find({ name: 'Facebook' }, { _id: 0, name: 1, number_of_employees: 1 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  console.log(result[0].number_of_employees);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 10.- List the name of all the products of Facebook
          case '10':
            db.collection('companies')
              .find({ name: 'Facebook' }, { _id: 0, products: 1 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  result[0].products.forEach(elm => console.log(elm.name));
                  // console.log();
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 11.- List the people that are working at Facebook right now (check relationships field)

          case '11':
            db.collection('companies')
              .find({ name: 'Facebook' }, { _id: 0, relationships: 1 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  result[0].relationships.forEach(elm => console.log(elm.person.first_name + ' ' + elm.person.last_name));
                  // console.log();
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;

          // 12.- List all the companies where "david-ebersman" has worked.
          case '12':
            db.collection('companies')
              .find({}, { _id: 0, relationships: 1 })
              .toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                } else {
                  let filter = result[0].relationships.filter(elm => console.log(elm));
                  // console.log(filter);
                  rl.question(`\nType enter to continue: `, answer => {
                    mainMenu();
                  });
                }
              });
            break;
        }
      });
    }

    mainMenu();
  }
});

function printMenu() {
  // console.log(`
  // 0.- Exit
  // 1.- List by name all companies.
  // 2.- How many companies are there?
  // 3.- How many companies were founded in 2004?
  // 4.- List by name all companies founded in february of 2004.
  // 5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
  // 6.- What companies have offices in "Barcelona".
  // 7.- List the 10 companies with more employees sorted ascending (show name and employees).
  // 8.- Find the company with the name "Facebook"
  // 9.- How many employees has Facebook?
  // 10.- List the name of all the products of Facebook
  // 11.- List the people that are working at Facebook right now (check relationships field)
  // 12.- List all the companies where "david-ebersman" has worked.
  // 13.- List by name the competitors of Facebook
  // 14.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
  // 15.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
  // 16.- Names and locations of companies that have offices in London
  // 17.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
  // `);
}
