# Media Album

Media albums contain audio, video, and images with captions and tagging. Below are the fields and endpoints for working with media albums in the API.

> [!IMPORTANT]
> Media albums exist in groups and sections.

## Fields

| Field                 | Name                  | Description                                                                | Type      |
| --------------------- | --------------------- | -------------------------------------------------------------------------- | --------- |
| `Title`*              | `title`               | The album title.                                                           | `string`  |
| `Description`         | `description`         | The album description.                                                     | `string`  |
| `Comments setting`    | `setting_comments`    | Whether or not comments are enabled for media album content (`0` or `1`).  | `{0,1}`   |
| `Member post setting` | `setting_member_post` | Whether or not non-admins can add content to the media album (`0` or `1`). | `{0,1}`   |
| `Published`           | `published`           | Whether or not the media album is published (`0` or `1`).                  | `{0,1}`   |
| `Photo count`         | `photo_count`         | The number of images in the album.                                         | `integer` |
| `Video count`         | `video_count`         | The number of video files in the album.                                    | `integer` |
| `Audio count`         | `audio_count`         | The number of audio files in the album.                                    | `integer` |
| `Cover image URL`     | `cover_image_url`     | The full URL of the cover image.                                           | `string`  |
| `Created timestamp`   | `created`             | The unix timestamp when the media album was created.                       | `integer` |

\* = Required

## GET `{realm}/albums`

View a list of albums for the given realm. Optional query parameter:

- `withcontent=1`: include the contents of the album in the response

**Return** A list of [album](#fields) objects

::: code-group

```json [JSON]
{
  "album": [
    {
      "id": 5692169,
      "title": "My media album",
      "description": "",
      "setting_comments": 1,
      "setting_member_post": 0,
      "photo_count": 0,
      "video_count": 0,
      "audio_count": 0,
      "created": 1388170669,
      "available": 1,
      "completed": 0,
      "completion_status": "",
      "links": {
        "self": "http:\/\/...\/v1\/album\/5692169"
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...\/albums?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <album>
        <id>5692169</id>
        <title>My media album</title>
        <description />
        <setting_comments>1</setting_comments>
        <setting_member_post>0</setting_member_post>
        <photo_count>0</photo_count>
        <video_count>0</video_count>
        <audio_count>0</audio_count>
        <created>1388170669</created>
        <available>1</available>
        <completed>0</completed>
        <completion_status />
        <links>
            <self>http://.../v1/album/5692169</self>
        </links>
    </album>
    <total>1</total>
    <links>
        <self>http://.../albums?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## GET `{realm}/albums/{id}`

View a specified album

**Return** An [album](#fields)

::: code-group

```json [JSON]
{
  "album": [
    {
      "id": 5692169,
      "title": "My media album",
      "description": "",
      "setting_comments": 1,
      "setting_member_post": 0,
      "photo_count": 0,
      "video_count": 0,
      "audio_count": 0,
      "created": 1388170669,
      "available": 1,
      "completed": 0,
      "completion_status": "",
      "links": {
        "self": "http:\/\/...\/v1\/album\/5692169"
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...\/albums?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <album>
        <id>5692169</id>
        <title>My media album</title>
        <description />
        <setting_comments>1</setting_comments>
        <setting_member_post>0</setting_member_post>
        <photo_count>0</photo_count>
        <video_count>0</video_count>
        <audio_count>0</audio_count>
        <created>1388170669</created>
        <available>1</available>
        <completed>0</completed>
        <completion_status />
        <links>
            <self>http://.../v1/album/5692169</self>
        </links>
    </album>
    <total>1</total>
    <links>
        <self>http://.../albums?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## GET `{realm}/albums/{id}/content/{id}`

View specified album content

**Return** An [album](#fields)

::: code-group

```json [JSON]
{
  "album": [
    {
      "id": 5692169,
      "title": "My media album",
      "description": "",
      "setting_comments": 1,
      "setting_member_post": 0,
      "photo_count": 1,
      "video_count": 0,
      "audio_count": 0,
      "created": 1388170669,
      "available": 1,
      "completed": 0,
      "cover_image_url": "http:\/\/...\/52bdcf1fa3119.jpg",
      "completion_status": "",
      "links": {
        "self": "http:\/\/...\/v1\/album\/5692169"
      }
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...\/albums?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <album>
        <id>5692169</id>
        <title>My media album</title>
        <description />
        <setting_comments>1</setting_comments>
        <setting_member_post>0</setting_member_post>
        <photo_count>1</photo_count>
        <video_count>0</video_count>
        <audio_count>0</audio_count>
        <created>1388170669</created>
        <available>1</available>
        <completed>0</completed>
        <cover_image_url>http://.../52bdcf1fa3119.jpg</cover_image_url>
        <completion_status />
        <links>
            <self>http://.../v1/album/5692169</self>
        </links>
    </album>
    <total>1</total>
    <links>
        <self>http://.../albums?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## POST `{realm}/albums`

Create an album

**Content** An object containing album fields

::: code-group

```json [JSON]
{
  "title": "This album was created through api",
  "description": "this is new api media album",
  "setting_comments": "1",
  "setting_member_post": "1",
  "published": "1"
}
```

```xml [XML]
<body>
  <title>This album was created through api</title>
  <description>this is new api media album</description>
  <setting_comments>1</setting_comments>
  <setting_member_post>1</setting_member_post>
  <published>1</published>
</body>
```

:::

**Return** The created album object

::: code-group

```json [JSON]
{
  "id": 5692169,
  "title": "My media album",
  "description": "This is a media album",
  "setting_comments": 1,
  "setting_member_post": 0,
  "photo_count": 0,
  "video_count": 0,
  "audio_count": 0,
  "created": 1388170669,
  "available": 1,
  "completed": 0,
  "links": {
    "self": "http:\/\/...\/v1\/album\/5692169"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<id>5692169</id>
	<title>My media album</title>
	<description>This is a media album</description>
	<setting_comments>1</setting_comments>
	<setting_member_post>0</setting_member_post>
	<photo_count>0</photo_count>
	<video_count>0</video_count>
	<audio_count>0</audio_count>
	<created>1388170669</created>
	<available>1</available>
	<completed>0</completed>
	<links>
		<self>http://.../v1/album/5692169</self>
	</links>
</result>
```

:::

## POST `{realm}/albums/{id}/content`

Create album content. For file uploading details see File Uploading.

**Content** Example request with file-attachment and extras

::: code-group

```json [JSON]
{
  "file-attachment": {
    "id": [213123234, 213123235]
  },
  "extras": [
    {
      "fid": 213123234,
      "caption": "A beautiful view",
      "display_order": 1
    },
    {
      "fid": 213123235,
      "caption": "A beautiful view again",
      "display_order": 2
    }
  ]
}
```

```xml [XML]
<body>
   <extras>
      <extra>
         <caption>A beautiful view</caption>
         <fid>213123234</fid>
         <display_order>1</display_order>
      </extra>
      <extra>
         <caption>A beautiful view again</caption>
         <fid>213123235</fid>
         <display_order>2</display_order>
      </extra>
   </extras>
   <file-attachment>
      <id>
         <id>213123234</id>
         <id>213123235</id>
      </id>
   </file-attachment>
</body>
```

:::

**Return** Created content objects

::: code-group

```json [JSON]
{
  "content": [
    {
      "id": 17861,
      "album_id": 5692169,
      "type": "image",
      "caption": "A beautiful view",
      "display_order": 2,
      "created": 1388171561,
      "album_cover": 0,
      "converted_url": null,
      "converted_filesize": null,
      "converted_md5_checksum": null,
      "content_url": "http:\/\/...\/5692169\/52bdd12925164.jpg",
      "content_filesize": "3825",
      "content_md5_checksum": "69392e30b6",
      "thumbnail_url": "http:\/\/...\/5692169\/52bdd12925164.jpg",
      "thumbnail_dimensions": "172x172",
      "content_dimensions": "600x600"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <content>
        <id>17861</id>
        <album_id>5692169</album_id>
        <type>image</type>
        <caption />
        <display_order>2</display_order>
        <created>1388171561</created>
        <album_cover>0</album_cover>
        <converted_url />
        <converted_filesize />
        <converted_md5_checksum />
        <content_url>http://.../5692169/52bdd12925164.jpg</content_url>
        <content_filesize>3825</content_filesize>
        <content_md5_checksum>69392e30b6</content_md5_checksum>
        <thumbnail_url>http://.../5692169/52bdd12925164.jpg</thumbnail_url>
        <thumbnail_dimensions>172x172</thumbnail_dimensions>
        <content_dimensions>600x600</content_dimensions>
    </content>
</result>
```

:::

## PUT `{realm}/albums/{id}`

Update a specified album

**Content** An object containing album fields to update

::: code-group

```json [JSON]
{
  "description": "this new album does not allow comments",
  "setting_comments": "0"
}
```

```xml [XML]
<body>
  <description>this new album does not allow comments</description>
  <setting_comments>0</setting_comments>
</body>
```

:::

## PUT `{realm}/albums/{id}/content/{id}`

Update specified album content

**Content** An object containing album content fields

::: code-group

```json [JSON]
{
  "caption": "See my caption text"
}
```

```xml [XML]
<body>
  <caption>See my caption text</caption>
</body>
```

:::

## DELETE `{realm}/albums/{id}`

Delete an album (cannot be undone)

## DELETE `{realm}/albums/{id}/content/{id}`

Delete album content (cannot be undone)
