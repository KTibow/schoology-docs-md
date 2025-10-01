# Group

Groups are non-academic versions of course sections; they can hold members, events, documents, etc.

> [!IMPORTANT]
> Groups are also objects. They exist in users.

## Fields

| Field                         | Name                             | Description                                                                                                                                                                                                                                                                                                                                     | Type                                  |
| ----------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `id`                          | Schoology Group ID               | The internal Schoology ID of the group                                                                                                                                                                                                                                                                                                          | `string`                              |
| `building_id`                 | Schoology School Building ID     | The internal Schoology ID of the school building to which the group belongs                                                                                                                                                                                                                                                                     | `string`                              |
| `school_id`                   | Schoology School ID              | The internal Schoology ID of the school to which the group belongs                                                                                                                                                                                                                                                                              | `string`                              |
| `title`\*                     | Group Title                      | The title of the group                                                                                                                                                                                                                                                                                                                          | `string`                              |
| `description`                 | Description                      | The group description                                                                                                                                                                                                                                                                                                                           | `string`                              |
| `picture_url`                 | Picture                          | The URL of the group's profile picture                                                                                                                                                                                                                                                                                                          | `string`                              |
| `website`                     | Website                          | The group website                                                                                                                                                                                                                                                                                                                               | `string`                              |
| `access_code`                 | Access Code                      | The access code that users can use to join the group (only admins can see this value).                                                                                                                                                                                                                                                          | `string`                              |
| `privacy_level`               | Privacy level                    | The privacy of the group.<br>_ everyone: All schoology users can see the group.<br>_ school (default): Only members of the school can see the group<br>_ building: Only members of the building can see the group<br>_ group: Only group members can see the group<br>\* custom: Custom privacy settings (read only; not supported in POST/PUT) | `{everyone, school, building, group}` |
| `category`                    | Category                         | The category of the group (see below on how to retrieve a list of available categories)                                                                                                                                                                                                                                                         | `string`                              |
| `options/invite_type`         | Invite Type                      | How members can join the group.<br>_ 0 (default): Invite only<br>_ 1: Request to join<br>\* 2: Anyone can join                                                                                                                                                                                                                                  | `{0-2}`                               |
| `options/member_post`         | Post a group update              | Whether or not a group member can post a group update (default 1)                                                                                                                                                                                                                                                                               | `{0,1}`                               |
| `options/member_post_comment` | Post a comment on a group update | Whether or not a group member can post comments to group updates (default 1)                                                                                                                                                                                                                                                                    | `{0,1}`                               |
| `options/create_discussion`   | Create a discussion thread       | Whether or not a group member can create a discussion thread (default 0)                                                                                                                                                                                                                                                                        | `{0,1}`                               |
| `options/create_files`        | Create files                     | Whether or not members can create resources for the group (default 0)                                                                                                                                                                                                                                                                           | `{0,1}`                               |
| `group_code`                  | Group Code (external ID)         | If the group was imported from another system into Schoology, the unique ID of that group in the other system.                                                                                                                                                                                                                                  | `string`                              |

\* = Required

## GET groups

View a list of groups in your school (paged). You can use the following parameters to filter the resultset:

- `building_id`: return only groups for the given building_id.

**Return** A list of [groups](#fields).

::: code-group

```json [JSON]
{
  "group": [
    {
      "id": "5604383",
      "title": "Google News group",
      "description": "Google News group",
      "website": "",
      "access_code": "H2QSM-CJPXD",
      "category": "",
      "options": {
        "member_post": 1,
        "member_post_comment": 1,
        "create_discussion": 1,
        "create_files": 0,
        "invite_type": 0
      },
      "group_code": "",
      "picture_url": "http:\/\/...group-default.gif",
      "school_id": "344232",
      "building_id": "344232",
      "links": {
        "self": "http:\/\/...\/v1\/groups\/5604383"
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...\/v1\/groups?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <group>
    <id>5604383</id>
    <title>Google News group</title>
    <description>Google News group</description>
    <website />
    <access_code>H2QSM-CJPXD</access_code>
    <category />
    <options>
      <member_post>1</member_post>
      <member_post_comment>1</member_post_comment>
      <create_discussion>1</create_discussion>
      <create_files>0</create_files>
      <invite_type>0</invite_type>
    </options>
    <group_code />
    <picture_url>http://...group-default.gif</picture_url>
    <school_id>344232</school_id>
    <building_id>344232</building_id>
    <links>
      <self>http://.../v1/groups/5604383</self>
    </links>
  </group>
  <total>1</total>
  <links>
    <self>http://.../v1/groups?start=0&amp;limit=20</self>
  </links>
</result>
```

:::

## GET `users/{id}/groups`

?

## GET `groups/{id}`

View a specified group

**Return** A [group](#fields).

::: code-group

```json [JSON]
{
  "id": "5604383",
  "title": "Google News group",
  "description": "Google News group",
  "website": "",
  "access_code": "H2QSM-CJPXD",
  "category": "",
  "options": {
    "member_post": 1,
    "member_post_comment": 1,
    "create_discussion": 1,
    "create_files": 0,
    "invite_type": 0
  },
  "group_code": "",
  "picture_url": "http:\/\/...\/images\/group-default.gif",
  "school_id": "344232",
  "building_id": "344232"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5604383</id>
  <title>Google News group</title>
  <description>Google News group</description>
  <website />
  <access_code>H2QSM-CJPXD</access_code>
  <category />
  <options>
    <member_post>1</member_post>
    <member_post_comment>1</member_post_comment>
    <create_discussion>1</create_discussion>
    <create_files>0</create_files>
    <invite_type>0</invite_type>
  </options>
  <group_code />
  <picture_url>http://...s/group-default.gif</picture_url>
  <school_id>344232</school_id>
  <building_id>344232</building_id>
</result>
```

:::

## GET groups/categories

**Return** A collection of categories

::: code-group

```json [JSON]
{
  "category": [
    {
      "id": "abroad",
      "title": "Abroad\/Overseas Groups"
    },
    {
      "id": "advising",
      "title": "Advising Groups"
    },
    {
      "id": "alumni",
      "title": "Alumni Groups"
    },
    {
      "id": "career",
      "title": "Career Groups"
    },
    {
      "id": "extracurricular",
      "title": "Extracurricular Groups"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<category>
		<id>abroad</id>
		<title>Abroad/Overseas Groups</title>
	</category>
	<category>
		<id>advising</id>
		<title>Advising Groups</title>
	</category>
	<category>
		<id>alumni</id>
		<title>Alumni Groups</title>
	</category>
	<category>
		<id>career</id>
		<title>Career Groups</title>
	</category>
	<category>
		<id>extracurricular</id>
		<title>Extracurricular Groups</title>
	</category>
</result>
```

:::

## GET csvexport/group_enrollments

We have exposed a GET endpoint to allow bulk exporting of data through our API in csv format. Only school-wide admins have access to this bulk export feature.

You can specify field headers you want to include in the csv through a comma separated list in the `fields` query parameter. If no fields are specified, you will receive all fields. Allowed fields: uid, school_uid, name_first, name_last, mail, title, group_code, type, status

## POST groups

Create a group

**Content** A [group](#fields)

::: code-group

```json [JSON]
{
  "title": "My new group",
  "description": "discuss new groups",
  "website": "http:\/\/www.newgroup.com",
  "picture_url": "http:\/\/www.newgroup.com\/profile-pic.gif"
}
```

```xml [XML]
<body>
  <title>My new group</title>
  <description>discuss new groups</description>
  <website>http://www.newgroup.com</website>
  <picture_url>http://www.newgroup.com/profile-pic.gif</picture_url>
</body>
```

:::

**Return** A [group](#fields).

::: code-group

```json [JSON]
{
  "id": "5604275",
  "title": "Google News",
  "description": "discuss latest news",
  "website": "",
  "access_code": "QM6JC-D7VKK",
  "category": null,
  "options": {
    "member_post": 1,
    "member_post_comment": 1,
    "create_discussion": 0,
    "create_files": 0,
    "invite_type": 0
  },
  "group_code": "",
  "picture_url": "http:\/\/...group-default.gif",
  "school_id": "344232",
  "building_id": "344232",
  "links": {
    "self": "http:\/\/...\/v1\/groups\/5604275"
  }
}
```

```xml [XML]


<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>5604275</id>
  <title>Google News</title>
  <description>discuss latest news</description>
  <website />
  <access_code>QM6JC-D7VKK</access_code>
  <category />
  <options>
    <member_post>1</member_post>
    <member_post_comment>1</member_post_comment>
    <create_discussion>0</create_discussion>
    <create_files>0</create_files>
    <invite_type>0</invite_type>
  </options>
  <group_code />
  <picture_url>http://...f</picture_url>
  <school_id>344232</school_id>
  <building_id>344232</building_id>
  <links>
    <self>http://.../v1/groups/5604275</self>
  </links>
</result>
```

:::

## PUT `groups/{id}`

Modify a group

**Content** A [group](#fields)

::: code-group

```json [JSON]
{
  "title": "My new group name updated",
  "picture_url": "http:\/\/www.newgroup.com\/new-pic.gif"
}
```

```xml [XML]
<body>
  <title>My new group name updated</title>
  <picture_url>http://www.newgroup.com/newpic.gif</picture_url>
</body>
```

:::

## DELETE `groups/{id}`

Delete a group (cannot be undone)

## Objects and realms

<RealmObjects realm="Groups" />
