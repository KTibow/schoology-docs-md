# Attaching Files, Links, Embeds, and Resources

## Uploading A File

A file is uploaded to the Schoology Servers through a two step process.

1. Acquire permission and a unique endpoint to PUT the contents of a file to. This is done with a POST call.

2. PUT the contents of the file to the unique endpoints retrieved in Step 1.

Lastly, to permanently save the file, send in the returned ID acquired from steps 1 & 2 to any endpoint that supports file attachments.

## Step 1

This is a POST call to /upload. A stripped down FILE Object is expected with the following fields:

| Field          | Name         | Description                                      | Type      |
| -------------- | ------------ | ------------------------------------------------ | --------- |
| `filename`     | Filename     | Name of the file                                 | `string`  |
| `filesize`     | Filesize     | Size of the file in Bytes                        | `integer` |
| `mdb_checksum` | MD5 checksum | Checksum ran after file has been saved on server | `string`  |

Here is an example JSON body for the ~/upload POST:

```json
{
  "filename": "Myfile",
  "filesize": 38962,
  "md5_checksum": "d2d502cc0dfaf35643c33839c55cd407"
}
```

After POSTing this object to /upload a response object with a pointer to the allowed PUT endpoint and an ID of the empty file now prepared to receive PUT data in the next step will be returned. The filesize and md5_checksum will also be echoed back in this object. A sample response looks something like this:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <upload_location>http://api.schoology.com/v1/upload/88045</upload_location>
  <id>88045</id>
  <filename>photo.JPG</filename>
  <filesize>440389</filesize>
  <md5_checksum>e908e98c39b33a818b5fb27f20585a20</md5_checksum>
  <timestamp>1335884667</timestamp>
</result>
```

## Step 2

Now that an empty file has been created through step 1, the contents of the file can be placed in the file through a PUT call to the endpoint returned in step 1. Continuing with the example from Step 1, the following request should be made. Notice that in the previous step, the mime-type of the file was not asked for in the request object. The mime-type of the file will be determined by the headers in this PUT call.

- Traditionally a PUT call returns a 204 which means a successful call with no-content. For this PUT call, a fleshed out version of the FILE object returned in step 1 will be sent back as well as HTTP status code 200.
- Some notes around sanity for Step 2
  - If the Authorized User from Step 1 does not match the Authorized user in Step 2, Step 2 will fail.
  - If the md5_checksum from Step 1 does not match the md5_checksum of the contents from Step 2, Step 2 will fail.
  - If the filesize from Step 1 does not match the filesize of the contents saved from Step 2, Step 2 will fail.
  - Once contents have been successfully written to the file in Step 2, that endpoint will be locked from any future PUT calls.

**Request**

```
Request method: PUT
Request URL: http://api.schoology.com/v1/upload/88045
Request Headers:
  Accept: text/xml
  Connection: keep-alive
  Keep-Alive: 300
  Content-Type: image/jpeg
  Authorization: "Authorization INFO"
```

**Response**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<result>
  <id>88045</id>
  <filename>photo.JPG</filename>
  <filesize>440389</filesize>
  <filemime>image/jpeg</filemime>
  <md5_checksum>e908e98c39b33a818b5fb27f20585a20</md5_checksum>
</result>
```

The file object returned from a successful PUT call will have the following fields.

| Field          | Name           | Description                                                                                 | Type      |
| -------------- | -------------- | ------------------------------------------------------------------------------------------- | --------- |
| `id`\*         | File ID        | Id pointing to temporary save of the upload                                                 | `integer` |
| `filename`     | Filename       | Name of the file                                                                            | `string`  |
| `filesize`     | Filesize       | Size of the file in Bytes                                                                   | `integer` |
| `filemime`     | File Mime-type | The file mime-type, determined either from request headers or the extension of the filename | `string`  |
| `mdb_checksum` | MD5 checksum   | Checksum ran after file has been saved on server                                            | `string`  |

\* = Required

## Permanently saving the files

1. Refer to the API to see if a POST or PUT endpoint will support file additions.

2. If the endpoint supports attachments, place each file-id inside a file-attachment object located at the first level within the request body. See the example below.

::: code-group

```json [JSON]
{ "file-attachment": { "id": ["88433"] } }
```

```xml [XML]
<body>
  <file-attachment>
    <id>123</id>
    <id>456</id>
 </file-attachment>
</body>
```

:::

- Note that this is an example body for a post request to http://api.schoology.com/v1/dropbox/assignment_id/file, which only takes files. If the enpoint supports file attachments you can place objects like this anywhere on the first level inside request body.

## Adding Attachments: Files, Links, Embeds, Resources

Any endpoint that supports file uploads, will also support sending in an attachment array with files, links, embeds, and resource attachments. What the objects in the array will be made as is determined by the fields inside that object.

| Type  | Fields           | Notes                                                                                                                                                                                                                                                                                      |
| ----- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| File  | id, fid, title   | The `id` field is required in a PUT for existing file attachments                                                                                                                                                                                                                          |
| Link  | id, url, title   | The `id` field is required in a PUT for existing link attachments                                                                                                                                                                                                                          |
| Embed | id, embed, title | The `id` field is required in a PUT for existing embed attachments                                                                                                                                                                                                                         |
| Embed | resource         | - Note that the resource is an id of a [resource template](<../4-API: Objects/Resource Templates>) of type **document**<br>- Resources are converted to a file during a POST/PUT<br>- On subsequent PUTs the attachment id should be sent in |

You may send in the attachment array during a POST (to create attachments) or during a PUT (to update attachments).

A few things to keep in mind when doing a PUT

- If the "id" field is not sent in, the attachment will get created.
- Only titles can be updated during a PUT
- **Support for attachment deletions**: If an attachment is created during a previous POST/PUT and that attachment ID is not sent in in a subsequent PUT, the attachment will get deleted.

#### Sample POST Request Body

```json
{
  "attachments": [
    { "url": "www.google.com", "title": "A popular search engine" },
    { "embed": "", "title": "An embed from Schoology's awesome help site" },
    { "resource": 123456 }
  ]
}
```

#### Sample PUT Request Body

```json
{
  "attachments": [
    {
      "id": 7890,
      "fid": 12345
    },
    {
      "id": 23445,
      "title": "A popular search engine"
    },
    {
      "id": 72363,
      "title": "An embed from Schoology\"s awesome help site - edited title"
    },
    {
      "resource": 123456
    },
    {
      "fid": 276434
    }
  ]
}
```
