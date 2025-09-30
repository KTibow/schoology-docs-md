# Private Messaging

Private messages are "e-mail style" messages that can be sent and shared between multiple users. The API exposes endpoints to view recipient lists, list messages in folders (inbox/sent), view messages/threads, create messages, reply to threads, update message status, and delete messages.

## Fields

| Field            | Name                   | Description                                                                                             | Type      |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- | --------- |
| `subject`        | Message Subject        | The subject of the message.                                                                             | `string`  |
| `message`        | Message body           | The body of the message. Optional.                                                                      | `string`  |
| `recipient_ids`  | Recipient User IDs     | A comma delimited list of the message recipients' user IDs. _Required when creating a message._         | `string`  |
| `last_updated`   | Last updated timestamp | The unix timestamp when the message was last updated.                                                   | `integer` |
| `message_status` | Message status         | Whether or not the message has been read. One of `read`, `unread`.                                      | `string`  |
| `id`             | Message thread ID      | The ID of the existing message thread. Specify this value in POST when replying to an existing message. | `integer` |
| `author_id`      | Message author ID      | The user ID of the user who sent the message.                                                           | `integer` |

\* = Required

## GET `messages/recipients`

View a list of valid message recipients for the given user.

::: code-group

```json [JSON]
{
  "recipient": [
    {
      "id": "48289",
      "name": "James Howlett",
      "school": "Hill Valley High School",
      "picture_url": "http:\/\/..."
    },
    {
      "id": "45552",
      "name": "Mr. Strickland",
      "school": "Hill Valley High School",
      "picture_url": "http:\/\/..."
    },
    {
      "id": "248101",
      "name": "Sam Jones",
      "school": "Hill Valley High School",
      "picture_url": "http:\/\/..."
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<recipient>
		<id>48289</id>
		<name>James Howlett</name>
		<school>Hill Valley High School</school>
		<picture_url>http:\/\/...</picture_url>
	</recipient>
	<recipient>
		<id>45552</id>
		<name>Mr. Strickland</name>
		<school>Hill Valley High School</school>
		<picture_url>http:\/\/...</picture_url>
	</recipient>
	<recipient>
		<id>248101</id>
		<name>Sam Jones</name>
		<school>Hill Valley High School</school>
		<picture_url>http:\/\/...</picture_url>
	</recipient>
</result>
```

:::

## GET `messages/{message folder}`

View a list of messages in the user's inbox or sent message folder.

Query parameters:

- `?with_attachments=TRUE` (optional)

**Return** A list of message objects.

::: code-group

```json [JSON]
{
  "message": [
    {
      "id": 13886,
      "subject": "[Time Travel: Section 8i] Getting started",
      "recipient_ids": "45552",
      "last_updated": 1381432687,
      "mid": null,
      "author_id": 45552,
      "message_status": "read",
      "message": null,
      "links": {
        "self": "http:\/\/..."
      }
    }
  ],
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  },
  "unread_count": "0"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <message>
        <id>13886</id>
        <subject>[Time Travel: Section 8i] Getting started</subject>
        <recipient_ids>45552</recipient_ids>
        <last_updated>1381432687</last_updated>
        <mid />
        <author_id>45552</author_id>
        <message_status>read</message_status>
        <message />
        <links>
            <self>http:\/\/...</self>
        </links>
    </message>
    <links>
        <self>http:\/\/...?start=0&amp;limit=20</self>
    </links>
    <unread_count>0</unread_count>
</result>
```

:::

## GET `messages/{id}`

View an individual message. If the given message is part of a thread, all related thread messages will be returned. Executing this endpoint will automatically mark the thread as read; to keep the thread unread, pass `?keep_unread=TRUE`. `?with_attachments=TRUE` is also available.

::: code-group

```json [JSON]
{
  "message": [
    {
      "id": 13886,
      "subject": "[Time Travel: Section 8i] Getting started",
      "recipient_ids": "45552",
      "last_updated": 1381432687,
      "mid": null,
      "author_id": 45552,
      "message_status": "read",
      "message": "Hi,\r\n\r\n\r\nBye"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <message>
        <id>13886</id>
        <subject>[Time Travel: Section 8i] Getting started</subject>
        <recipient_ids>45552</recipient_ids>
        <last_updated>1381432687</last_updated>
        <mid />
        <author_id>45552</author_id>
        <message_status>read</message_status>
        <message>Hi,


Bye</message>
    </message>
</result>
```

:::

## POST `messages`

Create a message.

**Content** An object containing message fields.

::: code-group

```json [JSON]
{
  "subject": "The subject of the message",
  "message": "The body of the message",
  "recipient_ids": "534342,678887,88923"
}
```

```xml [XML]
<body>
  <subject>The subject of the message</subject>
  <message>The body of the message</message>
  <recipient_ids>534342,678887,88923</recipient_ids>
</body>
```

:::

**Return** A message object

::: code-group

```json [JSON]
{
  "id": 14065,
  "subject": "This is subject",
  "recipient_ids": "48289",
  "last_updated": 1389716445,
  "mid": null,
  "author_id": 45552,
  "message_status": null,
  "message": "This is message"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>14065</id>
    <subject>This is subject</subject>
    <recipient_ids>48289</recipient_ids>
    <last_updated>1389716445</last_updated>
    <mid />
    <author_id>45552</author_id>
    <message_status />
    <message>This is message</message>
</result>
```

:::

## POST `messages/{id}`

Reply to an individual thread. Executing this endpoint will automatically mark the thread as read; to keep the thread unread, pass `?keep_unread=TRUE`.

**Content** An object containing message fields.

::: code-group

```json [JSON]
{
  "subject": "The subject of the message",
  "message": "The body of the message",
  "recipient_ids": "534342,678887,88923"
}
```

```xml [XML]
<body>
  <subject>The subject of the message</subject>
  <message>The body of the message</message>
  <recipient_ids>534342,678887,88923</recipient_ids>
</body>
```

:::

**Return** A message object

::: code-group

```json [JSON]
{
  "id": 14065,
  "subject": "This is subject",
  "recipient_ids": "45552,48289",
  "last_updated": 1389716514,
  "mid": null,
  "author_id": 45552,
  "message_status": null,
  "message": "Did you see my message"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>14065</id>
    <subject>This is subject</subject>
    <recipient_ids>45552,48289</recipient_ids>
    <last_updated>1389716514</last_updated>
    <mid />
    <author_id>45552</author_id>
    <message_status />
    <message>Did you see my message</message>
</result>
```

:::

## PUT `messages/inbox/{id}`

Modify the message status of an existing message in the inbox message folder. The `message_status` value should be either `read` or `unread`.

**Content** The example request body:

::: code-group

```json [JSON]
{
  "message_status": "read"
}
```

```xml [XML]
<message>
  <message_status>read</message_status>
</message>
```

:::

## DELETE `messages/{id}`

Delete a message (cannot be undone). Note: deleting a message from the sent folder does NOT un-send the message.
