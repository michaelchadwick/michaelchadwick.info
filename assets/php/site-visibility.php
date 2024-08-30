<?php
require '../../vendor/autoload.php';

use Dotenv\Dotenv;

header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: *');

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
$dotenv->load();

if ($json = file_get_contents('php://input')) {
  $data = json_decode($json);
  $key = $data->key;
}

$lock = $_ENV['MCINFO_PRIVATE_KEY'];

echo json_encode([
  'isUnlocked' => $key == $lock
]);
