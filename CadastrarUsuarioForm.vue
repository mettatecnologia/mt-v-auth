<template>
<div>
    <jb-loading v-model="loading.mostrar"></jb-loading>

    <v-row align="center" justify="start" class="primary ma-0" >
        <v-col>
            <jb-iconevoltar href="/login"></jb-iconevoltar>
            <div class="white--text pa-0 ma-0 ml-1 mt-8"><h4>Novo Usuário</h4></div>
        </v-col>
    </v-row>

    <v-card>
        <v-card-text class="pa-0 pt-4">
            <jb-form v-model="form.valid" ref="form" validar :mensagens="form.mensagens.mensagens" :mensagens-tipo="form.mensagens.tipo" :mensagens-detalhes="form.mensagens.detalhes" @submit="cadastrar">

                <jb-text
                    v-model="form.nome"
                    name="nome"
                    regras="required"
                    label="Nome"
                    counter
                ></jb-text>

                <jb-text-email
                    v-model="form.email"
                    name="email"
                    regras="required"
                    label="Email"
                    unique
                ></jb-text-email>

                <jb-text-password
                    v-model="form.senha"
                    name="senha"
                    :regras="['required',{match:'senha_confirmacao'},{min:senhaTamMin},{max:senhaTamMax}]"
                    label="Senha"
                ></jb-text-password>

                <jb-text-password
                    v-model="form.senha_confirmacao"
                    name="senha_confirmacao"
                    :regras="['required',{match:'senha'}]"
                    label="Confimar Senha"
                ></jb-text-password>

            </jb-form>
        </v-card-text>
    </v-card>
</div>
</template>

<script>

import axios from 'axios'

export default {

    props: {
        nome:String, email:String,
        senhaTamMin: {type:Number, default:0},
        senhaTamMax: {type:Number, default:0},
    },
    data: function () {
        return {
            form: {
                valid: false,
                mensagens:{
                    mensagens:null,
                    tipo:null,
                    detalhes:null,
                },
                nome:this.name, email:this.email,
                senha:null, senha_confirmacao:null,
            },
            loading:{
                mostrar:false
            },
        }
    },
    methods: {
        cadastrar(){
            this.loading.mostrar = true

            let item = {
                nome: this.form.nome,
                email: this.form.email,
                password: this.form.senha,
                password_confirmation: this.form.senha_confirmacao,
            }

            axios.post('register', item)
            .then(v => {
                let response = v.data.__response

                if(response.erro){
                    this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens[0], response.mensagens_tipo);
                    this.loading.mostrar = false
                }
                else {
                    this.$dialog.message.success(response.mensagens.join('-'), {timeout: 5000});
                    this.$redirecionar(response.dados.redirecionar_url)
                }
            });
        }
    },
}
</script>
