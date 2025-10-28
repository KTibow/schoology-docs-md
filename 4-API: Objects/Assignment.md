# Assignment

Assignments are containers for coursework and tests/quizzes; every assignment has an entry in the gradebook.

> [!IMPORTANT]
> Assignments exist in sections.

## Fields

| Field                     | Name                                   | Description                                                                                                                                                                                                                                                                                                                                          | Type                         |
| ------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `title`*                  | Title                                  | The assignment title.                                                                                                                                                                                                                                                                                                                                | `string`                     |
| `description`             | Description                            | The assignment description.                                                                                                                                                                                                                                                                                                                          | `string`                     |
| `due`                     | Due Date                               | When the assignment is due (format `YYYY-MM-DD HH:MM:SS`).                                                                                                                                                                                                                                                                                           | `datetime`                   |
| `grading_scale`           | Grading Scale                          | The ID of the grading scale for this assignment. For no grading scale, use `0`. Course grading scales can be found on the course Grade Setup page.                                                                                                                                                                                                   | `integer`                    |
| `grading_period`          | Grading Period                         | The grading period ID to which this assignment belongs. For "Other", use `0`.                                                                                                                                                                                                                                                                        | `integer`                    |
| `grading_category`        | Grading Category                       | The grading category ID to which this assignment belongs.                                                                                                                                                                                                                                                                                            | `integer`                    |
| `max_points`              | Maximum Points                         | The maximum number of points for this assignment (excl. extra credit). Default: `100`.                                                                                                                                                                                                                                                               | `float`                      |
| `factor`                  | Factor                                 | The relative weight of this assignment. Default: `1.0`.                                                                                                                                                                                                                                                                                              | `float`                      |
| `is_final`                | Is a Final                             | Mark this assignment as a midterm or final.                                                                                                                                                                                                                                                                                                          | `0` or `1`                   |
| `show_comments`           | Show Comments                          | Show grade comments to students.                                                                                                                                                                                                                                                                                                                     | `0` or `1`                   |
| `grade_stats`             | Assignment Grade Statistics Visibility | `0`: Hide statistics. `1`: Show statistics without bell curve.                                                                                                                                                                                                                                                                                       | `0` or `1`                   |
| `allow_dropbox`           | Enable Dropbox                         | Allow students to post assignment submissions to a dropbox. Default: `1`.                                                                                                                                                                                                                                                                            | `0` or `1`                   |
| `allow_discussion`        | Enable Assignment Discussion           | Enable the assignment profile discussion board. Default: `1`.                                                                                                                                                                                                                                                                                        | `0` or `1`                   |
| `published`               | Assignment is published                | Whether or not the assignment is published. Default: `1`.                                                                                                                                                                                                                                                                                            | `0` or `1`                   |
| `type`                    | The type of Grade Item                 | Read-only: Distinguishes different types of grade items (`assignment`, `discussion`, `assessment`). Not supported in POST/PUT.                                                                                                                                                                                                                       | `string`                     |
| `grade_item_id`           | ID of the node that can be graded      | If this is of type `assignment`, this ID points to the assignment object `id`. If `discussion`, this points to the discussion object ID.                                                                                                                                                                                                             | `integer`                    |
| `dropbox_submissions`     | Number of dropbox submissions          | Teachers only; returned if `?with_dropbox_stats=TRUE`. Snapshot of submissions in this assignment's dropbox.                                                                                                                                                                                                                                         | `integer`                    |
| `dropbox_last_submission` | Time of the last dropbox submission    | Teachers only; returned if `?with_dropbox_stats=TRUE`. A timestamp for the last dropbox revision.                                                                                                                                                                                                                                                    | `integer`                    |
| `show_rubric`             | Display rubric to students             | True when assignment uses a rubric and teacher enabled student view.                                                                                                                                                                                                                                                                                 | `bool`                       |
| `assignees`               | Individually Assigned enrollments      | Shows which enrollees are assigned this assignment. Can be used in POST/PUT. If an empty array is sent, all assignees will be removed.                                                                                                                                                                                                               | `array` of enrollment ids    |
| `grading_group_ids`       | Grading Group Ids                      | Shows grading groups assigned to this assignment. Can be used in POST/PUT. If an empty array is sent, all grading groups will be removed.                                                                                                                                                                                                            | `array` of grading group ids |
| `count_in_grade`          | Count in Grade                         | Allows materials to show progress without affecting calculated grade (e.g., practice). Can be used in POST/PUT but will only be included in responses when its value and `collected_only` are not the default. Supported materials: Assignment, Assessment, Common Assessment, External Tool, Discussion, Scorm Package, Grade Column. Default: `1`. | `0` or `1`                   |
| `collected_only`          | Collected Only                         | Allows marking materials as completed/not; useful for forms or in-class participation. Can be used in POST/PUT but will only be included when its value and `count_in_grade` are not the default. Supported materials: Assignment, Assessment, Common Assessment, External Tool, Discussion, Grade Column. Default: `0`.                             | `0` or `1`                   |
| `auto_publish_grades`     | Automatically Publish Grades           | Assignment grades will be visible to students/guardians as soon as entered. Default: `1`.                                                                                                                                                                                                                                                            | `0` or `1`                   |
| `available`               | Available                              | Read-only availability flag.                                                                                                                                                                                                                                                                                                                         | `integer`                    |
| `completed`               | Completed                              | Read-only completed flag.                                                                                                                                                                                                                                                                                                                            | `integer`                    |
| `dropbox_locked`          | Dropbox locked                         | Read-only dropbox lock flag.                                                                                                                                                                                                                                                                                                                         | `integer`                    |
| `grading_scale_type`      | Grading scale type                     | Read-only grading scale type.                                                                                                                                                                                                                                                                                                                        | `integer`                    |
| `num_assignees`           | Number of assignees                    | Read-only count of assignees.                                                                                                                                                                                                                                                                                                                        | `integer`                    |
| `completion_status`       | Completion status                      | Read-only completion status.                                                                                                                                                                                                                                                                                                                         | `string`                     |
| `links`                   | Links                                  | Object with related links (e.g., `self`).                                                                                                                                                                                                                                                                                                            | `object`                     |

\* = Required

## GET `sections/{section id}/assignments`

View a list of assignments. Assignments are ordered by assignment type (non-final then final) and then by due date. Query strings:

- `with_attachments` — retrieve attachments of this piece of content.
- `with_tags` — retrieve tags of this piece of content.
- `limit` — Number of results (applied per assignment type as described above).

**Return** A list of [assignment objects](#fields)

::: code-group

```json [JSON]
{
  "assignment": [
    {
      "id": 5699937,
      "title": "this is a test assignment",
      "description": "extra credit assignment",
      "due": "2014-09-25 11:30:00",
      "grading_scale": "0",
      "grading_period": "13011",
      "grading_category": "0",
      "max_points": "100",
      "factor": "1",
      "is_final": "0",
      "show_comments": "0",
      "grade_stats": "0",
      "allow_dropbox": "1",
      "allow_discussion": "1",
      "published": 1,
      "type": "assignment",
      "grade_item_id": 5699937,
      "available": 1,
      "completed": 0,
      "dropbox_locked": 0,
      "grading_scale_type": 0,
      "show_rubric": false,
      "count_in_grade": 1,
      "collected_only": 0,
      "auto_publish_grades": 1,
      "num_assignees": 4,
      "assignees": [12345, 4567, 888, 999],
      "grading_group_ids": [534],
      "completion_status": "",
      "links": {
        "self": "http://.../assignments/5699937"
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http://.../assignments?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <assignment>
    <id>5699937</id>
    <title>this is a test assignment</title>
    <description>extra credit assignment</description>
    <due>2014-09-25 11:30:00</due>
    <grading_scale>0</grading_scale>
    <grading_period>13011</grading_period>
    <grading_category>0</grading_category>
    <max_points>100</max_points>
    <factor>1</factor>
    <is_final>0</is_final>
    <show_comments>0</show_comments>
    <grade_stats>0</grade_stats>
    <allow_dropbox>1</allow_dropbox>
    <allow_discussion>1</allow_discussion>
    <published>1</published>
    <type>assignment</type>
    <grade_item_id>5699937</grade_item_id>
    <available>1</available>
    <completed>0</completed>
    <dropbox_locked>0</dropbox_locked>
    <grading_scale_type>0</grading_scale_type>
    <show_rubric></show_rubric>
    <count_in_grade>1</count_in_grade>
    <collected_only>0</collected_only>
    <auto_publish_grades>1</auto_publish_grades>
    <num_assignees>4</num_assignees>
    <assignees>12345</assignees>
    <assignees>4567</assignees>
    <assignees>888</assignees>
    <assignees>999</assignees>
    <grading_group_ids>534</grading_group_ids>
    <completion_status />
    <links>
      <self>http://.../assignments/5699937</self>
    </links>
  </assignment>
  <total>1</total>
  <links>
    <self>http://.../assignments?start=0&limit=20</self>
  </links>
</result>
```

:::

## GET `sections/{section id}/grade_items`

List grade items (any content that can be graded, e.g., assignments and discussions). Query strings:

- `with_attachments` — retrieve attachments of this piece of content.
- `with_tags` — retrieve tags of this piece of content.

**Return** A list of [assignment objects](#fields)

::: code-group

```json [JSON]
{
  "assignment": [
    {
      "id": 5699937,
      "title": "this is a test assignment",
      "description": "extra credit assignment",
      "due": "2014-09-25 11:30:00",
      "grading_scale": "0",
      "grading_period": "13011",
      "grading_category": "0",
      "max_points": "100",
      "factor": "1",
      "is_final": "0",
      "show_comments": "0",
      "grade_stats": "0",
      "allow_dropbox": "1",
      "allow_discussion": "1",
      "published": 1,
      "type": "assignment",
      "grade_item_id": 5699937,
      "available": 1,
      "completed": 0,
      "dropbox_locked": 0,
      "grading_scale_type": 0,
      "show_rubric": false,
      "count_in_grade": 1,
      "collected_only": 0,
      "auto_publish_grades": 1,
      "num_assignees": 0,
      "assignees": [],
      "completion_status": "",
      "links": {
        "self": "http:\/\/...\/grade_items\/5699937"
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...\/grade-items?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <assignment>
        <id>5699937</id>
        <title>this is a test assignment</title>
        <description>extra credit assignment</description>
        <due>2014-09-25 11:30:00</due>
        <grading_scale>0</grading_scale>
        <grading_period>13011</grading_period>
        <grading_category>0</grading_category>
        <max_points>100</max_points>
        <factor>1</factor>
        <is_final>0</is_final>
        <show_comments>0</show_comments>
        <grade_stats>0</grade_stats>
        <allow_dropbox>1</allow_dropbox>
        <allow_discussion>1</allow_discussion>
        <published>1</published>
        <type>assignment</type>
        <grade_item_id>5699937</grade_item_id>
        <available>1</available>
        <completed>0</completed>
        <dropbox_locked>0</dropbox_locked>
        <grading_scale_type>0</grading_scale_type>
        <show_rubric></show_rubric>
        <count_in_grade>1</count_in_grade>
        <collected_only>0</collected_only>
        <auto_publish_grades>1</auto_publish_grades>
        <num_assignees>0</num_assignees>
        <assignees />
        <completion_status />
        <links>
            <self>http://.../grade_items/5699937</self>
        </links>
    </assignment>
    <total>1</total>
    <links>
        <self>http://.../grade-items?start=0&limit=20</self>
    </links>
</result>
```

:::

## GET `sections/{section id}/assignments/{id}`

View a specified assignment. Query strings:

- `with_attachments` — retrieve attachments of this piece of content.
- `with_tags` — retrieve tags of this piece of content.

**Return** An [assignment object](#fields)

::: code-group

```json [JSON]
{
  "id": 5699937,
  "title": "this is a test assignment",
  "description": "extra credit assignment",
  "due": "2014-09-25 11:30:00",
  "grading_scale": "0",
  "grading_period": "13011",
  "grading_category": "0",
  "max_points": "100",
  "factor": "1",
  "is_final": "0",
  "show_comments": "0",
  "grade_stats": "0",
  "allow_dropbox": "1",
  "allow_discussion": "1",
  "published": 1,
  "type": "assignment",
  "grade_item_id": 5699937,
  "available": 1,
  "completed": 0,
  "dropbox_locked": 0,
  "grading_scale_type": 0,
  "show_rubric": false,
  "count_in_grade": 1,
  "collected_only": 0,
  "auto_publish_grades": 1,
  "num_assignees": 0,
  "assignees": [],
  "completion_status": ""
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5699937</id>
  <title>this is a test assignment</title>
  <description>extra credit assignment</description>
  <due>2014-09-25 11:30:00</due>
  <grading_scale>0</grading_scale>
  <grading_period>13011</grading_period>
  <grading_category>0</grading_category>
  <max_points>100</max_points>
  <factor>1</factor>
  <is_final>0</is_final>
  <show_comments>0</show_comments>
  <grade_stats>0</grade_stats>
  <allow_dropbox>1</allow_dropbox>
  <allow_discussion>1</allow_discussion>
  <published>1</published>
  <type>assignment</type>
  <grade_item_id>5699937</grade_item_id>
  <available>1</available>
  <completed>0</completed>
  <dropbox_locked>0</dropbox_locked>
  <grading_scale_type>0</grading_scale_type>
  <show_rubric></show_rubric>
  <count_in_grade>1</count_in_grade>
  <collected_only>0</collected_only>
  <auto_publish_grades>1</auto_publish_grades>
  <num_assignees>0</num_assignees>
  <assignees />
  <completion_status />
</result>
```

:::

## POST `sections/{section id}/assignments`

Create an assignment.

**Content** An object containing assignment fields.

::: code-group

```json [JSON]
{
  "title": "The assignment title",
  "description": "The assignment description",
  "due": "2014-09-25 11:30:00",
  "type": "assignment",
  "assignees": [12345, 4567],
  "grading_group_ids": [534],
  "count_in_grade": 0,
  "auto_publish_grades": 0
}
```

```xml [XML]
<body>
  <title>The assignment title</title>
  <description>The assignment description</description>
  <due>2014-09-25 11:30:00</due>
  <type>assignment</type>
  <assignees>12345</assignees>
  <assignees>12345</assignees>
  <grading_group_ids>534</grading_group_ids>
  <count_in_grade>0</count_in_grade>
  <auto_publish_grades>0</auto_publish_grades>
</body>
```

:::

**Return** An [assignment object](#fields)

::: code-group

```json [JSON]
{
  "id": 5699937,
  "title": "this is a test assignment",
  "description": "extra credit assignment",
  "due": "2014-09-25 11:30:00",
  "grading_scale": "0",
  "grading_period": "13011",
  "grading_category": "0",
  "max_points": "100",
  "factor": "1",
  "is_final": "0",
  "show_comments": "0",
  "grade_stats": "0",
  "allow_dropbox": "1",
  "allow_discussion": "1",
  "published": 1,
  "type": "assignment",
  "grade_item_id": 5699937,
  "available": 1,
  "completed": 0,
  "dropbox_locked": 0,
  "grading_scale_type": 0,
  "show_rubric": false,
  "count_in_grade": 0,
  "collected_only": 0,
  "auto_publish_grades": 0,
  "num_assignees": 4,
  "assignees": [12345, 4567, 888, 999],
  "grading_group_ids": [534],
  "links": {
    "self": "http:\/\/...\/assignments\/5699937"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5699937</id>
  <title>this is a test assignment</title>
  <description>extra credit assignment</description>
  <due>2014-09-25 11:30:00</due>
  <grading_scale>0</grading_scale>
  <grading_period>13011</grading_period>
  <grading_category>0</grading_category>
  <max_points>100</max_points>
  <factor>1</factor>
  <is_final>0</is_final>
  <show_comments>0</show_comments>
  <grade_stats>0</grade_stats>
  <allow_dropbox>1</allow_dropbox>
  <allow_discussion>1</allow_discussion>
  <published>1</published>
  <type>assignment</type>
  <grade_item_id>5699937</grade_item_id>
  <available>1</available>
  <completed>0</completed>
  <dropbox_locked>0</dropbox_locked>
  <grading_scale_type>0</grading_scale_type>
  <show_rubric></show_rubric>
  <count_in_grade>0</count_in_grade>
  <collected_only>0</collected_only>
  <auto_publish_grades>0</auto_publish_grades>
  <num_assignees>4</num_assignees>
  <assignees>12345</assignees>
  <assignees>4567</assignees>
  <assignees>888</assignees>
  <assignees>999</assignees>
  <grading_group_ids>534</grading_group_ids>
  <links>
    <self>http://.../assignments/5699937</self>
  </links>
</result>
```

:::

## PUT `sections/{section id}/assignments/{id}`

Modify an assignment.

A few things about attachments when doing a PUT:

- If the `id` field is not sent in for an attachment, the attachment will get deleted.
- Only attachment titles can be updated during a PUT.

**Content** An object containing assignment fields.

::: code-group

```json [JSON]
{
  "title": "The assignment title with updated due date",
  "due": "2014-09-25 11:30:00",
  "attachments": [
    {
      "id": 9,
      "title": "mypicture.jpeg"
    },
    {
      "id": 11,
      "title": "title test"
    }
  ]
}
```

```xml [XML]
<body>
  <title>The assignment title with updated due date</title>
  <due>2014-09-28 09:30:00</due>
  <attachments>
    <id>9</id>
    <title>mypicture.jpeg</title>
  </attachments>
  <attachments>
    <id>11</id>
    <title>title test</title>
  </attachments>
</body>
```

:::

## DELETE `sections/{section id}/assignments/{id}`

Delete an assignment (cannot be undone).
