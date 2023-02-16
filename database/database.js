import sqlite3 from 'sqlite3'
import md5 from 'md5'

const DBSOURCE = './database/main.sqlite'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
    }})
export default db