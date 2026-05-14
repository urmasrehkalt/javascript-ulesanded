const fallbackData = {
  students: [
    { name: "Mari", grade: 5 },
    { name: "Jüri", grade: 3 },
    { name: "Kati", grade: 4 },
    { name: "Rasmus", grade: 5 }
  ],
  weather: [
    { city: "Tõrva", latitude: 58.0028, longitude: 25.9350 },
    { city: "Tallinn", latitude: 59.4370, longitude: 24.7536 },
    { city: "Tartu", latitude: 58.3776, longitude: 26.7290 },
    { city: "Pärnu", latitude: 58.3859, longitude: 24.4971 }
  ],
  users: [
    { name: "Liis", role: "admin" },
    { name: "Karl", role: "õpilane" },
    { name: "Anna", role: "õpetaja" }
  ],
  products: [
    { name: "Märkmik", category: "Kontor", price: 3.5 },
    { name: "Pastakas", category: "Kontor", price: 1.2 },
    { name: "Kõrvaklapid", category: "Tehnika", price: 24.9 },
    { name: "Laualamp", category: "Kodu", price: 18.5 },
    { name: "Seljakott", category: "Kool", price: 32.0 }
  ],
  news: [
    { title: "JavaScripti tund algab vormidega" },
    { title: "Õpilased katsetasid fetch API-t" },
    { title: "Valmis esimene mini-rakendus" }
  ],
  books: [
    { id: 1, title: "Tõde ja õigus", author: "A. H. Tammsaare", genre: "Klassika" },
    { id: 2, title: "Rehepapp", author: "Andrus Kivirähk", genre: "Fantaasia" },
    { id: 3, title: "Mees, kes teadis ussisõnu", author: "Andrus Kivirähk", genre: "Fantaasia" },
    { id: 4, title: "Kevade", author: "Oskar Luts", genre: "Klassika" },
    { id: 5, title: "Nullpunkt", author: "Margus Karu", genre: "Noortekirjandus" },
    { id: 6, title: "Apteeker Melchior", author: "Indrek Hargla", genre: "Krimi" }
  ]
};

let appData = fallbackData;
let galleryIndex = 0;
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let readBooks = JSON.parse(localStorage.getItem("readBooks") || "[]");

const galleryImages = [
  { label: "Sinine mägi", src: "data/blue_mountain.jpg" },
  { label: "Roheline mets", src: "data/green_forest.jpg" },
  { label: "Päikeseloojang", src: "data/sunset.jpg" },
  { label: "Öine linn", src: "data/night_city.jpg" }
];

document.addEventListener("DOMContentLoaded", async () => {
  setupGreeting();
  setupCalculator();
  setupPasswordChecker();
  setupRegistrationForm();
  setupGallery();
  setupThemeControls();
  setupTodoList();
  setupJqueryComparison();

  appData = await loadJsonData(false);
  setupStudents(appData.students);
  setupWeather(appData.weather);
  setupProducts(appData.products);
  setupAjaxLoader();
  setupLibrary(appData.books);
});

async function loadJsonData(showErrors) {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (showErrors) {
      throw error;
    }

    return fallbackData;
  }
}

function setupGreeting() {
  const nameInput = document.querySelector("#nameInput");
  const greetButton = document.querySelector("#greetButton");
  const result = document.querySelector("#greetingResult");

  greetButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    result.textContent = name ? `Tere, ${name}!` : "Palun sisesta nimi.";
    result.className = name ? "result success" : "result error";
  });
}

function setupCalculator() {
  const firstNumber = document.querySelector("#firstNumber");
  const secondNumber = document.querySelector("#secondNumber");
  const operationSelect = document.querySelector("#operationSelect");
  const calculateButton = document.querySelector("#calculateButton");
  const result = document.querySelector("#calculatorResult");

  calculateButton.addEventListener("click", () => {
    const a = Number(firstNumber.value);
    const b = Number(secondNumber.value);
    const operation = operationSelect.value;

    if (Number.isNaN(a) || Number.isNaN(b)) {
      result.textContent = "Sisesta mõlemasse lahtrisse korrektne arv.";
      result.className = "result error";
      return;
    }

    if (operation === "divide" && b === 0) {
      result.textContent = "Nulliga jagada ei saa.";
      result.className = "result error";
      return;
    }

    const answers = {
      add: a + b,
      subtract: a - b,
      multiply: a * b,
      divide: a / b
    };

    result.textContent = `Vastus: ${answers[operation]}`;
    result.className = "result success";
  });
}

function setupPasswordChecker() {
  const passwordInput = document.querySelector("#passwordInput");
  const result = document.querySelector("#passwordResult");
  const ruleElements = document.querySelectorAll("#passwordRules li");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const checks = getPasswordChecks(password);
    const passed = Object.values(checks).filter(Boolean).length;

    ruleElements.forEach((item) => {
      item.classList.toggle("valid", checks[item.dataset.rule]);
    });

    if (!password) {
      result.textContent = "Tugevus: puudub";
      result.className = "result";
    } else if (passed <= 2) {
      result.textContent = "Tugevus: nõrk";
      result.className = "result error";
    } else if (passed === 3) {
      result.textContent = "Tugevus: keskmine";
      result.className = "result warning";
    } else {
      result.textContent = "Tugevus: tugev";
      result.className = "result success";
    }
  });
}

function getPasswordChecks(password) {
  return {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-ZÕÄÖÜ]/.test(password),
    special: /[^A-Za-z0-9ÕÄÖÜõäöü]/.test(password)
  };
}

function setupRegistrationForm() {
  const form = document.querySelector("#registrationForm");
  const messages = document.querySelector("#registrationMessages");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    messages.innerHTML = "";

    const name = document.querySelector("#registerName").value.trim();
    const email = document.querySelector("#registerEmail").value.trim();
    const age = Number(document.querySelector("#registerAge").value);
    const password = document.querySelector("#registerPassword").value;
    const repeat = document.querySelector("#registerRepeat").value;
    const errors = [];

    if (!name || !email || !age || !password || !repeat) {
      errors.push("Kõik väljad peavad olema täidetud.");
    }

    if (email && !email.includes("@")) {
      errors.push("E-post peab sisaldama @ märki.");
    }

    if (age < 13) {
      errors.push("Vanus peab olema vähemalt 13.");
    }

    if (password !== repeat) {
      errors.push("Paroolid peavad kattuma.");
    }

    if (errors.length === 0) {
      addMessage(messages, "Vorm on korras ja registreerimine õnnestus.", "success");
      form.reset();
      return;
    }

    errors.forEach((error) => addMessage(messages, error, "error"));
  });
}

function addMessage(list, text, className) {
  const item = document.createElement("li");
  item.textContent = text;
  item.classList.add(className);
  list.append(item);
}

function setupGallery() {
  const mainImage = document.querySelector("#mainGalleryImage");
  const thumbnailList = document.querySelector("#thumbnailList");
  const nextButton = document.querySelector("#nextImageButton");

  galleryImages.forEach((image, index) => {
    const button = document.createElement("button");
    const thumbnail = document.createElement("img");
    thumbnail.src = image.src;
    thumbnail.alt = image.label;
    button.type = "button";
    button.append(thumbnail);
    button.addEventListener("click", () => updateGallery(index));
    thumbnailList.append(button);
  });

  nextButton.addEventListener("click", () => {
    updateGallery((galleryIndex + 1) % galleryImages.length);
  });

  updateGallery(0);

  function updateGallery(index) {
    galleryIndex = index;
    const image = galleryImages[index];
    mainImage.src = image.src;
    mainImage.alt = image.label;

    thumbnailList.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
    });
  }
}

function setupThemeControls() {
  const themeMode = document.querySelector("#themeMode");
  const backgroundColor = document.querySelector("#backgroundColor");
  const fontSize = document.querySelector("#fontSize");
  const resetButton = document.querySelector("#resetThemeButton");
  const savedTheme = JSON.parse(localStorage.getItem("themeSettings") || "null");

  if (savedTheme) {
    themeMode.value = savedTheme.mode;
    backgroundColor.value = savedTheme.background;
    fontSize.value = savedTheme.fontSize;
  }

  applyTheme();

  [themeMode, backgroundColor, fontSize].forEach((control) => {
    control.addEventListener("change", () => {
      applyTheme();
      localStorage.setItem("themeSettings", JSON.stringify({
        mode: themeMode.value,
        background: backgroundColor.value,
        fontSize: fontSize.value
      }));
    });
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem("themeSettings");
    themeMode.value = "light";
    backgroundColor.value = "#f4f7fb";
    fontSize.value = "16px";
    applyTheme();
  });

  function applyTheme() {
    document.body.classList.toggle("dark-theme", themeMode.value === "dark");
    document.documentElement.style.setProperty("--background", backgroundColor.value);
    document.body.style.backgroundColor = backgroundColor.value;
    document.documentElement.style.fontSize = fontSize.value;
  }
}

function setupTodoList() {
  const form = document.querySelector("#todoForm");
  const input = document.querySelector("#todoInput");
  const list = document.querySelector("#todoList");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();

    if (!text) {
      return;
    }

    todos.push({ id: Date.now(), text, done: false });
    input.value = "";
    saveTodos();
    renderTodos();
  });

  renderTodos();

  function renderTodos() {
    list.innerHTML = "";

    if (todos.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "Ülesandeid veel ei ole.";
      list.append(emptyItem);
      return;
    }

    todos.forEach((todo) => {
      const item = document.createElement("li");
      const text = document.createElement("span");
      const toggleButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      item.classList.toggle("done", todo.done);
      text.textContent = todo.text;
      toggleButton.type = "button";
      toggleButton.textContent = todo.done ? "Ava" : "Tehtud";
      deleteButton.type = "button";
      deleteButton.textContent = "Kustuta";

      toggleButton.addEventListener("click", () => {
        todo.done = !todo.done;
        saveTodos();
        renderTodos();
      });

      deleteButton.addEventListener("click", () => {
        todos = todos.filter((itemTodo) => itemTodo.id !== todo.id);
        saveTodos();
        renderTodos();
      });

      item.append(text, toggleButton, deleteButton);
      list.append(item);
    });
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setupStudents(students) {
  const showStrong = document.querySelector("#showStrongStudents");
  const showAll = document.querySelector("#showAllStudents");

  renderStudents(students);
  showStrong.addEventListener("click", () => renderStudents(students.filter((student) => student.grade >= 4)));
  showAll.addEventListener("click", () => renderStudents(students));
}

function renderStudents(students) {
  const table = document.querySelector("#studentsTable");
  const averageGrade = document.querySelector("#averageGrade");
  table.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.name}</td><td>${student.grade}</td>`;
    table.append(row);
  });

  const average = students.reduce((sum, student) => sum + student.grade, 0) / students.length;
  averageGrade.textContent = `Keskmine hinne: ${average.toFixed(2)}`;
}

function setupWeather(weather) {
  const citySelect = document.querySelector("#weatherCity");
  const result = document.querySelector("#weatherResult");

  citySelect.innerHTML = weather.map((item, index) => `<option value="${index}">${item.city}</option>`).join("");
  citySelect.addEventListener("change", () => renderWeather(weather));
  renderWeather(weather);
}

async function renderWeather(weather) {
  const citySelect = document.querySelector("#weatherCity");
  const result = document.querySelector("#weatherResult");
  const selected = weather[Number(citySelect.value)];

  if (!selected) {
    result.textContent = "Linna ei leitud.";
    result.className = "weather-card error";
    return;
  }

  result.textContent = `Laen linna ${selected.city} ilmaandmeid...`;
  result.className = "weather-card";

  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", selected.latitude);
    url.searchParams.set("longitude", selected.longitude);
    url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    result.textContent = `${selected.city}: ${current.temperature_2m} °C, ${getWeatherDescription(current.weather_code)}, tuul ${current.wind_speed_10m} km/h`;
    result.className = "weather-card success";
  } catch (error) {
    result.textContent = "Päris ilmaandmete laadimine ebaõnnestus. Kontrolli internetiühendust ja proovi uuesti.";
    result.className = "weather-card error";
  }
}

function getWeatherDescription(code) {
  const descriptions = {
    0: "selge",
    1: "peamiselt selge",
    2: "osaliselt pilves",
    3: "pilves",
    45: "udu",
    48: "härmatisudu",
    51: "nõrk uduvihm",
    53: "mõõdukas uduvihm",
    55: "tugev uduvihm",
    61: "nõrk vihm",
    63: "mõõdukas vihm",
    65: "tugev vihm",
    71: "nõrk lumesadu",
    73: "mõõdukas lumesadu",
    75: "tugev lumesadu",
    80: "nõrk hoovihm",
    81: "mõõdukas hoovihm",
    82: "tugev hoovihm",
    95: "äike"
  };

  return descriptions[code] || `ilmkood ${code}`;
}

function setupAjaxLoader() {
  const button = document.querySelector("#loadDataButton");
  const result = document.querySelector("#ajaxResult");

  button.addEventListener("click", async () => {
    result.innerHTML = "<p>Laen andmeid...</p>";

    try {
      const data = await loadJsonData(true);
      result.innerHTML = "";
      addDataPill(result, `Kasutajaid: ${data.users.length}`);
      addDataPill(result, `Tooteid: ${data.products.length}`);
      addDataPill(result, `Uudiseid: ${data.news.length}`);
      addDataPill(result, `Raamatuid: ${data.books.length}`);
    } catch (error) {
      result.innerHTML = `<p class="error">Andmete laadimine ebaõnnestus. Käivita leht kohaliku serveriga.</p>`;
    }
  });
}

function addDataPill(container, text) {
  const item = document.createElement("div");
  item.className = "data-pill";
  item.textContent = text;
  container.append(item);
}

function setupProducts(products) {
  const search = document.querySelector("#productSearch");
  const category = document.querySelector("#productCategory");
  const sort = document.querySelector("#productSort");
  const categories = ["Kõik", ...new Set(products.map((product) => product.category))];

  category.innerHTML = categories.map((item) => `<option value="${item}">${item}</option>`).join("");
  [search, category, sort].forEach((control) => control.addEventListener("input", renderProducts));
  renderProducts();

  function renderProducts() {
    const query = search.value.trim().toLowerCase();
    const selectedCategory = category.value;
    const sortedProducts = products
      .filter((product) => product.name.toLowerCase().includes(query))
      .filter((product) => selectedCategory === "Kõik" || product.category === selectedCategory)
      .sort((a, b) => sort.value === "price" ? a.price - b.price : a.name.localeCompare(b.name, "et"));

    const list = document.querySelector("#productList");
    list.innerHTML = sortedProducts.map((product) => (
      `<li><strong>${product.name}</strong><br>${product.category} · ${product.price.toFixed(2)} €</li>`
    )).join("") || "<li>Tooteid ei leitud.</li>";
  }
}

function setupJqueryComparison() {
  const vanillaButton = document.querySelector("#vanillaToggle");
  const vanillaText = document.querySelector("#vanillaText");

  vanillaButton.addEventListener("click", () => {
    vanillaText.hidden = !vanillaText.hidden;
  });

  const jqueryButton = document.querySelector("#jqueryToggle");
  jqueryButton.addEventListener("click", () => {
    if (window.jQuery) {
      window.jQuery("#jqueryText").slideToggle(220);
    } else {
      document.querySelector("#jqueryText").textContent = "jQuery CDN ei ole laetud.";
    }
  });
}

function setupLibrary(books) {
  const search = document.querySelector("#bookSearch");
  const genre = document.querySelector("#bookGenre");
  const resetButton = document.querySelector("#resetReadBooks");
  const genres = ["Kõik", ...new Set(books.map((book) => book.genre))];

  genre.innerHTML = genres.map((item) => `<option value="${item}">${item}</option>`).join("");
  [search, genre].forEach((control) => control.addEventListener("input", () => renderLibrary(books)));
  resetButton.addEventListener("click", () => {
    readBooks = [];
    saveReadBooks();
    renderLibrary(books);
  });

  renderLibrary(books);
}

function renderLibrary(books) {
  const search = document.querySelector("#bookSearch");
  const genre = document.querySelector("#bookGenre");
  const list = document.querySelector("#libraryList");
  const query = search.value.trim().toLowerCase();
  const selectedGenre = genre.value;
  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(query))
    .filter((book) => selectedGenre === "Kõik" || book.genre === selectedGenre);

  list.innerHTML = "";

  if (filteredBooks.length === 0) {
    list.innerHTML = "<p>Raamatuid ei leitud.</p>";
    return;
  }

  filteredBooks.forEach((book) => {
    const card = document.createElement("article");
    const title = document.createElement("h3");
    const details = document.createElement("p");
    const button = document.createElement("button");
    const isRead = readBooks.includes(book.id);

    card.className = `library-card${isRead ? " read" : ""}`;
    title.textContent = book.title;
    details.textContent = `${book.author} · ${book.genre}`;
    button.type = "button";
    button.textContent = isRead ? "Märgi lugemata" : "Märgi loetuks";
    button.addEventListener("click", () => {
      readBooks = isRead ? readBooks.filter((id) => id !== book.id) : [...readBooks, book.id];
      saveReadBooks();
      renderLibrary(books);
    });

    card.append(title, details, button);
    list.append(card);
  });
}

function saveReadBooks() {
  localStorage.setItem("readBooks", JSON.stringify(readBooks));
}
