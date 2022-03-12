
## Table of Contents

* [Quick Start](#quick-start)
* [File Structure](#file-structure)


## Quick start

- Clone the repo: `git clone https://github.com/evertonGil/send-whats.git`.
- Run `npm install`
- Then `npm start`


## File Structure

```
├── README.md
├── angular.json
├── e2e
├── package.json
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── shared
│   │   │   ├── shared.module.spec.ts
│   │   │   ├── shared.module.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.scss
│   │   │   │   ├── footer.component.spec.ts
│   │   │   │   └── footer.component.ts
│   │   │   ├── // ... Todos os componentes reutilizaveis pelo projeto
│   │   ├── Core
│   │   │   ├── auth.guard.ts
│   │   │   ├── auth.interceptor
│   │   │   ├── admin-layout
│   │   │   │   ├── admin-layout.component.html
│   │   │   │   ├── admin-layout.component.scss
│   │   │   │   ├── admin-layout.component.spec.ts
│   │   │   │   ├── admin-layout.component.ts
│   │   │   │   ├── admin-layout.module.ts
│   │   │   │   └── admin-layout.routing.ts
│   │   │   └── auth-layout
│   │   │       ├── auth-layout.component.html
│   │   │       ├── auth-layout.component.scss
│   │   │       ├── auth-layout.component.spec.ts
│   │   │       ├── auth-layout.component.ts
│   │   │       ├── auth-layout.module.ts
│   │   │       └── auth-layout.routing.ts
│   │   ├── pages
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   ├── dashboard.component.spec.ts
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── // ... Todas as paginas do site
│   │   ├── variables
│   │   │   └── charts.ts
│   │   │   
│   │   ├── models
│   │   │   └── // ... Todas as tipagens criadas exclusivamente neste projeto
│   │   │ 
│   │   ├── redux
│   │   │   ├── action // reponsavel pela porta de entrada dos dispach
│   │   │   ├── meta-reducer // handler que é disparado antes do disparo de qualquer action
│   │   │   ├── reducers // reponsavel por tratar o dado antes de ser inserido no store
│   │   │   └── selectors.store.ts // responsavel por seleionar a parte no store desejada
│   │   │   
│   │   └── services 
│   │       ├── auth-layout
│   │       └── ... Todos os services reutilizaveis do sistema
│   │      
│   ├── assets
│   │   ├── fonts
│   │   ├── img
│   │   ├── scss
│   │   │   ├── angular-differences
│   │   │   ├── argon.scss
│   │   │   ├── core
│   │   │   └── custom
│   │   └── vendor
│   ├── browserslist
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── tsconfig.json
└── tslint.json
```


