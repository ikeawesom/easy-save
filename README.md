# EasySave — Simple Savings Tracker

EasySave is a lightweight, privacy-focused savings tracker built with **React**, **TypeScript**, and **Vite**.  
All data is stored **locally in the browser** using `localStorage`, making it completely offline, fast, and secure for personal use.

---

## 🚀 Features

- 💰 **Track savings** with simple add/remove functionality
- 📊 **Progress view** with visual percentage bar
- 💾 **Persistent local storage** (no backend required)
- 📱 **Responsive layout**
- ⚡ Built using **Vite + React + TypeScript**, with clean modular components
- 🧩 Custom hooks for state & storage management:
  - `useSavings()`
  - `useAddSavings()`
  - `usePage()`
  - `useStorageState()`

---

## 📂 Project Structure

```
easy-save/
├── src/
│   ├── components/
│   │   ├── Container.tsx
│   │   ├── ErrorText.tsx
│   │   ├── Modal.tsx
│   │   ├── TextInput.tsx
│   │   └── savings/
│   │       ├── SavingRecord.tsx
│   │       └── SavingsContainer.tsx
│   ├── hooks/
│   │   ├── useAddSavings.ts
│   │   ├── usePage.ts
│   │   ├── useSavings.ts
│   │   └── useStorageState.ts
│   ├── App.tsx
│   ├── financeTypes.ts
│   ├── lib.ts
│   ├── utils.ts
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── ...
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/ikeawesom/easy-save.git
cd easy-save
```

### 2. Install dependencies

```
npm install
```

### 3. Start development server

```
npm run dev
```

Vite will start a local dev server and provide a URL (usually `http://localhost:5173`).

---

## 🏗️ Build for Production

```
npm run build
```

This outputs the final static site into the `dist/` directory.

To preview the production build locally:

```
npm run preview
```

---

## 🧪 Tech Stack

- **React** (TypeScript)
- **Vite**
- **TailwindCSS** (if applicable)
- **localStorage** for persistence

---

## 🛡️ Privacy

This app does **not** send any data to any server.  
All values are stored only on the user's device via browser storage.

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues, submit pull requests, or suggest improvements.

---

## 📄 License

This project is open-source and available under the **MIT License**.
