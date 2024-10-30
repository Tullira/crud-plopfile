module.exports = (plop) => {
  // Gerador para controlador, repositório, rotas e DTO
  plop.setGenerator('model', {
    description: 'Create a controller, repository, routes, and DTO for a model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome do model (ex. User, Aviso):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/controllers/{{pascalCase name}}Controller.ts',
        templateFile: 'templates/regularController.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/repositories/{{pascalCase name}}Repository.ts',
        templateFile: 'templates/regularRepository.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/routes/{{pascalCase name}}Routes.ts',
        templateFile: 'templates/regularRoutes.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/DTOs/{{pascalCase name}}.ts',
        templateFile: 'templates/regularDTO.ts.hbs',
      },
      {
        type: 'modify',
        path: '../src/DTOs/index.ts',
        pattern: /^(import .*;\n)/,
        template:
          "import { {{pascalCase name}}, Update{{pascalCase name}} } from './{{pascalCase name}}';\n$1",
      },
      {
        type: 'modify',
        path: '../src/controllers/index.ts',
        pattern: /^(import .*;\n)/,
        template:
          "import {{pascalCase name}}Controller from './{{pascalCase name}}Controller';\n$1",
      },
      {
        type: 'modify',
        path: '../src/repositories/index.ts',
        pattern: /^(import .*;\n)/,
        template:
          "import {{pascalCase name}}Repository from './{{pascalCase name}}Repository';\n$1",
      },

      {
        type: 'append',
        path: '../src/controllers/index.ts',
        template: 'export { {{pascalCase name}}Controller };\n',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: '../src/repositories/index.ts',
        template: 'export { {{pascalCase name}}Repository };\n',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: '../src/DTOs/index.ts',
        template:
          'export { {{pascalCase name}}, Update{{pascalCase name}} };\n',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: '../src/routes/index.ts', // O mesmo arquivo
        pattern: /\n/, // Localização específica
        template:
          "\n\nimport {{pascalCase name}}Routes from './{{pascalCase name}}Routes';",
      },
      {
        type: 'modify',
        path: '../src/routes/index.ts', // O mesmo arquivo
        pattern: /const router = Router\(\);/, // Padrão para encontrar a linha do router.use
        template:
          "const router = Router();\n\nrouter.use('/{{camelCase name}}', {{pascalCase name}}Routes);",
      },
    ],
  });
};
