const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Global variables
const employees = [];


//Inquirer Questions 



const wantNewEmp = [
    {
        type: 'list',
        message: 'Add new employee?',
        name: 'newMember',
        choices: ['Yes', 'No',]
    },
]


const roleQuestion = [
    
    {
        type: 'list',
        message: 'Employee role?',
        name: 'role',
        choices: ['Engineer', 'Manager', 'Intern']
    },
    
]

const internQuestions = [
    {
        Type: 'input',
        Message: 'Name?:',
        name: 'name',
    },
    {
        Type: 'input',
        Message: 'ID?:',
        name: 'id',
    },
    {
        Type: 'input',
        message: 'Email?:',
        name: 'email',
    },
    {
        Type: 'input',
        message: 'School?:',
        name: 'school',
    },
]


const engineerQuestions = [
    {
        type: 'input',
        message: 'Name?:',
        name: 'name',
    },
    {
        type: 'input',
        message: 'ID?:',
        name: 'id',
    },
    {
        type: 'input',
        message: 'Email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'GitHub Username?:',
        name: 'github',
    }
]

const managerQuestions = [
    {
        type: 'input',
        message: 'Name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'ID?:',
        name: 'id',
    },
    {
        type: 'input',
        message: 'Email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'Office Number?',
        name: 'office',
    }
]

//Asks user if they wish to add an employee
const addNewEmployee = () => {
    inquirer
        .prompt(wantNewEmp)
        .then(({ newMember }) => {
            switch (newMember) {
                case 'Yes':
                    employeeRole()
                    break;
                case 'No':
                    fs.writeFile('test.html', render(employees), (err) => {
                        err ? console.error(err) : console.log('Success!')})
                    break;
            }
        })
}

//Asks user what type of employee they wish to add (Manager, Engineer, Intern)
const employeeRole = () => {
    inquirer
        .prompt(roleQuestion)
        .then(({ role }) => {
            switch (role) {
                case 'Manager':
                    return addManager()
                    break;
                case 'Engineer':
                    return addEngineer()
                    break;
                case 'Intern':
                    return addIntern()
                    break;
            }
        })
}


// The 3 functions below (addManager, etc) prompt role-specific questions ,
//write to the template, and call the addNewEmp function again. 
const addManager = () => {
    console.log(`\nManager selected!`)
    inquirer
        .prompt(managerQuestions)
        .then(({ name, id, email, office }) => {
            // TODO will write to templates here 
            console.log(`\nManager Added!\nName: ${name} \nID: ${id}\nEmail: ${email} \nOffice Number: ${office}\n`);
            const manager = new Manager(name, id, email, office)
            employees.push(manager)
            addNewEmployee();
        })
        
}

const addEngineer = () => {
    console.log(`\nEngineer selected!`)
    inquirer
        .prompt(engineerQuestions)
        .then(({name, id, email, github }) => {
             // TODO will write to templates here 
            console.log(`\nEngineer Added!\nName: ${name} \nID: ${id}\nEmail: ${email} \nGitHub: ${github}\n`);
            const engineer = new Engineer(name, id, email, github)
            employees.push(engineer)
            addNewEmployee();
        })
}

const addIntern = () => {
    console.log(`\nIntern selected!`)
    inquirer
        .prompt(internQuestions)
        .then(({ name, id, email, school }) => {
        // TODO will write to templates here 
            console.log(`\nIntern Added!\nName: ${name} \nSchool: ${school}\n`);
            const intern = new Intern(name, id, email, school)
            employees.push(intern)
            addNewEmployee();

            
        })
}




const init = () => {
    addNewEmployee();
}

init();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
