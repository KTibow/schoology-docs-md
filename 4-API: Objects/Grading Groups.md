# Grading Groups

Grading groups are groups of students within a course that can be assigned specific content.

> [!IMPORTANT]
> Grading groups exist in sections.

## Fields

| Field        | Name       | Description                                            | Type                |
| ------------ | ---------- | ------------------------------------------------------ | ------------------- |
| `id`         | ID         | The ID of the grading group.                           | `integer`           |
| `title`\*    | Title      | The title of the grading group.                        | `string`            |
| `section_id` | Section ID | The Schoology section id that the grading group is in. | `integer`           |
| `members`    | Members    | An array of enrollment ids part of the grading group.  | `array of integers` |

\* = Required

## GET `sections/{section id}/grading_groups`

List grading groups

**Return** A list of [grading group](#fields) objects

::: code-group

```json [JSON]
{
  "grading_groups": [
    {
      "id": 971,
      "title": "Grading Group 1",
      "section_id": 8112663,
      "members": [58002983, 58002995, 58003003]
    },
    {
      "id": 973,
      "title": "Grading Group 2",
      "section_id": 8112663,
      "members": [58003019, 58003015, 58003011]
    },
    {
      "id": 975,
      "title": "test",
      "section_id": 8112663,
      "members": []
    }
  ],
  "count": 3,
  "links": {
    "self": "http:\/\/api.ahandler.dev.schoologize.com\/v1\/sections\/8112663\/grading_groups"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<grading_groups>
		<id>971</id>
		<title>Grading Group 1</title>
		<section_id>8112663</section_id>
		<members>58002983</members>
		<members>58002995</members>
		<members>58003003</members>
	</grading_groups>
	<grading_groups>
		<id>973</id>
		<title>Grading Group 2</title>
		<section_id>8112663</section_id>
		<members>58003019</members>
		<members>58003015</members>
		<members>58003011</members>
	</grading_groups>
	<grading_groups>
		<id>975</id>
		<title>test</title>
		<section_id>8112663</section_id>
		<members />
	</grading_groups>
	<count>3</count>
	<links>
		<self>http://api.ahandler.dev.schoologize.com/v1/sections/8112663/grading_groups</self>
	</links>
</result>
```

:::

## GET `sections/{section id}/grading_groups/{gg id}`

View a specified grading group

**Return** A [grading group](#fields)

::: code-group

```json [JSON]
{
  "id": 971,
  "title": "Grading Group 1",
  "section_id": 8112663,
  "members": [58002983, 58002995, 58003003]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>971</id>
	<title>Grading Group 1</title>
	<section_id>8112663</section_id>
	<members>58002983</members>
	<members>58002995</members>
	<members>58003003</members>
</result>
```

:::

## POST `sections/{section id}/grading_groups` (bulk)

Create one or more grading groups in a section

**Content** An object containing grading group fields

::: code-group

```json [JSON]
{
  "grading_groups": {
    "grading_group": [
      {
        "title": "GG1",
        "members": [58002983, 58002995, 58003019, 58003015]
      },
      {
        "title": "GG2"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<body>
	<grading_groups>
		<grading_group>
			<title>GG1</title>
			<members>58002983</members>
			<members>58002995</members>
			<members>58003019</members>
			<members>58003015</members>
		</grading_group>
		<grading_group>
			<title>GG2</title>
		</grading_group>
	</grading_groups>
</body>
```

:::

**Return** A list of created [grading group](#fields) objects (one per submitted grading_group)

::: code-group

```json [JSON]
{
  "grading_group": [
    {
      "id": 995,
      "title": "GG2",
      "section_id": 8112663,
      "response_code": 200,
      "members": [58002983, 58002995, 58003019, 58003015]
    },
    {
      "id": 995,
      "title": "GG2",
      "section_id": 8112663,
      "response_code": 200,
      "members": []
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<grading_group>
		<id>995</id>
		<title>GG2</title>
		<section_id>8112663</section_id>
		<response_code>200</response_code>
		<members>58002983</members>
		<members>58002995</members>
		<members>58003019</members>
		<members>58003015</members>
	</grading_group>
	<grading_group>
		<id>995</id>
		<title>GG2</title>
		<section_id>8112663</section_id>
		<response_code>200</response_code>
		<members />
	</grading_group>
</result>
```

:::

## PUT `sections/{section id}/grading_groups/{gg id}`

Update a single grading group in a section

**Content** An object containing grading group fields

::: code-group

```json [JSON]
{
  "id": 993,
  "title": "GG6",
  "members": [58003035]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>993</id>
	<title>GG6</title>
	<members>58003035</members>
</result>
```

:::

**Return** A [grading group](#fields)

::: code-group

```json [JSON]
{
  "id": 993,
  "title": "GG6",
  "section_id": 8112663,
  "members": [58003035]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>993</id>
	<title>GG6</title>
	<section_id>8112663</section_id>
	<members>58003035</members>
</result>
```

:::

## DELETE `sections/{section id}/grading_groups/{gg id}`

Delete a grading group (cannot be undone).
