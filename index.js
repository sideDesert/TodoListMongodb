// console.log("hello");

let todo = [];

const hydrate = async () => {
  const res = await fetch("/api");
  const records = await res.json();
  todo = records;
  todo.forEach((item) => {
    renderItem(item);
  });
};

hydrate();

const addItem = (title, desc) => {
  const item = {
    title,
    desc,
    id: Date.now(),
  };
  todo.push(item);
  return item;
};

const form = document.querySelector(".form");
const ul = document.querySelector(".list-of-tasks");

const renderItem = (item) => {
  const li = document.createElement("li");
  li.setAttribute("class", "task-item");
  li.setAttribute("data-key", item.id);
  li.innerHTML = `
      <div class="container">
      <div class="wrapper">
          <div class="task-title">${item.title}</div>
          <div class="task-desc">${item.desc}</div>
      </div>
      <div class="wrapper button">
          <button class="delete">X</button>
      </div>
  </div>
      `;
  //   console.log(li);
  ul.append(li);
};

async function sendRes() {
  const record = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const response = await record.json();
  console.log(response);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titleInput = document.querySelector("#title");
  const descInput = document.querySelector("#desc");

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title !== "") {
    addItem(title, desc);
    titleInput.value = "";
    descInput.value = "";
    titleInput.focus();
    // console.log(todo);
    renderItem(todo[todo.length - 1]);
    sendRes();
  }
});

ul.addEventListener("click", (event) => {
  //   console.log(event);
  if (event.target.className === "delete") {
    let item = event.target;
    let listItem = item.parentElement.parentNode.parentNode;
    const key = listItem.dataset.key;
    ul.removeChild(listItem);

    deleteItem(Number(key));

    // fetch("/api", {
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     title: toBeDeleted.title,
    //     desc: toBeDeleted.desc,
    //     id: key,
    //   }),
    // });
  }
});

function deleteItem(key) {
  const deleteItem = todo.find((item) => item.id === key);
  console.log(deleteItem);
  fetch("/api", {
    method: "DELETE",
    body: JSON.stringify({
      title: deleteItem.title,
      desc: deleteItem.desc,
      id: key,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const updatedTodo = todo.filter((item) => item.id !== key);
  todo = updatedTodo;
}
