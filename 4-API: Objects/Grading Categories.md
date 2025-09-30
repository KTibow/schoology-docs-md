# Grading Categories

Grading categories are required for grading. Assignments without categories will be ungraded.

> [!IMPORTANT]
> Grading categories exist in sections.

## Fields

| Field                      | Name                       | Description                                                           | Type      |
| -------------------------- | -------------------------- | --------------------------------------------------------------------- | --------- |
| `id`                       | `ID`                       | The ID of the grading category.                                       | `integer` |
| `title`                    | `Title`                    | The title of the grading category.                                    | `string`  |
| `calculation_type`         | `Calculation type`         | `1` corresponds to "Percent". `2` corresponds to "Total pts".         | `integer` |
| `default_max_points`       | `Default max points`       | The default # of points to give to assignments when created.          | `float`   |
| `default_grading_scale_id` | `Default grading scale id` | `0` for numeric grading scale, or the id of the grading scale.        | `integer` |
| `drop_lowest`              | `Drop lowest`              | Number of low scores to drop in the category. Acceptable range: 0–10. | `integer` |
| `weight`                   | `Weight`                   | Category weight.                                                      | `integer` |
| `delta`                    | `Delta`                    | List order of the category.                                           | `integer` |

## GET `sections/{section id}/grading_categories`

List grading categories

**Return** A list of [grading categories](#fields)

::: code-group

```json [JSON]
{
  "grading_category": [
    {
      "id": 4371,
      "title": "DC",
      "delta": 0,
      "calculation_type": 1,
      "default_max_points": 100,
      "default_grading_scale_id": 0,
      "drop_lowest": 6
    },
    {
      "id": 4369,
      "title": "AAA",
      "delta": 1,
      "calculation_type": 2,
      "default_max_points": 100,
      "default_grading_scale_id": 0,
      "drop_lowest": 0
    },
    {
      "id": 3266,
      "title": "HMWK",
      "delta": 2,
      "calculation_type": 1,
      "default_max_points": 100,
      "default_grading_scale_id": 0,
      "drop_lowest": 4
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
	<grading_category>
		<id>4371</id>
		<title>DC</title>
		<delta>0</delta>
		<calculation_type>1</calculation_type>
		<default_max_points>100</default_max_points>
		<default_grading_scale_id>0</default_grading_scale_id>
		<drop_lowest>6</drop_lowest>
	</grading_category>
	<grading_category>
		<id>4369</id>
		<title>AAA</title>
		<delta>1</delta>
		<calculation_type>2</calculation_type>
		<default_max_points>100</default_max_points>
		<default_grading_scale_id>0</default_grading_scale_id>
		<drop_lowest>0</drop_lowest>
	</grading_category>
	<grading_category>
		<id>3266</id>
		<title>HMWK</title>
		<delta>2</delta>
		<calculation_type>1</calculation_type>
		<default_max_points>100</default_max_points>
		<default_grading_scale_id>0</default_grading_scale_id>
		<drop_lowest>4</drop_lowest>
	</grading_category>
</result>
```

:::

## GET `sections/{section id}/grading_categories/{gc id}`

View a specified grading category

**Return** A [grading category](#fields)

::: code-group

```json [JSON]
{
  "id": 5823,
  "title": "Experimental Activities",
  "delta": 0,
  "realm": "course",
  "realm_id": "373214",
  "calculation_type": 2,
  "default_max_points": 100,
  "default_grading_scale_id": 0,
  "drop_lowest": 3,
  "weight": 100
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
     <calculation_type>2</calculation_type>
     <default_grading_scale_id>0</default_grading_scale_id>
     <default_max_points>100</default_max_points>
     <delta>0</delta>
     <drop_lowest>3</drop_lowest>
     <id>5823</id>
     <realm>course</realm>
     <realm_id>373214</realm_id>
     <title>Experimental Activities</title>
     <weight>100</weight>
</result>
```

:::

## POST `sections/{section id}/grading_categories`

Create one or more grading categories in a section

**Content** An object containing grading category fields

::: code-group

```json [JSON]
{
  "grading_categories": {
    "grading_category": [
      {
        "title": "Experiments",
        "weight": 100
      },
      {
        "title": "In-class Work",
        "calculation_type": 2,
        "drop_lowest": 2
      }
    ]
  }
}
```

```xml [XML]
<body>
   <grading_categories>
      <grading_category>
         <title>Experiments</title>
         <weight>100</weight>
      </grading_category>
      <grading_category>
         <calculation_type>2</calculation_type>
         <drop_lowest>2</drop_lowest>
         <title>In-class Work</title>
      </grading_category>
   </grading_categories>
</body>
```

:::

**Return** The created grading categories

::: code-group

```json [JSON]
{
  "grading_category": [
    {
      "id": "5823",
      "response_code": 200,
      "title": "Experiments",
      "calculation_type": 2,
      "default_max_points": 100,
      "drop_lowest": 0,
      "default_grading_scale": 0,
      "weight": 100,
      "delta": 0
    },
    {
      "id": "5825",
      "response_code": 200,
      "title": "In-class Work",
      "calculation_type": 2,
      "drop_lowest": 2,
      "default_max_points": 100,
      "default_grading_scale": 0,
      "weight": 100,
      "delta": 0
    }
  ]
}
```

```xml [XML]
<result>
   <grading_category>
        <calculation_type>2</calculation_type>
        <default_grading_scale>0</default_grading_scale>
        <default_max_points>100</default_max_points>
        <delta>0</delta>
        <drop_lowest>0</drop_lowest>
        <id>5823</id>
        <response_code>200</response_code>
        <title>Experiments</title>
        <weight>100</weight>
    </grading_category>
    <grading_category>
        <calculation_type>2</calculation_type>
        <default_grading_scale>0</default_grading_scale>
        <default_max_points>100</default_max_points>
        <delta>0</delta>
        <drop_lowest>2</drop_lowest>
        <id>5825</id>
        <response_code>200</response_code>
        <title>In-class Work</title>
        <weight>100</weight>
   </grading_category>
</result>
```

:::

## PUT `sections/{section id}/grading_categories/{gc id}`

Update a single grading category in a section

**Content** An object containing grading category fields

::: code-group

```json [JSON]
{
  "title": "Experimental Activities New",
  "id": 5823
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<body>
   <id>5823</id>
   <title>Experimental Activities New</title>
</body>
```

:::

**Return** The updated grading category

::: code-group

```json [JSON]
{
  "id": "5823",
  "title": "Experimental Activities New",
  "realm": "course",
  "realm_id": "373214",
  "uid": "45633",
  "calculation_type": "2",
  "weight": "100",
  "default_max_points": "100",
  "delta": "0",
  "drop_lowest": "3",
  "default_grading_scale": "0"
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
   <calculation_type>2</calculation_type>
   <default_grading_scale>0</default_grading_scale>
   <default_max_points>100</default_max_points>
   <delta>0</delta>
   <drop_lowest>3</drop_lowest>
   <id>5823</id>
   <realm>course</realm>
   <realm_id>373214</realm_id>
   <title>Experimental Activities New</title>
   <uid>45633</uid>
   <weight>100</weight>
</result>
```

:::

## PUT `sections/{section id}/grading_categories` (bulk)

Update one or more grading categories in a section

**Content** An object containing grading category fields

::: code-group

```json [JSON]
{
  "grading_categories": {
    "grading_category": [
      {
        "title": "Experiments",
        "id": 5823,
        "drop_lowest": 3
      },
      {
        "title": "In-class Work",
        "id": 5825,
        "calculation_type": 1
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<body>
   <grading_categories>
      <grading_category>
            <drop_lowest>3</drop_lowest>
            <id>5823</id>
            <title>Experiments</title>
      </grading_category>
	  <grading_category>
            <calculation_type>1</calculation_type>
            <id>5825</id>
            <title>In-class Work</title>
      </grading_category>
   </grading_categories>
</body>
```

:::

**Return** The updated grading categories

::: code-group

```json [JSON]
{
  "grading_category": [
    {
      "response_code": 204,
      "id": "5823",
      "title": "Experiments",
      "realm": "course",
      "realm_id": "373214",
      "uid": "45633",
      "calculation_type": "2",
      "weight": "100",
      "default_max_points": "100",
      "delta": "0",
      "drop_lowest": 3,
      "default_grading_scale": "0"
    },
    {
      "response_code": 204,
      "id": "5825",
      "title": "In-class Work",
      "realm": "course",
      "realm_id": "373214",
      "uid": "45633",
      "calculation_type": 1,
      "weight": "100",
      "default_max_points": "100",
      "delta": "0",
      "drop_lowest": "2",
      "default_grading_scale": "0"
    }
  ]
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
   <grading_category>
         <calculation_type>2</calculation_type>
         <default_grading_scale>0</default_grading_scale>
         <default_max_points>100</default_max_points>
         <delta>0</delta>
         <drop_lowest>3</drop_lowest>
         <id>5823</id>
         <realm>course</realm>
         <realm_id>373214</realm_id>
         <response_code>204</response_code>
         <title>Experiments</title>
         <uid>45633</uid>
         <weight>100</weight>
    </grading_category>
    <grading_category>
         <calculation_type>1</calculation_type>
         <default_grading_scale>0</default_grading_scale>
         <default_max_points>100</default_max_points>
         <delta>0</delta>
         <drop_lowest>2</drop_lowest>
         <id>5825</id>
         <realm>course</realm>
         <realm_id>373214</realm_id>
         <response_code>204</response_code>
         <title>In-class Work</title>
         <uid>45633</uid>
         <weight>100</weight>
   </grading_category>
</result>
```

:::

## DELETE `sections/{section id}/grading_categories/{gc id}`

Delete a grading category (cannot be undone).
