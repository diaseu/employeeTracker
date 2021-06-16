const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const cTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');

let db = mysql.createConnection('mysql://root:rootroot@localhost:8809/employees_db');
db.connect(function(err) { 
  if (err) throw err;
  start();
})

const start = () => {
  inquirer
  .prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Edit an employee', 'Remove an employee', 'Exit']
  })
    .then(({ action }) => {
      switch (action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Edit an employee':
          editEmployee();
          break;
        case 'Remove an employee':
          deleteEmployee();
          break;
        case 'Exit':
          process.exit()
      }
    })
    .catch(err => console.log(err))
}

const viewDepartments = () => {
  db.query(`SELECT department.name AS Departments FROM department`, (err, view) => {
    if (err) { console.log(err) }
    console.table(view);
    whatNow();
  })
}

const viewRoles = () => {
    db.query(`SELECT role.title, role.salary, department.name
    AS department FROM role LEFT JOIN department ON role.department_id = department.id`, (err, view) => {
    if (err) { console.log(err) }
    console.table(view);
      whatNow();
  })
}

const viewEmployees = () => {
  db.query(`SELECT employee.id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS role FROM employee LEFT JOIN role ON employee.role_id = role.id`, (err, view) => {
    if (err) { console.log(err) }
    console.table(view)
    whatNow();
  })
}

// const viewManagers = () => {
//   return db.promise().query(`SELECT employee.id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS role FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE role.title LIKE '%Manager%' OR role.title LIKE '%manager%'`)
// }

const whatNow = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nowWhat',
        choices: ["Continue", "Exit"],
        message: "What Now?"
      }
    ])
    .then(dataNow => {
      switch (dataNow.nowWhat) {
        case "Continue":
          start()
          break
        case "Exit":
          process.exit()
      }
    })
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Name of Department:"
      }
    ])
    .then(dataD => {
      let newDepartment = {
        name: dataD.name
      }
      console.log(`New Department Added! - ${dataD.name}`)
      db.query('INSERT INTO department SET ?', newDepartment, err => {
        if (err) { console.log(err) }
        whatNow();
      })
    })
};

const findDept = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, name FROM department", function (err, data) {
      if (err) { console.log(err) }
      resolve(data);
    })
  })
}

const addRole = () => {
  findDept()
    .then(function (id) {
      console.log(JSON.stringify(id))
      let callDept = id.map(department => ({name: department.name, value: department.id}) )
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: "Title of Role:"
          },
          {
            type: 'number',
            name: 'salary',
            message: "Salary of Role:"
          },
          {
            type: 'list',
            name: 'department_id',
            message: "What department?",
            choices: callDept
          }
        ])
        .then(dataR => {
          let newRole = {
            title: dataR.title,
            salary: dataR.salary,
            department_id: dataR.department_id
          }
          console.log(`department_id: ${dataR.department_id}`)
          console.log(`New Department Added! - ${dataR.title} role in ${dataR.department_id} department (Salary $${dataR.salary})`)
          db.query('INSERT INTO role SET ?', newRole, err => {
            if (err) { console.log(err) }
            whatNow();
        })
      })
      .catch(err => console.log(err))
    })
  .catch(err => console.log(err))
};

const findRole = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id AS value, title AS name FROM role", function (err, data) {
      if (err) { console.log(err) }
      resolve(data);
    })
  })
}

const findManagers = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT employee.id AS value, CONCAT (employee.first_name, " ", employee.last_name, " - ", role.title) AS name FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE role.title LIKE '%Manager%' OR role.title LIKE '%manager%'`, function (err, data) {
      if (err) { console.log(err) }
      resolve(data);
    })
  })
}

const addEmployee = () => {
  findRole()
    .then(function (callRole) {
      findManagers()
        .then(function (callManagers) {
          inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'First Name of employee:'
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'Last Name of employee:'
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'Role of employee:',
              choices: callRole
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Manager of employee:',
              choices: callManagers
            }
          ])
          .then(dataE => {
            console.log(`New Employee Added! - ${callRole.find(r => r.value == dataE.role_id).name} ${dataE.first_name} ${dataE.last_name} (Managed by ${callManagers.find(m => m.value == dataE.manager_id).name.split(' - ')[0]})`)
            db.query('INSERT INTO employee SET ?', dataE, err => {
              if (err) { console.log(err) }
              whatNow();
            })
          })
          .catch(err => console.log(err))
        })
    })
}

// if you choose Edit Employee
// first, choose an employee 
// then, choose whether you want to update role or update manager
// finally, nowWhat

const findEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT employee.id AS value, CONCAT (employee.first_name, " ", employee.last_name, " - ", role.title) AS name FROM employee LEFT JOIN role ON employee.role_id = role.id`, function (err, data) {
      if (err) { console.log(err) }
      resolve(data);
    })
  })
}

const updateRole = () => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE employee SET ? AS name FROM employee LEFT JOIN role ON employee.role_id = role.id`, function (err, data) {
      if (err) { console.log(err) }
      resolve(data);
    })
  })
}

const editEmployee = () => {
  findEmployees()
    .then(function (callEmployees) {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Which employee do you want to edit:',
            choices: callEmployees
          },
          {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Change Role', 'Change Manager']
          }
        ])
        .then(dataE => {
          console.log(dataE)
          switch (dataE.action) {
            case 'Change Role':
              findRole()
                .then(function (callRole) {
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        name: 'newRole',
                        message: 'What new role do you want to give them?',
                        choices: callRole
                      }
                    ])
                    .then(dataNew => {
                      // console.log(dataE.employee)
                      console.log(`Employee Role Updated! ${dataE.employee}`)
                      db.query(`UPDATE employee SET employee.role_id='${dataNew.newRole}' WHERE employee.id='${dataE.employee}'`, dataE, err => {
                        if (err) { console.log(err) }
                        whatNow();
                      })
                    })
                    .catch(err => console.log(err))
                  })
                .catch(err => console.log(err))
              break;
            case 'Change Manager':
              findManagers()
                .then(function (callManagers) {
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        name: 'newManager',
                        message: 'Which new manager do you want to give them?',
                        choices: callManagers
                      }
                    ])
                    .then(dataNew => {
                      console.log('Manager changed for employee!'')
                      db.query(`UPDATE employee SET employee.manager_id='${dataNew.newManager}' WHERE employee.id='${dataE.employee}'`, dataE, err => {
                        if (err) { console.log(err) }
                      })
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
              break;
          }
        })
        .catch(err => console.log(err))
  })
};

const deleteEmployee = () => {
  inquirer 
    .prompt()
    .then()
    .catch(err => console.log(err))
}



app.listen(3000);