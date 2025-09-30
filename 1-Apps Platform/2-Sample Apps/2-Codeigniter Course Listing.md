# Codeigniter Course Listing

## Schoology Sample App

The Schoology Sample App is a skeleton app to help you quickly get started using our API in the context of our app platform. It is built in [Codeigniter](http://ellislab.com/codeigniter). Two sample pages have been created for you: a home page with a simple "hello world" message and a courses page that prints out a list of courses the logged in user is enrolled in. Below are instructions to get this app installed on your server or computer.

## Setup

- Get a hold of a LAMP, MAMP, or WAMP stack. Enable PHP in your Apache config and place the unzipped directory found [here](/files/sampleapp.zip) at the apache doc root.
- Create a new MySQL database for your schoology app. Create a user ([reference](http://www.debuntu.org/how-to-create-a-mysql-database-and-set-privileges-to-a-user/)) with desired MySQL permissions. Remember the **username, password, and database name**. We will need that to configure our app.
- Run the mysql.txt script to create two tables in your recently created database
- Create a new developer app in Schoology. Fill out all the required fields. Your application URLs should look like this:
  - **App URL:** http://[yourdomain.com]/index.php/home
  - **SAML ACS URL:** http://[yourdomain.com]/index.php/login

  After saving the app remember to copy the **Oauth Consumer Key** and **Oauth Consumer Secret**. We will need this for configuration as well.

- Go back to the directory where you placed the unzipped app. Make a copy of the file /application/config/constants.php.default at /application/config/constants.php. Codeigniter will expect to find a file named this when it is booting itself. In the copied file scroll to the bottom and populate the **DB_USERNAME, DB_PASSWORD, DB_DATABASE, SCHOOLOGY_CONSUMER_KEY, SCHOOLOGY_CONSUMER_SECRET** with the values from your database configuration and Schoology app outh info.
- Launch your app from Schoology!

## Make a new page in your app:

Let's make a "Who am I" page in your newly installed app to familiarize ourselves with how codeigniter does things. When you are looking at the root directory of the codeigniter application you will notice there are two main directories (besides the css, img, and js directories - these server up static content you may need for a webpage). They are **application** and **system**. All the custom logic and code you write will live somewhere within **application**. The **system** directory is where all the code that makes codeigniter lives. You should explore the **application** directory and get a sense of what Schoology has added for you.

- Open the file /application/core/MY_Controller.php. This [php object](http://php.net/manual/en/language.types.object.php) extends the core Codeigniter object and will be loaded on every page. This is where the app will load the Schoology SDK and have the SDK identify if the user has given your app permission to make Oauth calls against the Schoology API on behalf of them. In the MY_Controller object find a function called get_menu(). Add a new key and value to the $items array. The items in this list populate your top menu. Make sure your get_menu() function now looks something like this:

::: code-group

```php [MY_Controller.php]
  /**
   * Generate and render a menu
   *
   * Fill out this array with the core menu items you would like on every page
   */
  private function get_menu(){
    $items = array();
    $items['home'] = array(
      'title' => 'Home'
    );
    $items['courses'] = array(
      'title' => 'Courses'
    );
    $items['whoami'] = array(
      'title' => 'Who Am I'
    );

    return $this->load->view('menu', array('items' => $items), TRUE);

  }
```

:::

- Create a new file in /application/controllers called whoami.php. Make your Whoami class extended by MY_controller. Whenever you make a new controller class make sure to create it's [\_\_construct()](http://php.net/manual/en/language.oop5.decon.php) function that makes in inherit all parent attributes. Your empty Whoami controller will look something like this:

::: code-group

```php [whoami.php]
  class Whoami extends MY_Controller{

     function __construct() {
      parent::__construct();
     }

     function index(){
     }
  }
```

:::

- Create output for your new page at http://[yourdomain.com]/index.php/whoami in the index() function. This is the default function codeigniter will look for. You can add additional pages to your class by making new functions. To make a page at http://[yourdomain.com]/index.php/whoami/foo you would declare a function in your Whoami class called foo(). Then, when a user browses to http://[yourdomain.com]/index.php/whoami/foo/12345, your positional argument $bar will be set to 12345. That was a quick rundown of how codeigniter paths work. You should read more about codeigniter and [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). Let's fill out our index() function so it prints out the logged in users name.

::: code-group

```php [whoami.php]
  class Whoami extends MY_Controller{

     function __construct() {
      parent::__construct();
     }

     function index(){
       $uid = $this->session->userdata('schoology_uid');
       $api_result = $this->schoologyapi->api('users/' . $uid);
       $user = $api_result->result;

       $output = '<p>Your are ' . $user->name_first . ' ' . $user->name_last . '</p>';

       $this->render_page($output);
     }
  }
```

:::

One thing to note above is how I pulled the $uid out of `$this->session->userdata('schoology_uid')`. Codeigniter sessions allow you to store arbitrary user data in the DB with a session. See [here](http://ellislab.com/codeigniter/user-guide/libraries/sessions.html). In the login.php page that comes with the SDK all fields passed into the app with the schoology SAML packet are saved into the users session. These fields include:

::: code-group

```php [login.php]
  return array(
    'uid' => $samlresponse->getAttribute('uid'),
    'name_display' => $samlresponse->getAttribute('name_display'),
    'school_nid' => $samlresponse->getAttribute('school_nid'),
    'school_title' => $samlresponse->getAttribute('school_title'),
    'role_id' => $samlresponse->getAttribute('role_id'),
    'is_admin' => $samlresponse->getAttribute('is_admin'),
    'timezone_name' => $samlresponse->getAttribute('timezone_name'),
  );
```

:::
