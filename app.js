input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

// 用数组存 Todo（假数据）
let todos = [];

// 点击“添加”
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({
    id: Date.now(),
    text,
    completed: false,
  });

  input.value = "";
  render();
});

// 渲染列表
function render() {
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.textDecoration = todo.completed ? "line-through" : "none";
    span.style.cursor = "pointer";

    // 点击文字 → 切换完成状态
    span.addEventListener("click", () => {
      todo.completed = !todo.completed;
      render();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "删除";
    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      render();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
