const toCurrency = (price) => {
  return new Intl.NumberFormat("ua-UA", {
    currency: "UAH",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const $cart = document.querySelector("#cart");

if ($cart) {
  $cart.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      fetch("/cart/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.languages.length) {
            const html = cart.languages
              .map((l) => {
                return `
                <tr>
                  <td>${l.title}</td>
                  <td>${l.count}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id=${l.id}>Remove</button>
                  </td>
                </tr>
                `;
              })
              .join("");
            $cart.querySelector("tbody").innerHTML = html;
            $cart.querySelector(".price").textContent = toCurrency(cart.price);
          } else {
            $cart.innerHTML = "<p>Trash is empty</p>";
          }
        });
    }
  });
}
