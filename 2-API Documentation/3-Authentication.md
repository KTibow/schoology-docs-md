# Authentication

## OAuth Basics

OAuth is a specification for security that resembles a modern valet key. You can give this key to the valet driver, which allows him to start and drive the car - it has no access to the trunk or glove compartment, unlike your regular key.

OAuth allows a way for users to allow third-party applications to act upon the Schoology API without revealing his/her password. If at anytime a user wants to revoke access from a certain application, he/she can do so without changing to a new password.

In this case, the Schoology API is the the **service provider**, the third-party application is the **consumer**, and the person using the application is the **user**.

Every OAuth `Authorization` comes with a few pieces of information that help identify the user and secure the information in the request.

| Parameter                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `realm`                           | An string that identifies the OAuth request server - in this case, "Schoology API"                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `oauth_signature`                 | The signature protects against [man in the middle attacks](http://en.wikipedia.org/wiki/Man-in-the-middle_attack); it is used to ensure that the information contained within the request has not been tampered with or altered between the **consumer** and the **service provider**.                                                                                                                                                                                                                |
| `oauth_signature_method`          | Specifies the signature type of the `oauth_signature`. Recommended method is `HMAC-SHA1`.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `oauth_consumer_key`              | This parameter is what identifies the **consumer** to the **service provider**. A unique key is assigned by Schoology to each **consumer**.                                                                                                                                                                                                                                                                                                                                                           |
| `oauth_timestamp` / `oauth_nonce` | The `oauth_timestamp` and `oauth_nonce` parameters protect against [replay attacks](http://en.wikipedia.org/wiki/Replay_attack). Before a request is processed, the **service provider** ensures that the request is not being copied and re-run by checking that the given [nonce](http://en.wikipedia.org/wiki/Cryptographic_nonce) is not used more than once for the specified timestamp. The timestamp must also be in sequence (i.e. you cannot use a past timestamp after using a future one). |
| `oauth_token`                     | The `oauth_token` is used in [three-legged OAuth requests](#oauth-types-three-legged) to identify the **user**. For [two-legged OAuth requests](#oauth-types-two-legged), the `oauth_token` still needs to be defined, but should be an empty string (i.e. `""`).                                                                                                                                                                                                                                     |
| `oauth_version`                   | This describes the version of the OAuth Protocol being used. V1 of the Schoology API uses OAuth version "1.0".                                                                                                                                                                                                                                                                                                                                                                                        |

This is an example OAuth Authorization header:

```
Authorization: OAuth realm="Schoology API",
   oauth_consumer_key="dpf43f3p2l4k3l03",
   oauth_token="nnch734d00sl2jdk",
   oauth_nonce="kllo9940pd9333jh",
   oauth_timestamp="1191242096",
   oauth_signature_method="HMAC-SHA1",
   oauth_version="1.0",
   oauth_signature="WPzmzWV5A32eHbq4yYB9gyZOEgg%3D"
```

The following parameters are needed to create the `oauth_signature` but are not explicitly passed in the `Authorization` header:

| Parameter                          | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `consumer_secret` / `token_secret` | These two secrets are used to generate the `oauth_signature` defined by the `oauth_signature_method`.<br><br>`HMAC-SHA1` The basic idea behind this signature method is that a one-way hash is generated using the signature base string (composed of the authorization headers, URL, HTTP method, and request body) and these secrets. Only parties that know these _secrets_ can properly generate an acceptable signature, in this case the **consumer** and **service provider**. Any third party that attempts to intercept and change the contents of this request will not be able to generate a valid signature; this altered request will therefore be invalidated and ignored once it reaches the **service provider**.<br><br>`PLAINTEXT` This signature method is meant to be used only through HTTPS; it is simply a concatenation of the two secret keys. |

## OAuth Types - Three-Legged

Three-legged OAuth is the scenario described by the valet example in the [OAuth basics](#oauth-basics). In this case, there are three parties: the **service provider**, **consumer**, and **user**. You may have encountered this three-legged authentication approach when using third-party applications that access your information on Twitter or Facebook; you click on an action that requires a Twitter login, at which point you are redirected to Twitter along with a request token and are asked if you "trust this application." Once you click "yes" or "allow," that request token is marked as approved. The application can now exchange the request token with an access token - this access token is used to access the API on behalf of the user.

At any point, users can revoke access from any third-party application, which invalidates the previously issued token. Any subsequent requests that use this invalidated token will be rejected.

### Workflow Example

This example with walk through the process of identifying the user and accessing the API using approved access tokens. This example uses functions from the [Schoology API PHP SDK](<../1-Apps Platform/8-Client Libraries>).

#### Step 1: Identify the User

You can identify the user by having them sign in with credentials for your application. If you are developing a Schoology application, you can use the [SAML login information](<../1-Apps Platform/1-Index>) to determine the Schoology ID of the user.

#### Step 2: Check to see if access tokens exist for the user

If the user has previously accessed your application, then they should already have access tokens stored in your database. If they do and the tokens are valid, skip to step 6.

```php
  // The user ID retrieved from Step 1
  $uid = $_SESSION['user_id'];

  // Retrieve stored token information
  // This function ignores request tokens that haven't been converted to access tokens
  $token = $storage->getAccessTokens($uid);

  // If an access token was found, test to make sure it is valid and wasn't revoked
  if($token){
    $this->_token_key = $token['token_key'];
    $this->_token_secret = $token['token_secret']
    try{
      // Attempt an API call with a consumer_key, consumer_secret, token_key, and token_secret
      $this->apiResult('users/me');
    }
    catch(Exception $e){
      // If it failed with an HTTP Unauthorized, our token is no longer valid
      if($e->getCode() == 401){
        // Remove the token from our DB and clear it from our variables
        $storage->revokeAccessTokens($uid);
        unset($token, $this->_token_key, $this->_token_secret);
      }
    }
  }

  // If we get here and $token is still set, skip to step 6
```

#### Step 3: Get a request token

If no access tokens were found or the retrieved access token is no longer valid, get a new request token from the Schoology servers. This request token will eventually be converted to an access token which will then be used to access the API.

```php
// The first time this page is run, there are no parameters
if(!isset($_GET['oauth_token'])){
  // Get request token
  $api_result = $this->api('/oauth/request_token');

  // Parse the query-string-formatted result
  $result = array();
  parse_str($api_result->result, $result);

  // Store the request token in our DB
  $storage->saveRequestTokens($uid, $result['oauth_token'], $result['oauth_token_secret']);

  ... // Code from step 4
}
```

#### Step 4: Forward the user to approve the request tokens

Once you have valid request tokens, the user needs to be forwarded back to Schoology. This step accomplishes two things: the user approves your access to his/her account information, and the system associates the tokens with the user's UID. If they are not yet logged into Schoology when they are forwarded, they will be asked to log in before approving your application. The `$this->_domain` ensures that the user is directed back to the domain from which he/she accessed Schoology (which might not necessarily be app.schoology.com). See "[Handling Domains](<../1-Apps Platform/4-Handling Domains>)" for more details.

```php
if(!isset($_GET['oauth_token'])){
  ... // Code from step 3

  // Now that we have a request token, forward the user to approve it
  $params = array(
        'oauth_callback=' . urlencode('http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']),
        'oauth_token=' . urlencode($result['oauth_token']),
  );
  $query_string = implode('&', $params);
  header('Location: ' . $this->_domain . '/oauth/authorize?'  . $query_string);
  exit;
}
```

#### Step 5: Convert the request tokens to access tokens

If the user approves your application, they will be redirected back to the oauth_callback URL that you had passed in step 4. You can now exchange the request tokens for access tokens.

```php
if(!isset($_GET['oauth_token'])){
  ... // code from steps 3 and 4
}
else {
  // Get the existing record from our DB
  $request_tokens = $storage->getRequestTokens($uid);

  // If the token doesn't match what we have in the DB, someone's tampering with requests
  if($request_tokens['token_key'] !== $_GET['oauth_token']){
    throw new Exception('Invalid oauth_token received.');
  }

  // Request access tokens using our newly approved request tokens
  $this->_token_key = $request_tokens['token_key'];
  $this->_token_secret = $request_tokens['token_secret'];
  $api_result = $this->api('/oauth/access_token');

  // Parse the query-string-formatted result
  $result = array();
  parse_str($api_result->result, $result);

  // Update our DB to replace the request tokens with access tokens
  $storage->requestToAccessTokens($uid, $result['oauth_token'], $result['oauth_token_secret']);

  // Update our $oauth credentials and proceed normally
  $this->_token_key = $result['oauth_token'];
  $this->_token_secret = $result['oauth_token_secret'];
}
```

#### Step 6 - Access the API

At this point, you now have everything you need to make an API call to Schoology.

## OAuth Types - Two-Legged

If you are developing a simple application that acts only on behalf of you, then you can use the much simpler two-legged OAuth approach. In this case, the **consumer** and the **user** are one in the same, so we can leave out the part in [three-legged OAuth requests](#oauth-types-three-legged) that asks the user if they trust the application. Because the **consumer** and **user** are always the same, we can use the `oauth_consumer_key` to identify the user rather than use the `oauth_token`. In two-legged OAuth requests, the `oauth_token` is still required, but should be an empty string (i.e. `""`).

Consumer keys for two-legged OAuth can be obtained by clicking on the **Integration** menu item on the left after logging in as an administrator. **NOTE:** only users with roles that have the _Access Schoology API_ permission can obtain an API consumer key.

### Limited Library Support

If your chosen [OAuth library](#oauth-libraries) does not explicitly support two-legged OAuth, you can get away _without_ using a library and by manually creating the authorization header - since all API requests are currently passed through HTTPS, we can use the much simpler `PLAINTEXT` signature method. (**Note:** the parameter order listed below is how they should be passed in the `Authorization` header: `realm` first, `oauth_signature` last, and everything else alphabetical.)

| Parameter                | Value                                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `realm`                  | `Schoology API`                                                                                                                                                               |
| `oauth_consumer_key`     | `dpf43f3p819k3l03`<br>_This value is simply the `oauth\_consumer\_key` given to you by Schoology._                                                                            |
| `oauth_token`            | _Two-legged OAuth does not have a token - this should be left blank._                                                                                                         |
| `oauth_nonce`            | `kllo9940pd9333jh`<br>_This nonce must be a string unique to the given timestamp. In PHP, using the function `uniqid()` is sufficient in creating a nonce._                   |
| `oauth_timestamp`        | `1200376800`<br>_The current unix timestamp can be generated in PHP with the function `time()`._                                                                              |
| `oauth_signature_method` | `PLAINTEXT`                                                                                                                                                                   |
| `oauth_version`          | `1.0`                                                                                                                                                                         |
| `oauth_signature`        | `kd94hf93k423kf44%26`<br>_This value is made up of the `oauth\_consumer\_secret` given to you by Schoology. The final "%26" is the URL-encoded version of the "&" character._ |

This should result in an `Authorization` header that looks like the following:

```
Authorization: OAuth realm="Schoology API",
   oauth_consumer_key="dpf43f3p2l4k3l03",
   oauth_token="",
   oauth_nonce="kllo9940pd9333jh",
   oauth_timestamp="1200376800",
   oauth_signature_method="PLAINTEXT",
   oauth_version="1.0",
   oauth_signature="kd94hf93k423kf44%26"
```

Keep in mind that this header cannot be used more than once - the `oauth_nonce` and `oauth_timestamp` must be regenerated with each request.

## OAuth Libraries

Libraries exist in almost every programming language that will generate the OAuth authorization header for you. See http://oauth.net/code/ for a full list of these libraries. You can find our recommended list of libraries in our [client libraries](#client-libraries) section.

## Troubleshooting

> I am seeing the error "API error 401 Duplicate timestamp/nonce combination, possible replay attack. Request rejected."

This error indicates that two or more requests were made with the same timestamp/nonce. A unique nonce/timestamp combination must be generated for each request to prevent [replay attacks](https://en.wikipedia.org/wiki/Replay_attack). While nonce can be any random value, the timestamp must be in sequence (i.e. you cannot use a past timestamp after using a future one).

This error can occur when making API requests to endpoints which respond with a 303 redirect, and then following the redirect without generating a new nonce or timestamp. Certain libraries or tools used to make the API requests may do this automatically.

These are a couple examples of endpoints that perform redirects:

- v1/users/ext/<unique_user_id>
- v1/users/me

To resolve this issue, compute a new nonce and/or timestamp, resign the request, and send new authorization headers before following the redirect.

## See Also

- [OAuth Terminology](http://hueniverse.com/oauth/guide/terminology/)
- [Beginner's Guide to OAuth](http://hueniverse.com/oauth/)
- [OAuth 1.0 Specification](http://tools.ietf.org/html/rfc5849)
- [OAuth Libraries (available in many programming languages)](http://oauth.net/code/)
