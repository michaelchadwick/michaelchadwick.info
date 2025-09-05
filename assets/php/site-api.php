<?php
require '../../vendor/autoload.php';

use Dotenv\Dotenv;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;

header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: *');

$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
$dotenv->load();

// fetch() API
if ($json = file_get_contents('php://input')) {
  $data = json_decode($json);
  $site = $data->site;
  $arg1 = null;

  if (isset($data->arg1)) {
    $arg1 = $data->arg1;
  }
}
// command line
else if (isset($argv)) {
  if (count($argv) > 1) {
    $site = $argv[1];
  } else {
    echo "error: no site supplied\n";
    exit();
  }
}
// direct url (debugging)
else if (isset($_GET['site'])) {
  $site = $_GET['site'];
}
// no site?
else {
  echo "error: no site supplied\n";
  exit();
}

switch ($site) {
  case 'aoc':
    $AOC_API_URL = 'https://adventofcode.com';
    $AOC_SESSION = getenv('ADVENT_OF_CODE_SESSION');

    $cookieJar = CookieJar::fromArray([
      'session' => $AOC_SESSION
    ], '.adventofcode.com');
    $client = new Client([
      'base_uri' => $AOC_API_URL,
      'timeout' => 5.0
    ]);

    // get all my calendar stars
    try {
      $response = $client->request('GET', '/events', [
        'cookies' => $cookieJar,
        'debug' => false
      ]);

      $html = $response->getBody();
      @$document = new FluentDOM\DOM\Document();
      @$document->loadHTML($html);
      $stars = [];

      foreach ($document->querySelectorAll('.eventlist-event') as $event) {
        $year = substr($event->firstElementChild, 1, -1);
        $wins = substr($event->firstElementChild->nextElementSibling, 0, -1);

        $stars[$year] = $wins;
      }

      echo json_encode($stars);
    } catch (GuzzleHttp\Exception\RequestException $e) {
      $errorResponse = $e->getResponse();
      $errorResponseString = $errorResponse->getBody()->getContents();

      echo $errorResponseString;
    }

    break;

  case 'duo':
    $DUOLINGO_API_URL = 'https://www.duolingo.com/2017-06-30/users?username=nebyoolae';
    $client = new Client(['base_uri' => $DUOLINGO_API_URL, 'timeout' => 5.0]);

    // get user data
    try {
      $response = $client->get('', [
        'debug' => false,
      ]);

      $body = json_decode($response->getBody()->getContents());

      echo json_encode([
        'body' => $body->users
      ]);
    } catch (GuzzleHttp\Exception\RequestException $e) {
      $response = $e->getResponse();
      $responseString = $response->getBody()->getContents();

      echo $responseString;
    }

    break;

  case 'mcinfo_priv':
    $key = getenv('MCINFO_PRIVATE_KEY');

    echo json_encode([
      'key' => $key
    ]);

    break;

  case 'podbean':
    $PODBEAN_API_URL = 'https://api.podbean.com';
    $PODBEAN_OAUTH_ROUTE = '/v1/oauth/token';
    $PODBEAN_EPS_ROUTE = '/v1/episodes';

    $creds = array(
      'client_id' => getenv('PODBEAN_MCINFO_CLIENT_ID'),
      'client_secret' => getenv('PODBEAN_MCINFO_CLIENT_SECRET')
    );

    $client = new Client(['base_uri' => $PODBEAN_API_URL, 'timeout'  => 5.0]);
    $token = null;

    // get access_token first
    try {
      $response = $client->post($PODBEAN_OAUTH_ROUTE, [
        'debug' => false,
        'auth' => [
          $creds['client_id'],
          $creds['client_secret']
        ],
        'form_params' => [
          'grant_type' => 'client_credentials'
        ]
      ]);

      $body = $response->getBody()->getContents();
      $token = json_decode($body)->access_token;
    } catch (GuzzleHttp\Exception\RequestException $e) {
      if ($e->hasResponse()) {
        $response = $e->getResponse();
        var_dump($response->getStatusCode()); // HTTP status code;
        var_dump($response->getReasonPhrase()); // Response message;
        var_dump((string) $response->getBody()); // Body, normally it is JSON;
        var_dump(json_decode((string) $response->getBody())); // Body as the decoded JSON;
        var_dump($response->getHeaders()); // Headers array;
        var_dump($response->hasHeader('Content-Type')); // Is the header presented?
        var_dump($response->getHeader('Content-Type')[0]); // Concrete header value;
      }
    } catch (GuzzleHttp\Exception\ClientException $e) {
      $response = $e->getResponse();
      $responseString = $response->getBody()->getContents();

      echo $responseString;
    }

    // get episodes
    try {
      $response = $client->get(
        $PODBEAN_EPS_ROUTE . '?access_token=' . $token . '&offset=0&limit=100',
        [
          'debug' => false
        ]
      );

      $body = json_decode($response->getBody()->getContents());

      // get all episodes
      if ($arg1 == 'episodes') {
        echo json_encode([
          'body' => $body
        ]);
      }
      // get latest episode
      else {
        $i = 0;

        $skipStatuses = ['draft', 'future'];
        while (in_array($body->episodes[$i]->status, $skipStatuses)) {
          $i++;
        }

        $ep = $body->episodes[$i];
        $epTime = $ep->publish_time;
        $epTitle = $ep->title;
        $epUrl = $ep->permalink_url;

        echo json_encode([
          'time' => $epTime,
          'title' => $epTitle,
          'url' => $epUrl
        ]);
      }
    } catch (GuzzleHttp\Exception\RequestException $e) {
      $response = $e->getResponse();
      $responseString = $response->getBody()->getContents();

      echo $responseString;
    }

    break;

  case 'rubygems':
    $RUBYGEMS_API_URL = 'https://rubygems.org/api/v1/owners/mjchadwick/gems.json';
    $RUBYGEMS_API_KEY = getenv('RUBYGEMS_API_KEY');

    $client = new Client(['base_uri' => $RUBYGEMS_API_URL, 'timeout'  => 5.0]);

    // get all my gems
    try {
      $response = $client->get('', [
        'debug' => false,
        // 'headers' => [
        //   'Authorization' => $RUBYGEMS_API_KEY
        // ]
      ]);

      echo $response->getBody();
    } catch (GuzzleHttp\Exception\RequestException $e) {
      $response = $e->getResponse();
      $responseString = $response->getBody()->getContents();

      echo $responseString;
    }

    break;

  case 'steam':
    $STEAM_API_URL = 'https://api.steampowered.com';
    $STEAM_API_KEY = getenv('STEAM_WEB_API_KEY');
    $STEAM_API_ID = getenv('STEAM_ID_64');
    $STEAM_GET_GAMES_ROUTE = '/IPlayerService/GetRecentlyPlayedGames/v1';

    $client = new Client(['base_uri' => $STEAM_API_URL, 'timeout'  => 5.0]);

    // get all my games
    try {
      $response = $client->get($STEAM_GET_GAMES_ROUTE, [
        'debug' => false,
        'query' => [
          'key' => $STEAM_API_KEY,
          'steamid' => $STEAM_API_ID,
          'format' => 'json'
        ]
      ]);

      echo $response->getBody();
    } catch (GuzzleHttp\Exception\RequestException $e) {
      $response = $e->getResponse();
      $responseString = $response->getBody()->getContents();

      echo $responseString;
    }

    break;

  default:
    echo "error: unknown site: '$site' supplied\n";
}