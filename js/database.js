function getConnection() {
    let db = openDatabase('ResidentdDb', '1.0', 'Resident DB', 2 * 1024 * 1024);

    if (!db)
        alert("Failed to connect to database.");

    return db;
}