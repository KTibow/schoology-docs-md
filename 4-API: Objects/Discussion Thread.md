# Discussion Thread

Discussion threads can be created for all realms except users. The operations below are available for the following realms: `districts/{id}`, `schools/{id}`, `sections/{id}`, and `groups/{id}`.

> [!IMPORTANT]
> Discussion threads exist in districts, schools, groups, and sections.

## Fields

| Field                  | Name                         | Description                                                                                                                                                                                                                                                                                                                                                         | Type                             |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `id`\*                 | Schoology Discussion ID      | The internal Schoology ID of the discussion.                                                                                                                                                                                                                                                                                                                        | `string`                         |
| `title`\*              | Title                        | The thread title.                                                                                                                                                                                                                                                                                                                                                   | `string`                         |
| `body`                 | Thread Body                  | The thread body.                                                                                                                                                                                                                                                                                                                                                    | `string`                         |
| `graded`               | Graded                       | Whether or not the discussion is graded. Allowed values: `0`, `1`.                                                                                                                                                                                                                                                                                                  | `integer`                        |
| `due`                  | Due Date                     | When the assignment is due. Format: `YYYY-MM-DD HH:MM:SS`.                                                                                                                                                                                                                                                                                                          | `datetime (YYYY-MM-DD HH:MM:SS)` |
| `grade_item_id`        | Grade Item ID                | The Id of the grade item associated with this discussion (used for grades).                                                                                                                                                                                                                                                                                         | `integer`                        |
| `grading_scale`        | Grading Scale                | The ID of the grading scale for this assignment. For no grading scale, use `0`. Course grading scales can be found on the course Grade Setup page. (default: `0`)                                                                                                                                                                                                   | `integer`                        |
| `grading_period`       | Grading Period               | The grading period ID to which this assignment belongs. For "Other", use `0`. (default: `0`)                                                                                                                                                                                                                                                                        | `integer`                        |
| `grading_category`     | Grading Category             | The grading category ID to which this assignment belongs. (default: `0`)                                                                                                                                                                                                                                                                                            | `integer`                        |
| `max_points`           | Maximum Points               | The maximum number of points for this assignment (excl. extra credit). (default: `100`)                                                                                                                                                                                                                                                                             | `float`                          |
| `factor`               | Factor                       | The relative weight of this assignment. (default: `1.0`)                                                                                                                                                                                                                                                                                                            | `float`                          |
| `is_final`             | Is a Final                   | Mark this assignment as a midterm or final. Allowed values: `0`, `1`. (default: `0`)                                                                                                                                                                                                                                                                                | `integer`                        |
| `published`            | Published                    | Whether or not the discussion is published. Only applies to section discussions NOT associated with topics. Allowed values: `0`, `1`. (default: `1`)                                                                                                                                                                                                                | `integer`                        |
| `require_initial_post` | Requires Initial Post        | Flag indicating whether a member needs to participate before seeing other member posts. Allowed values: `0`, `1`. (default: `0`)                                                                                                                                                                                                                                    | `integer`                        |
| `count_in_grade`       | Count in Grade               | Can be used for materials such as pre-assessments or practice work, allowing parents/students to see progress while knowing the score is not impacting a students calculated grade. This field can be used in a POST or PUT operation. It only applies to Course Sections realm and Discussion Thread enabled for grading. Allowed values: `0`, `1`. (default: `1`) | `integer`                        |
| `collected_only`       | Collected Only               | Allows teachers to simply mark materials as completed or not; useful for collecting forms or documenting in-class participation. This field can be used in a POST or PUT operation. It only applies to Course Sections realm and Discussion Thread enabled for grading. Allowed values: `0`, `1`. (default: `0`)                                                    | `integer`                        |
| `auto_publish_grades`  | Automatically Publish Grades | Assignment grades will be visible to students and guardians as soon as they are entered. Allowed values: `0`, `1`. (default: `1`)                                                                                                                                                                                                                                   | `integer`                        |

\* = Required

## GET `{realm}/discussions`

View a list of discussion threads (paged). Optional query parameters: `with_attachments`, `with_tags`.

::: code-group

```json [JSON]
{
  "discussion": [
    {
      "id": 5692161,
      "uid": 45552,
      "title": "Example topic",
      "body": "Let's talk about APIs",
      "weight": 20,
      "graded": 0,
      "published": 1,
      "available": 1,
      "completed": 0,
      "count_in_grade": 1,
      "collected_only": 0,
      "auto_publish_grades": 1,
      "comments_closed": 0,
      "completion_status": "",
      "links": {
        "self": "http:\/\/...\/discussions\/5692161"
      }
    },
    {
      "id": 5692163,
      "uid": 45552,
      "title": "Example topic 2",
      "body": "Let's talk about APIs",
      "weight": 30,
      "graded": 0,
      "published": 1,
      "available": 1,
      "completed": 0,
      "count_in_grade": 1,
      "collected_only": 0,
      "auto_publish_grades": 1,
      "comments_closed": 0,
      "completion_status": "",
      "links": {
        "self": "http:\/\/...\/discussions\/5692163"
      }
    }
  ],
  "total": 2,
  "links": {
    "self": "http:\/\/...\/discussions?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <discussion>
        <id>5692161</id>
        <uid>45552</uid>
        <title>Example topic</title>
        <body>Let's talk about APIs</body>
        <weight>20</weight>
        <graded>0</graded>
        <published>1</published>
        <available>1</available>
        <completed>0</completed>
        <count_in_grade>1</count_in_grade>
        <collected_only>0</collected_only>
        <auto_publish_grades>1</auto_publish_grades>
        <comments_closed>0</comments_closed>
        <completion_status />
        <links>
            <self>http://.../discussions/5692161</self>
        </links>
    </discussion>
    <discussion>
        <id>5692163</id>
        <uid>45552</uid>
        <title>Example topic 2</title>
        <body>Let's talk about APIs</body>
        <weight>30</weight>
        <graded>0</graded>
        <published>1</published>
        <available>1</available>
        <completed>0</completed>
        <count_in_grade>1</count_in_grade>
        <collected_only>0</collected_only>
        <auto_publish_grades>1</auto_publish_grades>
        <comments_closed>0</comments_closed>
        <completion_status />
        <links>
            <self>http://.../discussions/5692163</self>
        </links>
    </discussion>
    <total>2</total>
    <links>
        <self>http://.../discussions?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## GET `{realm}/discussions/{id}`

View a specified discussion thread. Optional query parameters: `with_attachments`, `with_tags`.

::: code-group

```json [JSON]
{
  "id": 5692161,
  "uid": 45552,
  "title": "Example topic",
  "body": "Let's talk about APIs",
  "weight": 20,
  "graded": 0,
  "published": 1,
  "available": 1,
  "completed": 0,
  "count_in_grade": 1,
  "collected_only": 0,
  "auto_publish_grades": 1,
  "comments_closed": 0,
  "completion_status": ""
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5692161</id>
	<uid>45552</uid>
	<title>Example topic</title>
	<body>Let's talk about APIs</body>
	<weight>20</weight>
	<graded>0</graded>
	<published>1</published>
	<available>1</available>
	<completed>0</completed>
	<count_in_grade>1</count_in_grade>
	<collected_only>0</collected_only>
	<auto_publish_grades>1</auto_publish_grades>
	<comments_closed>0</comments_closed>
	<completion_status />
</result>
```

:::

## POST `{realm}/discussions`

Create a discussion thread.

**Content** An object containing discussion thread fields

::: code-group

```json [JSON]
{
  "title": "Example topic",
  "body": "Let's talk about APIs",
  "graded": "0"
}
```

```xml [XML]
<body>
  <title>Example topic</title>
  <body>Let's talk about APIs</body>
  <graded>0</graded>
</body>
```

:::

**Return** An object containing discussion thread fields

::: code-group

```json [JSON]
{
  "id": 5692161,
  "uid": 45552,
  "title": "Example topic",
  "body": "Let's talk about APIs",
  "weight": 20,
  "graded": 0,
  "published": 1,
  "available": 0,
  "completed": 0,
  "count_in_grade": 1,
  "collected_only": 0,
  "auto_publish_grades": 1,
  "comments_closed": 0,
  "links": {
    "self": "http:\/\/...\/discussions\/5692161"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <id>5692161</id>
    <uid>45552</uid>
    <title>Example topic</title>
    <body>Let's talk about APIs</body>
    <weight>20</weight>
    <graded>0</graded>
    <published>1</published>
    <available>0</available>
    <completed>0</completed>
    <count_in_grade>1</count_in_grade>
    <collected_only>0</collected_only>
    <auto_publish_grades>1</auto_publish_grades>
    <comments_closed>0</comments_closed>
    <links>
        <self>http://.../discussions/5692161</self>
    </links>
</result>
```

:::

## PUT `{realm}/discussions/{id}`

Modify a discussion thread.

**Content** An object containing discussion thread fields

::: code-group

```json [JSON]
{
  "body": "Let's talk about APIs and REST clients"
}
```

```xml [XML]
<body>
  <body>Let's talk about APIs and REST clients</body>
</body>
```

:::

## DELETE `{realm}/discussions/{id}`

Delete a discussion thread (cannot be undone).
