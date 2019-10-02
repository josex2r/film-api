const fs = require('fs');
const path = require('path');

class DB {
    constructor() {
        this.dbPath = path.join(__dirname, 'db.json');
        this._db = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
    }
    
    get(key) {
        console.log(`get(${key})`);
        return this._db[key];
    }
    
    _writeDB() {
        console.log('_dumpMemory()');
        fs.writeFile(this.dbPath, JSON.stringify(this._db), 'utf-8', (err) => {
            if (err) {
                console.error('ERROR in "dumpMemory":', err);
            } else {
                console.log('Memory has been successfully stored!');
            }
        });
    }
    
    addFilm(film) {
        if (!film.name || !film.description ||!film.image) {
            throw new Error('All fields are required');
        }
        const films = this.get('films');
        
        film.id = Math.random().toString(26).slice(2);
        films.push(film);
        this._writeDB();
    }
    
    deleteFilm(id) {
        if (!id) {
            throw new Error('No ID provided');
        }
        const films = this.get('films');
        const index = films.findIndex((film) => film.id === id);

        films.splice(index, 1);
        this._writeDB();
    }
}

module.exports = new DB();