# Enrollment

Enrollments are associations between users and groups or course sections. They link a user (student, teacher, or other) to a realm (group or section) and include role and status information used throughout the API.

> [!IMPORTANT]
> Enrollments exist in groups and sections.

## Fields

| Field      | Name          | Description                                                                                                                                                                   | Type     |
| ---------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`       | Enrollment ID | The Schoology assigned ID of the enrollment record.                                                                                                                           | `string` |
| `uid`\*    | User ID       | The Schoology ID of the user.                                                                                                                                                 | `string` |
| `admin`\*  | Admin         | Whether this user is an administrator (e.g. teacher) as opposed to a regular member (e.g. student). Values: `0` (member), `1` (admin).                                        | `{0,1}`  |
| `status`\* | Status        | The current status of the enrollment. Values: `1` = Active, `2` = Expired, `3` = Invite pending, `4` = Request pending, `5` = Archived (course-specific pre-unenroll status). | `{1-5}`  |

\* = Required

## GET `{realm}/enrollments`

View a list of enrollments (paged). Optional query parameters: `uid`, `enrollment_status`, `type`, `picture_size`. For each parameter you can specify a comma-delimited list of values (for example `uid=123,456`). Retrieving this endpoint without parameters returns a paged list of all enrollments in the given realm.

**Return** A list of enrollment objects (see [Fields](#fields)).

::: code-group

```json [JSON]
{
  "enrollment": [
    {
      "id": "43807916",
      "uid": "45552",
      "school_uid": "",
      "name_title": "",
      "name_title_show": "0",
      "name_first": "Mr.",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": "0",
      "name_last": "Strickland",
      "name_display": "Mr. Strickland",
      "admin": 1,
      "status": "1",
      "picture_url": "http:\/\/..\/images\/avatar1.png",
      "links": {
        "self": "http:\/\/...enrollments\/43807916"
      }
    },
    {
      "id": "44783136",
      "uid": "48289",
      "school_uid": "s1",
      "name_title": "",
      "name_title_show": "0",
      "name_first": "James",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": "0",
      "name_last": "Howlett",
      "name_display": "James Howlett",
      "admin": 0,
      "status": "1",
      "picture_url": "http:\/\/...\/default_user.gif",
      "links": {
        "self": "http:\/\/...\/enrollments\/44783136"
      }
    }
  ],
  "total": "2",
  "links": {
    "self": "http:\/\/...enrollment_status=1&start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <enrollment>
    <id>43807916</id>
    <uid>45552</uid>
    <school_uid />
    <name_title />
    <name_title_show>0</name_title_show>
    <name_first>Mr.</name_first>
    <name_first_preferred />
    <name_middle />
    <name_middle_show>0</name_middle_show>
    <name_last>Strickland</name_last>
    <name_display>Mr. Strickland</name_display>
    <admin>1</admin>
    <status>1</status>
    <picture_url>http://...//images/avatar1.png</picture_url>
    <links>
      <self>http://.../enrollments/43807916</self>
    </links>
  </enrollment>
  <enrollment>
    <id>44783136</id>
    <uid>48289</uid>
    <school_uid>s1</school_uid>
    <name_title />
    <name_title_show>0</name_title_show>
    <name_first>James</name_first>
    <name_first_preferred />
    <name_middle />
    <name_middle_show>0</name_middle_show>
    <name_last>Howlett</name_last>
    <name_display>James Howlett</name_display>
    <admin>0</admin>
    <status>1</status>
    <picture_url>http://.../default_user.gif</picture_url>
    <links>
      <self>http://.../v1/sections/3719526/enrollments/44783136</self>
    </links>
  </enrollment>
  <total>2</total>
  <links>
    <self>http://...enrollment_status=1&amp;start=0&amp;limit=20</self>
  </links>
</result>
```

:::

## GET `{realm}/enrollments/{id}`

View a specified enrollment.

**Return** An enrollment object (see [Fields](#fields)).

::: code-group

```json [JSON]
{
  "id": "44783136",
  "uid": "48289",
  "school_uid": "s1",
  "name_title": "",
  "name_title_show": "0",
  "name_first": "James",
  "name_first_preferred": "",
  "name_middle": "",
  "name_middle_show": "0",
  "name_last": "Howlett",
  "name_display": "James Howlett",
  "admin": 0,
  "status": "1",
  "picture_url": "http:\/\/..\/default_user.gif"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>44783136</id>
  <uid>48289</uid>
  <school_uid>s1</school_uid>
  <name_title />
  <name_title_show>0</name_title_show>
  <name_first>James</name_first>
  <name_first_preferred />
  <name_middle />
  <name_middle_show>0</name_middle_show>
  <name_last>Howlett</name_last>
  <name_display>James Howlett</name_display>
  <admin>0</admin>
  <status>1</status>
  <picture_url>http://.../default_user.gif</picture_url>
</result>
```

:::

## POST `{realm}/enrollments`

Create an enrollment.

**Content** An enrollment object (see [Fields](#fields)).

::: code-group

```json [JSON]
{
  "uid": "2461632",
  "admin": "0",
  "status": "1"
}
```

```xml [XML]
<body>
  <uid>2461632</uid>
  <admin>0</admin>
  <status>1</status>
</body>
```

:::

**Return** The created enrollment object.

::: code-group

```json [JSON]
{
  "id": "44783136",
  "uid": "48289",
  "school_uid": "s1",
  "name_title": "",
  "name_title_show": "0",
  "name_first": "James",
  "name_first_preferred": "",
  "name_middle": "",
  "name_middle_show": "0",
  "name_last": "Howlett",
  "name_display": "James Howlett",
  "admin": 0,
  "status": 1,
  "picture_url": "http:\/\/..\/default_user.gif",
  "links": {
    "self": "http:\/\/...\/enrollments\/44783136"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>44783136</id>
  <uid>48289</uid>
  <school_uid>s1</school_uid>
  <name_title />
  <name_title_show>0</name_title_show>
  <name_first>James</name_first>
  <name_first_preferred />
  <name_middle />
  <name_middle_show>0</name_middle_show>
  <name_last>Howlett</name_last>
  <name_display>James Howlett</name_display>
  <admin>0</admin>
  <status>1</status>
  <picture_url>http://.../default_user.gif</picture_url>
  <links>
    <self>http://.../44783136</self>
  </links>
</result>
```

:::

## POST `{realm}/accesscode`

Create an enrollment using an access code.

**Content** An object with `access_code`.

::: code-group

```json [JSON]
{
  "access_code": "VCVKF-4MJG9"
}
```

```xml [XML]
<body>
  <access_code>VCVKF-4MJG9</access_code>
</body>
```

:::

**Return** The created enrollment object.

::: code-group

```json [JSON]
{
  "id": "54179017",
  "uid": "45552",
  "school_uid": "",
  "name_title": "",
  "name_title_show": "0",
  "name_first": "Mr.",
  "name_first_preferred": "",
  "name_middle": "",
  "name_middle_show": "0",
  "name_last": "Strickland",
  "name_display": "Mr. Strickland",
  "admin": 0,
  "status": "1",
  "picture_url": "http:\/\/...\/default_user.gif"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>54179017</id>
  <uid>45552</uid>
  <school_uid />
  <name_title />
  <name_title_show>0</name_title_show>
  <name_first>Mr.</name_first>
  <name_first_preferred />
  <name_middle />
  <name_middle_show>0</name_middle_show>
  <name_last>Strickland</name_last>
  <name_display>Mr. Strickland</name_display>
  <admin>0</admin>
  <status>1</status>
  <picture_url>http://.../default_user.gif</picture_url>
</result>
```

:::

## POST `{realm}/enrollments (bulk)`

Create multiple enrollments at a time in one realm (up to 50). Wrap multiple enrollments in `enrollments` with each enrollment in `enrollment`.

**Content** Multiple enrollment objects (see [Fields](#fields)) wrapped in `enrollments`.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "uid": "2461632",
        "admin": "0",
        "status": "1"
      },
      {
        "uid": "23453322",
        "admin": "0",
        "status": "1"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <enrollments>
    <enrollment>
      <uid>2461632</uid>
      <admin>0</admin>
      <status>1</status>
    </enrollment>
    <enrollment>
      <uid>23453322</uid>
      <admin>0</admin>
      <status>1</status>
    </enrollment>
  </enrollments>
</body>
```

:::

**Return** The API endpoint (location) and status for each enrollment created.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "response_code": 200,
        "id": "54302505",
        "uid": 248101,
        "location": "http:\/\/...\/54302505"
      },
      {
        "response_code": 200,
        "id": "54302521",
        "uid": 48489,
        "location": "http:\/\/...\/54302521"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <enrollments>
    <enrollment>
      <response_code>200</response_code>
      <id>54302505</id>
      <uid>248101</uid>
      <location>http://.../54302505</location>
    </enrollment>
    <enrollment>
      <response_code>200</response_code>
      <id>54302521</id>
      <uid>48489</uid>
      <location>http://.../54302521</location>
    </enrollment>
  </enrollments>
</result>
```

:::

## POST `enrollments` (bulk, multi‑realm)

Create multiple enrollments across multiple realms (up to 50). Include `realm` (`section` or `group`) and `section_id` or `group_id` as appropriate in each enrollment object. This endpoint supports the `update_existing` flag.

**Content** Multiple enrollment objects with `realm` and realm-specific id fields (see [Fields](#fields)).

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "realm": "section",
        "section_id": 12345,
        "status": 1,
        "admin": 1,
        "uid": 87942
      },
      {
        "realm": "section",
        "section_id": 98762,
        "status": 1,
        "admin": 0,
        "uid": 87942
      },
      {
        "realm": "group",
        "group_id": 65371,
        "status": 1,
        "admin": 1,
        "uid": 12873
      }
    ]
  }
}
```

```xml [XML]
<body>
  <enrollments>
    <enrollment>
      <realm>section</realm>
      <section_id>12345</section_id>
      <status>1</status>
      <admin>1</admin>
      <uid>87942</uid>
    </enrollment>
    <enrollment>
      <realm>section</realm>
      <section_id>98762</section_id>
      <status>1</status>
      <admin>0</admin>
      <uid>87942</uid>
    </enrollment>
    <enrollment>
      <realm>group</realm>
      <group_id>65371</group_id>
      <status>1</status>
      <admin>1</admin>
      <uid>12873</uid>
    </enrollment>
  </enrollments>
</body>
```

:::

**Return** The API endpoint (location), id, and realm info for each enrollment created.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "response_code": 200,
        "location": "http:\/\/...\/54302505",
        "uid": 248101,
        "id": "54302505",
        "realm": "section",
        "realm_id": "3719526"
      },
      {
        "response_code": 200,
        "location": "http:\/\/...\/44783161",
        "uid": 48489,
        "id": "44783161",
        "realm": "section",
        "realm_id": "4318461"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <enrollments>
    <enrollment>
      <response_code>200</response_code>
      <location>http://.../54302505</location>
      <uid>248101</uid>
      <id>54302505</id>
      <realm>section</realm>
      <realm_id>3719526</realm_id>
    </enrollment>
    <enrollment>
      <response_code>200</response_code>
      <location>http://.../44783161</location>
      <uid>48489</uid>
      <id>44783161</id>
      <realm>section</realm>
      <realm_id>4318461</realm_id>
    </enrollment>
  </enrollments>
</result>
```

:::

## POST `enrollments/import/course/{grading period id}`

Create and update many course enrollments at a time by `grading_period_id`, `course_code`, `section_code`, and `school_uid`. This endpoint does not require Schoology IDs for course/section/user; it requires a Schoology grading period ID (or comma-separated IDs). Importing with multiple grading period ids will apply across sections spanning those grading periods. This endpoint is for courses only (not groups).

**Content** Multiple enrollments (up to 50) including `course_code`, `section_code`, and `school_uid`. You may pass `admin` to mark teacher or `delete` to remove an enrollment.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "course_code": "E200",
        "section_code": "34",
        "school_uid": "test1234",
        "admin": "1"
      },
      {
        "course_code": "E200",
        "section_code": "34",
        "school_uid": "test456",
        "admin": "0"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <enrollments>
    <enrollment>
      <course_code>E200</course_code>
      <section_code>34</section_code>
      <school_uid>test1234</school_uid>
      <admin>1</admin>
    </enrollment>
    <enrollment>
      <course_code>E200</course_code>
      <section_code>34</section_code>
      <school_uid>test456</school_uid>
      <admin>1</admin>
    </enrollment>
  </enrollments>
</body>
```

:::

**Return** The API endpoint (location) and identifying codes for each enrollment processed.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "response_code": 200,
        "location": "http:\/\/...\/54302505",
        "school_uid": "s2",
        "course_code": "CC106",
        "section_code": "SC101"
      },
      {
        "response_code": 200,
        "location": "http:\/\/...\/54302521",
        "school_uid": "s3",
        "course_code": "CC106",
        "section_code": "SC101"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <enrollments>
    <enrollment>
      <response_code>200</response_code>
      <location>http://.../enrollments/54302505</location>
      <school_uid>s2</school_uid>
      <course_code>CC106</course_code>
      <section_code>SC101</section_code>
    </enrollment>
    <enrollment>
      <response_code>200</response_code>
      <location>http://.../enrollments/54302521</location>
      <school_uid>s3</school_uid>
      <course_code>CC106</course_code>
      <section_code>SC101</section_code>
    </enrollment>
  </enrollments>
</result>
```

:::

## POST `enrollments/import/course`

Create and update multiple course enrollments using `section_school_code` and `school_uid`. This alternative does not require `grading_period_id`; instead, unique `section_school_code` values determine the target sections.

**Content** Multiple enrollments (up to 50) including `section_school_code` and `school_uid`. You may pass `admin` or `delete`.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "section_school_code": "23",
        "school_uid": "test1234",
        "admin": "1"
      },
      {
        "section_school_code": "344",
        "school_uid": "test456",
        "delete": "1"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <enrollments>
    <enrollment>
      <section_school_code>23</section_school_code>
      <school_uid>test1234</school_uid>
      <admin>1</admin>
    </enrollment>
    <enrollment>
      <section_school_code>344</section_school_code>
      <school_uid>test456</school_uid>
      <delete>1</delete>
    </enrollment>
  </enrollments>
</body>
```

:::

**Return** The API endpoint (location) and identifying codes for each enrollment processed.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "response_code": 200,
        "location": "http:\/\/...\/54302505",
        "school_uid": "s2",
        "section_school_code": "SC111",
        "course_code": "CC106",
        "section_code": ""
      },
      {
        "response_code": 200,
        "location": "http:\/\/...\/54302521",
        "school_uid": "s3",
        "section_school_code": "SC111",
        "course_code": "CC106",
        "section_code": ""
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <enrollments>
    <enrollment>
      <response_code>200</response_code>
      <location>http://...//54302505</location>
      <school_uid>s2</school_uid>
      <section_school_code>SC111</section_school_code>
      <course_code>CC106</course_code>
      <section_code />
    </enrollment>
    <enrollment>
      <response_code>200</response_code>
      <location>http://.../54302521</location>
      <school_uid>s3</school_uid>
      <section_school_code>SC111</section_school_code>
      <course_code>CC106</course_code>
      <section_code />
    </enrollment>
  </enrollments>
</result>
```

:::

## PUT `{realm}/enrollments/{id}`

Modify an enrollment.

**Content** An enrollment object (see [Fields](#fields)) containing the fields to update.

::: code-group

```json [JSON]
{
  "uid": "2461632",
  "status": "2"
}
```

```xml [XML]
<body>
  <uid>2461632</uid>
  <status>2</status>
</body>
```

:::

## PUT `{realm}/enrollments` (bulk)

Modify multiple enrollments (up to 50) by wrapping them in `enrollments` with each enrollment in `enrollment`.

**Content** Multiple enrollment objects (see [Fields](#fields)).

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "id": "2461632",
        "status": "2"
      },
      {
        "id": "23453322",
        "status": "2"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <enrollments>
    <enrollment>
      <uid>2461632</uid>
      <status>2</status>
    </enrollment>
    <enrollment>
      <uid>23453322</uid>
      <status>2</status>
    </enrollment>
  </enrollments>
</body>
```

:::

**Return** The Schoology ID of each enrollment updated, or an error message if there was a problem.

::: code-group

```json [JSON]
{
  "enrollments": {
    "enrollment": [
      {
        "response_code": 200,
        "id": "44783151"
      },
      {
        "response_code": 200,
        "id": "44783156"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <enrollments>
        <enrollment>
            <response_code>200</response_code>
            <id>44783151</id>
        </enrollment>
        <enrollment>
            <response_code>200</response_code>
            <id>44783156</id>
        </enrollment>
    </enrollments>
</result>
```

:::

## DELETE `{realm}/enrollments/{id}`

Delete an enrollment (cannot be undone).

## DELETE `enrollments?enrollment_ids={comma separated enrollment ids}` (bulk)

Delete up to 50 enrollments. Pass comma-separated Schoology IDs in the `enrollment_ids` query parameter.
