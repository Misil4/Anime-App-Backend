import md5 from "md5"

const getAllUsers = () => {
    return "SELECT * FROM users"
}

const createNewUser = (req) => {
    console.log(req)
    const {name,password,email} = req

    return `INSERT INTO users (name, password, email)VALUES ('${name}','${md5(password)}','${email}');`
}

export  {getAllUsers,createNewUser}





