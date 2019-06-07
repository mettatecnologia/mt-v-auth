<template>
<div>
    <jb-loading v-model="loading.mostrar"></jb-loading>

    <v-toolbar dark color="primary" class="pt-3" style="height:100px" >
        <v-layout align-start justify-space-between column fill-height>
            <jb-iconevoltar href="/login"></jb-iconevoltar>
            <v-toolbar-title class="white--text pa-0 ma-0"><h4>Novo usuário</h4></v-toolbar-title>
        </v-layout>
    </v-toolbar>

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

                <jb-text
                    v-model="form.email"
                    name="email"
                    regras="required|email|email-unique"
                    label="Email"
                ></jb-text>

                <jb-text-password
                    v-model="form.senha"
                    name="senha"
                    :regras="'required|match:senha_confirmacao|min:'+senhaTamMin+'|max:'+senhaTamMax"
                    label="Senha"
                ></jb-text-password>

                <jb-text-password
                    v-model="form.senha_confirmacao"
                    name="senha_confirmacao"
                    regras="required|match:senha"
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
        cadastrar(e){
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
