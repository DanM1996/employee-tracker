const inquirer = require('inquirer');
const db = require('./db/connection');
const Fnc = require('./lib/functions');

const loadPrompts = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 0
                },
                {
                    name: 'View All Roles',
                    value: 1
                },
                {
                    name: 'View All Employees',
                    value: 2
                },
                {
                    name: 'Add a Department',
                    value: 3
                },
                {
                    name: 'Add a Role',
                    value: 4
                },
                {
                    name: 'Add an Employee',
                    value: 5
                },
                {
                    name: 'Update an Employee',
                    value: 6
                }

            ]
        }])
        .then(res => {

            let choice = res.selection
            switch (choice) {
                case 0:
                    vDepartment()
                    break;
                case 1:
                    vRoles()
                    break;
                case 2:
                    vEmployees()
                    break;
                case 3:
                    addDepartment()
                    break;
                case 4:
                    addRole()
                    break;
                case 5:
                    addEmployee()
                    break;
                case 6:
                    updateEmployee()
                    break;
                // quit function goes here (if there is one)
                default:
                    return;
            }
        })
}
const vDepartment = () => {
    // the [rows] is everything that comes from viewDepartment
    Fnc.viewDepartment().then(([rows]) => {
        let department = rows;
        console.table(department)
    })
        .then(() => loadPrompts())

    // creating new array that maps the array to an object
    // const departnemtRows = department.map(({ id, name }) => {
    //     ({ name: name, value: id});
    // });

};
const vRoles = () => {
    // the [rows] is everything that comes from viewDepartment
    Fnc.viewRoles().then(([rows]) => {
        let roles = rows;
        console.table(roles)
    })
        .then(() => loadPrompts())

    // creating new array that maps the array to an object
    // const departnemtRows = department.map(({ id, name }) => {
    //     ({ name: name, value: id});
    // });

};
const vEmployees = () => {
    // the [rows] is everything that comes from viewDepartment
    Fnc.viewEmployees().then(([rows]) => {
        let employees = rows;
        console.table(employees)
    })
        .then(() => loadPrompts())

    // creating new array that maps the array to an object
    // const departnemtRows = department.map(({ id, name }) => {
    //     ({ name: name, value: id});
    // });

};

loadPrompts();