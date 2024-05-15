const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

const data = [];
const path = "./Produtos";

function searchProduct(product) {
  if (fs.existsSync(`${path}/${product}.json`)) {
    fs.readFile(`./Produtos/${product}.json`, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      let productSearch = JSON.parse(data);

      let valorTotal = productSearch.preco * productSearch.quantidade;

      console.log(
        chalk.blue(
          `Nome: ${productSearch.nome}\nQuantidade em estoque: ${productSearch.quantidade}\nPreço: R$ ${productSearch.preco}\nValor total em estoque: R$ ${valorTotal}`
        )
      );
    });
  } else {
    console.log(
      chalk.red(`O produto: ${product}, não existe no banco de dados!`)
    );
  }
}

function menuChoices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que gostaria de fazer?",
        choices: ["Cadastrar Produto", "Informações do Produto", "Sair"],
      },
    ])
    .then((answer) => {
      let action = answer["action"];
      if (action == "Cadastrar Produto") {
        RegisterProduct();
      } else if (action == "Informações do Produto") {
        inquirer
          .prompt([
            {
              name: "action",
              message: "Qual nome do produto?",
            },
          ])
          .then((answer) => {
            let action = answer["action"].toLowerCase();
            searchProduct(action);
          });
      }
    });
}

function RegisterProduct() {
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
}

menuChoices();
