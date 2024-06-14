import { defineStore } from "pinia";

export const useVeicStore = defineStore("veiculo", {
  state: () => ({
    id_veiculo: null,
  }),

  actions: {
    async setVeicId(id) {
      this.id = id;
    },
  },
  getters: {
    getVeicId() {
        return this.id;
    }
    }
});
