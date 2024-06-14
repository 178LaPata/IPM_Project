import { defineStore } from "pinia";

export const useClientStore = defineStore("cliente", {
  state: () => ({
    nome: null
  }),

  actions: {
    async setClienteNome(nome) {
      this.nome = nome;
    }
  },
  getters: {
    getClienteNome() {
      return this.nome;
    }
  }
});
