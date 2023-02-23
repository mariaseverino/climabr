# ClimaBR

<div align="center">
<img alt="icone de tempo" src="src/assets/icon/favicon.png" width="150px">
</div>
<br>

<div align="center">
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mariaseverino/climabr?color=6799EA&logoColor=6799EA&style=for-the-badge">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mariaseverino/climabr?color=6799EA&logoColor=6799EA&style=for-the-badge">
  </p>
</div>

<p align="center">
 <a href="Sobre">Sobre</a> •
 <a href="Tecnologias utilizadas">Tecnologias utilizadas</a> •
 <a href="Estrutura de Diretorios">Estrutura de diretórios</a> •
 <a href="Como utilizar?">Como utilizar?</a>
</p>

## ✨ Sobre

O sistema implementado tem o objetivo de fazer consulta da previsão do tempo de cidades brasileiras, tendo a possibilidade de encontrar a cidade digitando o nome dela, ou pela localização atual da pessoa.

📌 **_Este trabalho é derivado do projeto [ClimaBR](https://github.com/ufla-gcc132/climabr), desenvolvido pelo professor [Paulo Junior](https://github.com/paulojunior-ufla)._**

## 🚀 Tecnologias utilizadas

- [Ionic](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [OpenWeather Api](https://openweathermap.org/api)
- [Haversine Distance](https://github.com/dcousens/haversine-distance)
- [API de Geolocalização](https://github.com/ng-web-apis/geolocation)

## 🗃️ Estrutura de diretórios

O sistema foi desenvolvido utilizando arquitetura em camadas, visando o desacoplamento do código para melhor manuntenção.

```
src
├── app
│   ├── data
│   │   ├── fake
│   │   ├── local
│   │   └── remote
│   ├── domain
│   │   ├── entities
│   │   ├── errors
│   │   └── services
│   │       └── protocols
│   ├── home
│   ├── shared
│   │   └── components
│   └── weather
│       └── components
├── assets
├── environments
└── theme
```

## 🤔 Como utilizar?

### 🚨 Pré requisito

Antes de começar, você vai precisar ter instalado em sua máquina o [Node.js](https://nodejs.org/) e o [Ionic](https://ionicframework.com/). Também vai precisar fazer cadastro no site do [OpenWeather](https://openweathermap.org/api) para obter a chave da api.

```bash
# Clone este repositório
$ git clone https://github.com/mariaseverino/climabr.git

# Acesse a pasta do projeto
$ cd climabr

# Instale as dependências
$ npm install
```

Crie um arquivo chamado api-config.ts no diretório src/environment do projeto, contendo o conteúdo abaixo (não se esqueça de alterar a propriedade key para a sua chave de API):

```ts
export const openWeatherConfig = {
  key: "<sua-chave-de-api>",
  URL: "https://api.openweathermap.org/data/2.5/forecast/daily?",
  iconURL: "https://openweathermap.org/img/wn",
};
```

```bash
# Por fim execute a aplicação
$ ionic serve
```

## 👥 Contribuidores

- [Fernando Roque](https://github.com/rock051)
- [Júlia Ribeiro](https://github.com/solstice-orca)
- [Maria Rita](https://github.com/mariaseverino)
- [Nicolas de Oliveira](https://github.com/Nxxxlxs)

♥ Enjoy!
