const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
      API_CEP: 'http://viacep.com.br/ws/01001000/json/'
    }
  },
});
