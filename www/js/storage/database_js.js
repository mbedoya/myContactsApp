/**
 * Created by USUARIO on 07/05/2014.
 */

//Database handling
var database_js = function(){

    this.dbSupport = false;
    this.supportError = "";
    var dbController = null;

    this.initialize = function() {

        try {
            if (window.openDatabase) {

                var shortName = 'dbLaboru';
                var version = '1.0';
                var displayName = 'Laboru Database';
                var maxSize = 100000; //  bytes
                dbController = openDatabase(shortName, version, displayName, maxSize);

                console.log("database opened");

                createTables();

                this.dbSupport = true;
            } else {

                this.supportError = "Databases are not supported in this browser";
            }
        } catch (e) {

            if (e == 2) {
                // Version number mismatch.
                this.supportError = "Invalid database version.";
            } else {
                this.supportError = "Unknown error " + e + ".";
            }

            return;
        }
    }

    var createTables = function(){

        dbController.transaction(
            function (transaction) {

                /*
                 transaction.executeSql('drop TABLE IF EXISTS contact;');
                 */

                transaction.executeSql('CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY, name TEXT, mobile TEXT);', [], nullDataHandler, errorHandler);

                console.log("tables created");

            });
    }

    function nullDataHandler(transaction, results) {

        console.log("null handler");
    }

    function dataSelectHandler(transaction, results){

        console.log("rows: " + results.rows.length);
    }

    function errorHandler(transaction, error){

        console.log("db error " + error);
    }

}
