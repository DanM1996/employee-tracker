// Declaring variables that tie to app functionality
const { prompt } = require('inquirer');
const inquirer = require('inquirer');
const db = require('./db/connection');
const Fnc = require('./lib/functions');
const cTable = require('console.table');

// This function loads the entire menu where you have 7 choices on what you'd like to do
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

// Calling the viewDepartment function from another file and adding it here, then executing the vDepartment function to view all departments
async function vDepartment()  {
    // the [rows] is everything that comes from viewDepartment
    await Fnc.viewDepartment().then(([rows]) => {
        let department = rows;
        console.table(department)
    })
        .then(() => loadPrompts())



};

// Same thing as the department function, but with the roles tables
const vRoles = () => {
    Fnc.viewRoles().then(([rows]) => {
        let roles = rows;
        console.table(roles)
    })
        .then(() => loadPrompts())
};

// Same thing as the previous two functions, but deals with the list of Employees
const vEmployees = () => {
    Fnc.viewEmployees().then(([rows]) => {
        let employees = rows;
        console.table(employees)
    })
        .then(() => loadPrompts())

};


// Function that adds new departments to the department table
const aDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please provide the name of the new department.'
        }])
        // After the prompt, takes user response and plugs it into an SQL string that inserts the new data into the department table
        .then(function (response) {
            console.log(response.newDepartment);
            const params = [response.newDepartment]
            db.query(`INSERT INTO department (name) VALUES (?)`, params, (err, response) => {
                if (err) {
                    res.status(400);
                }
            }),
            // Executing main function afterwards to reload selection screen
                loadPrompts();
        });

}

// Exact same thing as the department function, but specifically with roles. There are more functions here and different data types.
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

// Near identical to adding a Role
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
            message: "What is the new employee's role? (Use the ID number)"
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

// Function that allows you to select an employee from the list of available employees and then change their new role to one of the roles available in the table
const uEmployee = () => {
    // Declaring local variables
    let employee;
    let role;

    // Running a querey that selects all employees from the employee table
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            throw (err)
        }
        // Maps the employee table (defined as results) so that it doesn't affect the existing database and returns 2 values: name as the first and last name, value as the id
        const chooseEmployee = results.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            };
        });
        console.log(chooseEmployee)
        inquirer
        // Executes the prompt to select an employee, created as a choices list which is the variable form of the mapped array
        .prompt([
            {
                name: 'employeeUpdated',
                type: 'list',
                message: 'Select employee to update',
                choices: chooseEmployee
            }
        ])
        // Takes the employee selected and stores it as the parameter data
        .then((data) => {
            // Declaring employee to equal the id of the employee selected
            employee = data.employeeUpdated;
            console.log(employee);

            // Querying the role list, similar to what happened with employees above
            db.query('SELECT * FROM role', (err, results) => {
                if (err) {
                    throw(err)
                }
                // A repeat of the mapped array with employees, just with a different data table now
                const chooseRole = results.map(role => {
                    return {
                        name: `${role.title}`,
                        value: `${role.id}`
                    };
                });

                // Runs a prompt that lists out choices taken from the mapped array
                inquirer
                .prompt([
                    {
                        name: 'roleUpdated',
                        type: 'list',
                        message: 'Select a new role for the employee',
                        choices: chooseRole
                    }
                ])
                // Takes the id of the selected role and plugs it into the data parameter
                .then((data) => {
                    role = data.roleUpdated;
                    console.log(role);

                    // Executes the update querey by tagging the selected role (by it's ID) to the selected employee (by its ID) and overwrites the previous role
                    db.query('UPDATE employee SET ? WHERE ?', [{role_id: role}, {id: employee}], (err, res) => {
                        if (err) {
                            throw err
                        }
                        // Runs the selection list home screen prompt after executing
                        loadPrompts();
                    })
                })
            })
        })
    })
}
