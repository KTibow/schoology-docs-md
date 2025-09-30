# Like

Like an object or see a list of users who like a given object (updates or comments). Likes are not standalone objects — they only make sense in the context of the object they belong to. A user can view the likes and their like state inside the body of any piece of content that can be liked, and a user can like or unlike an update post or a comment using the POST endpoints below.

## Fields

| Field              | Name            | Description                                                                                                                        | Type      |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `like_action`\*    | Like action     | Indicates the like/unlike action to take when creating a like. Use `"true"` (or `true`) to like, `"false"` (or `false`) to unlike. | `string`  |
| `likes`            | Likes           | Total number of likes on the object.                                                                                               | `integer` |
| `user_like_action` | User like state | Whether the currently authenticated user has liked the object (`true`/`false`). XML responses may use `1`/`0`.                     | `boolean` |

\* = Required

## GET `like/{id}`

View a list of users who liked an update

**Return** A list of users

::: code-group

```json [JSON]
{
  "total": 0,
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  },
  "users": [
    {
      "uid": "45552",
      "id": 45552,
      "school_id": 344232,
      "synced": 0,
      "school_uid": "",
      "name_title": "",
      "name_title_show": 0,
      "name_first": "Mr.",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": 0,
      "name_last": "Strickland",
      "name_display": "Mr. Strickland",
      "username": "mrstrickland",
      "primary_email": "",
      "picture_url": "http:\/\/...?1385138746",
      "grad_year": "",
      "password": "",
      "role_id": 0,
      "tz_offset": -4,
      "tz_name": "America\/New_York",
      "parents": null,
      "child_uids": null
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<total>0</total>
	<links>
		<self>http:\/\/...?start=0&amp;limit=20</self>
	</links>
	<users>
		<uid>45552</uid>
		<id>45552</id>
		<school_id>344232</school_id>
		<synced>0</synced>
		<school_uid />
		<name_title />
		<name_title_show>0</name_title_show>
		<name_first>Mr.</name_first>
		<name_first_preferred />
		<name_middle />
		<name_middle_show>0</name_middle_show>
		<name_last>Strickland</name_last>
		<name_display>Mr. Strickland</name_display>
		<username>mrstrickland</username>
		<primary_email />
		<picture_url>http:\/\/...?1385138746</picture_url>
		<grad_year />
		<password />
		<role_id>0</role_id>
		<tz_offset>-4</tz_offset>
		<tz_name>America/New_York</tz_name>
		<parents />
		<child_uids />
	</users>
</result>
```

:::

## GET `like/{id}/comment/{comment id}`

View a list of users who liked a comment

**Return** A list of users

::: code-group

```json [JSON]
{
  "total": 0,
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  },
  "users": [
    {
      "uid": "45552",
      "id": 45552,
      "school_id": 344232,
      "synced": 0,
      "school_uid": "",
      "name_title": "",
      "name_title_show": 0,
      "name_first": "Mr.",
      "name_first_preferred": "",
      "name_middle": "",
      "name_middle_show": 0,
      "name_last": "Strickland",
      "name_display": "Mr. Strickland",
      "username": "mrstrickland",
      "primary_email": "",
      "picture_url": "http:\/\/...?1385138746",
      "grad_year": "",
      "password": "",
      "role_id": 0,
      "tz_offset": -4,
      "tz_name": "America\/New_York",
      "parents": null,
      "child_uids": null
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<total>0</total>
	<links>
		<self>http:\/\/...?start=0&amp;limit=20</self>
	</links>
	<users>
		<uid>45552</uid>
		<id>45552</id>
		<school_id>344232</school_id>
		<synced>0</synced>
		<school_uid />
		<name_title />
		<name_title_show>0</name_title_show>
		<name_first>Mr.</name_first>
		<name_first_preferred />
		<name_middle />
		<name_middle_show>0</name_middle_show>
		<name_last>Strickland</name_last>
		<name_display>Mr. Strickland</name_display>
		<username>mrstrickland</username>
		<primary_email />
		<picture_url>http:\/\/...?1385138746</picture_url>
		<grad_year />
		<password />
		<role_id>0</role_id>
		<tz_offset>-4</tz_offset>
		<tz_name>America/New_York</tz_name>
		<parents />
		<child_uids />
	</users>
</result>
```

:::

## POST `like/{id}`

Like an update

**Content** An object indicating what sort of like action the user would like to take

::: code-group

```json [JSON]
{
  "like_action": "true"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<body>
  <like_action>true</like_action>
</body>
```

:::

**Return** The two like fields included in all objects

::: code-group

```json [JSON]
{
  "likes": 1,
  "user_like_action": true
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <likes>1</likes>
    <user_like_action>1</user_like_action>
</result>
```

:::

## POST `like/{id}/comment/{comment id}`

Like a comment object

**Content** An object indicating what sort of like action the user would like to take

::: code-group

```json [JSON]
{
  "like_action": "true"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<body>
  <like_action>true</like_action>
</body>
```

:::

**Return** The two like fields included in all objects

::: code-group

```json [JSON]
{
  "likes": 1,
  "user_like_action": true
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <likes>1</likes>
    <user_like_action>1</user_like_action>
</result>
```

:::
