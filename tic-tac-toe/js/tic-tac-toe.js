const getElement = (selector) => {
    return document.querySelector(selector)
}

const isString = (value) => {
    return typeof value === 'string'
}

class InfoLabel {
    element = getElement('#tic-tac-toe__info')

    constructor() {}

    hasElement() {
        return this.element instanceof HTMLElement
    }

    setWinner(winnerName) {
        if (!isString(winnerName) || !this.hasElement()) return
        this.element.innerText = `${winnerName} is winner!`
    }

    setTurn(activePlayerName) {
        if (!isString(activePlayerName) || !this.hasElement()) return
        this.element.innerText = `${activePlayerName}'s turn`
    }

    setDraw() {
        if (!this.hasElement()) return
        this.element.innerText = `Draw!`
    }

    setNotStarted() {
        if (!this.hasElement()) return
        this.element.innerText = `Not started`
    }
}

class Clickable {
    element = null
    activeClassName = null
    handler = null
    handlerContext = null
    handlerArgs = []
    click = null

    constructor() {
        this.click = this._click.bind(this)
    }

    _click() {
        console.log('Click')
        if (this.handler === null) return
        if (this.handlerContext === null) {
            this.handler(...this.handlerArgs)
        }
        else this.handler.call(
            this.handlerContext,
            ...this.handlerArgs
        )
        this.deactivate()
    }

    setHandler(newHandler, context, ...args) {
        if (typeof newHandler !== 'function') return
        this.handler = newHandler
        if (typeof context === 'object') this.handlerContext = context
        else this.handlerContext = null
        this.handlerArgs = args
    }

    activate() {
        if (this.element === null) return
        if (this.element.classList.contains(this.activeClassName)) return
        // добавляем слушатель события "клик"
        this.element.addEventListener('click', this.click)
        // добавляем класс
        this.element.classList.add(this.activeClassName)
    }

    deactivate() {
        // console.log('Cell -> deactivate()')
        if (this.element === null) return
        if (!this.element.classList.contains(this.activeClassName)) return
        // удаляем слушатель события "клик"
        this.element.removeEventListener('click', this.click)
        // удаляем класс
        this.element.classList.remove(this.activeClassName)
    }
}

class Button extends Clickable {

    hasElement() {
        return this.element instanceof HTMLElement
    }

    setStart() {
        if (!this.hasElement()) return
        this.element.innerText
    }
}

class Cell extends Clickable {
    element = null
    className = 'tic-tac-toe__cell'
    winClassName = 'tic-tac-toe__cell--win'
    activeClassName = 'tic-tac-toe__cell--empty'
    handler = null
    handlerContext = null
    handlerArgs = []
    click = null

    constructor() {
        super()
        this.activeClassName = ''
    }

    create() {
        this.element = document.createElement('div')
        this.element.classList.add(this.className)
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

    unpublish() {
        if (this.element instanceof HTMLElement) {
            this.element.remove()
        }
    }

    addWinClass() {
        if (this.element instanceof HTMLElement) {
            if (this.element.classList.contains(this.winClassName)) return
            this.element.classList.add(this.winClassName)
        }
    }

    removeWinClass() {
        if (this.element instanceof HTMLElement) {
            if (!this.element.classList.contains(this.winClassName)) return
            this.element.classList.remove(this.winClassName)
        }
    }
}

// const cell = new Cell()
// cell.create()
// cell.publish(getElement('#tic-tac-toe__field'))
// cell.setHandler(cell.fill, cell, '<h1>Hello</h1>')
// console.log(cell.handler)
// cell.activate()

// field -> Field

class Field {
    containerEl = getElement('#tic-tac-toe__field')
    cells = [[], [], [],]

    constructor(handler, context, ...args) {
        this.cells.forEach((line) => {
            for (let i = 0; i < 3; ++i) {
                const cell = new Cell()
                const newArgs = [cell, ...args]
                cell.create()
                cell.publish(this.containerEl)
                cell.setHandler(handler, context, ...newArgs)
                cell.activate()
                line.push(cell)
            }
        })
    }

    get size() {
        return this.cells.length
    }

    deactivate() {
        // console.log('Field -> deactivate()')
        this.cells.forEach((line) => {
            // console.log('For each line, line:', line)
            line.forEach((cell) => { cell.deactivate() })
        })
    }

    clear() {
        this.cells.forEach((line) => {
            line.forEach((cell) => {
                cell.free()
                cell.removeWinClass()
                cell.unpublish()
            })
        })
    }
}

// const field = new Field(console.log, null, 'Hello, im cell')

class Game {
    buttonEl = getElement('#tic-tac-toe__btn')
    InfoLabel = new InfoLadel()
    isActive = false
    field = null
    activePlayerId = -1
    winCombinations = []
    players = [
        {// cross
            name: 'Cross',
            filled: [],
            img: '<svg viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)" fill="#000000"> <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>',
        },
        {// zero
            name: 'Zero',
            filled: [],
            img: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
        }
    ]

    constructor() {
        this.infoLadel.setNotStarted()
    }

    get activePlayer() {
        return this.activePlayerId !== -1
            ? this.players[this.activePlayerId]
            : null
    }

    startGame() {
        console.log("Start")
        if (this.field instanceof Field) this.field.clear() 
        this.field = new Field(this.turn, this)
        this.initPlayer()
        this.switchPlayer()
        this.updateWinCombinations()
        this.isActive = true
    }
    
    stopGame() {
        console.log("Stop")
        this.field.deactivate()
        this.isActive = false
    }

    initPlayers() {
        this.players.forEach((player) => { player.filled = [] })
    }

    switchPlayer() {
        console.log("Player switched")
        this.activePlayerId = (this.activePlayerId + 1) % this.players.length
        this.infoLadel.setTurn(this.activePlayer.name)
    }

    updateWinCombinations() {
        this.winCombinations = [[], [], [], [], []]
        // заполняем колонки и диагонали
        this.field.cells.forEach((line, lineId) => {
            this.winCombinations[0].push(line[0])
            this.winCombinations[1].push(line[1])
            this.winCombinations[2].push(line[2])
            this.winCombinations[3].push(line[lineId])
            this.winCombinations[4].push(line[line.length - lineId - 1])
        })
        // заполняем строки
        this.winCombinations = [
            ...this.winCombinations,
            ...this.field.cells
        ]
    }
    getWinCombination() {
        if (this.activePlayer.filled.length < this.field.size) return false
        let combo = null
        console.log(this.winCombinations)
        this.winCombinations.forEach((combination) => {
            let matches = 0
            combination.forEach((cell) => {
                if (this.activePlayer.filled.includes(cell)) ++matches
                else return
            })
            if (matches === combination.length) {
                combo = combination
                return
            } 
        })
        return combo
    }
    markWinCombo(winCombo) {
        if (winCombo instanceof Array) {
            winCombo.forEach((cell) => {
                if (cell instanceof Cell) cell.addWinClass()
            })
        }
    }
    turn(cell) {
        if (!this.isActive) return

        cell.fill(this.activePlayer.img)
        this.activePlayer.filled.push(cell)
        // console.log(this.activePlayer.filled)

        const winCombo = this.getWinCombination()
        if (winCombo instanceof Array) {
            this.markWinCombo()
            this.stopGame()
            setTimeout(() => {
                alert(`${this.activePlayer.name} is winner!`)
            }, 200)
            this.InfoLabel.setWinner(this.activePlayer.name)
            return
        }

        if (this.activePlayer.filled.length === 5) {
            this.stopGame()
            this.infoLadel.setDraw()
            return
        }

        this.switchPlayer()
    }
}

const game = new Game()
game.startGame()