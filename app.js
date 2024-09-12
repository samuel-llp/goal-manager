const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require("fs").promises;

let message = "Bem-vindo ao seu gerenciador de metas.";
let goals = [];

const loadGoals = async () => {
  try {
    const data = await fs.readFile("goals.json", "utf-8");
    goals = JSON.parse(data);
  } catch (error) {
    goals = [];
    console.error("Erro ao carregar metas:", error);
  }
};

const saveGoals = async () => {
  try {
    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2));
  } catch (error) {
    console.error("Erro ao salvar metas:", error);
  }
};

const createGoal = async () => {
  let goal = "";
  do {
    goal = await input({ message: "Digite a meta: " });
    if (!goal.trim()) {
      message = "Preencha o campo vazio.";
      showMessage();
    }
  } while (!goal.trim());

  goals.push({ value: goal, checked: false });
  message = "Meta cadastrada com sucesso.";
};

const listGoals = async () => {
  if (goals.length === 0) {
    message = "Nenhuma meta cadastrada.";
    return;
  }

  const selectedGoals = await checkbox({
    message: "Pressione <Espaço> para marcar ou desmarcar, <a> para marcar todas, <i> para inverter seleção, e <Enter> para confirmar e sair.",
    choices: goals,
    instructions: false,
  });

  goals.forEach(goal => {
    goal.checked = selectedGoals.includes(goal.value);
  });

  message = selectedGoals.length > 0 ? "Meta(s) concluída(s)." : "Nenhuma meta selecionada.";
};

const completedGoals = async () => {
  const completed = goals.filter(goal => goal.checked);

  if (completed.length === 0) {
    message = "Não existem metas realizadas.";
    return;
  }

  await select({
    message: `${completed.length} meta(s) realizada(s).`,
    choices: completed,
  });
};

const pendingGoals = async () => {
  const pending = goals.filter(goal => !goal.checked);

  if (pending.length === 0) {
    message = "Parabéns! Não existem metas abertas.";
    return;
  }

  await select({
    message: `${pending.length} meta(s) pendente(s).`,
    choices: pending,
  });
};

const deleteGoals = async () => {
  if (goals.length === 0) {
    message = "Não existem metas.";
    return;
  }

  const itemsToDelete = await checkbox({
    message: "Selecione itens para deletar",
    choices: goals.map(goal => ({ value: goal.value, checked: false })),
    instructions: false,
  });

  if (itemsToDelete.length === 0) {
    message = "Nenhum item selecionado para deletar.";
    return;
  }

  const itemsSet = new Set(itemsToDelete);
  goals = goals.filter(goal => !itemsSet.has(goal.value));

  message = "Meta(s) deletada(s) com sucesso.";
};

const showMessage = () => {
  console.clear();
  if (message) {
    console.log(message);
    console.log("");
    message = "";
  }
};

const start = async () => {
  await loadGoals();

  while (true) {
    showMessage();
    await saveGoals();

    const option = await select({
      message: "Menu >",
      choices: [
        { name: "Cadastrar meta", value: "create" },
        { name: "Lista de metas", value: "list" },
        { name: "Metas realizadas", value: "completed" },
        { name: "Metas pendentes", value: "pending" },
        { name: "Deletar metas", value: "delete" },
        { name: "Sair", value: "exit" },
      ],
    });

    switch (option) {
      case "create":
        await createGoal();
        break;
      case "list":
        await listGoals();
        break;
      case "completed":
        await completedGoals();
        break;
      case "pending":
        await pendingGoals();
        break;
      case "delete":
        await deleteGoals();
        break;
      case "exit":
        return;
    }
  }
};

start();