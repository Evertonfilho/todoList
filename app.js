'use strict'
let bancoDados = []

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const criarItem = (tarefa, status, contador) => {
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
  <input type="checkbox" ${status} data-contador=${contador} > 
  <div>${tarefa}</div>
  <input type="button" value="X" data-contador=${contador} >
  `
  const todoList = document.getElementById('todoList')
  todoList.appendChild(item)
  console.log(item)
}

const limparTarefas = () => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

const atualizarTela = () => {
  limparTarefas()
  bancoDados.forEach((item, contador) =>
    criarItem(item.tarefa, item.status, contador)
  )
}

const inserirItem = evento => {
  const tecla = evento.key
  const textoUsuario = evento.target.value
  console.log(textoUsuario)
  console.log(tecla)
  if (tecla === 'Enter') {
    bancoDados.push({ tarefa: textoUsuario, status: '' })
    atualizarTela()
    evento.target.value = ''
  }
}

const removerItem = contador => {
  bancoDados.splice(contador, 1)
  atualizarTela()
}

const atualizarItem = contador => {
  bancoDados[contador].status =
    bancoDados[contador].status === '' ? 'checked' : ''
  atualizarTela()
}

const clickItem = evento => {
  const elemento = evento.target
  if (elemento.type === 'button') {
    const contador = elemento.dataset.contador
    removerItem(contador)
  } else if (elemento.type === 'checkbox') {
    const contador = elemento.dataset.contador
    atualizarItem(contador)
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
todoList.addEventListener('click', clickItem)

atualizarTela()
