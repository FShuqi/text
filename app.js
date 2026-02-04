// 读取并初始化 todos（如果 localStorage 中有已保存的数据则使用）
const saved = localStorage.getItem("todos");
let todos = saved ? JSON.parse(saved) : [];

const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const countEl = document.getElementById("count");

// 回车触发添加
if (input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addBtn && addBtn.click();
    }
  });
}

// 点击“添加”
if (addBtn) {
  addBtn.addEventListener("click", () => {
    const text = input ? input.value.trim() : "";
    if (text === "") return;

    todos.push({
      id: Date.now(),
      text,
      completed: false,
    });

    if (input) input.value = "";
    render();
  });
}

// 将当前 todos 保存到 localStorage
function saveTodos() {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    // 可选：处理 quota exceeded 或其它异常
    console.error("Failed to save todos to localStorage:", e);
  }
}

// 渲染列表并更新计数
function render() {
  if (!list) return;

  list.innerHTML = "";

  // 统一在 render 中更新待办数量
  const activeCount = todos.filter(t => !t.completed).length;
  if (countEl) {
    countEl.textContent = `待办：${activeCount} 个`;
  }

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
    delBtn.style.marginLeft = "8px";
    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      render();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  // 每次渲染后保存当前状态到 localStorage（实现持久化）
  saveTodos();
}

// 初始渲染
render();
