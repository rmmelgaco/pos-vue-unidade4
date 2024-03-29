export const chamadaHttp = (url, objetoParaAtualizar, carregando, mensagem, indicadorSucesso = null, metodoHttp = 'GET', corpo = null) => {
    carregando.value = true
    const headers = {'Content-type': 'application/json'}
    const opcoesHttp = {method: metodoHttp, headers}

    if (corpo) {
        opcoesHttp.body = JSON.stringify(corpo)
    }

    fetch(url, opcoesHttp)
        .then((resposta) => {
                if (resposta.status === 200 || resposta.status === 201) {
                    if (indicadorSucesso) {
                        indicadorSucesso.value = true
                    }
                    return resposta.json()
                } else {
                    mensagem.value = resposta.statusText
                }
            }
        )
        .then((dados) => {
            objetoParaAtualizar.value = dados
        })
        .catch(erro => mensagem.value = erro)
        .finally(() => carregando.value = false)
}