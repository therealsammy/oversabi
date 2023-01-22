<?php

require_once 'vendor/autoload.php';
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;


class Newsletter {
    private $conn;
    private $dotenv;
    private $mailer;

        public function __construct() {
        // Load environment variables
        $this->dotenv = new Dotenv();
        $this->dotenv->load(__DIR__.'/.env');

        $this->conn = new mysqli("localhost", "root", "", "newsletter_db");


        // Connect to the database using PDO
        try {
            $this->conn = new PDO("mysql:host=db;dbname=".$_ENV['DB_NAME'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            $response = array(
                "status" => "error",
                "message" => "Connection failed: " . $e->getMessage()
            );
            echo json_encode($response);
            die();
        }

        // Create an instance of the mailer using an SMTP transport
        $transport = new EsmtpTransport($_ENV['MAILER_URL'], 587, 'tls', null, null);
        $transport->setUsername($_ENV['MAILER_USER']);
        $transport->setPassword($_ENV['MAILER_PASSWORD']);
        $this->mailer = new Mailer($transport);
    }

   public function addEmail($email) {
    try {
        // Begin a transaction
        $this->conn->beginTransaction();
        
        // Check if the email address already exists in the database
        $stmt = $this->conn->prepare("SELECT email FROM emails WHERE email = :email");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $response = array(
                "status" => "error",
                "message" => "Email already exists in our newsletter list."
            );
            echo json_encode($response);
            die();
        }

        // Create the table if it doesn't exist
        $stmt = $this->conn->prepare("CREATE TABLE IF NOT EXISTS emails (email VARCHAR(255))");
        $stmt->execute();

        // Insert the email address into the table
        $stmt = $this->conn->prepare("INSERT INTO emails (email) VALUES (:email)");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        
        // Commit the transaction
        $this->conn->commit();

        $response = array(
            "status" => "success",
            "message" => "Email has been added to our newsletter list."
        );
        echo json_encode($response);
    } catch (PDOException $e) {
        // Rollback the transaction
        $this->conn->rollback();
        $response = array(
            "status" => "error",
            "message" => "Error: " . $e->getMessage()
        );
        echo json_encode($response);
        die();
    }
}


    public function sendWelcomeEmail($email) {
        // Create a new email message
        $message = (new Symfony\Component\Mime\Email())
            ->from($_ENV['MAILER_USER'])
            ->to($email)
            ->subject('Welcome to our newsletter service')
            ->text('Thank you for subscribing to our newsletter service. We will keep you updated with our latest news and offers.');

        // Send the email
        $this->mailer->send($message);
    }

    public function subscribe($email) {
        $this->addEmail($email);
        $this->sendWelcomeEmail($email);
    }
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

// create an instance of the Newsletter class
$newsletter = new Newsletter();
// call the addEmail method and pass the email as an argument
$newsletter->addEmail($email);
