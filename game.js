/* 
--------------------------------------------------
                VARIÁVEIS E FUNÇÕES
--------------------------------------------------
 */

// Lista com os invasores
let invasores = document.getElementsByClassName('invasor')

// Lista com os "bonzinhos"
let bonzinhos = document.getElementsByClassName('bonzinho')

let score = 0
let tempoRestante = 30

let larguraQuadro = document.getElementById('quadro').offsetWidth

// Função para posicionar um elemento
// Recebe parâmetro el que informa o elemento
const posicElement = (el) => {
    let posX = Math.floor(Math.random() * 1000)
    let posY = Math.floor(Math.random() * 400)

    el.style.position = 'absolute'
    el.style.left = -posX + 'px'
    el.style.top = posY + 'px'
}

// Desloca os elementos na tela
// Recebe parâmetros elemento, velocidade , incremento
const moveElemento = (el, veloc, inc) => {
    //Executa a cada x milissegundos
    const anima = setInterval(() => {

        veloc = veloc + inc
        el.style.left = veloc + 'px'

        // Verifica se elemento saiu do quadro ou se foi clicado (classe "morto")
        // retorna para uma posição à esquerda do quadro (re-entra)
        if (veloc > larguraQuadro || el.classList.contains('morto')) {
            // Sorteia um valor entre
            veloc = -Math.random() * 450 + 50
            inc = Math.random() * 40 + 10
            posicElement(el)
            el.classList.remove('morto')
        }
        // Adiciona atributo velocidade para consulta no código JS
        el.setAttribute('velocidade', inc)
    }, 40)
}

// Ao clicar nos insetos
const clickBug = (el) => {
    console.log(el.getAttribute('id'))

    // // Adiciona uma classe com o nome de 'morto'
    el.classList.add('morto')

    // // Adiciona 10 pts ao score
    score += 10

    // Se o inseto clicado for "bonzinho" perde 50 pontos
    if (el.classList.contains('bonzinho')) {
        score -= 60
    }

    document.getElementById('score').innerText = score

    // Se velocidade for maior que 20, faz 100 pontos
    if (el.getAttribute('velocidade') > 20 && el.classList.contains('invasor')) {
        score += 100

        // Mostra +100 pontos após 1/2 segundo
        // apenas nos insetos que tenham a classe "invasor"
        let pts100 = document.getElementById('pts100')

        pts100.style.left = el.style.left
        pts100.style.top = el.style.top

        /*const mostra100pts = setInterval(() => {
            pts100.style.left = '-300px'

            // Interrompe o setInterval
            clearInterval(mostra100pts)
        }, 500); */

        // Executa o código após 500 milissegundos
        const mostra10pts = setTimeout(() => {
            pts100.style.left = '-300px'
        }, 500)
    }
}






/* 
--------------------------------------------------
            EVENTOS E EXECUÇÕES AUTOMÁTICAS
--------------------------------------------------
 */

for (inv of invasores) {
    posicElement(inv)
    moveElemento(inv, Math.random() * 10, Math.random() * 19 + 1)

    // e.target = elemento que executa o evento, ou seja, inseto clicado
    inv.addEventListener('mousedown', (e) => { clickBug(e.target) })
}

for (bom of bonzinhos) {
    posicElement(bom)
    moveElemento(bom, Math.random() * 10, Math.random() * 19 + 1)

    // e.target = elemento que executa o evento, ou seja, inseto clicado
    bom.addEventListener('mousedown', (e) => { clickBug(e.target) })
}

// Contagem regressiva
setTimeout(() => {
    // Avisa ao usuário o fim do tempo
    alert('TEMPO ESGOTADO!!!')

    // Recarrega a página - semelhante a F5
    location.reload()
}, tempoRestante * 1000 + 2000);

const mostraTempo = setInterval(() => {
    // A cada segundo mostra o tempo restante
    document.getElementById('infoTR').innerText = tempoRestante
    document.getElementById('temporest').innerText = tempoRestante--
}, 1000);