const fs = require('fs');
const throttle = require('lodash.throttle');

class DB {
    constructor() {
        this._db = require('./db.json');
    }
    
    get(key) {
        return this._db[key];
    }
    
    set(key, value) {
        this._db[key] = value;
        // Write JSON file each 20s (only if this function has been called)
        throttle(this.dumpMemory, 20000);
    }
    
    dumpMemory() {
        fs.writeFile('db.json', this._db, 'utf-8', (err) => {
            if (err) {
                console.error('ERROR in "dumpMemory":', err);
            } else {
                console.log('Memory has been successfully stored!');
            }
        });
    }
}

module.exports = new DB();