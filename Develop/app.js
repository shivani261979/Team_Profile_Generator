const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

function addMember() {
   
   inquirer.prompt([{
         message: "Enter team member's name: ",
         name: "name"
      },
      {
         type: "list",
         message: "Select team member's role: ",
         choices: [
               "Manager",
               "Engineer",
               "Intern"
         ],
         name: "role"
      },
      {
         message: "Enter team member's id: ",
         name: "id"
      },
      {
         message: "Enter team member's email address: ",
         name: "email"
      }
   ]).then(function ({ name, role, id, email }) {

         let infoType;

         if (role === "Manager") {
            infoType = "office phone number";
         } else if (role === "Engineer") {
            infoType = "GitHub username";
         } else {
            infoType = "school name";
         }

         inquirer.prompt([
            {
               message: `Enter team member's ${infoType}: `,
               name: "info"
            },
            {
               type: "list",
               message: "Would you like to add more team members?",
               choices: [
                     "yes",
                     "no"
               ],
               name: "moreMembers"
            }
         ]).then(function ({ info, moreMembers }) {
               let newMember;

               if (role === "Engineer") {
                  newMember = new Engineer(name, id, email, info);
               } else if (role === "Intern") {
                  newMember = new Intern(name, id, email, info);
               } else {
                  newMember = new Manager(name, id, email, info);
               }

               employees.push(newMember);
               
               if (moreMembers === "yes") {
                  addMember();
               } else {
                  createHtml();
               }
         });
   
   });
}

function createHtml() {

   const htmlPage = render(employees);

   if (!fs.existsSync(OUTPUT_DIR)){
      console.log(`'output' folder does not exist. Creating it now ...`)
      fs.mkdirSync(OUTPUT_DIR);
   } else {
      console.log(`output folder already exists.`);
   }

   fs.writeFile(outputPath, htmlPage, function (err) {
      if (err) {
           console.log(`Failed to create file - ${outputPath}. Error - ${err}`);
      } else {
         console.log(`Successfully created html file - ${outputPath}`);
      }      
   });

}

function main(){

   console.log("    Gather team's information and generate an HTML file");
   console.log("-------------------------------------------------------------")
   addMember();

}

main();





























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
// for the provided `render` function to work!```


