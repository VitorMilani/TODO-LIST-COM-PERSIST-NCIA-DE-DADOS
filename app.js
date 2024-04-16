
function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
    
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)

    const tarefa = montaTarefa(novoItem.id, novoItem.innerText, 'aberta')
    adicionaTarefaAListaLocalStorage(tarefa)
    LocalStorage();
}

function criaInputCheckBoxTarefa(idTarefa, status) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    if (status === 'fechada') {
        inputTarefa.checked = true
    }
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
    
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration === 'line-through') {
        tarefaSelecionada.style.textDecoration = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style.textDecoration = 'text-decoration: line-through;'
    }
    
}


function mudaEstadoTarefaLocalStorage(idTarefa) {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        let contador = 0
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                if (tarefa.status === 'aberta') {
                    tarefa.status = 'fechada'
                } else {
                    tarefa.status = 'aberta'
                }
                console.log(tarefa)
            }
            localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
            contador++
            
        });

    }
    LocalStorage();
}


function adicionaTarefaAListaLocalStorage(tarefa) {
    const localStorage = window.localStorage
    let listaTarefas = []
    if (localStorage.getItem('lista_tarefas') != null) {
        listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
}

function montaTarefa(idTarefa, textoTarefa, status) {
    return {
        id: idTarefa,
        descricao: textoTarefa,
        status: status
    }
}

function tarefasLocalStorage() {
    limparListaDeTarefas();

    const tarefasArray = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefasArray.forEach(tarefa => {
        criaNovoItemDaLista(tarefa.texto);
        const tarefaElement = document.getElementById(tarefa.id);
        if (tarefa.concluida) {
            tarefaElement.style.textDecoration = 'line-through';
        }
    });
}

function ApagarTarefa() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkbox.parentNode.remove();
        }
    });
    LocalStorage();
}


function EditarTarefa() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            const novoTexto = prompt("Digite a nova tarefa:");
            if (novoTexto !== null && novoTexto !== '') {
                checkbox.parentNode.textContent = novoTexto;
            }

        }
    });
    LocalStorage();
}

function LocalStorage() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = listaTarefas.querySelectorAll('li');
    const tarefasArray = [];

    tarefas.forEach(tarefa => {
        tarefasArray.push({
            id: tarefa.id,
            texto: tarefa.innerText,
            concluida: tarefa.style.textDecoration === 'line-through'
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasArray));
}

function limparListaDeTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    listaTarefas.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', tarefasLocalStorage);