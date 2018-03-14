
var database = firebase.database();
var name = "";
var arrivalTime = 0;
var frequency = "";
var destination = "";
var starttime = 0;
var dateadded = "";



$("#submitbutton").on("click", function () {
    // Prevent the page from refreshing
    event.preventDefault();
    name = $("#trainname").val().trim();
    starttime = $("#starttime").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();




    database.ref().push({
        name: name,
        starttime: starttime,
        destination: destination,
        frequency: frequency,
    });

});

database.ref().on("child_added", function (childSnapshot) {

    // Print the initial data to the console.
    console.log(childSnapshot.val());

    // Log the value of the various properties
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().starttime);



    // First Time (pushed back 1 year to make sure it comes before current time)
    console.log(childSnapshot.val().starttime);
    var firstTimeConverted = moment(childSnapshot.val().starttime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain);
    var arrivalTime = (moment(nextTrain).format("HH:mm"));
    console.log("ARRIVAL TIME:" + arrivalTime);


    // .tbody
    $("tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>"
        + childSnapshot.val().frequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});

database.ref().on("Child_added", function (childSnapshot, prevChildKey) {

    // change thhe html

    $(".htmltrainname").text(childSnapshot.val().name);
    $(".htmldestination").text(childSnapshot.val().destination);
    $(".htmlfrequency").text(childSnapshot.val().frequency);
    $(".htmlnextarrival").text(arrivalTime);
    $(".htmlminutesaway").text(tMinutesTillTrain);



});




