# Resource Apps

Resource Apps allow users to import content easily from third-party providers. Unlike the other apps, Resource Apps can only be installed to the Resource section.

**Please note:**

- Resource Apps do not have access to the standard API endpoints
- When you are ready to publish your app, choose app type: Resource App

We have exposed the special endpoints below for Resource Apps. Use the returned import IDs to construct an import URL ([see workflow below](#import-workflow)). Your Resource App will use this URL to redirect the user to a special Schoology import page, where the user can select the desired destination (eg, personal resource, a course …etc).

## POST content_app/import/link

Import a link

**Content**

| Field | Name  | Description           | Type   |
| ----- | ----- | --------------------- | ------ |
| Title | title | The title of the link | string |
| Url   | url   | The URL of the link   | string |

\* = Required

::: code-group

```json [JSON]
{
  "title": "Schoology Developers",
  "url": "https://developers.schoology.com"
}
```

```xml [XML]
<body>
  <title>Schoology Developers</title>
  <url>https://developers.schoology.com</url>
</body>
```

:::

**Return** An import ID

## POST content_app/import/embed

Import an embed

**Content**

| Field | Name    | Description                   | Type   |
| ----- | ------- | ----------------------------- | ------ |
| Title | title\* | The title of the link         | string |
| Embed | embed\* | The embed code of the content | string |

\* = Required

::: code-group

```json [JSON]
{
  "title": "Schoology Introduction",
  "embed": "{ ... embed code ... }"
}
```

```xml [XML]
<body>
  <title>Schoology Introduction</title>
  <embed>{ ... embed code ... }</embed>
</body>
```

:::

**Return** An import ID

## POST content_app/import/file

Import a file. Place a file-id inside a [file-attachment object](./4-Files) located at the first level within the request body.

**Content**

::: code-group

```json [JSON]
{
  "file-attachment": {
    "id": [213123234]
  }
}
```

```xml [XML]
<body>
  <file-attachment>
    <id>
      <id>213123234</id>
    </id>
  </file-attachment>
</body>
```

:::

**Return** An import ID

## Import Workflow

### 1. User selects content

Use the special endpoints above to import the content into Schoology and retrieve an import ID.

### 2. Redirect user to Schoology's import page

Use the import ID to redirect the user to the Schoology Import page, where the user can select the import destination(s) within Schoology. For example, redirect the user to the following URL:

```
https://app.schoology.com/content_app/import?import_id[]=[IMPORT ID]&return_url=[YOUR APP URL]
```

### 3. Schoology redirects the user to your Resource App

After importing the content to the selected areas, Schoology will redirect the user back to your Resource App. Use the query parameter `return_url` to ensure that the user is redirected to a specific endpoint (eg display a custom success message upon return).
