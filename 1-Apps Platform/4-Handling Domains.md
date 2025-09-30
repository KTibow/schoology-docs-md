# Handling Domains

While most users log in to Schoology through the main domain ([www.schoology.com](http://www.schoology.com/)), schools can also specify their own custom subdomain (schoolname.schoology.com) or custom domain (lms.schoolname.org). It is important to handle and maintain this domain when authorizing your OAuth keys.

## Schoology SDK

You will need to be using the Schoology PHP SDK version 0.9.2 or above. The `validateLogin()` function returns an array of information about the current Schoology user, including the `domain`. This domain should be passed into subsequent instantiations of the Schoology API class:

::: code-group

```php [login.php]
...
$schoology = new SchoologyApi($consumer_key, $consumer_secret);
$login = $schoology->validateLogin();
$_SESSION['schoology'] = $login;
...
```

```php [application.php]
...
// For v0.9.2
$schoology = new SchoologyApi($consumer_key, $consumer_secret, '', '', $_SESSION['schoology']['domain']);

// For v0.9.3 and above
$schoology = new SchoologyApi($consumer_key, $consumer_secret, $_SESSION['schoology']['domain']);
...
```

:::

## Determining the Domain

The domain information is important since that is where their active Schoology Session is handled. For example:

1.  The user logs in to Schoology through schoolname.schoology.com
2.  They access your application for the first time
3.  Your application gets a set of request tokens and attempts to authorize them through http://www.schoology.com/oauth/authorize

If the user is not logged into to [www.schoology.com](http://www.schoology.com/), they will simply be asked to log in again.

> [!WARNING]
> If a different user was logged into [www.schoology.com](http://www.schoology.com/) (a common situation in computer labs), it is possible that those oauth request tokens will be mistakenly associated with the wrong user.

You should take care to forward the user back to the domain from which they accessed your application. In the example above, they should be forwarded to:

`$authorize_url = 'http://' . $domain . '/oauth/authorize';`

You can determine the appropriate domain using one of the following two methods.

### SAML Information

The domain of the user is passed in the SAML login packet in the `domain` attribute, along with the user's UID, name, timezone, etc.

### HTTP Referrer

If you are not using SAML login, you can use the HTTP referrer to determine the domain from which the user accessed your application.
