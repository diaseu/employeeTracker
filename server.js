const inquirer = require('inquirer')
const mysql = require('mysql2')
const express = require('express')
const { join } = require('path')
const app = express()
// require('console.table')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))


// const Games = require('./games.js')

let addNew = []

const start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        choices: ["View Departments", "Add", "Update", "Delete"],
        message: "What action to take:"
      },
      {
        type: "list",
        name: "db",
        choices: ["department", "role", "employee"],
        message: "Choose a database table:"
      },
    ])
    .then(ans => {
      switch (ans.action) {
        case "View":
          viewDB()
            })
        break
        case "Add":
          switch (ans.db) {
            case "department":
              addDepartment()
              break
            case "role":
              addRole()
              break
            case "employee":
              addEmployee()
              break
            default:
              break
          }
          break
        case "Update":
          break
        case "Delete":
          break
        default:
          break;
                }
              })
          }
start()

// async function getDB = () => {
//   const response = await new Promise((resolve, reject) => {
//     db.query(`SELECT * FROM ${ans.db}`, (err, view) => {
//       if (err) { console.log(err) }
//       resolve(view)
//     })
//   })
//   return response
// }

let table = ans.db

async function getDB (table) {
  const response = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${table}`, (err, view) => {
      if (err) { console.log(err) }
      resolve(view)
    })
  })
  return response
}

const viewDB = () => {
  getDB()
    .then(view => {
      console.table(view)
      whatNow()
    })
    .catch(err => console.log(err))
}

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
        whatNow()
      })
    })
}

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Title of role:"
      },
      {
        type: 'number',
        name: 'salary',
        message: "Salary of role:"
      },
      {
        type: 'list',
        name: 'department_id',
        message: "What department does this role belong to:",
        choices: []
      }
    ])
    .then(dataR => {
      let newRole = {
        name: dataR.title,
        salary: dataR.salary,
        department_id: dataR.department_id
      }
      console.log(`New Role Added! - ${dataR.title} ($${dataR.salary}) in ${dataR.department_id} department`)
      db.query('INSERT INTO role SET ?', newRole, err => {
        if (err) { console.log(err) }
        whatNow()
      })
    })
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "First name of employee:"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Last name of employee:"
      },
      {
        type: 'list',
        name: 'role_id',
        message: "Role of employee:"
      },
      {
        type: 'list',
        name: 'manager_id',
        message: "Manager of employee:"
      }
    ])
    .then(dataE => {
      let newFood = {
        first_name: dataE.first_name,
        origin: dataE.origin,
        glutenFree: dataE.glutenFree
      }
      console.log(`New Food Added! - ${dataE.name} (${dataE.origin})`)
      db.query('INSERT INTO foods SET ?', newFood, err => {
        if (err) { console.log(err) }
        whatNow()
      })
    })
}

const addMusic = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Title of song:"
      },
      {
        type: 'input',
        name: 'artist',
        message: "Artist:"
      },
      {
        type: 'album',
        name: 'album',
        message: "Album:"
      }
    ])
    .then(dataS => {
      let newSong = {
        title: dataS.title,
        artist: dataS.artist,
        album: dataS.album
      }
      console.log(`New Song Added!\n "${dataS.title}" by ${dataS.artist} from the ${dataS.album} album`)
      db.query('INSERT INTO music SET ?', newSong, err => {
        if (err) { console.log(err) }
        whatNow()
      })
    })
}

const whatNow = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'nowWhat',
        choices: ["Add another", "Main Menu", "Exit"],
        message: "What Now?"
      }
    ])
    .then(dataNow => {
      switch (dataNow.nowWhat) {
        case "Add another":
          addWhat()
          break
        case "Main Menu":
          start()
          break
        case "Exit":
          process.exit()
      }
    })
}

const addWhat = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'addWhat',
        choices: ['Add another Game', 'Add another Movie', 'Add another Food', 'Add another Song'],
        message: 'What would you like to add another?'
      }
    ])
    .then(dataAW => {
      switch (dataAW.addWhat) {
        case "Add another Game":
          addGames()
          break
        case "Add another Movie":
          addMovie()
          break
        case "Add another Food":
          addFood()
          break
        case "Add another Song":
          addMusic()
          break
        default:
          start()
      }
    })
}







app.listen(process.env.PORT || 3000)