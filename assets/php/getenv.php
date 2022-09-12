<?php

$creds = array(
  'client_id' => getenv($_POST['CLIENT_ID_KEY']),
  'client_secret' => getenv($_POST['CLIENT_SECRET_KEY'])
);

echo json_encode(array(
  'ok' => true,
  'creds' => $creds,
), JSON_PRETTY_PRINT);

?>
