const db = require('../db/connection');

class Fnc {
    // referencing the connection in the class
    constructor(db) {
        this.db = db
    }
    // Runs the sql prompt to select all data from departments, while returning the pathing to that table
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
}

module.exports = new Fnc(db);