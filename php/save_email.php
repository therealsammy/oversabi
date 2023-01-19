<?php

require_once 'vendor/autoload.php';

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mime\Email;

// Connect to the database
$conn = new mysqli("localhost", "root", "", "newsletter_db");

// Check connection
if ($conn->connect_error) {
    $response = array(
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    );
    echo json_encode($response);
    die();
}

// Get the email address from the request
$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    $response = array(
        "status" => "error",
        "message" => "Invalid data format. Please send a json format"
    );
    echo json_encode($response);
    die();
}

$email = mysqli_real_escape_string($conn, $data['email']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = array(
        "status" => "error",
        "message" => "Invalid email address."
    );
    echo json_encode($response);
    die();
}

// Check if the email address already exists in the database
$result = $conn->query("SELECT email FROM emails WHERE email='$email'");

if ($result->num_rows > 0) {
    $response = array(
        "status" => "error",
        "message" => "Email already exists in our newsletter list."
    );
    echo json_encode($response);
    die();
} else {
    // Create the table if it doesn't exist
    if (!$conn->query("CREATE TABLE IF NOT EXISTS emails (email VARCHAR(255))")) {
        $response = array(
            "status" => "error",
            "message" => "Table creation failed: " . $conn->error
        );
        echo json_encode($response);
        die();
    }
    // Insert the email address into the table
    if (!$conn->query("INSERT INTO emails (email) VALUES ('$email')")) {
        $response = array(
            "status" => "error",
            "message" => "Insert failed: " . $conn->error
        );
        echo json_encode($response);
        die();
    }
    $response = array(
        "status" => "success",
        "message" => "Email has been added to our newsletter list."
    );
    echo json_encode($response);

    // Create a new email message
    $message = (new Email())
        ->from('newsletter@example.com')
        ->to($email)
        ->subject('Welcome to our newsletter service')
        ->text('Thank you for subscribing to our newsletter service. We will keep you updated with our latest news and offers.');

    // Create an instance of the mailer using an SMTP transport
    $transport = new EsmtpTransport('smtp.example.com', 25, 'tls', null, null);
    $mailer = new Mailer($transport);

    // Send the email
    $mailer->send($message);
}
$conn->close();
