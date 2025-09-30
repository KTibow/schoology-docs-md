# Client Libraries

These client libraries help with building various parts of your application.

The Schoology SDK encompasses all necessary parts, including the initial SSO SAML login request, requesting an oAuth access token, and making calls to the Schoology API. It is by no means necessary to create an application. If you don't want to use one or are writing an application in a language not listed below, you can take a look at them as an example for the types of operations that you will need to do.

## PHP

### Schoology SDK

The PHP SDK is available on github as a git repository. The SDK also contains the certificate necessary to verify the SAML login request.

**Git Repository:** [schoology_php_sdk](https://github.com/schoology/schoology_php_sdk)

To pull down the repo locally the following command can be run:

`git clone https://github.com/schoology/schoology_php_sdk.git`

### OAuth

- [PECL Extension](http://us3.php.net/manual/en/book.oauth.php)
- [PEAR Package](http://pear.php.net/package/HTTP_OAuth)
- [oauth-php](http://code.google.com/p/oauth-php/)

## .NET

### OAuth

- [DotNetOpenAuth](http://dotnetopenauth.net/)
- [oauth-dot-net](http://code.google.com/p/oauth-dot-net/)
