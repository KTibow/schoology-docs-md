# Resource Templates

Resource templates are objects placed in Resource Collections. Each template has an assigned type (e.g. Document, Assignment, Discussion). Operations are available at the collection and realm resource endpoints; realm resource collections are only available for groups and schools. Templates include common metadata (id, title, creator, folder/collection, type) and a `template_fields` object containing fields specific to the template type (page, discussion, assignment, assessment, document).

## Fields

| Field             | Name            | Description                                                                                                                     | Type      |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `id`              | Id              | The Schoology Id of the template.                                                                                               | `integer` |
| `title`\*         | Title           | The title of the template. Note that documents do not require a title.                                                          | `string`  |
| `uid`             | User Id         | The creator (user) id for the template.                                                                                         | `integer` |
| `resource_notes`  | Resource Notes  | Resource notes that can be attached to the actual template.                                                                     | `string`  |
| `folder_id`       | Folder Id       | The resource folder this item is in.                                                                                            | `integer` |
| `collection_id`   | Collection Id   | The Collection this item is contained in.                                                                                       | `integer` |
| `type`\*          | Template type   | The type of template. Supported values include `assessment`, `assignment`, `discussion`, `page`, `album`, `document`, `folder`. | `string`  |
| `template_fields` | Template Fields | Fields specific to this template type (see Template Fields below).                                                              | `object`  |

\* = Required

## Template Fields

### Page

| Field  | Name | Description                       | Type     |
| ------ | ---- | --------------------------------- | -------- |
| `body` | Body | The content of the resource Page. | `string` |

### Discussion

| Field  | Name | Description                        | Type     |
| ------ | ---- | ---------------------------------- | -------- |
| `body` | Body | The description of the discussion. | `string` |

### Assignment

| Field        | Name       | Description                                       | Type      |
| ------------ | ---------- | ------------------------------------------------- | --------- |
| `body`       | Body       | The description of the assignment.                | `string`  |
| `max_points` | Max Points | The maximum number of points for this assignment. | `integer` |

### Assessment

| Field        | Name       | Description                                       | Type      |
| ------------ | ---------- | ------------------------------------------------- | --------- |
| `body`       | Body       | The description of the assessment.                | `string`  |
| `max_points` | Max Points | The maximum number of points for this assessment. | `integer` |

### Document

Note: To create a document you must include an attachment (same as other content types that support attachments).

| Field           | Name          | Description                                                                          | Type     |
| --------------- | ------------- | ------------------------------------------------------------------------------------ | -------- |
| `document_type` | Document Type | The type of content attached to this item. One of: `file`, `link`, `video`, `embed`. | `string` |

## GET `collections/{collection id}/resources`

List a collection's resources.

Parameters:

- `f` — folder id (optional). Pass to specify a particular folder; omission returns root level.
- `with_attachments` — set to `1` to retrieve attachments of the piece of content (optional).

::: code-group

```json [JSON]
{
  "resources": [
    {
      "id": 5825423,
      "title": "YouTube",
      "type": "document",
      "resource_notes": "",
      "collection_id": 5825417,
      "uid": 48289,
      "last_updated": 1389717511,
      "created": 1389717511,
      "template_fields": {
        "document_type": "link"
      },
      "folder_id": 0
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <resources>
        <id>5825423</id>
        <title>YouTube</title>
        <type>document</type>
        <resource_notes />
        <collection_id>5825417</collection_id>
        <uid>48289</uid>
        <last_updated>1389717511</last_updated>
        <created>1389717511</created>
        <template_fields>
            <document_type>link</document_type>
        </template_fields>
        <folder_id>0</folder_id>
    </resources>
    <total>1</total>
    <links>
        <self>http:\/\/...?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## GET `{realm}/{realm id}/resources`

List a realm's resources. Realm resource collections are only available for groups and schools.

Parameters:

- `f` — folder id (optional).
- `with_attachments` — set to `1` to retrieve attachments (optional).

::: code-group

```json [JSON]
{
  "resources": [
    {
      "id": 5825423,
      "title": "YouTube",
      "type": "document",
      "resource_notes": "",
      "collection_id": 5825417,
      "uid": 48289,
      "last_updated": 1389717511,
      "created": 1389717511,
      "template_fields": {
        "document_type": "link"
      },
      "folder_id": 0
    }
  ],
  "total": 1,
  "links": {
    "self": "http:\/\/...?start=0&limit=20"
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <resources>
        <id>5825423</id>
        <title>YouTube</title>
        <type>document</type>
        <resource_notes />
        <collection_id>5825417</collection_id>
        <uid>48289</uid>
        <last_updated>1389717511</last_updated>
        <created>1389717511</created>
        <template_fields>
            <document_type>link</document_type>
        </template_fields>
        <folder_id>0</folder_id>
    </resources>
    <total>1</total>
    <links>
        <self>http:\/\/...?start=0&amp;limit=20</self>
    </links>
</result>
```

:::

## POST `collections/{collection id}/resources`

Create a Template in the specified collection.

**Content** An object containing template fields.

::: code-group

```json [JSON]
{
  "title": "A handy search engine",
  "type": "document",
  "resource_notes": "a few notes",
  "attachments": [
    {
      "url": "www.google.com"
    }
  ]
}
```

```xml [XML]
<body>
  <title>A handy search engine</title>
  <type>document</type>
  <resource_notes>a few notes</resource_notes>
  <attachments>
    <url>www.google.com</url>
  </attachments>
</body>
```

:::

**Return** An object containing template fields.

## POST `{realm}/{realm id}/resources`

Create a Template in the specified realm collection. Realm resource collections are only available for groups and schools.

**Content** An object containing template fields.

::: code-group

```json [JSON]
{
  "title": "A handy search engine",
  "type": "document",
  "resource_notes": "a few notes",
  "attachments": [
    {
      "url": "www.google.com"
    }
  ]
}
```

```xml [XML]
<body>
  <title>A handy search engine</title>
  <type>document</type>
  <resource_notes>a few notes</resource_notes>
  <attachments>
    <url>www.google.com</url>
  </attachments>
</body>
```

:::

**Return** An object containing template fields.
