export const chamadaHttp = (url, objetoParaAtualizar, carregando, mensagem, metodoHttp = 'GET', corpo = null) => {
    carregando.value = true
    const headers = {'Content-type': 'application/json'}
    const opcoesHttp = {method: metodoHttp, headers}

    if (corpo) {
        opcoesHttp.body = JSON.stringify(corpo)
    }

    fetch(url, opcoesHttp)
        .then((resposta) => {
                if (resposta.status === 200) {
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