/**
 * 1. function de concluir a tarefa - OK
 * 2. function de excluit a tarefa - OK
 * 3. alterar a vizualição, caso esteja concluida 
 * 4. adicionar regra de não poder ter tarefas duplicas
 * 5. adicionar regra de não poder adicionar tarefas vazias
 * 6. filtrar por texto da tarefa, atualizando em tempo real
 * 7. após filtrar as funcionalidades devem continuar funcionando
 */


var listaTarefas = []


function carregarInformacoes() {
    // Alterar numTarefas adicionando a quantidade
    // De tarefas que tem no listaTarefas
    var concluido = 0
    var naoConcluido = 0 

    listaTarefas.forEach(function(item){
        if (item.concluido === true) {
            concluido++ // concluido = concluido + 1
        } else {
            naoConcluido++
        }
    })
    
    // TRAZER O TOTAL DE TAREFAS NÃO CONCLUIDAS
    document.getElementById("numTarefas").innerHTML = naoConcluido

    // TRAZER O TOTAL DE TAREFAS CONCLUIDAS
    document.getElementById("numConcluidas").innerHTML = concluido


    // Verificar se tem item dentro da listaTarefas
    // Caso tenha remova o elemento com o id "semTarefas"
    // Caso não tenha remova o elemento o id "listaTarefas"
    if (listaTarefas.length === 0) {
        document.getElementById("semTarefas").style.display = "flex"
        document.getElementById("listaTarefas").style.display = "none"
    } else {
        document.getElementById("listaTarefas").style.display = "flex"
        document.getElementById("semTarefas").style.display = "none"
    }

    exibirListaTarefas()
}

// Executa a função
carregarInformacoes()

// Adicionar uma esculta no elemento do formula 
// Para quando enviar executar a ação de cadastrar
var formCadastro = document.getElementById("formCadastroTarefa")

formCadastro.addEventListener("submit", function(evento){
    evento.preventDefault(); // BLOQUEA OS EVENTOS PADRÕES

    // Pegar os dados do formulario 
    var dadosForm = new FormData(this)
    var tarefa = dadosForm.get("tarefa")

    var objSalva = {
        tarefa: tarefa,
        concluido: false
    }

    
    
    // Adicionar na lista o que a pessoa digitou 
    listaTarefas.push(objSalva)

    console.log(listaTarefas)

    // Executar a função para atualizar os dados
    carregarInformacoes()
})


function exibirListaTarefas() {
    var html = document.getElementById("listaTarefas")
    html.innerHTML = ""

    listaTarefas.forEach(function(item) {
        html.innerHTML += `
            <div>
                <button onclick='concluirTarefa("${item.tarefa}")' title="Concluir Tarefa"></button>
                <p>${item.tarefa}</p>
                <button onclick='excluirTarefa("${item.tarefa}")' title="Excluir Tarefa">
                    <img src="./assets/img/lixeira.png" 
                         alt="Icone Lixeira" />
                </button>
            </div>
        `
    })
}


function concluirTarefa(tarefa) {
    listaTarefas.forEach(function(conteudo, index) {
        if(tarefa === conteudo.tarefa) {
            listaTarefas[index].concluido = true
        }
    }) 

    carregarInformacoes()
}

function excluirTarefa(tarefa) {
    listaTarefas.forEach(function(conteudo, index){
        if (tarefa === conteudo.tarefa) {
            listaTarefas.splice(index, 1)
        }
    })

    carregarInformacoes()
}