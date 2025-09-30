# Context Hints

When your application is opened, Schoology appends two query string parameters (`realm` and `realm_id`) to your application URL to let your application know the context (a.k.a realm) in which your application was opened by the user.

This hints allow you to show realm-specific information to the user, such as the recordings created for a specific course.

> [!IMPORTANT]
> You should take care to verify that the user has access to the realm hints that were passed, ensuring that they were not tampered or modified by the user.

## Realms

### User

For the **user** realm (`$_GET['realm'] == 'user'`), check to make sure that the value passed in as `realm_id` is the same ID as the user who is currently logged in to your application. Otherwise, deny access to your application.

### Course Sections / Groups

For course sections and groups, you should check to make sure that the user is in fact enrolled in the course or group in question. Below is some sample code that checks to make sure user 78910 is enrolled in group 12345:

```php
// Find a specific enrollment from the API
$result = $schoology_api->apiResult('groups/12345/enrollments?uid=78910');
if(!$result || !sizeof($result->enrollment)){
  // No enrollment found
  return FALSE;
}
```

This is not a convenience function in the API so that the number of calls to the API is reduced. In this case, you can continue to use $result->enrollment[0] to see if the user is enrolled as an administrator or as a member, and show different information for each.

## Maintaining Realm Information

The realm and realm_id parameters are only passed to the initial application page. If your application contains links that the user can click on, the realm hints will no longer be part of the URL. There are two methods of handling this:

1.  Store the realm hints in the user's session. If the user switches realms (e.g. opens the app in a different course), replace the stored realm hints with the new ones that were passed.
2.  Ensure that all links also contain the realm hints that were passed to the main application page. While more tedious, this ensure that there will be no problems with multiple browser tabs open to different realms.

## Linking Into Your Application

Sometimes you may want to publish a link that will take a logged in Schoology user to a certain place in your application. Two things need to be considered when creating this URL:

1.  The URL to launch your application in Schoology. When building out this part take care [to consider the domain](<./4-Handling Domains>) the app was launched from. The rest of the URL has three wild cards:
    - The Schoology ID of your application
    - The realm the app was launched from
    - The realm_id the app was launched from

With those three pieces of information you can build out a URL such as `https://www.schoology.com/apps/{your_app_id}/run/{realm}/{realm_id}`

2.  After building out the Schoology URL, all that is left to decide is where in your application you would like the user to link to. With that in mind, add a GET parameter called `destination` with a complete URL to your internal application page.

The complete URL to link into one of your internal application pages will look something like

`https://www.schoology.com/apps/32985/run/course/12345?destination=https%3A%2F%2Fwww.myschoologyapp.com%2Finternal%2Fpage`
