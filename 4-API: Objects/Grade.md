# Grade/Grades

Grades are associated with an enrollment and an assignment. Grades are point values assigned to users for a specific assignment through enrollments.

> [!IMPORTANT]
> Grades exist in users and sections.

## Fields

| Field            | Name           | Description                                                                                                                                                                                                           | Type                  |
| ---------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `enrollment_id`  | Enrollment ID  | The ID of the enrollment for which you are assigning a grade / to which the grade belongs.                                                                                                                            | `integer`             |
| `assignment_id`  | Assignment ID  | The ID of the assignment for which you are assigning a grade / to which the grade belongs.                                                                                                                            | `integer` or `string` |
| `section_id`     | Section ID     | The ID of the course section to which the enrollment belongs.                                                                                                                                                         | `integer`             |
| `grade`          | Grade          | The grade you are assigning the enrollment/assignment combination. Assignments with an assigned grading scale can accept letter-grades as defined by the scale — these will be converted to numeric values upon save. | `integer` or `string` |
| `exception`      | Exception      | An exception represents an exception to the grade item associated with this grade. If `exception > 0` then `grade` will be set to `NULL`. Current exceptions: `1` = excused, `2` = incomplete.                        | `integer`             |
| `comment`        | Comment        | A comment to associate with this grade.                                                                                                                                                                               | `string`              |
| `comment_status` | Comment status | Whether or not the grade comment is visible to the student. Only administrators will see this value. Values: `{1,0}`.                                                                                                 | `integer`             |
| `timestamp`      | Timestamp      | The Unix timestamp the last time the grade was updated in any way, according to server time.                                                                                                                          | `integer` or `string` |
| `is_final`       | Is Final       | Whether the grade object belongs to a midterm/final. Values: `0` or `1`.                                                                                                                                              | `integer`             |
| `type`           | Type           | The type of grade item this grade refers to. Values: `assignment`, `discussion`.                                                                                                                                      | `string`              |
| `location`       | API location   | Points to an API endpoint where the specific content this grade refers to can be found.                                                                                                                               | `string`              |
| `max_points`     | Max Points     | The maximum points possible for the assignment.                                                                                                                                                                       | `integer`             |
| `scale_id`       | Scale ID       | The ID of the grading scale used.                                                                                                                                                                                     | `integer`             |
| `scale_type`     | Scale Type     | The type of grading scale.                                                                                                                                                                                            | `integer`             |
| `category_id`    | Category ID    | The ID of the grading category.                                                                                                                                                                                       | `integer`             |

## GET `sections/{section id}/grades`

View a list of grades (paged). Optional query parameters: `assignment_id`, `enrollment_id`, `timestamp`. Retrieving this list without specifying the above parameters will return a paged list of all grades for all assignments and students in the course section.

Query parameters:

- `assignment_id` (optional)
- `enrollment_id` (optional)
- `timestamp` (optional)

**Return** A list of [grade objects](#fields)

::: code-group

```json [JSON]
{
  "grades": {
    "grade": [
      {
        "enrollment_id": 44783151,
        "assignment_id": 5699937,
        "grade": 80,
        "exception": 0,
        "max_points": 100,
        "is_final": 0,
        "timestamp": 1389651403,
        "comment": "",
        "comment_status": null,
        "override": null,
        "calculated_grade": null,
        "pending": null,
        "type": "assignment",
        "location": "http:\/\/...\/5699937",
        "scale_id": 1,
        "scale_type": 0,
        "category_id": 4341
      }
    ]
  },
  "period": [
    {
      "period_id": "p13011",
      "period_title": "Never Ending Period",
      "weight": "100.00"
    }
  ],
  "final_grade": [
    {
      "enrollment_id": "44783151",
      "period": [
        {
          "period_id": "p13011",
          "grade": 80,
          "comment": "",
          "comment_status": null
        },
        {
          "period_id": "other",
          "grade": null,
          "comment": "",
          "comment_status": null
        },
        {
          "period_id": "final",
          "grade": 80,
          "comment": "",
          "comment_status": null
        }
      ],
      "scale_id": 0
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <grades>
    <grade>
      <enrollment_id>44783151</enrollment_id>
      <assignment_id>5699937</assignment_id>
      <grade>80</grade>
      <exception>0</exception>
      <max_points>100</max_points>
      <is_final>0</is_final>
      <timestamp>1389651403</timestamp>
      <comment />
      <comment_status />
      <override />
      <calculated_grade />
      <pending />
      <type>assignment</type>
      <location>http://.../5699937</location>
      <scale_id>1</scale_id>
      <scale_type>0</scale_type>
      <category_id>4341</category_id>
    </grade>
  </grades>
  <period>
    <period_id>p13011</period_id>
    <period_title>Never Ending Period</period_title>
    <weight>100.00</weight>
  </period>
  <final_grade>
    <enrollment_id>44783151</enrollment_id>
    <period>
      <period_id>p13011</period_id>
      <grade>80</grade>
      <comment />
      <comment_status />
    </period>
    <period>
      <period_id>other</period_id>
      <grade />
      <comment />
      <comment_status />
    </period>
    <period>
      <period_id>final</period_id>
      <grade>80</grade>
      <comment />
      <comment_status />
    </period>
    <scale_id>0</scale_id>
  </final_grade>
</result>
```

:::

## PUT `sections/{section id}/grades`

Set/modify grades.

**Content** Objects containing grade fields (`enrollment_id`, `assignment_id`, `grade`, optionally `comment`, `exception`, etc.)

::: code-group

```json [JSON]
{
  "grades": {
    "grade": [
      {
        "type": "assignment",
        "assignment_id": 5007606,
        "enrollment_id": "44783136",
        "grade": 99,
        "comment": "grade submmitted"
      },
      {
        "type": "assignment",
        "assignment_id": 5007606,
        "enrollment_id": "44783141",
        "grade": 76,
        "comment": "grade submmitted"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <grades>
    <grade>
      <type>assignment</type>
      <assignment_id>5007606</assignment_id>
      <enrollment_id>44783136</enrollment_id>
      <grade>99</grade>
      <comment>grade submmitted</comment>
    </grade>
    <grade>
      <type>assignment</type>
      <assignment_id>5007606</assignment_id>
      <enrollment_id>44783141</enrollment_id>
      <grade>76</grade>
      <comment>grade submmitted</comment>
    </grade>
  </grades>
</body>
```

:::

## PUT `sections/{section id}/grades` (final comments)

Set/modify comments for students for a grading period and the overall course.

**Content** Objects containing final comments fields. Parameters:

- `enrollment_id` (required)
- `period_id` (required) — which grading period to post the comment for; passing `"final"` posts the comment to the final grade for the course
- `comment` (required)
- `comment_status` (optional) — whether the comment is visible to the student (`1` or `0`, default `0`)

::: code-group

```json [JSON]
{
  "final_comments": {
    "final_comment": [
      {
        "enrollment_id": "24152019",
        "period_id": "26127",
        "comment": "Great improvement from first semester!",
        "comment_status": "1"
      },
      {
        "enrollment_id": "24152019",
        "period_id": "final",
        "comment": "Overall tremendous improvement",
        "comment_status": "1"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <final_comments>
    <final_comment>
      <enrollment_id>24152019</enrollment_id>
      <period_id>26127</period_id>
      <comment>Great improvement from first semester!</comment>
      <comment_status>1</comment_status>
    </final_comment>
    <final_comment>
      <enrollment_id>24152019t</enrollment_id>
      <period_id>final</period_id>
      <comment>Overall tremendous improvement</comment>
      <comment_status>1t</comment_status>
    </final_comment>
  </final_comments>
</body>
```

:::

## GET `users/{user id}/grades`

View a list of grades in the active enrollments for the given user. The following query strings can (optionally) be appended to the path to filter results:

Query parameters:

- `section_id` (optional) — Specifying a section id limits results to that section. Note: Some implementations may require this parameter and return a 403 Forbidden error if not provided.
- `grading_period_ids` (optional) — Specifying a comma-delimited list of grading period ids limits results to those grading periods. Use `other` for the "Other" grading period, and `final` for final grades.
- `timestamp` (optional) — Specifying a timestamp limits results to recorded grades that have been updated since the given timestamp, according to the server time.
- `include_all_enrollments` (optional) — If set to `1`, grades for all enrollments including inactive will be included in the response.

**Note:** The output when using `timestamp` or `include_all_enrollments` is paginated by enrollment and will include a `links` object with a `next` key to navigate to the next page of enrollment grades.

**Return** A list of [grades](#fields) grouped by section

::: code-group

```json [JSON]
{
  "section": [
    {
      "section_id": "4318461",
      "period": [
        {
          "period_id": "p13011",
          "period_title": "Never Ending Period",
          "assignment": [
            {
              "enrollment_id": 44783151,
              "assignment_id": 5699937,
              "grade": 80,
              "exception": 0,
              "max_points": 100,
              "is_final": 0,
              "timestamp": 1389651403,
              "comment": "",
              "comment_status": null,
              "override": null,
              "calculated_grade": null,
              "pending": null,
              "type": "assignment",
              "location": "http:\/\/...\/5699937",
              "scale_id": 1,
              "scale_type": 0,
              "category_id": 4341
            }
          ]
        }
      ],
      "final_grade": [
        {
          "period_id": "p13011",
          "grade": 80,
          "weight": 100,
          "comment": "",
          "scale_id": 0,
          "grading_category": [
            {
              "category_id": 3081,
              "grade": null
            },
            {
              "category_id": 4341,
              "grade": 80
            }
          ],
          "comment_status": null
        },
        {
          "period_id": "final",
          "grade": 80,
          "comment": "",
          "comment_status": null,
          "scale_id": 0
        }
      ],
      "grading_category": [
        {
          "id": 3081,
          "title": "e.g. Homework"
        },
        {
          "id": 4341,
          "title": "xtra points"
        }
      ]
    }
  ],
  "links": {
    "self": "http:\/\/...\/v1\/users\/48289\/grades"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <section>
    <section_id>4318461</section_id>
    <period>
      <period_id>p13011</period_id>
      <period_title>Never Ending Period</period_title>
      <assignment>
        <enrollment_id>44783151</enrollment_id>
        <assignment_id>5699937</assignment_id>
        <grade>80</grade>
        <exception>0</exception>
        <max_points>100</max_points>
        <is_final>0</is_final>
        <timestamp>1389651403</timestamp>
        <comment />
        <comment_status />
        <override />
        <calculated_grade />
        <pending />
        <type>assignment</type>
        <location>http://.../5699937</location>
        <scale_id>1</scale_id>
        <scale_type>0</scale_type>
        <category_id>4341</category_id>
      </assignment>
    </period>
    <final_grade>
      <period_id>p13011</period_id>
      <grade>80</grade>
      <weight>100</weight>
      <comment />
      <scale_id>0</scale_id>
      <grading_category>
        <category_id>3081</category_id>
        <grade />
      </grading_category>
      <grading_category>
        <category_id>4341</category_id>
        <grade>80</grade>
      </grading_category>
      <comment_status />
    </final_grade>
    <final_grade>
      <period_id>final</period_id>
      <grade>80</grade>
      <comment />
      <comment_status />
      <scale_id>0</scale_id>
    </final_grade>
    <grading_category>
      <id>3081</id>
      <title>e.g. Homework</title>
    </grading_category>
    <grading_category>
      <id>4341</id>
      <title>xtra points</title>
    </grading_category>
  </section>
  <links>
    <self>http://.../v1/users/48289/grades</self>
  </links>
</result>
```

:::
