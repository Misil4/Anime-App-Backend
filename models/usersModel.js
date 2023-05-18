import md5 from "md5"

const getAllUsers = () => {
    return "SELECT * FROM users"
}

const createNewUser = (req) => {
    const {name,password,email} = req

    return `INSERT INTO users (name, password, email)VALUES ('${name}','${md5(password)}','${email}');`
}

const getUser = (req) => {
    const {name,password} = req
    return `SELECT * FROM users WHERE name="${name}" AND password="${md5(password)}"`
}

const updateImage = (req) => {
    const {image,name} = req
    return `UPDATE users SET avatar="${image}" WHERE name="${name}"`
}

export  {getAllUsers,createNewUser,getUser,updateImage}





