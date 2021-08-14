const db = require('../db/connection');

class Fnc {
    // referencing the connection in the class
    constructor(db) {
        this.db = db
    }
    viewDepartment = () => {
        const sql = `SELECT * FROM department;`
        return this.db.promise().query(sql);
    };

    viewRoles = () => {
        const sql = `SELECT * FROM role;`
        return this.db.promise().query(sql);
    };

    viewEmployees = () => {
        const sql = `SELECT * FROM employee;`
        return this.db.promise().query(sql);
    };

    // function that takes that variable and inserts it into the department table
    addDepartment = () => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const value = ('addedDepartment.name');
        console.log(value);
        return this.db.promise().query(sql, value);
        }

}

module.exports = new Fnc(db);