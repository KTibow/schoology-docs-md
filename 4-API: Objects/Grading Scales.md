# Grading Scales

Grading scales allow you to use non-numeric notations within grades (eg `A+`, etc). They define how grades map to percent ranges or point levels and are returned by the API as objects containing scale-level details.

> [!IMPORTANT]
> Grading scales exist in sections.

## Fields

| Field            | Name                                                  | Description                                                                                                                                                                            | Type      |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `id`\*           | The ID of the grading scale                           | Unique identifier for the grading scale.                                                                                                                                               | `integer` |
| `title`\*        | The title of the grading scale                        | Human-readable title (e.g., "Classic five point chromatic").                                                                                                                           | `string`  |
| `type`\*         | The scale type                                        | `1` = Percent-type (e.g., classic chromatic), `3` = Point-type, `0` = Numeric.                                                                                                         | `integer` |
| `auto_averaging` | Automatically calculate average values for each level | If `1`, average values are auto-calculated for each level; otherwise `0`.                                                                                                              | `integer` |
| `hide_numeric`   | Hide numeric values from students                     | If `1`, students will only see the letter/point grade (no numeric).                                                                                                                    | `integer` |
| `scale`          | The detailed levels that make up the grading scale    | For percent-type scales, `scale.level` contains objects with `grade`, `cutoff`, and `average`. For points-type scales, `scale.level` contains objects with `points` and `description`. | `object`  |

\* = Required

## GET `sections/{section id}/grading scales`

View grading scales

**Return** A list of [grading scale](#fields)

::: code-group

```json [JSON]
{
    "grading_scale": [
        {
            "id": 1,
            "title": "Classic five point chromatic",
            "type": 1,
            "auto_averaging": 0,
            "hide_numeric": 0,
            "scale": {
                "level": [
                    {
                        "grade": "F",
                        "cutoff": 0,
                        "average": 0
                    },
                    {
                        "grade": "D-",
                        "cutoff": 60,
                        "average": 60
                    },
                    {
                        "grade": "D",
                        "cutoff": 63,
                        "average": 63
                    },
                    {
                        "grade": "D+",
                        "cutoff": 67,
                        "average": 67
                    },
                    {
                        "grade": "C-",
                        "cutoff": 70,
                        "average": 70
                    },
                    {
                        "grade": "C",
                        "cutoff": 73,
                        "average": 73
                    },
                    {
                        "grade": "C+",
                        "cutoff": 77,
                        "average": 77
                    },
                    {
                        "grade": "B-",
                        "cutoff": 80,
                        "average": 80
                    },
                    {
                        "grade": "B",
                        "cutoff": 83,
                        "average": 83
                    },
                    {
                        "grade": "B+",
                        "cutoff": 87,
                        "average": 87
                    },
                    {
                        "grade": "A-",
                        "cutoff": 90,
                        "average": 90
                    },
                    {
                        "grade": "A",
                        "cutoff": 93,
                        "average": 93
                    },
                    {
                        "grade": "A+",
                        "cutoff": 97,
                        "average": 97
                    }
                ]
            }
        }
    ],
    "links": {
        "self": "https://.../v1/sections/4318461/grading_scales"
    }
}

{
  "id": 96033,
  "title": "points scale",
  "type": 3,
  "auto_averaging": 0,
  "hide_numeric": 1,
  "scale": {
    "level": [
      {
        "points": 3,
        "description": "three points"
      },
      {
        "points": 2,
        "description": "two points"
      },
      {
        "points": 1,
        "description": "one point"
      }
    ]
  }
}
```

```xml [XML]
<?xml version="1.0" encoding="utf-8" ?>
<result>
    <grading_scale>
        <id>1</id>
        <title>Classic five point chromatic</title>
        <type>1</type>
        <auto_averaging>0</auto_averaging>
        <hide_numeric>0</hide_numeric>
        <scale>
            <level>
                <grade>F</grade>
                <cutoff>0</cutoff>
                <average>0</average>
            </level>
            <level>
                <grade>D-</grade>
                <cutoff>60</cutoff>
                <average>60</average>
            </level>
            <level>
                <grade>D</grade>
                <cutoff>63</cutoff>
                <average>63</average>
            </level>
            <level>
                <grade>D+</grade>
                <cutoff>67</cutoff>
                <average>67</average>
            </level>
            <level>
                <grade>C-</grade>
                <cutoff>70</cutoff>
                <average>70</average>
            </level>
            <level>
                <grade>C</grade>
                <cutoff>73</cutoff>
                <average>73</average>
            </level>
            <level>
                <grade>C+</grade>
                <cutoff>77</cutoff>
                <average>77</average>
            </level>
            <level>
                <grade>B-</grade>
                <cutoff>80</cutoff>
                <average>80</average>
            </level>
            <level>
                <grade>B</grade>
                <cutoff>83</cutoff>
                <average>83</average>
            </level>
            <level>
                <grade>B+</grade>
                <cutoff>87</cutoff>
                <average>87</average>
            </level>
            <level>
                <grade>A-</grade>
                <cutoff>90</cutoff>
                <average>90</average>
            </level>
            <level>
                <grade>A</grade>
                <cutoff>93</cutoff>
                <average>93</average>
            </level>
            <level>
                <grade>A+</grade>
                <cutoff>97</cutoff>
                <average>97</average>
            </level>
        </scale>
    </grading_scale>
    <links>
        <self>https://.../v1/sections/4318461/grading_scales</self>
    </links>
</result>

<?xml version="1.0" encoding="utf-8" ?>
<result>
    <grading_scale>
        <id>96033</id>
        <title>Points scale</title>
        <type>3</type>
        <auto_averaging>0</auto_averaging>
        <hide_numeric>1</hide_numeric>
        <scale>
            <level>
                <points>3</points>
                <description>three points</description>
            </level>
            <level>
                <points>2</points>
                <description>two points</description>
            </level>
            <level>
                <points>1</points>
                <description>one point</description>
            </level>
        </scale>
    </grading_scale>
    <links>
        <self>https://.../v1/sections/4318461/grading_scales</self>
    </links>
</result>
```

:::
