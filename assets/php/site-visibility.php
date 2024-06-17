<?php
require '../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
$dotenv->load();

if ($json = file_get_contents('php://input')) {
  $data = json_decode($json);
  $key = $data->key;
}

$lock = getenv('MCINFO_PRIVATE_KEY');

echo json_encode([
  'isUnlocked' => $key == $lock
]);
