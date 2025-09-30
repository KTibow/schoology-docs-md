# User

Each account corresponds to a user object. Users objects are the accounts on the system.

## Fields

| Field                  | Name                         | Description                                                                                                                                                                                        | Type                               |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `uid`                  | User ID                      | The internal Schoology ID of the user                                                                                                                                                              | `string`                           |
| `school_id`            | Schoology School ID          | The internal Schoology ID of the school to which the user belongs                                                                                                                                  | `string`                           |
| `building_id`          | Schoology School Building ID | The internal Schoology ID of the school building to which the user belongs                                                                                                                         | `string`                           |
| `school_uid`\*         | Unique ID                    | The user's unique ID (e.g. student ID, SIS ID)                                                                                                                                                     | `string`                           |
| `name_title`           | Name Title                   | The user's title, must be one of the following: Mr., Mrs., Ms., Miss, Dr., Professor                                                                                                               | `string`                           |
| `name_title_show`      | Show Name Title              | Whether to show the user's title when displaying his/her full name                                                                                                                                 | `{0,1}`                            |
| `name_first`\*         | First Name                   | The user's first name                                                                                                                                                                              | `string`                           |
| `name_first_preferred` | Preferred First Name         | The name by which the user goes                                                                                                                                                                    | `string`                           |
| `name_middle`          | Middle Name                  | The user's middle name                                                                                                                                                                             | `string`                           |
| `name_middle_show`     | Show Middle Name             | Whether to show the user's middle name when displaying his/her full name                                                                                                                           | `{0,1}`                            |
| `name_last`\*          | Last Name                    | The user's last name                                                                                                                                                                               | `string`                           |
| `name_display`         | Display Name                 | A fully-constructed name based on the user's account settings. Cannot be set - only available on GET.                                                                                              | `string`                           |
| `username`\*           | Username                     | The user's username (either a username or email address is required for each user)                                                                                                                 | `string`                           |
| `primary_email`\*      | Primary Email Address        | The user's primary email address (either a username or email address is required for each user)                                                                                                    | `string`                           |
| `position`             | Job Position                 | The user's position in the school/company.                                                                                                                                                         | `string`                           |
| `gender`               | Gender                       | The user's gender                                                                                                                                                                                  | `{M,F}`                            |
| `grad_year`            | Graduation Year              | The user's graduation year (YYYY)                                                                                                                                                                  | `4 digit integer`                  |
| `birthday_date`        | Birthday                     | The user's birthday (YYYY-MM-DD)                                                                                                                                                                   | `string`                           |
| `password`             | Password                     | The user's password (existing passwords will not be changed if left blank)                                                                                                                         | `string`                           |
| `role_id`\*            | Role ID                      | The ID of the role to which you would like to assign the user                                                                                                                                      | `integer`                          |
| `email_login_info`     | Email Login Information      | Whether to send login information by email (if an email address is set); used only during user creation                                                                                            | `{0,1}`                            |
| `profile_url`          | Profile picture URL          | The full URL of the user's profile picture                                                                                                                                                         | `string`                           |
| `tz_name`              | Timezone Name                | An IANA-defined timezone name (see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)                                                                                                   | `string`                           |
| `parents`              | User Parents                 | The user accounts of the user's parents; requires "View user parents" permission to be enabled for the current API user.                                                                           | `user objects`                     |
| `parent_uids`          | User Parent User Ids         | When creating/updating user accounts, a comma delimited list of the user's parents' user ids. API users must have permission to create users in order to create/update these associations.         | `comma-delimited list of integers` |
| `advisor_uids`         | User Advisor User Ids        | When creating/updating user accounts, a comma delimited list of the user's advisors' user ids. API users must have permission to create users in order to create/update these associations.        | `comma-delimited list of integers` |
| `child_uids`           | User Child User Ids          | A comma-delimited list of user ids identifying the user's children.                                                                                                                                | `comma-delimited list of integers` |
| `send_message`         | Send Message status          | Whether or not the signed-in user can send a private message to the listed user                                                                                                                    | `integer`                          |
| `synced`               | Sync Status                  | Whether or not this user was synced with an external system (eg, Student Information System). The default value is 0. For synced users, the **Unique ID** field is not editable through Schoology. | `{0,1}`                            |
| `profile_picture_fid`  | Profile Picture File ID      | ID pointing to temporary save of the profile picture upload (**write-only**). For more details on uploading files: [File Uploading](<../2-API Documentation/4-Files>)                              | `integer`                          |
| `additional_buildings` | Additional Buildings         | The internal building IDs to which the user belongs to as a non-main building                                                                                                                      | `Comma-delimited list of integers` |
| `subjects_taught`      | Subjects Taught              | The subjects taught by a teacher.                                                                                                                                                                  | `string`                           |
| `grades_taught`        | Grades Taught                | The grades taught by a teacher                                                                                                                                                                     | `string`                           |
| `position`             | Position                     | A user generated description of their position                                                                                                                                                     | `string`                           |
| `department`           | Department                   | A user generated description of their department.                                                                                                                                                  | `string`                           |
| `bio`                  | Biography                    | A user generated short bio on themselves.                                                                                                                                                          | `string`                           |
| `phone`                | Phone                        | The phone number of the user                                                                                                                                                                       | `string`                           |
| `website`              | Website                      | User Website                                                                                                                                                                                       | `string`                           |
| `address`              | Address                      | User Address                                                                                                                                                                                       | `string`                           |
| `interests`            | Interests                    | User Interests                                                                                                                                                                                     | `string`                           |
| `activities`           | Activities                   | User Activities                                                                                                                                                                                    | `string`                           |

\* = Required

## GET users

View a list of users in your school (paged). If your school has multiple buildings and you are not an administrator for all buildings, only users in your same building will be returned. Administrators for all buildings (i.e. administrators that are not associated with a specific building) will have users in all buildings returned and can optionally filter results with the following query strings:

- `building_id`: Only return users for the given building.
- `role_ids`: (Comma-separated list of IDs) Only return users who belong to the given role IDs
- `parent_access_codes`: Add in parent access codes for each of the returned users (set to 1)
- `school_uids`: A comma-separated list of school_uids within the school (up to 50 at one time)

**Return** A collection of [users](#fields)

::: code-group

```json [JSON]
{
  "user": [
    {
      "uid": "48289",
      "id": 48289,
      "school_id": 344232,
      "synced": 0,
      "school_uid": "s1",
      "building_id": 344232,
      "additional_buildings": "123,789",
      "name_title": "",
      "name_title_show": 0,
      "name_first": "James",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": 0,
      "name_last": "Howlett",
      "name_display": "James Howlett",
      "username": "jlogan",
      "primary_email": "",
      "picture_url": " ... URL .. ",
      "gender": null,
      "position": null,
      "grad_year": "",
      "password": "",
      "role_id": 1214,
      "tz_offset": -4,
      "tz_name": "America\/New_York",
      "parents": null,
      "child_uids": null
    },
    {
      "uid": "45552",
      "id": 45552,
      "school_id": 344232,
      "synced": 0,
      "school_uid": "",
      "building_id": 344232,
      "additional_buildings": "456,789",
      "name_title": "",
      "name_title_show": 0,
      "name_first": "Mr.",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": 0,
      "name_last": "Strickland",
      "name_display": "Mr. Strickland",
      "username": "mrstrickland",
      "primary_email": "asd@zz",
      "picture_url": " ... URL .. ",
      "gender": null,
      "position": null,
      "grad_year": "",
      "password": "",
      "role_id": 1212,
      "tz_offset": -4,
      "tz_name": "America\/New_York",
      "parents": null,
      "child_uids": null
    },
    {
      "uid": "1670713",
      "id": 1670713,
      "school_id": 344232,
      "synced": 0,
      "school_uid": "",
      "building_id": 5171921,
      "additional_buildings": "123",
      "name_title": "",
      "name_title_show": 0,
      "name_first": "fs1",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": 0,
      "name_last": "student",
      "name_display": "fs1 student",
      "username": "",
      "primary_email": "fs1@student.com",
      "picture_url": " ... URL .. ",
      "gender": null,
      "position": null,
      "grad_year": "",
      "password": "",
      "role_id": 1214,
      "tz_offset": 0,
      "tz_name": "Africa\/Abidjan",
      "parents": null,
      "child_uids": null
    }
  ],
  "total": "3",
  "links": {
    "self": " ... URL ... "
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <user>
        <uid>48289</uid>
        <id>48289</id>
        <school_id>344232</school_id>
        <synced>0</synced>
        <school_uid>s1</school_uid>
        <building_id>344232</building_id>
        <additional_buildings>123,789</additional_buildings>
        <name_title />
        <name_title_show>0</name_title_show>
        <name_first>James</name_first>
        <name_first_preferred />
        <name_middle />
        <name_middle_show>0</name_middle_show>
        <name_last>Howlett</name_last>
        <name_display>James Howlett</name_display>
        <username>jlogan</username>
        <primary_email />
        <picture_url> ... URL .. </picture_url>
        <gender />
        <position />
        <grad_year />
        <password />
        <role_id>1214</role_id>
        <tz_offset>-4</tz_offset>
        <tz_name>America/New_York</tz_name>
        <parents />
        <child_uids />
    </user>
    <user>
        <uid>45552</uid>
        <id>45552</id>
        <school_id>344232</school_id>
        <synced>0</synced>
        <school_uid />
        <building_id>344232</building_id>
        <additional_buildings>456,789</additional_buildings>
        <name_title />
        <name_title_show>0</name_title_show>
        <name_first>Mr.</name_first>
        <name_first_preferred />
        <name_middle />
        <name_middle_show>0</name_middle_show>
        <name_last>Strickland</name_last>
        <name_display>Mr. Strickland</name_display>
        <username>mrstrickland</username>
        <primary_email>asd@zz</primary_email>
        <picture_url> ... URL .. </picture_url>
        <gender />
        <position />
        <grad_year />
        <password />
        <role_id>1212</role_id>
        <tz_offset>-4</tz_offset>
        <tz_name>America/New_York</tz_name>
        <parents />
        <child_uids />
    </user>
    <user>
        <uid>1670713</uid>
        <id>1670713</id>
        <school_id>344232</school_id>
        <synced>0</synced>
        <school_uid />
        <building_id>5171921</building_id>
        <additional_buildings>123</additional_buildings>
        <name_title />
        <name_title_show>0</name_title_show>
        <name_first>fs1</name_first>
        <name_first_preferred />
        <name_middle />
        <name_middle_show>0</name_middle_show>
        <name_last>student</name_last>
        <name_display>fs1 student</name_display>
        <username />
        <primary_email>fs1@student.com</primary_email>
        <picture_url> ... URL .. </picture_url>
        <gender />
        <position />
        <grad_year />
        <password />
        <role_id>1214</role_id>
        <tz_offset>0</tz_offset>
        <tz_name>Africa/Abidjan</tz_name>
        <parents />
        <child_uids />
    </user>
    <total>3</total>
    <links>
        <self>... URL ...</self>
    </links>
</result>
```

:::

## GET users/inactive

View a list of inactive users in your school

**Return** A collection of [users](#fields)

::: code-group

```json [JSON]
{
  "total": 2,
  "links": {
    "self": "http:\/\/...\/v1\/users\/inactive?start=0&limit=20"
  },
  "user": [
    {
      "uid": 48490,
      "name": "Sebastian Shaw",
      "school_uid": "zxsc234",
      "synced": 0,
      "inactive_timestamp": 1359504792,
      "modified_by_uid": 45552
    },
    {
      "uid": 248106,
      "name": "John Student",
      "school_uid": "john1",
      "synced": 1,
      "inactive_timestamp": 1377293806,
      "modified_by_uid": 45552
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <total>2</total>
    <links>
        <self>http://.../v1/users/inactive?start=0&amp;limit=20</self>
    </links>
    <user>
        <uid>48490</uid>
        <name>Sebastian Shaw</name>
        <school_uid>zxsc234</school_uid>
        <synced>0</synced>
        <inactive_timestamp>1359504792</inactive_timestamp>
        <modified_by_uid>45552</modified_by_uid>
    </user>
    <user>
        <uid>248106</uid>
        <name>John Student</name>
        <school_uid>john1</school_uid>
        <synced>1</synced>
        <inactive_timestamp>1377293806</inactive_timestamp>
        <modified_by_uid>45552</modified_by_uid>
    </user>
</result>
```

:::

## GET `users/{id}`

View a specified user

**Return** A [user](#fields)

::: code-group

```json [JSON]
{
  "uid": "45552",
  "id": 45552,
  "school_id": 344232,
  "synced": 0,
  "school_uid": "",
  "building_id": 344232,
  "additional_buildings": "123,456",
  "name_title": "",
  "name_title_show": 0,
  "name_first": "Mr.",
  "name_first_preferred": "",
  "name_middle": "",
  "name_middle_show": 0,
  "name_last": "Strickland",
  "name_display": "Mr. Strickland",
  "username": "mrstrickland",
  "primary_email": "asd@zz",
  "picture_url": "http:\/\/...\/images\/avatar1.png",
  "gender": null,
  "position": null,
  "grad_year": "",
  "password": "",
  "role_id": 1212,
  "tz_offset": -4,
  "tz_name": "America\/New_York",
  "parents": null,
  "child_uids": null,
  "send_message": 1
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <uid>45552</uid>
  <id>45552</id>
  <school_id>344232</school_id>
  <synced>0</synced>
  <school_uid />
  <building_id>344232</building_id>
  <additional_buildings>123,456</additional_buildings>
  <name_title />
  <name_title_show>0</name_title_show>
  <name_first>Mr.</name_first>
  <name_first_preferred />
  <name_middle />
  <name_middle_show>0</name_middle_show>
  <name_last>Strickland</name_last>
  <name_display>Mr. Strickland</name_display>
  <username>mrstrickland</username>
  <primary_email>asd@zz</primary_email>
  <picture_url>http://...images/avatar1.png</picture_url>
  <gender />
  <position />
  <grad_year />
  <password />
  <role_id>1212</role_id>
  <tz_offset>-4</tz_offset>
  <tz_name>America/New_York</tz_name>
  <parents />
  <child_uids />
  <send_message>1</send_message>
</result>
```

:::

## GET `users/inactive/{id}`

View a specified inactive user

**Return** An inactive [user](#fields)

::: code-group

```json [JSON]
{
  "uid": 48490,
  "name": "Sebastian Shaw",
  "school_uid": "zxsc234",
  "synced": 0,
  "inactive_timestamp": 1359504792,
  "modified_by_uid": 45552
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<uid>48490</uid>
	<name>Sebastian Shaw</name>
	<school_uid>zxsc234</school_uid>
	<synced>0</synced>
	<inactive_timestamp>1359504792</inactive_timestamp>
	<modified_by_uid>45552</modified_by_uid>
</result>
```

:::

## GET csvexport/users

We have exposed a GET endpoint to allow bulk exporting of data through our API in csv format. Only school-wide admins have access to this bulk export feature.

You can specify field headers you want to include in the csv through a comma separated list in the `fields` query parameter. If no fields are specified, you will receive all fields. Allowed fields: uid, school_uid, building_nid, name_title, name_first, name_first_preferred, name_middle, name_last, role_name, name, mail, position, grad_year, birthday, gender, bio, subjects_taught, grades_taught, phone, address, website, interests, activities

## POST users

Create a user in your school

**Content** A [user](#fields)

::: code-group

```json [JSON]
{
  "school_uid": "test123",
  "name_first": "John",
  "name_last": "Smith",
  "primary_email": "test123@myclass.com",
  "role_id": "2451",
  "additional_buildings": "456"
}
```

```xml [XML]
<body>
  <school_uid>test123</school_uid>
  <name_first>John</name_first>
  <name_last>Smith</name_last>
  <primary_email>test123@myclass.com</primary_email>
  <role_id>2451</role_id>
  <additional_buildings>2451</additional_buildings>
</body>
```

:::

**Return** A [user](#fields)

::: code-group

```json [JSON]
{
  "uid": "1710709",
  "id": 1710709,
  "school_id": 344232,
  "synced": 0,
  "school_uid": "test123",
  "building_id": 344232,
  "additional_buildings": "456",
  "name_title": "",
  "name_title_show": 0,
  "name_first": "John",
  "name_first_preferred": "",
  "name_middle": "",
  "name_middle_show": 0,
  "name_last": "Smith",
  "name_display": "John Smith",
  "username": "",
  "primary_email": "test123@myclass.com",
  "picture_url": " ... URL .. ",
  "gender": null,
  "position": null,
  "grad_year": "",
  "password": "",
  "role_id": 1214,
  "tz_offset": -4,
  "tz_name": "America\/New_York",
  "parents": null,
  "child_uids": null,
  "send_message": 1,
  "links": {
    "self": " ... URL ... "
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <uid>1710711</uid>
    <id>1710711</id>
    <school_id>344232</school_id>
    <synced>0</synced>
    <school_uid>test123</school_uid>
    <building_id>344232</building_id>
    <additional_buildings>456</additional_buildings>
    <name_title />
    <name_title_show>0</name_title_show>
    <name_first>John</name_first>
    <name_first_preferred />
    <name_middle />
    <name_middle_show>0</name_middle_show>
    <name_last>Smith</name_last>
    <name_display>John Smith</name_display>
    <username />
    <primary_email>test123@myclass.com</primary_email>
    <picture_url> ... URL .. </picture_url>
    <gender />
    <position />
    <grad_year />
    <password />
    <role_id>1214</role_id>
    <tz_offset>-4</tz_offset>
    <tz_name>America/New_York</tz_name>
    <parents />
    <child_uids />
    <send_message>1</send_message>
    <links>
        <self> ... URL ... </self>
    </links>
</result>
```

:::

## POST users (bulk)

Create multiple users at a time. The following parameters can be added to this endpoint:

- update_existing: Set this to 1 (e.g. ?update_existing=1) in order update existing users, matched by the `school_uid` field. Without this parameter, user creation will fail if a pre-existing user has the same `school_uid` as a passed user object.
- ignore_email_conflicts: If set to 1 and one of the users to be created has the same email address as another account in a different school, the user will be created without an email address. If a username was not specified, one will be generated based on the school_uid parameter. If this flag is not specified or if the conflict is with another account in the same school, an error will be thrown.
- email_conflict_resolution:
  - set to 1 (e.g. ?email_conflict_resolution=1) to create an account in your school with a username if an email account already exists within Schoology. (Eg - If john@schoology.com already exists, the new account will be created with only a username "john"). If a new username is present, the new account will be created using that username.
  - set to 2 (e.g. ?email_conflict_resolution=2) to merge duplicate Schoology accounts with [email]@[verified_domain] into the new account that you're creating. However, if an email acount differs from your claimed domain, an account will be created using only a username.

**Content** Multiple users can be created at a time (up to 50) by wrapping [user fields in objects](#fields) in `user` in `users`.

::: code-group

```json [JSON]
{
  "users": {
    "user": [
      {
        "school_uid": "test123",
        "name_first": "John",
        "name_last": "Smith",
        "primary_email": "test123@myclass.com",
        "role_id": "2451",
        "additional_buildings": "123,789"
      },
      {
        "school_uid": "test456",
        "name_first": "Peter",
        "name_last": "Sound",
        "primary_email": "test456@myclass.com",
        "role_id": "2451",
        "additional_buildings": "456,789"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <users>
    <user>
        <school_uid>test123</school_uid>
        <name_first>John</name_first>
        <name_last>Smith</name_last>
        <primary_email>test123@myclass.com</primary_email>
        <role_id>2451</role_id>
        <additional_buildings>123,789</additional_buildings>
    </user>
    <user>
        <school_uid>test456</school_uid>
        <name_first>Perter</name_first>
        <name_last>Sonund</name_last>
        <primary_email>test456@myclass.com</primary_email>
        <role_id>2451</role_id>
        <additional_buildings>456,789</additional_buildings>
    </user>
  </users>
</body>
```

:::

**Return** The API endpoint (location) of each user created, or an error message if there was a problem creating the user.

::: code-group

```json [JSON]
{
  "user": [
    {
      "response_code": 200,
      "location": "http:\/\/api.schoology.com\/v1\/users\/1710713",
      "school_uid": "sj12",
      "id": "1710713"
    },
    {
      "response_code": 200,
      "location": "http:\/\/api.schoology.com\/v1\/users\/1710715",
      "school_uid": "jb12",
      "id": "1710715"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <user>
        <response_code>200</response_code>
        <location>http://api.schoology.com/v1/users/1710717</location>
        <school_uid>sj12</school_uid>
        <id>1710717</id>
    </user>
    <user>
        <response_code>200</response_code>
        <location>http://api.schoology.com/v1/users/1710719</location>
        <school_uid>jb12</school_uid>
        <id>1710719</id>
    </user>
</result>
```

:::

## PUT `users/{id}`

Modify a user

**Content** A [user](#fields)

## PUT users (bulk)

Modify multiple users

**Content** Up to 50 users can be updated at a time by wrapping [user fields in objects](#fields) in `user` in `users`.

::: code-group

```json [JSON]
{
  "users": {
    "user": [
      {
        "id": "23546",
        "school_uid": "test123",
        "name_first": "John",
        "name_last": "Smith",
        "primary_email": "test123@myclass.com",
        "role_id": "2451",
        "additional_buildings": "123,789"
      },
      {
        "id": "65843",
        "school_uid": "test456",
        "name_first": "Peter",
        "name_last": "Sound",
        "primary_email": "test456@myclass.com",
        "role_id": "2451",
        "additional_buildings": "123,789"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <users>
    <user>
        <id>23546</id>
        <school_id>4654654</school_id>
        <school_uid>test123</school_uid>
        <name_first>John</name_first>
        <name_last>Smith</name_last>
        <primary_email>test123@myclass.com</primary_email>
        <role_id>2451</role_id>
        <additional_buildings>123,789</additional_buildings>
    </user>
    <user>
        <id>65843</id>
        <school_id>457645156</school_id>
        <school_uid>test456</school_uid>
        <name_first>Perter</name_first>
        <name_last>Sonund</name_last>
        <primary_email>test456@myclass.com</primary_email>
        <role_id>2451</role_id>
        <additional_buildings>123,789</additional_buildings>
    </user>
  </users>
</body>
```

:::

**Return** The schoology ID of each user updated, or an error message if there was a problem creating the user.

::: code-group

```json [JSON]
{
  "user": [
    {
      "response_code": 200,
      "location": "http:\/\/...\/v1\/users\/248101",
      "id": "248101",
      "school_uid": "sj12x"
    },
    {
      "response_code": 200,
      "location": "http:\/\/...\/v1\/users\/48489",
      "id": "48489",
      "school_uid": "jb12x"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<user>
		<response_code>200</response_code>
		<location>http://.../v1/users/248101</location>
		<id>248101</id>
		<school_uid>sj12x</school_uid>
	</user>
	<user>
		<response_code>200</response_code>
		<location>http://.../v1/users/48489</location>
		<id>48489</id>
		<school_uid>jb12x</school_uid>
	</user>
</result>
```

:::

## PUT users/reactivate (bulk)

Re-activate inactive users.

- Set `option_reenroll` to 1 in the request body to place the user back into their courses and groups.

**Content** A [user](#fields).

::: code-group

```json [JSON]
{
  "user": [
    {
      "uid": "6546816",
      "option_reenroll": "1"
    },
    {
      "uid": "546468",
      "option_reenroll": "0"
    }
  ]
}
```

```xml [XML]
<body>
  <user>
      <uid>6546816</uid>
      <option_reenroll>1</option_reenroll>
  </user>
  <user>
      <uid>546468</uid>
      <option_reenroll>0</option_reenroll>
  </user>
</body>
```

:::

**Return** A link to the user profiles of the reactivated users

::: code-group

```json [JSON]
{
  "user": [
    {
      "response_code": 200,
      "location": "http:\/\/...\/v1\/users\/248101",
      "message": "You have successfully re-actived this user."
    },
    {
      "response_code": 200,
      "location": "http:\/\/...\/v1\/users\/48289",
      "message": "You have successfully re-actived this user."
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<user>
		<response_code>200</response_code>
		<location>http://.../v1/users/248101</location>
		<message>You have successfully re-actived this user.</message>
	</user>
	<user>
		<response_code>200</response_code>
		<location>http://.../v1/users/48289</location>
		<message>You have successfully re-actived this user.</message>
	</user>
</result>
```

:::

## DELETE `users/{id}`

Delete a user (cannot be undone). The following parameters can be added to this endpoint:

- `option_comment`: Reason for marking inactive
- `option_keep_enrollments`: Set this to 1 (e.g. ?option_keep_enrollments=1) to keep a history of the user's grade and attendance data. Note: if this parameter is not set, this endpoint will delete all history of the user's grades and attendance records. This process cannot be reversed
- `email_notification`: Whether or not the deleted user should be notified via email that their account has been made inactive. If set to 1, email will be sent. If set to 0, email will not be sent. If this parameter is not used, emails will be sent by default.

## DELETE users (bulk)

Delete up to 50 users. The following parameters can be added to this endpoint:

- `uids`: Comma-separated list of Schoology IDs
- `option_comment`: Reason for marking inactive
- `option_keep_enrollments`: Set this to 1 (e.g. ?option_keep_enrollments=1) to keep a history of the user's grade and attendance data. Note: if this parameter is not set, this endpoint will delete all history of the user's grades and attendance records. This process cannot be reversed
- `email_notification`: Whether or not the deleted user should be notified via email that their account has been made inactive. If set to 1, email will be sent. If set to 0, email will not be sent. If this parameter is not used, emails will be sent by default.

## Associations

Create parent-child or advisor-advisee associations.

### Association Fields

| Field                                        | Name      | Description                                            | Type     |
| -------------------------------------------- | --------- | ------------------------------------------------------ | -------- |
| `student_school_uid`\*                       | Unique ID | The student's unique ID                                | `string` |
| `parent_school_uid`_ / `advisor_school_uid`_ | Unique ID | The parent's / advisor's unique ID                     | `string` |
| `delete`                                     | Delete    | Whether or not to delete this association if it exists | `{0,1}`  |

\* = Required

### POST users/import/associations/advisors

**Content** An [association](#association-fields) object in `association` in `associations`.

::: code-group

```json [JSON]
{
  "associations": {
    "association": [
      {
        "student_school_uid": "23546",
        "advisor_school_uid": "ABCDE"
      },
      {
        "student_school_uid": "78910",
        "advisor_school_uid": "FGHI",
        "delete": "1"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <associations>
    <association>
        <student_school_uid>23546</student_school_uid>
        <advisor_school_uid>ABCDE</advisor_school_uid>
    </association>
    <association>
        <student_school_uid>78910</student_school_uid>
        <advisor_school_uid>FGHI</advisor_school_uid>
		<delete>1</delete>
    </association>
  </associations>
</body>
```

:::

**Return** The students school_uid and uid and the advisors school_uid and uid OR any relevant error messages.

::: code-group

```json [JSON]
{
  "association": [
    {
      "response_code": 200,
      "student_school_uid": "s1",
      "student_uid": "48289",
      "advisor_school_uid": "s3",
      "advisor_uid": "48489"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<association>
		<response_code>200</response_code>
		<student_school_uid>s1</student_school_uid>
		<student_uid>48289</student_uid>
		<advisor_school_uid>s3</advisor_school_uid>
		<advisor_uid>48489</advisor_uid>
	</association>
</result>
```

:::

### POST users/import/associations/parents

**Content** An [association](#association-fields) object in `association` in `associations`.

::: code-group

```json [JSON]
{
  "associations": {
    "association": [
      {
        "student_school_uid": "23546",
        "parent_school_uid": "ABCDE"
      },
      {
        "student_school_uid": "78910",
        "parent_school_uid": "FGHI",
        "delete": "1"
      }
    ]
  }
}
```

```xml [XML]
<body>
  <associations>
    <association>
        <student_school_uid>23546</student_school_uid>
        <parent_school_uid>ABCDE</parent_school_uid>
    </association>
    <association>
        <student_school_uid>78910</student_school_uid>
        <parent_school_uid>FGHI</parent_school_uid>
  <delete>1</delete>
    </association>
  </associations>
</body>
```

:::

**Return** The students school_uid and uid and the parents school_uid and uid OR any relevant error messages.

::: code-group

```json [JSON]
{
  "association": [
    {
      "response_code": 200,
      "student_school_uid": "s1",
      "student_uid": "48289",
      "parent_school_uid": "s2",
      "parent_uid": "248101"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
 <association>
  <response_code>200</response_code>
  <student_school_uid>s1</student_school_uid>
  <student_uid>48289</student_uid>
  <parent_school_uid>s2</parent_school_uid>
  <parent_uid>248101</parent_uid>
 </association>
</result>
```

:::

## GET users/me

A shortcut for [GET `users/{current user id}`](#get-users-id).

## GET users/languages

**Return** A list of all currently available interfaces languages. Use the language code property from returned language objects when creating/updating user languages

::: code-group

```json [JSON]
{
  "language": [
    {
      "language_code": "en",
      "language_name": "English"
    },
    {
      "language_code": "en-GB",
      "language_name": "English (UK)"
    },
    {
      "language_code": "ar",
      "language_name": "Arabic"
    },
    {
      "language_code": "zh-hans",
      "language_name": "Chinese, Simplified"
    },
    {
      "language_code": "fr-corp",
      "language_name": "French - Corporate"
    },
    {
      "language_code": "de",
      "language_name": "German"
    },
    {
      "language_code": "ms",
      "language_name": "Malay"
    },
    {
      "language_code": "es",
      "language_name": "Spanish"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<language>
		<language_code>en</language_code>
		<language_name>English</language_name>
	</language>
	<language>
		<language_code>en-GB</language_code>
		<language_name>English (UK)</language_name>
	</language>
	<language>
		<language_code>ar</language_code>
		<language_name>Arabic</language_name>
	</language>
	<language>
		<language_code>zh-hans</language_code>
		<language_name>Chinese, Simplified</language_name>
	</language>
	<language>
		<language_code>fr-corp</language_code>
		<language_name>French - Corporate</language_name>
	</language>
	<language>
		<language_code>de</language_code>
		<language_name>German</language_name>
	</language>
	<language>
		<language_code>ms</language_code>
		<language_name>Malay</language_name>
	</language>
	<language>
		<language_code>es</language_code>
		<language_name>Spanish</language_name>
	</language>
</result>
```

:::

## GET app-user-info

**Return** If the user has an active Schoology web session, return the user id for the passed OAuth tokens and the Schoology web session timestamp. Use this information to validate the given access tokens for the logged in user and to check if the user has an active Schoology web session

::: code-group

```json [JSON]
{
  "web_session_timestamp": 1376425771,
  "api_uid": 45552
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<web_session_timestamp>1376425771</web_session_timestamp>
	<api_uid>45552</api_uid>
</result>
```

:::

## Objects in Users

<RealmObjects realm="Users" />
