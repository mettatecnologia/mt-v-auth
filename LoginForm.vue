<template>
<div>
    <jb-loading v-model="loading.mostrar"></jb-loading>

    <v-toolbar dark color="primary" class="pt-3" style="height:100px" >
        <v-layout align-start justify-space-between column fill-height>
            <jb-iconevoltar></jb-iconevoltar>
            <v-toolbar-title class="white--text pa-0 ma-0"><h4>Entrar</h4></v-toolbar-title>
        </v-layout>
    </v-toolbar>

    <v-card>
        <v-card-text class="pt-4">

            <jb-form v-model="form.valid" ref="form" validar :mensagens="form.mensagens.mensagens" :mensagens-tipo="form.mensagens.tipo" :mensagens-detalhes="form.mensagens.detalhes" @submit="login">

                <jb-text
                    v-model="form.email"
                    name="email"
                    regras="required|email"
                    label="Email"
                ></jb-text>

                <jb-text-password
                    v-model="form.senha"
                    name="password"
                    :regras="'required|min:'+senhaTamMin+'|max:'+senhaTamMax"
                    label="Senha"
                ></jb-text-password>

                <div slot="botoes">
                    <v-layout align-center justify-space-around>

                        <v-btn type="submit" color="primary" :disabled="!form.valid" >Entrar</v-btn>

                        <v-layout align-end justify-space-around column fill-height >
                            <a :href="esqueciSenhaHref">Esqueci a senha</a>
                        </v-layout>
                    </v-layout>
                </div>

            </jb-form>
        </v-card-text>
    </v-card>
</div>
</template>

<script>

import axios from 'axios'

export default {
    props: {
        esqueciSenhaHref:String, registrarHref:String,
        email:String,
        senhaTamMin: {type:Number, default:0},
        senhaTamMax: {type:Number, default:0},
    },
    data: function () {
        return {
            form: {
                email:this.email,
                senha:'',
                valid: false,
                mensagens:{
                    mensagens:null,
                    tipo:null,
                    detalhes:null,
                },
            },
            loading:{
                mostrar:false
            },
        }
    },
    methods: {
        login(e){
            this.loading.mostrar = true

            let item = {
                email: this.form.email,
                password: this.form.senha,
            }

            axios.post('login', item)
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
