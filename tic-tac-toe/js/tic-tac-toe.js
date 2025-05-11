const getElement = (selector) => {
    return document.querySelector(selector)
}

class Cell {
    element = null
    className = 'tic-tac-toe__cell'
    activeClassName = 'tic-tac-toe__cell--empty'
    handler = null
    handlerContext = null
    handlerArgs = []
    click = console.log.bind(this)

    constructor() {
        this.click = this._click.bind(this)
    }

    _click() {
        if (this.handler === null) return
        if (this.handlerContext === null) this.handler(...this.handlerArgs)
        else this.handler.call(this.handlerContext, ...this.handlerArgs)
    }

    setHandler(newHandler, context, ...args) {
        if (typeof newHandler !== 'function') return
        this.handler = newHandler
        if (typeof context === 'object') this.handlerContext = context

        else this.handlerContext = null
        this.handlerArgs - args
    }

    create() {
        this.element = document.createElement('Div')
        this.element.classList.add(this.className)
    }

    activate() {
        if (this.element === null) return
        if (this.element.class.List.contain(this.activeClassName))
        // добавляем слушатель события "клик"
        this.element.addEventListener('click', this.click)
        //добавляем класс
        this.element.classList.add(this.className)
    }

    deactivate() {
        if (this.element === null) return
        if (!this.element.class.List.contain(this.activeClassName))
        // добавляем слушатель события "клик"
        this.element.addEventListener('click', this.click)
        //удалить слушатель клика
        this.element.classList.remove(this.activeClassName)
    }

    fill(content) {
        if (this.element === null) return
        if (typeof content !== 'string') return
        this.element.innerHTML = content
    }

    free() {
        if (this.element === null) return
        this.element.innerHTML = ''
    }

    publish(container) {
        if (this.element === null) return
        if (container instanceof HTMLElement) {
            container.append(this.element)
        }
    }
}

const cell = new Cell()
cell.create()
cell.activate()
cell.publish(getElement('#tic-tac-toe__field'))
cell.fill('<h1>Hello</h1>')
//const startGame = () => {
//    console.log("Start")
// }

//const stopGame = () => {
//    console.log("Stop")
// }

//const switchPlayer = (firstPlayer = true) => {
//    console.log("Player switched")
// }

// cell = {
//    element: DOMElement
// }

const Field = {
    containerEl: getElement('#tic-tac-toe'),
    cells: [[], [], [],],
    setListeners() {
        console.log('Listeners')
    },
    fill() {
        console.log('Fill')
    },
    reset() {
        console.log('Reset')
    }
}

const Game = {
    containerEl: getElement('#tic-tac-toe'),
    buttonEl: getElement('#tic-tac-toe__btn'),
    isActive: false,
    field: Field,
    activePlayer: 0,
    players: [
        {//cross
            name: 'Cross',
            filled: [],
            img: '<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>'
        }, {//cross
            name: 'Zero',
            filled: [],
            img: '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 94 94" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M47,94C21.084,94,0,72.916,0,47S21.084,0,47,0s47,21.084,47,47S72.916,94,47,94z M47,12.186 c-19.196,0-34.814,15.618-34.814,34.814c0,19.195,15.618,34.814,34.814,34.814c19.195,0,34.814-15.619,34.814-34.814 C81.814,27.804,66.195,12.186,47,12.186z"></path> </g> </g> </g></svg>'
        }
    ],

    startGame() {
        console.log("Start")
        this.isActive = true
    },
    
    stopGame() {
        console.log("Stop")
        this.isActive = false
    },

    switchPlayer(firstPlayer = true) {
        console.log("Player switched")
        this.activePlayer = (++this.activePlayer) % 2
    },

    turn(cellEl) {
        console.log("Player goes")
    },
}


// echo choto


// untils

//const setListeners = () => {}