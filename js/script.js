const tableName = "parking";
const selector = document.querySelector('.id');
const table = document.querySelector('.result__table');

let flag = false;
let newRows = "";

db = openDatabase("MyDB", "0.1", "parking", 1024 * 10);
if (!db) {
    alert("Не удалось подключиться к базе данных.");
};

db.transaction((tx) => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS parking1 ( id integer primary key autoincrement, name TEXT UNIQUE, company TEXT, number TEXT, time INTEGER);", []);
    
},
    tx => {
        console.log("Таблица создана");
        // updateSelector();
    }
);
