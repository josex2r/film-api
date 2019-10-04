const fs = require('fs');
const path = require('path');

class Database {
  constructor() {
    this.databasePath = path.join(__dirname, 'database.json');

    const database = fs.readFileSync(this.databasePath);

    this.content = JSON.parse(database);
  }

  get(key) {
    return this.content[key];
  }

  set(key, value) {
    this.content[key] = value;
    fs.writeFile(this.databasePath, JSON.stringify(this.content), () => {});
  }
}

module.exports = new Database();
