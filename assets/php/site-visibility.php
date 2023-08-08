<?php
require '../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
$dotenv->load();

$key = $_ENV['MCINFO_PRIVATE_KEY'];

echo json_encode([
  'key' => $key
]);

// echo $key;
