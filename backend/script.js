const mysql = require('mysql2');
const express = require('express');
const application = express();

//http://localhost:3000/api/felhasznalok connection létrehozása

application.listen(3000, () => {
  console.log('Szerver elindult a 3000-es porton');
});

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

application.get('/api/felhasznalok', (req, res) => {
  connection.query('SELECT * FROM felhasznalo', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Hiba a lekérdezés során' });
      return;
    }
    res.json(results);
  });
});


// Ne zárjuk le azonnal a kapcsolatot — hagyjuk nyitva a szerver élettartamáig.
// Zárjuk le csak a folyamat leállításakor (graceful shutdown).
process.on('SIGINT', () => {
  console.log('Leállítás: MySQL kapcsolat bontása...');
  connection.end(err => {
    if (err) console.error('Hiba a MySQL kapcsolat lezárásakor:', err);
    else console.log('MySQL kapcsolat lezárva.');
    process.exit(0);
  });
});