class ParkingDto {
    static insert(parking) {
        let conn = getConnection();
        conn.transaction(
            function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Parking(id INTEGER, full_name TEXT, company TEXT, car_number TEXT, parking_time DATE, additional_fields TEXT, PRIMARY KEY(id))');
                tx.executeSql('INSERT INTO Parking(full_name, company, car_number, parking_time, additional_fields) VALUES (?, ?, ?, ?, ?)', [parking.fullName, parking.company, parking.carNumber, parking.parkingTime, JSON.stringify(parking.additionalFields)]);
            },
            null,
            function () {
                console.log("insert error");

            });
    }

    static get(callback) {
        let conn = getConnection();
        let parkings = [];

        conn.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Parking;", [], function (tx, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    parkings.push(results.rows.item(i));
                }
                callback(parkings);

            }, function () {
                callback(parkings);
            });
        });
    };

    static getMaxAndMinParkingTime(callback) {
        let conn = getConnection();
        let parkings = [];

        conn.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Parking WHERE parking_time IN ((SELECT MIN(parking_time) from Parking), (SELECT MAX(parking_time) from Parking));", [], function (tx, results) {
                for (var i = 0; i < results.rows.length; i++) {
                    parkings.push(results.rows.item(i));
                }
                console.log(parkings);
                callback(parkings);

            }, function () {
                callback(parkings);
            });
        });
    };

    static delete() {
        let conn = getConnection();
        conn.transaction(
            function (tx) {
                tx.executeSql("DROP TABLE Resident;");
            }, [],
            null, null
        )
    }

    static getCount(callback) {
        let conn = getConnection();

        conn.transaction(function (tx) {
            tx.executeSql("SELECT COUNT(*) as count FROM Parking;", [], function (rx, result) {
                callback(result.rows.item(0).count);
            }, function () { return 0; });
        });
    }

    static getAllId(callback) {
        let conn = getConnection();

        conn.transaction(function (tx) {
            tx.executeSql("SELECT id FROM Parking;", [], function (rx, result) {
                let ids = [];
                for (var i = 0; i < result.rows.length; i++) {
                    ids.push(result.rows.item(i).id)
                }
                callback(ids);
            }, function () { return []; });
        });
    }

    static deleteById(id) {
        let conn = getConnection();

        conn.transaction(function (tx) {
            tx.executeSql("DELETE FROM Parking WHERE id = ?", [id], function () {
                console.log("Success deleted");
            }, function () {
                console.log("deleteById error");
            })
        })
    }
}