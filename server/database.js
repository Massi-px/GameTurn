import mariadb from "mariadb";

export default function getConnection(){

    return mariadb.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'gameturn_admin',
        password: 'gameturn123',
        database: 'gameturn'
    });
}
