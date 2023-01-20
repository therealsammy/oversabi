<?php
require_once 'vendor/autoload.php';

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mime\Email;

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
$message = (new Email())
    ->from('newsletter@example.com')
    ->to($email)
    ->subject('Welcome to our newsletter service')
    ->text('Thank you for subscribing to our newsletter service. We will keep you updated with our latest news and offers.');

// Create an instance of the mailer using an SMTP transport
$transport = new EsmtpTransport('smtp.gmail.com', 587, 'tls', 'your-email-address@gmail.com', 'your-email-password');
$mailer = new Mailer($transport);

// Send the email
$mailer->send($message);

$response = array(
    "status" => "success",
    "message" => "Welcome email has been sent to $email."
);
echo json_encode($response);
