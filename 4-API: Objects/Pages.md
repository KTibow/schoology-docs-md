# Pages

Pages can be used to display any sort of content. HTML can be used to format the content of the page to anything you like.

> [!IMPORTANT]
> Pages exist in sections.

## Fields

| Field               | Name                | Description                                                                                                                                                                   | Type                           |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Title*`            | `title`             | The page title                                                                                                                                                                | `string`                       |
| `Body`              | `body`              | The content of the page. Can be in HTML format.                                                                                                                               | `string`                       |
| `Published`         | `published`         | Whether or not the page is published                                                                                                                                          | `{0,1}`                        |
| `Inline`            | `inline`            | Set to `1` in order to set this page as an inline page                                                                                                                        | `{0,1}`                        |
| `Created timestamp` | `created`           | The timestamp of when the page was created                                                                                                                                    | `integer`                      |
| `assignees`         | `assignees`         | This field shows which enrollees are assigned a particular page. Can be used in POST or PUT; if an empty array is sent, all assignees will be removed from the page.          | `array` (of enrollment ids)    |
| `grading_group_ids` | `grading_group_ids` | This field shows what grading groups are assigned a particular page. Can be used in POST or PUT; if an empty array is sent, all grading groups will be removed from the page. | `array` (of grading group ids) |

\* = Required

## GET `{realm}/pages`

View a list of pages for the given realm.

Parameters:

- `withcontent=1`
- `with_tags`

**Return** A list of [pages](#fields)

::: code-group

```json [JSON]
{
  "page": [
    {
      "id": 5825351,
      "title": "The page title",
      "body": "",
      "parent": 0,
      "published": 1,
      "inline": 0,
      "created": 0,
      "children": [],
      "available": 1,
      "completed": 0,
      "num_assignees": 4,
      "assignees": [12345, 4567, 888, 999],
      "grading_group_ids": [534],
      "completion_status": "",
      "links": {
        "self": "http:\/\/..."
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<page>
		<id>5825351</id>
		<title>The page title</title>
		<body>&lt;base href=&quot;http:\/\/...&quot;/&gt;</body>
		<parent>0</parent>
		<published>1</published>
		<inline>0</inline>
		<created>0</created>
		<children />
		<available>1</available>
		<completed>0</completed>
		<completion_status />
                <num_assignees>4</num_assignees>
                <assignees>12345</assignees>
                <assignees>4567</assignees>
                <assignees>888</assignees>
                <assignees>999</assignees>
                <grading_group_ids>534</grading_group_ids>
		<links>
			<self>http:\/\/...</self>
		</links>
	</page>
	<total>1</total>
	<links>
		<self>http:\/\/...?start=0&amp;limit=20</self>
	</links>
</result>
```

:::

## GET `{realm}/page/{id}`

View a specified page.

Parameters:

- `with_tags`

**Return** A [page](#fields)

::: code-group

```json [JSON]
{
  "id": 5825351,
  "title": "The page title",
  "body": "",
  "parent": 0,
  "published": 1,
  "inline": 0,
  "created": 1389657748,
  "children": [],
  "num_assignees": 0,
  "assignees": [],
  "available": 1,
  "completed": 0,
  "completion_status": ""
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5825351</id>
	<title>The page title</title>
	<body>&lt;base href=&quot;http:\/\/...&quot;/&gt;</body>
	<parent>0</parent>
	<published>1</published>
	<inline>0</inline>
	<created>1389657748</created>
	<children />
	<available>1</available>
	<completed>0</completed>
	<completion_status />
	<num_assignees>0</num_assignees>
	<assignees />
</result>
```

:::

## POST `{realm}/pages`

Create a page.

**Content** An object containing page fields

::: code-group

```json [JSON]
{
  "id": 5825357,
  "title": "The page title",
  "body": "",
  "parent": 0,
  "published": 1,
  "inline": 0,
  "created": 1389657814,
  "children": [],
  "available": 1,
  "completed": 0,
  "links": {
    "self": "http:\/\/..."
  },
  "assignees": [12345, 4567],
  "grading_group_ids": [534]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>5825357</id>
    <title>The page title</title>
    <body>&lt;base href=&quot;http:\/\/...&quot;/&gt;</body>
    <parent>0</parent>
    <published>1</published>
    <inline>0</inline>
    <created>1389657814</created>
    <children />
    <available>1</available>
    <completed>0</completed>
    <assignees>12345</assignees>
    <assignees>12345</assignees>
  <grading_group_ids>534</grading_group_ids>
    <links>
        <self>http:\/\/...</self>
    </links>
</result>
```

:::

**Return** An object containing page fields

::: code-group

```json [JSON]
{
  "id": 5825357,
  "title": "The page title",
  "body": "",
  "parent": 0,
  "published": 1,
  "inline": 0,
  "created": 1389657814,
  "children": [],
  "available": 1,
  "completed": 0,
  "links": {
    "self": "http:\/\/..."
  },
  "assignees": [12345, 4567],
  "grading_group_ids": [534]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>5825357</id>
    <title>The page title</title>
    <body>&lt;base href=&quot;http:\/\/...&quot;/&gt;</body>
    <parent>0</parent>
    <published>1</published>
    <inline>0</inline>
    <created>1389657814</created>
    <children />
    <available>1</available>
    <completed>0</completed>
    <assignees>12345</assignees>
    <assignees>12345</assignees>
  <grading_group_ids>534</grading_group_ids>
    <links>
        <self>http:\/\/...</self>
    </links>
</result>
```

:::

## PUT `{realm}/pages/{id}`

Update a specified page.

**Content** An object containing page fields

::: code-group

```json [JSON]
{
  "title": "New page title",
  "published": "0"
}
```

```xml [XML]
<body>
  <title>New page title</title>
  <published>0</published>
</body>
```

:::

## DELETE `{realm}/pages/{id}`

Delete a page (cannot be undone)
