# Roles

Every user is associated with a collection of permissions called roles. Every user is associated with a role; each role contains a list of permissions that allow users to do certain actions on the system.

## Fields

| Field         | Name      | Description                                                                                                                     | Type            |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `id`          | ID        | The Schoology ID of the role.                                                                                                   | `string`        |
| `title`\*     | Role Name | The title of the role.                                                                                                          | `string`        |
| `faculty`\*   | Faculty   | Whether or not the role is a faculty role. Valid values: `0` (no), `1` (yes).                                                   | `integer {0,1}` |
| `role_type`\* | Role Type | The level type of the role. Valid values: `1` for organization roles and `2` for building roles (a.k.a. school override roles). | `integer {1,2}` |
| `links`       | Links     | Link relations for the role object (for example, `self`).                                                                       | `object`        |

\* = Required

## GET `roles`

View a list of roles in your school. If your school has the school override role feature enabled and contains school level overrides (i.e. `role_type = 1`), they will be returned in their own array called `building_role`.

::: code-group

```json [JSON]
{
  "role": [
    {
      "id": "1215",
      "title": "Parent",
      "faculty": 0,
      "role_type": 1,
      "links": {
        "self": "http:\/\/..."
      }
    },
    {
      "id": "1212",
      "title": "School Admin",
      "faculty": 1,
      "role_type": 1,
      "links": {
        "self": "http:\/\/..."
      }
    },
    {
      "id": "1214",
      "title": "Student",
      "faculty": 0,
      "role_type": 1,
      "links": {
        "self": "http:\/\/..."
      }
    },
    {
      "id": "1213",
      "title": "Teacher",
      "faculty": 1,
      "role_type": 1,
      "links": {
        "self": "http:\/\/..."
      }
    }
  ],
  "building_role": [
    {
      "id": "1216",
      "title": "Override Role",
      "faculty": 0,
      "role_type": 2,
      "links": {
        "self": "http:\/\/..."
      }
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <role>
        <id>1215</id>
        <title>Parent</title>
        <faculty>0</faculty>
        <role_type>1</role_type>
        <links>
            <self>http:\/\/...</self>
        </links>
    </role>
    <role>
        <id>1212</id>
        <title>School Admin</title>
        <faculty>1</faculty>
        <role_type>1</role_type>
        <links>
            <self>http:\/\/...</self>
        </links>
    </role>
    <role>
        <id>1214</id>
        <title>Student</title>
        <faculty>0</faculty>
        <role_type>1</role_type>
        <links>
            <self>http:\/\/...</self>
        </links>
    </role>
    <role>
        <id>1213</id>
        <title>Teacher</title>
        <faculty>1</faculty>
        <role_type>1</role_type>
        <links>
            <self>http:\/\/...</self>
        </links>
    </role>
    <role>
        <id>1216</id>
        <title>Override Role</title>
        <faculty>0</faculty>
        <role_type>2</role_type>
        <links>
            <self>http:\/\/...</self>
        </links>
    </role>
</result>
```

:::

## GET `roles/{id}`

View a specified role

**Return** A [role](#fields)

::: code-group

```json [JSON]
{
  "id": "1213",
  "title": "Teacher",
  "faculty": 1,
  "role_type": 1
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>1213</id>
	<title>Teacher</title>
	<faculty>1</faculty>
	<role_type>1</role_type>
</result>
```

:::
