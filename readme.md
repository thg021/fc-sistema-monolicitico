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

[x] - Configuração do swc

