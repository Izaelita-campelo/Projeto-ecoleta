
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {


    const stateInput = document.querySelector("[name=state]")
    const citySelect = document.querySelector("[name=city]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = (`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const cellectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover classe no javaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    //Verificar se existe itens selecionado se sim 
    // pegar od itens selecionado
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //isso sera true ou false
        return itemFound
    })

    // se ja tiver selecionado
    if (alreadySelected >= 0) {
        //tirar da seleçao
        const filterdItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedItems = filterdItems
    } else {
        //se nao tiver selecioando
        //adicionar a seleçao
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    // atualizar o campo escondido com o itens selecionados
    cellectedItems.value = selectedItems

}