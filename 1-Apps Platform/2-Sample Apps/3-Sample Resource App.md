# Sample Resource App

This is a sample Resource App. It uses SAML SSO to identify the user, obtains OAuth credentials and imports content into Schoology.

## Requirements

The following is needed to run this application:

- The [Sample App](https://developers.schoology.com/files/sample_content_app_0.9.1.zip) files
- A Schoology-assigned OAuth consumer key and consumer secret
- A web server that can run PHP
- The [Schoology PHP SDK](../8-Client Libraries) (included in project files)
- A MySQL database to store the user's OAuth access key

## Getting Started

You will need a MySQL database for this project. Enter the database credentials for this application below

::: code-group

```php [lib/SchoologyApp.php]
define('DB_HOSTNAME', ''); // Database hostname
define('DB_USERNAME', ''); // Database username
define('DB_PASSWORD', ''); // Database password
define('DB_DATABASE', ''); // Database name
```

:::

Enter your Schoology-assigned consumer key and secret

::: code-group

```php [lib/SchoologyApp.php]
define('SCHOOLOGY_CONSUMER_KEY', ''); // Your apps schoology consumer key
define('SCHOOLOGY_CONSUMER_SECRET', ''); // Your apps schoology consumer secret
```

:::

This sample application uses the following database table to store OAuth credentials. Create the schoology_oauth_tokens table using the SQL create statement below

::: code-group

```sql [table]
CREATE TABLE  `schoology_oauth_tokens` (
    `uid` int(10) unsigned NOT NULL,
    `token_key` varchar(64) CHARACTER SET utf8 NOT NULL,
    `token_secret` varchar(64) CHARACTER SET utf8 NOT NULL,
    `token_is_access` tinyint(3) unsigned NOT NULL,
    PRIMARY KEY (`uid`)
 ) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

:::

## Authentication

This Resource App uses SAML SSO to identify the user and obtain OAuth credentials

::: code-group

```php [lib/SchoologyApp.php]
/**
 * Authentication with SAML 2.0
 */
function schoology_login() {
  if(!$_GET['login']) {
    return;
  }

  // Initialize the Schoology class
  $schoology = new SchoologyContentApi(SCHOOLOGY_CONSUMER_KEY, SCHOOLOGY_CONSUMER_SECRET);

  // Read the incoming login information.
  $login = $schoology->validateLogin();

  // If the last step failed, then either no information
  // was received or it was invalid.
  if(!$login){
    // Stop script execution
    print 'No login information was received. Try loading this application again from within Schoology.'; exit;
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
    $_SESSION['session_created'] = time();
  }

  $q_params = parse_url($_REQUEST['RelayState'], PHP_URL_QUERY);
  parse_str($q_params, $app_state);

  $_SESSION['app_state'] = array();
  foreach($app_state as $key => $param){
    $_SESSION['app_state'][$key] = $param;
  }

  header('Location: ' . $_REQUEST['RelayState']); exit;
}
```

```php [index.php]
// Setup our Resource App
require_once('lib/SchoologyApp.php');

// Initialize the session
session_start();

// Authentication with SAML 2.0
schoology_login();

$uid = $_SESSION['schoology']['uid'];
$session_created = $_SESSION['session_created'];
$site_base = ($_SESSION['app_state']['is_ssl'] ? 'https://' : 'http://') . $_SESSION['schoology']['domain'];
$schoology = new SchoologyContentApi(SCHOOLOGY_CONSUMER_KEY, SCHOOLOGY_CONSUMER_SECRET, $site_base);

// Make sure a user is logged in
if(!$uid){
  print 'No user information was found when loading this page. Please try loading this application from within Schoology.'; exit;
}
...
```

:::

At this point, we should now have a user ID that we can work with. Now that you know who is accessing your application, we can start using the Schoolgy SDK to communicate with the API (eg, import content into Schoology)

## Import Content

The following function is responsible for importing content into Schoology ([see import workflow](<../../2-API Documentation/8-Resource Apps#import-workflow>)).

::: code-group

```php [lib/SchoologyApp.php]
/**
 * Import content into Schoology
 */
function schoology_import(SchoologyContentApi $schoology) {
  if(!$_GET['import']) {
    return;
  }

  $content = schoology_get_sample_content();
  $return_url = 'https://sample_content_app.subdomain.psmith.dev.schoologize.com/index.php';

  try {
    switch($_GET['import']) {
      case 'link':
        $import_id = $schoology->importLink($content['link']['title'], $content['link']['url']);
        $import_url = $schoology->buildImportUrl($import_id, $return_url);
        break;

      case 'embed':
        $import_id = $schoology->importLink($content['embed']['title'], $content['embed']['embed']);
        $import_url = $schoology->buildImportUrl($import_id, $return_url);
        break;

      case 'file':
        $import_id = $schoology->importFile($content['file']['filepath']);
        $import_url = $schoology->buildImportUrl($import_id, $return_url);
        break;

      case 'bulk':
        $body = array(
          'link' => array(
            array('title' => $content['link']['title'], 'url' => $content['link']['url']),
          ),

          'embed' => $embeds = array(
            array('title' => $content['embed']['title'], 'embed' => $content['embed']['embed']),
          ),

          'file-attachment' => array('id' => array(
            $schoology->apiFileUpload($content['file']['filepath']),
          )),
        );
        $result = $schoology->importBulk($body);

        $import_ids = array();
        foreach($result as $i) {
          $import_ids[] = $i->import_id;
        }
        $import_url = $schoology->buildImportUrl($import_ids, $return_url);
        break;
    }

  } catch (Exception $e) {
    print $e->getMessage(); exit;
  }

  // Redirct user to schoology import form
  header('Location: ' . $import_url); exit;
}
```

:::

More Examples:

::: code-group

```php [Import web link]
// Use API to import link and retrieve an import ID
$import_id = $schoology->importLink('Schoology Developers', 'https://developers.schoology.com/');

// Use API utility function @buildImportUrl() to generate the Schoology Import URL
$import_url = $schoology->buildImportUrl($import_id, $return_url);

// Redirct user to Schoology Import Form
header('Location: ' . $import_url); exit;

// After import, Schoology will return the user to the specified $return_url.
// You can use this $return_url to customize a success message
```

:::

## Summary

Congratulations on your first working Resource App! Resource Apps allow users to import content easily from third-party providers. Please refer to the [Resource Apps](<../../2-API Documentation/8-Resource Apps>) docs for further details.
