document.querySelectorAll(".price").forEach((node) => {
  node.textContent = Intl.NumberFormat("ua-UA", {
    currency: "UAH",
    style: "currency",
  }).format(node.textContent);
});
