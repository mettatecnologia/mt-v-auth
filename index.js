//=============== VuetifyDialog
import VuetifyDialog from 'vuetify-dialog'
Vue.use(VuetifyDialog)

Vue.component('cadastrarusuario-form', require('./CadastrarUsuarioForm.vue').default);
Vue.component('login-form', require('./LoginForm.vue').default);
Vue.component('resetarsenha-email-form', require('./ResetarSenhaEmailForm.vue').default);
Vue.component('resetarsenha-form', require('./ResetarSenhaForm.vue').default);
