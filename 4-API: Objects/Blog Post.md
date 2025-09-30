# Blog Post

Blog posts can be created for any realm.

> [!IMPORTANT]
> Blog posts exist in districts, schools, users, groups, and sections.

## Fields

| Field     | Name      | Description                                                    | Type     |
| --------- | --------- | -------------------------------------------------------------- | -------- |
| `title`\* | Title     | The post title.                                                | `string` |
| `body`    | Post body | The post body. Rendered as HTML — line breaks need a `<br />`. | `string` |

\* = Required

## GET `{realm}/posts`

View a list of posts (paged)

**Return** A list of [post objects](#fields)

::: code-group

```json [JSON]
{
  "post": [
    {
      "id": "5615055",
      "title": "PHP meetup",
      "body": "Let's meet and chat about PHP",
      "created": 1386886391,
      "links": {
        "self": "http:\/\/...\/posts\/5615055"
      }
    },
    {
      "id": "5615045",
      "title": "REST API meetup",
      "body": "Let's meet and chat about REST API",
      "created": 1386886221,
      "links": {
        "self": "http:\/\/...\/posts\/5615045"
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <post>
    <id>5615055</id>
    <title>PHP meetup</title>
    <body>Let's meet and chat about PHP</body>
    <created>1386886391</created>
    <links>
      <self>http://.../5615055</self>
    </links>
  </post>
  <post>
    <id>5615045</id>
    <title>REST API meetup</title>
    <body>Let's meet and chat about REST API</body>
    <created>1386886221</created>
    <links>
      <self>http://.../5615045</self>
    </links>
  </post>
</result>
```

:::

## GET `{realm}/posts/{id}`

View a specified blog post

**Return** A [post](#fields)

::: code-group

```json [JSON]
{
  "id": "5615045",
  "title": "REST API meetup",
  "body": "Let's meet and chat about REST API",
  "created": 1386886221
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5615045</id>
  <title>REST API meetup</title>
  <body>Let's meet and chat about REST API</body>
  <created>1386886221</created>
</result>
```

:::

## POST `{realm}/posts`

Create a blog post

**Content** A [post](#fields)

::: code-group

```json [JSON]
{
  "title": "My first blog",
  "body": "<strong>my blog content<\/strong>"
}
```

```xml [XML]
<body>
  <title>My first blog</title>
  <body>&lt;strong&gt;my blog content&lt;/strong&gt;</body>
</body>
```

:::

**Return** A [post](#fields)

::: code-group

```json [JSON]
{
  "id": "5615045",
  "title": "REST API meetup",
  "body": "Let's meet and chat about REST API",
  "created": 1386886221,
  "links": {
    "self": "http:\/\/...\/posts\/5615045"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5615045</id>
  <title>REST API meetup</title>
  <body>Let's meet and chat about REST API</body>
  <created>1386886221</created>
  <links>
    <self>http://.../5615045</self>
  </links>
</result>
```

:::

## PUT `{realm}/posts/{id}`

Modify a blog post

**Content** An object containing blog post fields

::: code-group

```json [JSON]
{
  "title": "My new blog title"
}
```

```xml [XML]
<body>
  <title>My new blog title</title>
</body>
```

:::

## DELETE `{realm}/posts/{id}`

Delete a blog post (cannot be undone)
