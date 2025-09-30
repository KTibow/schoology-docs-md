# Web Content Packages

Web Content Packages are website files, compressed in .zip format, that can be added to Schoology course sections.

> [!IMPORTANT]
> Web Content Packages exist in sections.

## Fields

| Field   | Name       | Description                                    | Type      |
| ------- | ---------- | ---------------------------------------------- | --------- |
| `id`    | Id         | The Schoology id of the web content package    | `string`  |
| `title` | Title      | The title of the web package                   | `string`  |
| `uid`   | UID        | The id of the user who created the web package | `integer` |
| `url`   | Launch URL | The URL to launch the web package              | `string`  |

## GET `sections/{section id}/web_packages`

View a list of web content packages in a course section

**Return** A list of [web content packages](#fields)

::: code-group

```json [JSON]
{
  "web": [
    {
      "id": 123456,
      "title": "webpackage.zip",
      "uid": 1864351,
      "url": "https:\/\/schoology.com\/web\/123456\/view"
    },
    {
      "id": 7891011,
      "title": "webpackage2.zip",
      "uid": 1864351,
      "url": "https:\/\/schoology.com\/web\/7891011\/view"
    }
  ],
  "total": 2,
  "links": {
    "self": "http:\/\/schoology.com\/v1\/sections\/9560267\/web_packages?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<web>
		<id>123456</id>
		<title>webpackage.zip</title>
		<uid>1864351</uid>
		<url>https://schoology.com/web/123456/view</url>
	</web>
	<web>
		<id>7891011</id>
		<title>webpackage2.zip</title>
		<uid>1864351</uid>
		<url>https://schoology.com/web/7891011/view</url>
	</web>
	<total>2</total>
	<links>
		<self>http://schoology.com/v1/sections/9560267/web_packages?start=0&amp;limit=20</self>
	</links>
</result>
```

:::

## GET `sections/{section id}/web_packages/{id}`

View a specified web content package

**Return** A [web content package](#fields)

::: code-group

```json [JSON]
{
  "id": 123456,
  "title": "webpackage.zip",
  "uid": 1864351,
  "url": "https:\/\/schoology.com\/web\/123456\/view"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>123456</id>
	<title>webpackage.zip</title>
	<uid>1864351</uid>
	<url>https://schoology.com/web/123456/view</url>
</result>
```

:::

## DELETE `sections/{section id}/web_packages/{id}`

Delete a web content package (cannot be undone)
