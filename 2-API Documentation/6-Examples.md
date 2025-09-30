# Example Requests/Responses

Following are some sample API calls and responses. These examples ARE NOT example client code and ARE NOT language-specific. As recommended, try using these with a program like Fiddler (http://www.fiddler2.com) before diving in to writing an actual API client. The below examples are NOT all inclusive, they just highlight the minimum requirements and relevant information. For example, you will get more response headers in any given response than are listed below, they just aren't particularly relevant here. Note: values in brackets [like this] are not actual values, but brief labels of what you'd actually find in that space.

## Example 1 - Private Message Inbox

Retrieve a list of messages in the signed-in user's private message inbox.

::: code-group

```[Request]
Request method: GET
Request URL: https://api.schoology.com/v1/messages/inbox
Request Headers:
  Authorization: [OAuth header]
  Accept: text/xml;q=1.0,application/json;q=0.0
  Host: api.schoology.com
  Content-Type: text/xml
```

```xml [Response]
Response Code: 200
Response Headers:
  Content-length: [size of the response body in bytes]
  Content-type: text/xml; charset=UTF-8
  X-Schoology: API
Response Body:
<?xml version="1.0" encoding="utf-8" ?>
<result>
 <message>
  <id>4458</id>
  <subject>Hi there</subject>
  <recipient_ids>3</recipient_ids>
  <last_updated>1288992445</last_updated>
  <author_id>5</author_id>
  <message_status>read</message_status>
  <message>Hey there, how are you doing these days? How about that weather!</message>
  <links>
   <self>https://api.schoology.com/v1/messages/inbox/4458</self>
  </links>
 </message>
 <message>
  <id>4455</id>
  <subject>What's up?</subject>
  <recipient_ids>3,6</recipient_ids>
  <last_updated>1287605544</last_updated>
  <author_id>7</author_id>
  <message_status>unread</message_status>
  <message>Don't forget about me!</message>
  <links>
   <self>https://api.schoology.com/v1/messages/inbox/4455</self>
  </links>
 </message>
</result>
```

:::

## Example 2 - User Profile Information

Update user profile information. A few things to note here: (1) The only thing returned in the response is the 204 response code stating that the update was successful. (2) The structure of the request body is verbatim to what you'd receive if you where to make a GET call to the same URL. This is generally always the case. (3) When using the text/xml request format, the outer-most tag name is superfluous, it merely needs to validly and consistently exist.

::: code-group

```xml [Request]
Request method: PUT
Request URL: https://api.schoology.com/v1/users/5
Request Headers:
  Authorization: [OAuth header]
  Accept: text/xml;q=1.0,application/json;q=0.0
  Host: api.schoology.com
  Content-Type: text/xml
Request Body:
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <name_title>Professor</name_title>
</result>
```

```[Response]
Response Code: 204
Response Headers:
  Content-length: 0
  Content-type: text/xml; charset=UTF-8
  X-Schoology: API
```

:::

## Example 3 - Discussion Comment

Comment on a group discussion. A few things to note here: (1) In the request body you don't specify the user making the comment because only the signed-in user can comment. (2) Also, as per usual, the only thing you get in response is the 201 code letting you know the comment was successfully created. (3) The request format `application/json` requires the use of double quotes for all object properties and values.

::: code-group

```json [Request]
Request method: POST
Request URL: https://api.schoology.com/v1/users/5
Request Headers:
  Authorization: [OAuth header]
  Accept: text/xml;q=1.0,application/json;q=0.0
  Host: api.schoology.com
  Content-Type: application/json
Request Body:
{"comment": "hi mom!"}
```

```[Response]
Response Code: 201
Response Headers:
  Content-length: 0
  Content-type: text/xml; charset=UTF-8
  X-Schoology: API
```

:::
