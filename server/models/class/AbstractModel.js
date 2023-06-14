import getConnection from '../../database.js';

export default class AbstractModel {

    constructor(tableName) {
        this.tableName = tableName;
    }

    async getConn(){
        return await getConnection();
    }

    async get(id) {
        const conn = await this.getConn();
        return (await conn.query(
            'SELECT * FROM ' + this.tableName + ' WHERE id = ?',
            [id]
        ))[0];
    }

    async getAll() {
        const conn = await this.getConn();
        return await conn.query(
            `SELECT * FROM ${this.tableName}`,
        );
    }

    async update(object) {
        const conn = await this.getConn();
        const columns = Object.keys(object);
        const values = Object.values(object);
        const updateQuery = columns.map(column => `${column} = ?`).join(', ');
        return await conn.query(
            `UPDATE ${this.tableName} SET ${updateQuery} WHERE id = ?`,
            [...values, object.id]
        );
    }

    async insert(obj) {
        const conn = await this.getConn();
        const columns = Object.keys(obj);
        const values = Object.values(obj);

        const columnString = columns.join(', ');
        const placeholderString = new Array(values.length).fill('?').join(', ');

        const res = await conn.query(`INSERT INTO ${this.tableName} (${columnString}) VALUES (${placeholderString})`
            , values
        );
        return { id: res.insertId.toString() };
    }

    async delete(id) {
        const conn = await this.getConn();
        return await conn.query(`DELETE FROM ${this.tableName} WHERE id = ?`,
            [id])
    }

    async getBy(object){
        const conn = await this.getConn();
        const column = Object.keys(object)[0];
        return (await conn.query(
            `SELECT * FROM users WHERE ${column} = ?`,
            [object[column]]
        ));
    }

}