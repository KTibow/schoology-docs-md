# Course Listing

This is a simple tutorial application that uses SAML SSO to identify the user, obtain a set of OAuth credentials, and print out a listing of the user's courses. This application will have two pages: a login page and an main application page.

## Requirements

The following is needed to run this application as-is. Different components can be used to work with your environment.

- An application with a Schoology-assigned OAuth consumer key and consumer secret
- A web server that can run PHP
- The [Schoology PHP SDK](<../8-Client Libraries>)
- The ability to run the application using HTTPS (tools such as [ngrok](https://ngrok.com/) can help with local development and testing)

## PHP Configuration

Due to recent browser security enhancements, applications will need to be served over HTTPS and the following PHP settings should be enabled to allow for cross-site cookies:

- [session.cookie_secure](https://www.php.net/manual/en/session.configuration.php#ini.session.cookie-secure)=1
- [session.cookie_samesite](https://www.php.net/manual/en/session.configuration.php#ini.session.cookie-samesite)="None"

Alternatively, you can set these same settings using [`session_set_cookie_params`](https://www.php.net/manual/en/function.session-set-cookie-params.php) if you would prefer not to edit your php.ini.

## Login Page

The login page will be responsible for receiving and parsing the SAML SSO data that is sent by the Schoology servers. First, let's define some variables.

::: code-group

```php [login.php]
// Replace this with the path to the Schoology PHP SDK
require_once('schoology_sdk/SchoologyApi.class.php');

// Replace these values with your application's consumer key and secret
$consumer_key = 'consumerkey';
$consumer_secret = 'consumersecret';
// Initialize the Schoology class
$schoology = new SchoologyApi($consumer_key, $consumer_secret);

// Initialize session handling
session_start();
```

:::

When the user opens the application from within Schoology, we'll send over a packet full of information about the user. Make sure it's valid.

::: code-group

```php [login.php]
// Read the incoming login information.
$login = $schoology->validateLogin();

// If the last step failed, then either no information
// was received or it was invalid.
if(!$login){
  // Stop script execution
  print 'No login information was received. Try loading this application again from within Schoology.';
  exit;
}
```

:::

At this point, we should now have a user ID that we can work with. Log the user in.

::: code-group

```php [login.php]
// If our session already has a stored ID but it's
// different from what we received, restart the session.
if(isset($_SESSION['schoology']['uid']) && $_SESSION['schoology']['uid'] != $login['uid']){
  session_destroy();
  session_start();
}

// The session might already be set if the user is accessing
// this application again without logging out of Schoology.
// Only set the session information if not already present
if(!isset($_SESSION['schoology']['uid'])){
  $_SESSION['schoology'] = $login;
  // later on, during authorization, we will compare this timestamp to the user's Schoology web session timestamp
  // to ensure that the user still has an active web session
  $_SESSION['session_created'] = time();
}
```

:::

The user is now logged in. Your main application path is passed in the RelayState parameter of the received request, so you can now forward the user to that URL.

::: code-group

```php [login.php]
header('Location: ' . $_REQUEST['RelayState']);
```

:::

## Application Page

Now that you know who is accessing your application, we can start putting together a proper OAuth authorization header in order to communicate with the API.

::: code-group

```php [application.php]
// Start with the necessities
require_once('schoology_sdk/SchoologyApi.class.php');
$consumer_key = 'consumerkey';
$consumer_secret = 'consumersecret';

// Initialize the session
session_start();

// Make sure a user is logged in. Users shouldn't be accessing
// this page directly without first passing through login.php
if(!isset($_SESSION['schoology']['uid'])){
  print 'No user information was found when loading this page. Please try loading this application from within Schoology.';
  exit;
}

$uid = $_SESSION['schoology']['uid'];

// Use the Schoology domain that the user is logged in to
$domain = $_SESSION['schoology']['domain']

$schoology = new SchoologyApi($consumer_key, $consumer_secret, $domain);

// Initialize a database connection. Replace these values
// with information needed to access your database
$db_host = 'localhost';
$db_user = 'user';
$db_pass = 'pass';
$db_name = 'schoology_courselisting';
$db = new PDO('mysql:dbname='.$db_name.';host='.$db_host, $db_user, $db_pass);
```

:::

Before moving on, we'll need OAuth tokens for this user in order to communicate with the API. Each time that a new set of tokens are generated, the user is prompted to allow your application to access the API. So that you don't have to request a new set of tokens each time the user accesses your application, you can store these keys in a database. For this example, we'll use MySQL. You can pass an adapter class to the Schoology SDK that dictates how to retrieve and store these tokens. Here is an example class that you can modify to suit your needs.

::: code-group

```php [App_OauthStorage.class.php]
/**
* See SchoologyApi.class.php for the structure of this class.
* You can modify the class below to use the same database used in
* your application, or to store oauth credentials in a completely
* different datastore.
*
* This example class uses the PHP PDO class to interact with a
* MySQL table with the given structure:
*
*  CREATE TABLE  `oauth_tokens` (
*    `uid` int(10) unsigned NOT NULL,
*    `token_key` varchar(64) CHARACTER SET utf8 NOT NULL,
*    `token_secret` varchar(64) CHARACTER SET utf8 NOT NULL,
*    `token_is_access` tinyint(3) unsigned NOT NULL,
*    PRIMARY KEY (`uid`)
*  ) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
*
*/
class App_OauthStorage implements SchoologyApi_OauthStorage
{
  private $db;

  // Constructor
  public function __construct($db)
  {
    $this->db = $db;

    // Test query
    $query = $this->db->prepare("SELECT 1=1");
    $query_status = $query->execute();
    if(!$query_status || $query->fetchColumn() != 1){
      throw new Exception('The database did not respond as expected. Please check your database and try again.');
    }
  }

  // Retrieve access tokens for a given user ID
  public function getAccessTokens($uid){
    // Check to see if we have oauth tokens for this user
    $query = $this->db->prepare("SELECT uid, token_key, token_secret FROM oauth_tokens WHERE uid = :uid AND token_is_access = 1 LIMIT 1");
    $query->execute(array(':uid' => $uid));
    return $query->fetch(PDO::FETCH_ASSOC);
  }

  // Store request tokens for a given user ID
  public function saveRequestTokens($uid, $token_key, $token_secret){
    $query = $this->db->prepare("REPLACE INTO oauth_tokens (uid, token_key, token_secret, token_is_access) VALUES (:uid, :key, :secret, 0)");
    $query->execute(array(
              ':uid' => $uid,
              ':key' => $token_key,
              ':secret' => $token_secret,
    ));
  }

  // Get request tokens for a given ID
  public function getRequestTokens($uid){
    $query = $this->db->prepare("SELECT uid, token_key, token_secret FROM oauth_tokens WHERE uid = :uid AND token_is_access = 0");
    $query->execute(array(':uid' => $uid));
    return $query->fetch(PDO::FETCH_ASSOC);
  }

  // Replace request tokens with authorized access tokens for a given ID
  public function requestToAccessTokens($uid, $token_key, $token_secret){
    $query = $this->db->prepare("UPDATE oauth_tokens SET token_key = :key, token_secret = :secret, token_is_access = 1 WHERE uid = :uid");
    $query->execute(array(
              ':key' => $token_key,
              ':secret' => $token_secret,
              ':uid' => $uid,
    ));
  }

  // Revoke tokens for a specific user
  public function revokeAccessTokens($uid){
    $query = $this->db->prepare("DELETE FROM oauth_tokens WHERE uid = :uid");
    $query->execute(array(
      ':uid' => $uid,
    ));
  }

}
```

:::

Back to the application. Now that you have a way to store the user's OAuth tokens, you can begin the OAuth handshake process. If this user accesses your application again in the future, this will skip the OAuth handshake process and use the stored access tokens instead. The user must have an active Schoology web session. If not, an exception will be thrown.

::: code-group

```php [application.php]
// Change this to the path of your token datastore adapter
require_once('App_OauthStorage.class.php');
$oauth_store = new App_OauthStorage($db);

// get user's app session timestamp
$app_session_timestamp = $_SESSION['session_created'];

// Retrieve and set the user's OAuth request key and
// request secret in the SchoologyApi object.
// Also check if user has an active Schoology web session.
$schoology->authorize($oauth_store, $uid, $app_session_timestamp);
```

:::

Now, you have everything you need and can start with the main functionality of this application - printing a list of the user's courses.

::: code-group

```php [application.php]
// Get a list of the user's course sections from the API
$api_result = $schoology->api('/users/' . $uid . '/sections');

// Cycle through the result and print each course
$has_courses = FALSE;
foreach($api_result->result->section as $section){
  $has_courses = TRUE;
  $output .= '<li>' . $section->course_title . ':' . $section->section_title . '</li>';
}

// If no courses were found print an 'empty' message
if(!$has_courses){
  $output .= '<li>No courses were found for this user.</li>';
}

$output .= '</ul>';
```

:::

## Summary

Congratulations on your first working application! Here are the complete sources of each file outlined above. You can also create an include file that contains all the necessary variables so that they're not stored in each file separately.

::: code-group

```php [login.php]
// Replace this with the path to the Schoology PHP SDK
require_once('schoology_sdk/SchoologyApi.class.php');

// Replace these values with your application's consumer key and secret
$consumer_key = 'consumerkey';
$consumer_secret = 'consumersecret';
// Initialize the Schoology class
$schoology = new SchoologyApi($consumer_key, $consumer_secret);

// Initialize session handling
session_start();

// Read the incoming login information.
$login = $schoology->validateLogin();

// If the last step failed, then either no information
// was received or it was invalid.
if(!$login){
  // Stop script execution
  print 'No login information was received. Try loading this application again from within Schoology.';
  exit;
}

// If our session already has a stored ID but it's
// different from what we received, restart the session.
if(isset($_SESSION['schoology']['uid']) && $_SESSION['schoology']['uid'] != $login['uid']){
  session_destroy();
  session_start();
}

// The session might already be set if the user is accessing
// this application again without logging out of Schoology.
// Only set the session information if not already present
if(!isset($_SESSION['schoology']['uid'])){
  $_SESSION['schoology'] = $login;
  // later on, during authorization, we will compare this timestamp to the user's Schoology web session timestamp
  // to ensure that the user still has an active web session
  $_SESSION['session_created'] = time();
}

header('Location: ' . $_REQUEST['RelayState']);
```

```php [application.php]
// Start with the necessities
require_once('schoology_sdk/SchoologyApi.class.php');
$consumer_key = 'consumerkey';
$consumer_secret = 'consumersecret';

// Initialize the session
session_start();

// Make sure a user is logged in. Users shouldn't be accessing
// this page directly without first passing through login.php
if(!isset($_SESSION['schoology']['uid'])){
  print 'No user information was found when loading this page. Please try loading this application from within Schoology.';
  exit;
}

$uid = $_SESSION['schoology']['uid'];

// Use the Schoology domain that the user is logged in to
$domain = $_SESSION['schoology']['domain']

$schoology = new SchoologyApi($consumer_key, $consumer_secret, $domain);

// Initialize a database connection. Replace these values
// with information needed to access your database
$db_host = 'localhost';
$db_user = 'user';
$db_pass = 'pass';
$db_name = 'schoology_courselisting';
$db = new PDO('mysql:dbname='.$db_name.';host='.$db_host, $db_user, $db_pass);

// Change this to the path of your token datastore adapter
require_once('App_OauthStorage.class.php');
$oauth_store = new App_OauthStorage($db);

// get user's app session timestamp
$app_session_timestamp = $_SESSION['session_created'];

// Retrieve and set the user's OAuth request key and
// request secret in the SchoologyApi object.
// Also check if user has an active Schoology web session.
$schoology->authorize($oauth_store, $uid, $app_session_timestamp);

// Get a list of the user's courses from the API
$api_result = $schoology->api('/users/' . $uid . '/sections');

$output = '<b>Courses</b>';
$output .= '<ul>';

// Cycle through the result and print each course
$has_courses = FALSE;
foreach($api_result->result->section as $section){
  $has_courses = TRUE;
  $output .= '<li>' . $section->course_title . ':' . $section->section_title . '</li>';
}

// If no courses were found print an 'empty' message
if(!$has_courses){
  $output .= '<li>No courses were found for this user.</li>';
}

$output .= '</ul>';
```

```php [App_OauthStorage.class.php]
/**
* See SchoologyApi.class.php for the structure of this class.
* You can modify the class below to use the same database used in
* your application, or to store oauth credentials in a completely
* different datastore.
*
* This example class uses the PHP PDO class to interact with a
* MySQL table with the given structure:
*
*  CREATE TABLE  `oauth_tokens` (
*    `uid` int(10) unsigned NOT NULL,
*    `token_key` varchar(64) CHARACTER SET utf8 NOT NULL,
*    `token_secret` varchar(64) CHARACTER SET utf8 NOT NULL,
*    `token_is_access` tinyint(3) unsigned NOT NULL,
*    PRIMARY KEY (`uid`)
*  ) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
*
*/
class App_OauthStorage implements SchoologyApi_OauthStorage
{
  private $db;

  // Constructor
  public function __construct($db)
  {
    $this->db = $db;

    // Test query
    $query = $this->db->prepare("SELECT 1=1");
    $query_status = $query->execute();
    if(!$query_status || $query->fetchColumn() != 1){
      throw new Exception('The database did not respond as expected. Please check your database and try again.');
    }
  }

  // Retrieve access tokens for a given user ID
  public function getAccessTokens($uid){
    // Check to see if we have oauth tokens for this user
    $query = $this->db->prepare("SELECT uid, token_key, token_secret FROM oauth_tokens WHERE uid = :uid AND token_is_access = 1 LIMIT 1");
    $query->execute(array(':uid' => $uid));
    return $query->fetch(PDO::FETCH_ASSOC);
  }

  // Store request tokens for a given user ID
  public function saveRequestTokens($uid, $token_key, $token_secret){
    $query = $this->db->prepare("REPLACE INTO oauth_tokens (uid, token_key, token_secret, token_is_access) VALUES (:uid, :key, :secret, 0)");
    $query->execute(array(
              ':uid' => $uid,
              ':key' => $token_key,
              ':secret' => $token_secret,
    ));
  }

  // Get request tokens for a given ID
  public function getRequestTokens($uid){
    $query = $this->db->prepare("SELECT uid, token_key, token_secret FROM oauth_tokens WHERE uid = :uid AND token_is_access = 0");
    $query->execute(array(':uid' => $uid));
    return $query->fetch(PDO::FETCH_ASSOC);
  }

  // Replace request tokens with authorized access tokens for a given ID
  public function requestToAccessTokens($uid, $token_key, $token_secret){
    $query = $this->db->prepare("UPDATE oauth_tokens SET token_key = :key, token_secret = :secret, token_is_access = 1 WHERE uid = :uid");
    $query->execute(array(
              ':key' => $token_key,
              ':secret' => $token_secret,
              ':uid' => $uid,
    ));
  }

  // Revoke tokens for a specific user
  public function revokeAccessTokens($uid){
    $query = $this->db->prepare("DELETE FROM schoology_oauth_tokens WHERE uid = :uid");
    $query->execute(array(
      ':uid' => $uid,
    ));
  }

}
```

:::
