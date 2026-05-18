const mysql = require('mysql2');

// kapcsolat létrehozása
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'telekinaplo'
});

// csatlakozás
connection.connect(err => {
  if (err) {
    console.error('Hiba:', err);
    return;
  }
  console.log('Csatlakozva a MySQL-hez!');
});

// lekérdezés példa
connection.query('SELECT * FROM felhasznalo', (err, results) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
});



// kapcsolat lezárása
connection.end();