const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Language {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const languages = await Language.getAll();
    languages.push(this.toJSON());
    console.log("language -> ", languages);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "languages.json"),
        JSON.stringify(languages),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async update(language) {
    const languages = await Language.getAll();
    const idx = languages.findIndex((lang) => lang.id === language.id);
    languages[idx] = language;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "languages.json"),
        JSON.stringify(languages),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "languages.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            console.log("here???");
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const languages = await Language.getAll();
    const lang = languages.find((lang) => lang.id == id);
    return lang;
  }
}

module.exports = Language;
