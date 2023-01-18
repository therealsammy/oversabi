<?php
//connect to the database
$conn = new mysqli("host", "username", "password", "newsletter_db");
// check connection
if ($conn->connect_error) {
    $response = array(
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    );
    echo json_encode($response);
    die();
} 

$email = $_POST['email'];

//validate email address
if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = array(
        "status" => "error",
        "message" => "Invalid email address."
    );
    echo json_encode($response);
    die();
}

// check if the email address already exists in the database
$result = $conn->query("SELECT email FROM emails WHERE email='$email'");

if ($result->num_rows > 0) {
    $response = array(
        "status" => "error",
        "message" => "Email already exists in our newsletter list."
    );
    echo json_encode($response);
    die();
}
else {
    // create the table if it doesn't exist
    $conn->query("CREATE TABLE IF NOT EXISTS emails (email VARCHAR(255))");
    // insert the email address into the table
    $conn->query("INSERT INTO emails (email) VALUES ('$email')");
    $response = array(
        "status" => "success",
        "message" => "Email has been added to our newsletter list."
    );
    echo json_encode($response);
}
$conn->close();
?>
