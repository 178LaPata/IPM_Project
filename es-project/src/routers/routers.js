import Login from '../pages/Login.vue'
import Servicos from '../pages/Servicos.vue'
import Perfil from '../pages/Perfil.vue'
import Veiculos from '../pages/Veiculos.vue'
import Tarefa from '../pages/Tarefa.vue'
import Cliente from '../pages/Cliente.vue'
import TarefaAtual from '../pages/TarefaAtual.vue'
import ServicoExtra from '../pages/ServicoExtra.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'Servicos',
        component: Servicos,
        path: '/servicos'
    },
    {
        name: 'Perfil',
        component: Perfil,
        path: '/perfil'
    },
    {
        name: 'Veiculos',
        component: Veiculos,
        path: '/veiculos'
    },
    {
        name: 'Tarefa',
        component: Tarefa,
        path: '/tarefa'
    },
    {
        name: 'Cliente',
        component: Cliente,
        path: '/cliente'
    },
    {
        name: 'TarefaAtual',
        component: TarefaAtual,
        path: '/tarefaAtual'
    },
    {
        name: 'ServicosExtra',
        component: ServicoExtra,
        path: '/servicosExtra'
    },
    {
        path: '/',
        redirect: '/login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;