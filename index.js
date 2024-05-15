const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

const data = [];
const path = "./Produtos";

inquirer
  .prompt([
    {
      name: "action",
      message: "Qual nome do produto?",
    },
  ])
  .then((answer) => {
    data.push(answer["action"].toLowerCase());

    inquirer
      .prompt([
        {
          name: "action",
          message: "Qual a quantidade desse produto?",
        },
      ])
      .then((answer) => {
        data.push(answer["action"]);

        inquirer
          .prompt([
            {
              name: "action",
              message: "Qual o preço do produto?",
            },
          ])
          .then((answer) => {
            data.push(answer["action"]);
            if (!fs.existsSync(path)) {
              fs.mkdirSync(path, (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
              });
            }

            if (!fs.existsSync(`${path}/${data[0]}.json`)) {
              fs.writeFileSync(
                `${path}/${data[0]}.json`,
                `{"nome": "${data[0]}", "quantidade": ${data[1]}, "preco": ${data[2]}}`
              );
            }
          });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err))
  .catch((err) => console.log(err));
