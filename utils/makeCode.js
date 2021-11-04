function makeCode() {
    let code = ""
    const codeLength = 6
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'h', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Y', 'J', 'K', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    for (let i = 0; i < codeLength; i++) {
        code += chars[Math.floor(Math.random() * chars.length)]
    }
    return code
}

module.exports = makeCode