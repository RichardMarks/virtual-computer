import './index.css'

const qe = s => document.querySelector(s)

// @a @b @sp @ip
const matchRegister = new RegExp(/^@([ab]|sp|ip)?$/)
// #0 - #FFFF
const matchAddress = new RegExp(/^#([0-9A-Fa-f]{1,4})$/)
// 0 - 255
const matchByte10 = new RegExp(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/)
// 0x0 - 0xFF
const matchByte16 = new RegExp(/^0x([0-9A-Fa-f]{1,2})$/)

const isRegister = token => matchRegister.test(token)
const isAddress = token => matchAddress.test(token)
const isByte = token => matchByte10.test(token) || matchByte16.test(token)

const getRegister = token => matchRegister.exec(token)[1]
const getAddress = token => matchAddress.exec(token)[1]
const getByte = token => matchByte10.exec(token)[1] || matchByte16.exec(token)[1]

const OPCODES = {
  MOV_R_TO_R: 0,
  MOV_B_TO_R: 1
}

const app = {
  ui: undefined,
  system: {
    a: 0,
    b: 0,
    sp: 0,
    ip: 0,
    ram: []
  },

  run (code) {
    const instructions = app.parse(code)
    app.execute(instructions)
  },

  parse (code) {
    const codeSource = `${code}`
    const lines = codeSource.split('\n')
    const instructions = []
    console.log(`parsed ${lines.length} lines`, lines)

    lines.forEach((line, index) => {
      line.length && app.parseLine(line, index, instructions)
    })

    return instructions
  },

  parseLine (line, index, instructions) {

    const tokens = line.split(' ')
    const tokenCount = tokens.length
    console.log(`L${1 + index}:`, tokens)
    if (tokenCount === 1) {
      const [mnemonic] = tokens
      // cmp
    } else if (tokenCount === 2) {
      const [mnemonic, operanda] = tokens
      // sys proc
      // add val
      // sub val
      // mul val
      // div val
      // jmp addr
      // jz addr
      // jnz addr
      // je addr
      // jne addr
      // jl addr
      // jg addr
      // jle addr
      // jge addr
    } else if (tokenCount === 3) {
      const [mnemonic, operanda, operandb] = tokens
      if (mnemonic === 'mov') {
        // MOV DEST, SRC

        const destRegister = operanda.match(/^@([ab])/)
        const destAddress = operanda.match(/^#([0-9A-Fa-f]{1,4})/)
        const srcRegister = operandb.match(/^@([ab])/)
        const srcValue = operandb.match(/^@([ab])/)
        // mov reg val
        // mov reg reg
      }
    } else {
      throw new Error(`Error: L${1 + index} - Unknown Token Stream ${tokens}`)
    }
  },

  execute (instructions) {
    console.log('executing instructions', instructions)
  }
}

const boot = () => {
  const ui = app.ui = {
    regA: qe('.reg-a'),
    regB: qe('.reg-b'),
    regSP: qe('.reg-sp'),
    regIP: qe('.reg-ip'),
    src: qe('.src'),
    menu: {
      newButton: qe('.menu-button-new'),
      saveButton: qe('.menu-button-save'),
      runButton: qe('.menu-button-run')
    }
  }

  ui.regA.value = 'A: 0x00'
  ui.regB.value = 'B: 0x00'
  ui.regSP.value = 'SP: 0'
  ui.regIP.value = 'IP: 0'

  ui.menu.runButton.addEventListener('click', () => {
    const code = ui.src.value
    console.log(code)
    app.run(code)
  }, false)

  ui.src.value = 'mov @a, 0\nmov @b, 5\nadd 3\nsys 8'
}

document.addEventListener('DOMContentLoaded', boot, false)
