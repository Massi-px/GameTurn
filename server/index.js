import mariadb from 'mariadb';
import express from 'express'

const app = express();
export default function getConnection(){

    return mariadb.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'gameturn_admin',
        password: 'gameturn123',
        database: 'gameturn'
    });
}

app.get('/mydata', async (req, res) => {
    const connection = await getConnection();
    const rows = await connection.query('SELECT * FROM mytable');
    res.send(rows);
    await connection.end();
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
