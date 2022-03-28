const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

class Cart {
  static async add(language) {
    const cart = await Cart.fetch();

    const idx = cart.languages.findIndex((l) => l.id === language.id);
    const candidate = cart.languages[idx];

    if (candidate) {
      console.log("we have this");
      candidate.count++;
      cart.languages[idx] = candidate;
    } else {
      console.log("we dont have this");
      language.count = 1;
      cart.languages.push(language);
    }

    cart.price += Number(language.price);

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();

    const idx = cart.languages.findIndex((l) => l.id === id);
    const language = cart.languages[idx];

    if (language.count === 1) {
      cart.languages = cart.languages.filter((l) => l.id !== id);
    } else {
      cart.languages[idx].count--;
    }

    cart.price -= language.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(cart);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Cart;
