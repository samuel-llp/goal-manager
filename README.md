![img](./src/img/screenshot.png)

# Gerenciador de metas

Desenvolvido durante o NLW Pocket da Rocketseat com o intuito de se aprofundar nos fundamentos do JavaScript.

Focado em manipulação de arquivos JSON. O aplicativo permite o cadastro, listagem, conclusão, visualização de metas pendentes, e deleção de metas.

## Tecnologias

- **Node.js**
- **JavaScript**
- **Inquirer.js** (prompts interativos)

## Instalação

1. Clone este repositório em sua máquina local:
    ```bash
    git clone https://github.com/seu-usuario/gerenciador-de-metas.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd gerenciador-de-metas
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o gerenciador de metas:
    ```bash
    node app.js
    ```

## Funcionalidades

- **Cadastrar metas:** Adicione novas metas.

- **Listagem de metas:** Veja todas as metas e as marque ou desmarque como concluídas.

- **Visualizar metas realizadas e pendentes:** Confira as metas concluídas e as que ainda precisam ser realizadas.

- **Deletar metas:** Remova metas indesejadas da sua lista.

## Melhorias implementadas

- **Código otimizado:** Uso de `Set` para deletar metas de forma mais eficiente e simplificação do código para melhor performance.

- **Tratamento de erros:** Adicionada captura de erros nas operações de leitura e escrita de arquivos.

- **Validação de input:** Implementado loop para validar entradas ao cadastrar metas.

## Contribuição

Se você deseja contribuir para este projeto, siga os passos abaixo:

1. **Faça um fork do repositório**.

2. **Crie uma nova branch** para sua contribuição:
   ```bash
   git checkout -b minha-contribuicao
   ```
3. **Faça suas alterações e commit**:
   ```bash
   git commit -m 'Adicionar nova funcionalidade'
   ```
4. **Envie as alterações para o repositório remoto**:
   ```bash
   git push origin minha-contribuicao
   ```
5. **Abra um pull request** no repositório original.
