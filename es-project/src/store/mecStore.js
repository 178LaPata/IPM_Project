import { createPinia, defineStore } from "pinia";

export const useMecStore = defineStore("store", {
  state: () => ({
    mec_id: null,
    mec_name: null,
    mec_role: null,
    mec_img: null,
    mec_jobs: [],
    date: null,
  }),

  actions: {
    setMec(data) {
      this.mec_id = data.id;
      this.mec_name = data.name;
      this.mec_role = data.role;
      this.mec_img = data.image;
      this.mec_jobs = data.jobs;
    },

    setMecId(id) {
      this.mec_id = id;
    },
    setMecName(name) {
      this.mec_name = name;
    },
    setMecRole(role) {
      this.mec_role = role;
    },
    setMecImg(img) {
      this.mec_img = img;
    },
    setMecJobs(jobs) {
      this.mec_jobs = jobs;
    },
    setDate(date) {
      this.date = date;
    },
  },
  getters: {
    getMecId() {
      return this.mec_id;
    },
    getMecName() {
      return this.mec_name;
    },
    getMecRole() {
      return this.mec_role;
    },
    getMecImg() {
      return this.mec_img;
    },
    getMecJobs() {
      return this.mec_jobs;
    },
    getDate() {
      return this.date;
    },
  },
});
