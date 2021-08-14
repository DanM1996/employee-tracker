const { prompt } = require('inquirer');
const inquirer = require('inquirer');
const db = require('./db/connection');
const Fnc = require('./lib/functions');
const cTable = require('console.table');

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
                    name: "Update an Employee's Role",
                    value: 6
                },
                {
                    name: 'Quit',
                    value: 'default'
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
                    aDepartment()
                    break;
                case 4:
                    aRole()
                    break;
                case 5:
                    aEmployee()
                    break;
                case 6:
                    uEmployee()
                    break;
                // quit function goes here (if there is one)
                default:
                    return;
            }
        })
}
loadPrompts();

async function vDepartment()  {
    // the [rows] is everything that comes from viewDepartment
    await Fnc.viewDepartment().then(([rows]) => {
        let department = rows;
        console.table(department)
    })
        .then(() => loadPrompts())



};

const vRoles = () => {
    Fnc.viewRoles().then(([rows]) => {
        let roles = rows;
        console.table(roles)
    })
        .then(() => loadPrompts())
};

const vEmployees = () => {
    Fnc.viewEmployees().then(([rows]) => {
        let employees = rows;
        console.table(employees)
    })
        .then(() => loadPrompts())

};

const aDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please provide the name of the new department.'
        }])
        .then(function (response) {
            console.log(response.newDepartment);
            const params = [response.newDepartment]
            db.query(`INSERT INTO department (name) VALUES (?)`, params, (err, response) => {
                if (err) {
                    res.status(400);
                }
            }),
                loadPrompts();
        });

}

const aRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Please provide the name of the new Role.'
        },
        {
            type: 'number',
            name: 'newSalary',
            message: 'Enter the salary for the new position, no commas.'
        },
        {
            type: 'number',
            name: 'newDepartmentID',
            message: 'Enter a department ID.'
        }
    ])
        .then(function (response) {
            const params = [response.newRole, response.newSalary, response.newDepartmentID]
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params, (err, response) => {
                if (err) {
                    res.status(400);
                }
            }),
                loadPrompts();
        });

}

const aEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirstName',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name: 'newLastName',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'number',
            name: 'newRoleId',
            message: "What is the new employee's role?"
        },
        {
            type: 'number',
            name: 'newManagerId',
            message: "Who is the new Employee's manager?"
        },
    ])
        .then(function (response) {
            const params = [response.newFirstName, response.newLastName, response.newRoleId, response.newManagerId]
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, params, (err, response) => {
                if (err) {
                    res.status(400);
                }
            }),
                loadPrompts();
        });

}

async function uEmployee () {
    const employeeArray = await Fnc.viewEmployees().then(([rows]));
    // console.log(employeeArray)
    // console.log(employeeArray.TextRow.id)
    
    let table = rows;
    console.log(table)
    // const vEmployees = () => {
    //     Fnc.viewEmployees().then(([rows]) => {
    //         let employees = rows;
    //         console.table(employees)
    //     })
    //         .then(() => loadPrompts())
    
    // };

    const rolesArray =  await Fnc.viewRoles();

    const chooseEmployee = employeeArray.map(({ id, first_name, last_name }) =>
        ({ name: first_name + last_name, value: id }));
        // console.log(chooseEmployee)

    const chooseRole = rolesArray.map(({ id, title }) =>
        ({ name: title, value: id }));
    
    const { employeeChoice } = inquirer.prompt([
        {
            type: 'list',
            name: 'employeeID',
            message: 'Which employee would you like to update?',
            choices: chooseEmployee
        }
    ])

    const { roleChoice } = inquirer.prompt([
        {
            type: 'list',
            name: 'roleID',
            message: "What is the employee's new role?",
            choices: chooseRole
        },
        {
            type: 'number',
            name: 'updatedManagerId',
            message: "Who is the Employee's new manager? (if applicable)"
        },
    ])
    .then(Fnc.updateEmployee())
    .then(() => loadPrompts())
}
