# Security Policy

> [!IMPORTANT]
> Internet Explorer treats pages loaded in iFrames as 3rd party providers and is therefore very strict about the security policies it implements. If the page does not specify a security policy, it refuses to save cookies for that page and you may notice that users are unable to log into your application. To our knowledge, other browsers are not as strict and do not require a policy.

We recommend adding the following HTTP header to your application on every page that works with cookies (if you are working with a coding framework, you should be able to put it on index.php or other similar page that is run with every page load):

```
P3P: CP="CAO IVDi OUR"
```

In PHP, this can be done with:

```php
header('P3P: CP="CAO IVDi OUR"');
```

This is a "Compact" policy (CP) that specifies the following:

### CAO

Identified Contact Information and Other Identified Data: access is given to identified online and physical contact information as well as to certain other identified data.

### IVDi

Information may be used to determine the habits, interests, or other characteristics of individuals and combine it with identified data to make a decision that directly affects that individual. Opt-in means prior consent must be provided by users.

### OUR

Ourselves and/or entities acting as our agents or entities for whom we are acting as an agent.

You should modify the header as necessary to match your application's use and your company's privacy policy. See https://www.w3.org/P3P/ for a list of all available policies.
