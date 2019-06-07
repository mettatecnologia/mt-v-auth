<template>
<div>
    <jb-loading v-model="loading.mostrar"></jb-loading>

    <v-toolbar dark color="primary" class="pt-3" style="height:100px" >
        <v-layout align-start justify-space-between column fill-height>
            <jb-iconevoltar href="/enviarEmailResetarSenha"></jb-iconevoltar>

            <v-toolbar-title class="white--text pa-0 ma-0"><h4>Recuperar Senha</h4></v-toolbar-title>
        </v-layout>
    </v-toolbar>

    <v-card>
        <v-card-text class="pt-4">
            <div>
                <jb-form v-model="form.valid" ref="form" validar :mensagens="form.mensagens.mensagens" :mensagens-tipo="form.mensagens.tipo" :mensagens-detalhes="form.mensagens.detalhes" @submit="enviarEmailResetarSenha">

                    <jb-text
                        v-model="form.email"
                        regras="required|email"
                        label="E-mail"
                        name="email"
                    ></jb-text>

                </jb-form>
            </div>
        </v-card-text>
    </v-card>
</div>
</template>

<script>

import axios from 'axios'

export default {

    data: function () {
        return {
            form: {
                valid: false,
                mensagens:{
                    mensagens: 'Um email será enviado com link de recuperação',
                    tipo: 'info',
                    detalhes:null,
                },
                email:null,
            },
            loading:{
                mostrar:false
            },
        }
    },
    methods: {
        enviarEmailResetarSenha(e){
            this.loading.mostrar = true

            let item = {
                email: this.form.email
            }

            axios.post('email', item)
            .then(v => {
                let response = v.data.__response

                if(response.erro){
                    this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens[0], response.mensagens_tipo);
                }
                else {
                    this.form.mensagens = this.$criarObjetoMensagensForm(response.mensagens.join('-'), 'success');
                }

                this.loading.mostrar = false
            });

        }
    },
}

</script>
