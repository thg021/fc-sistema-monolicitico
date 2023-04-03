# Sistema monoliticos

[ ] - Criando pacote shared. 

[x] - iniciar o package.json

```bash
    npm init -y 
```
---

[x] - Criar `.gitignore`

```
node_modules
.vscode
.swc
dist
```

---

[x] - Instalar libs como dev
    - @swc/cli @swc/core @swc/jest @types/express @types/jest jest ts-node tslint typescript 

```bash 
    npm install -D @swc/cli @swc/core @swc/jest @types/express @types/jest jest ts-node tslint typescript 
```
---

[x] - Configuração do jest. Criar um arquivo `jest.config.ts`

```typescript
export default {
  transform: {
    "^.+.(t|j)sx?$": ["@swc/jest"],
  },
  clearMocks: true,
  coverageProvider: "v8",
};
``` 
---

[x] - Configuração do swc. Criar o arquivo `.swcrc`

```
{
    "jsc" : {
        "parser": {
            "syntax": "typescript",
            "decorators": true
        },
        "transform": {
            "legacyDecorator": true,
            "decoratorMetadata": true
        }
    }
}

```

---
[x] - Configuracao do typescript. Criar o arquivo `tsconfig.json`

```json
{
  "compilerOptions": {
    "incremental": true,                             
    "target": "es2020",                                 
    "experimentalDecorators": true,                  
    "emitDecoratorMetadata": true,                   
    "module": "commonjs",                               
    "outDir": "./dist",                                  
    "esModuleInterop": true,                            
    "forceConsistentCasingInFileNames": true,           
    "strict": true,                                     
    "strictNullChecks": false,                        
    "skipLibCheck": true                                
  },
  "include": [
    "src/**/*.ts"
  ],
}

```

---

[x] - Configuracao do tslint. Criar arquivo `tslint.json`

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {},
    "rulesDirectory": []
}
``` 

---
[x] - Criar a pasta `src/modules`
[x] - Adicionar algums scripts no package.json

```json
"scripts": {
    "test": "npm run tsc -- --noEmit && jest",
    "tsc": "tsc",
  }
```