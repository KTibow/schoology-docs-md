# Apps Platform

## Introduction

What is the Schoology application platform?

**Technically**, it is an iFrame canvas which links to one or more pages on your application server.

**Simply put**, you can run any URL from within Schoology. Merely linking to a static URL like google.com or a specific YouTube video is no different than attaching an embed code to a Schoology content type. What makes an embedded application extremely useful, however, is the communication that happens between your linked application and the Schoology API.

Because the application processing happens on your server, you are more than welcome to use any server programming language to output your HTML webpages.

![Image 1: App Server Example](https://developers.schoology.com/images/app-server-example.png)

These canvases are available in a number of different contexts (realms). As an application developer, you can choose either to allow installation to a specific realm or to any realm; depending on where the application is opened, you can change what information to display. A context can be any of the following:

- User
- Course
- Group

## Application Workflow

### 1. Authenticate the User

The first step is to identify the user using the application. When the user opens the application, Schoology sends along a SAML 2.0 package containing the user's Schoology ID, name, role, and more in a secure fashion. If your application maintains its own set of user credentials, you can skip this step and instead ask the user for your service's username and password.

### 2. Authorization

Once the user has been identified, your application can obtain a set of OAuth access tokens in order to communicate with the Schoology API.

### 3. Access the API

With the the tokens that you obtained in step 2, your application can now communicate fully with the API on behalf of the user to retrieve, create, or modify content.

For most applications, step 1 would be put into a login page, and steps 2 & 3 would be part of the main application. Below are some workflow diagrams that illustrate the three main pages of an application (login, application, logout).

- [Login (SSO)](<https://developers.schoology.com/images/App%20Platform%20Flowchart%20-%20Login%20(SSO).png>) - Use this if your application does not maintain its own user database
- [Login](https://developers.schoology.com/images/App%20Platform%20Flowchart%20-%20Login.png) - Use this if your application requires users to sign in with your application's credentials
- [Application](https://developers.schoology.com/images/App%20Platform%20Flowchart%20-%20Application.png)
- Logout - Use the [app-user-info](<../3-API: Realms/4-User#get-app-user-info>) endpoint to check for a Schoology web session.

## Authentication with SAML 2.0

We use [Security Assertion Markup Language](http://en.wikipedia.org/wiki/SAML_2.0) for its XML-based SSO (single sign-on) solution so that users can log into your application without having to re-enter their username and password. When the user opens your application from within Schoology, we (the identity provider, or IdP), send over a base64-encoded SAML packet to your application (the service provider, or SP). This packet looks like the following:

```xml
<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" ID="pfx5bd96ad6-5df7-d0ad-2211-b1faaa53a33b" Version="2.0" IssueInstant="2012-05-04T19:17:10Z" Destination="http://www.example.com/login">
  <saml:Issuer>schoology</saml:Issuer>
  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <ds:SignedInfo>
      <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
      <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
      <ds:Reference URI="#pfx5bd96ad6-5df7-d0ad-2211-b1faaa53a33b">
        <ds:Transforms>
          <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
          <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
        </ds:Transforms>
        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
        <ds:DigestValue>JimIZcxBAJUdQrWAIrfN6xz3EKI=</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
    <ds:SignatureValue>...</ds:SignatureValue>
    <ds:KeyInfo>
      <ds:X509Data>
        <ds:X509Certificate>...</ds:X509Certificate>
      </ds:X509Data>
    </ds:KeyInfo>
  </ds:Signature>
  <samlp:Status>
    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
  </samlp:Status>
  <saml:Assertion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" ID="pfx83823dbb-fbb3-fa44-ac5c-9b921e7a6069" Version="2.0" IssueInstant="2012-05-04T19:17:10Z">
    <saml:Issuer>schoology</saml:Issuer>
    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
      <ds:SignedInfo>
        <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
        <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
        <ds:Reference URI="#pfx83823dbb-fbb3-fa44-ac5c-9b921e7a6069">
          <ds:Transforms>
            <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
            <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
          </ds:Transforms>
          <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
          <ds:DigestValue>...</ds:DigestValue>
        </ds:Reference>
      </ds:SignedInfo>
      <ds:SignatureValue>...</ds:SignatureValue>
      <ds:KeyInfo>
        <ds:X509Data>
          <ds:X509Certificate>...</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </ds:Signature>
    <saml:Subject>
      <saml:NameID SPNameQualifier="78f79e5de3859ceded192bdec06b44c104fa2c143" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient">_f3988779b9b374c1c041f8230351826b62b87c9cef</saml:NameID>
      <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml:SubjectConfirmationData NotOnOrAfter="2012-05-04T19:22:10Z" Recipient="http://whatsmyname.subdomain.tim.dev.schoologize.com/login.php"/>
      </saml:SubjectConfirmation>
    </saml:Subject>
    <saml:Conditions NotBefore="2012-05-04T19:16:40Z" NotOnOrAfter="2012-05-04T19:22:10Z">
      <saml:AudienceRestriction>
        <saml:Audience>...</saml:Audience>
      </saml:AudienceRestriction>
    </saml:Conditions>
    <saml:AuthnStatement AuthnInstant="2012-05-04T19:16:41Z" SessionNotOnOrAfter="2012-05-05T03:17:10Z" SessionIndex="_7d4b48d063942762265ab07eb1f184df19e66bf903">
      <saml:AuthnContext>
        <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:Password</saml:AuthnContextClassRef>
      </saml:AuthnContext>
    </saml:AuthnStatement>
    <saml:AttributeStatement>
      <saml:Attribute Name="uid" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">12345</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="display_name" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">John Doe</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>
```

It's admittedly scary, but it's a lot simpler than it looks. This packet contains all the information necessary for your application (the SP) to identify the user, get other user attributes, and ensure that this information was not modified or tampered between the Schoology servers and your application servers.

> [!TIP]
> There are plenty of SAML libraries that can decode and validate this information for you - see our [client libraries section](<./8-Client Libraries>).

Once this information has been validated, you can then start a session with the user.

## Authorization with OAuth

OAuth allows your application to access the Schoology API without needing the user's login credentials. If this is the first time that a user has accessed your application, you conduct an OAuth handshake to obtain a set of OAuth tokens for that user. You can save these tokens in your database. The next time the user accesses your application, you can retrieve the tokens and access the API without having to go through the OAuth handshake process again. For more information about OAuth and how to generate a set of authorization headers, see our [API authentication page](<../2-API Documentation/3-Authentication>).

## SSO Logout

If your application uses SSO Authentication, then the application is responsible for checking if a user has an active Schoology web session. The previous logout method, where Schoology calls your application's logout endpoint, is deprecated. Your application must use the new endpoint [here](<../3-API: Realms/4-User#get-app-user-info>) to check for an existing Schoology web session. The new process looks like the following:

```php
/*
 * ...
 * We have parsed the SAML packet sent from Schoology, now let's start our app session
 */
session_start();

// record the start time and user info retrieved from SAML packet
$_SESSION['session_created'] = time();
/*
 * You have to implement getUserInfoFromSAMLPacket(), It should do the following:
 *  - parse the SAML packet
 *  - return an object containing user info (eg, Schoology user id, name ..etc)
 */
$_SESSION['user'] = getUserInfoFromSAMLPacket();

/*
 * ...
 * We have our session and the user has completed the initial OAuth authorization handshake
 * for access tokens. Ideally, authorization should occur again for each page request. We can use our
 * saved access tokens to check if the user still has an active web session in Schoology.
 *
 * You have to implement SchoologyAPIAuthorizeUser(), It should do the following:
 *  - retrieve access tokens from the App's database or initiated the handshake for access tokens
 *  - check for an active web session using Schoology's endpoint, https://api.schoology.com/v1/app-user-info
 */
$uid = $_SESSION['user']['uid']; // this was set earlier during SAML login
$app_session_created = $_SESSION['session_created'];  // this was set earlier during SAML login
/*
## Sample Request
###############################################
Request method: GET
Request URL: https://api.schoology.com/v1/app-user-info
Request Headers:
  Authorization: [OAuth header]
  Accept: text/xml;q=1.0,application/json;q=0.0
  Host: api.schoology.com

## Sample Response Body
###############################################
{
  'web_session_timestamp': 1376425771,
  'api_uid',
}
 */
SchoologyAPIAuthorizeUser($uid, $app_session_created);
```

> [!IMPORTANT]
> Your application should ensure that the returned `api_uid` matches the current uid in the app session and compare the returned `web_session_timestamp` with the user's session_created timestamp. If either is invalid (eg, the schoology web session should have been started before the app session), you can destroy the user's session and force a logout
