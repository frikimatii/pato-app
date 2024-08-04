import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync("basededatos.db");

const allRows = await db.getAllAsync('SELECT * FROM Usuarios_nuevos')
for (const row of allRows) {
    console.log(row.id, row.value, row.intValue)
}

