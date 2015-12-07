//Database handling
var db_contacts_js = function(db){

    var myDb = db;

    this.insert = function(name, mobile){
        myDb.executeCommand("INSERT INTO contact (name,mobile) VALUES ('"+ name + "','" + mobile + "');", nullDataHandler, errorHandler);

        console.log("person added " + name + mobile);
    }

    this.delete = function(){
        myDb.executeCommand("DELETE FROM contact;", nullDataHandler, errorHandler);

        console.log("recipes deleted");
    }

    this.getAll = function(dataHandler){
        myDb.executeSelect("SELECT id, name, mobile FROM contact;", dataHandler, errorHandler);
    }

    function nullDataHandler(transaction, results) {

        console.log("null handler contacts");
    }

    function errorHandler(transaction, error){

        console.log("contact db error " + error.message);
    }
}
