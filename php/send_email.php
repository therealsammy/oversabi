<?php
require_once 'vendor/autoload.php';

use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mime\Email;
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
$message = (new Email())
    ->from($_ENV['MAILER_USER'])
    ->to($email)
    ->subject('Welcome to our newsletter service')
    ->text('Thank you for subscribing to our newsletter service. We will keep you updated with our latest news and offers.');

// Create an instance of the mailer using an SMTP transport
$transport = new EsmtpTransport($_ENV['MAILER_URL'], 587, 'tls', null, null);
$transport->setUsername($_ENV['MAILER_USER']);
$transport->setPassword($_ENV['MAILER_PASSWORD']);
$mailer = new Mailer($transport);

// Send the email
$mailer->send($message);

$response = array(
    "status" => "success",
    "message" => "Welcome email has been sent to $email."
);
echo json_encode($response);
