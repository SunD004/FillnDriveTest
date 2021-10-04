var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE ibans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            iban text
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO ibans (iban) VALUES (?)'
                    db.run(insert, ["FR7630001007941234567890185"])
                }
            });
    }
});


module.exports = db