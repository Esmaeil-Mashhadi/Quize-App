const { hash, compare, hashSync } = require("bcrypt")

const hashPassword = (password)=>{
    const hashedPassword = hashSync(password , 10)
    return hashedPassword
}


const verifyPassword = (password , hashedPassword)=>{
    const isValid = compare(password , hashedPassword)
    return isValid
}

export {hashPassword , verifyPassword}