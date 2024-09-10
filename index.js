const { select, input, checkbox } = require('@inquirer/prompts')

let goal = {
  value: "Tomar no meio do meu cu",
  checked: false,
}

let goals = [ goal ]

const registerGoal = async () => {
  const goal = await input({ message: "Digite a meta: "})

  if(goal.length == 0) {
    console.log("Preencha o campo vazio.")
    return registerGoal()
  }

  goals.push({ value: goal, checked: false })
}

const listGoal = async () => {
  const answers  = await checkbox({
    message: "Pressione <Espaço> para marcar ou desmarcar, <a> para marcar todas, <i> para inverter seleção, e <Enter> para confirmar e sair.",
    choices: [ ...goals ],
    instructions: false,
  })

  if(answers.length == 0) {
    console.log("Nenhuma meta selecionada.")
    return
  }

  goals.forEach((g) => {
    g.checked = false
  })

  answers.forEach((answer) => {
    const goal = goals.find((g) => {
      return g.value == answer
    })

    goal.checked = true
  })

  console.log("Meta(s) concluída(s).")
}

const start = async () => {
  while(true) {

    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "register",
        },
        {
          name: "Listar metas",
          value: "list",
        },
        {
          name: "Sair",
          value: "exit",
        }
      ]
    })

    switch(option) {
      case "register":
        await registerGoal()
        console.log(goals)
        break
      case "list":
        await listGoal()
        break
      case "exit":
        return
    }
  }
}

start()