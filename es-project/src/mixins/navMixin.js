// navigationMixin.js
export default {
    methods: {
        backToHome() {
            this.$router.push('/servicos')
        },
        backToLogin() {
            this.$router.push('/login')
            alert("Inicie sessão primeiro!")
        }
    }
}