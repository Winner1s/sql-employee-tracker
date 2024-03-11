const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "company",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

console.log("Connected to the company database");

function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        choices: [
          {
            name: "view all departments",
            value: "VIEW_ALL_DEPARTMENTS",
          },
          {
            name: "view all roles",
            value: "VIEW_ALL_ROLES",
          },
          {
            name: "view all employees",
            value: "VIEW_ALL_EMPLOYEES",
          },
          {
            name: "add a department",
            value: "ADD_A_DEPARTMENT",
          },
          {
            name: "add a role",
            value: "ADD_A_ROLE",
          },
          {
            name: "add an employee",
            value: "ADD_AN_EMPLOYEE",
          },
          // {
          //   name: "exit",
          //   value: "EXIT",
          // },
        ],
        message: "What would you like to do?",
      },
    ])
    .then((data) => {
      console.log(data);
      switch (data.choice) {
        case "VIEW_ALL_DEPARTMENTS":
          viewAllDepartments();
          break;
        case "VIEW_ALL_ROLES":
          viewAllRoles();
          break;
        case "VIEW_ALL_EMPLOYEES":
          viewAllEmployees();
          break;
        case "ADD_A_DEPARTMENT":
          addDepartment();
          break;
        case "ADD_A_ROLE":
          addRole();
          break;
        case "ADD_AN_EMPLOYEE":
          addEmployee();
          break;
      }
    });
}
function viewAllDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      throw err;
    }
    console.table(results);
    initialPrompt();
  });
}
function viewAllRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    console.table(results);
    initialPrompt();
  });
}
function viewAllEmployees() {
  const query = `SELECT
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title,
    departments.name,
    roles.salary,
          concat(manager.first_name, " ", manager.last_name)
                  AS manager FROM employees
                  LEFT JOIN roles ON employees.role_id=roles.id
                  LEFT JOIN departments ON roles.department_id=departments.id
LEFT JOIN employees manager ON manager.id=employees.manager_id`;
  db.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    initialPrompt();
  });
}

function addEmployee() {
  const rolesList = ["1", "2", "3", "4", "5"];
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employees first name",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employees last name",
      },
      {
        name: "role_id",
        type: "list",
        message: "what is the employees role id?",
        choices: rolesList,
      },
      {
        name: "manager_id",
        type: "input",
        message:
          "What is the employees manager id? (1-Cassie Jenkins(Associate Manager), 2-Robert Johnson(Software Engineering Manager), 3-Lexis Honda(Sales Manager), 4-Ashley Botega(Accounting Manager), 5-Emilio Estevez(Compliance Manager)",
      },
    ])

    .then((data) => {
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
   VALUES (?, ?, ?, ?);`;
      db.query(
        query,
        [data.first_name, data.last_name, data.role_id, data.manager_id],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          initialPrompt();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "Department name?",
      },
    ])
    .then((data) => {
      const query = `INSERT INTO departments (id, name)
                     VALUES (DEFAULT, "${data.departmentName}")`;
      db.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        initialPrompt();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "role name?",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "role salary?",
      },
      {
        name: "roleDeptId",
        type: "input",
        message:
          "department id? (1-Associate, 2-Engineering, 3-Sales, 4-Financing, 5-Legal)",
      },
    ])
    .then((data) => {
      const query = `INSERT INTO roles (title, salary, department_id)
      VALUES ("${data.roleName}", "${data.roleSalary}", "${data.roleDeptId}")`;
      db.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        initialPrompt();
      });
    });
}
initialPrompt();
