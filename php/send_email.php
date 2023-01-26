<?php
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use Symfony\Component\Dotenv\Dotenv;

// Load environment variables
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env');

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

$email = $data['email'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = array(
        "status" => "error",
        "message" => "Invalid email address."
    );
    echo json_encode($response);
    die();
}

// Create a new email message
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = $_ENV['MAILER_URL'];
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = $_ENV['MAILER_USER'];
$mail->Password = $_ENV['MAILER_PASSWORD'];
$mail->setFrom($_ENV['MAILER_USER']);
$mail->addAddress($email);
$mail->Subject = 'Welcome to our newsletter service';
$mail->Body = 'Thank you for subscribing to our newsletter service. We will keep you updated with our latest news and offers.';

// Send the email
if (!$mail->send()) {
    $response = array(
        "status" => "error",
        "message" => "Failed to send welcome email to $email. Error: $mail->ErrorInfo"
    );
    echo json_encode($response);
    die();
}

$response = array(
    "status" => "success",
    "message" => "Welcome email has been sent to $email."
);
echo json_encode($response);

?>