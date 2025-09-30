import { readdir, readFile } from "fs/promises";
import { basename } from "path";

const OBJECTS_DIR = "4-API: Objects";
const REALMS_DIR = "3-API: Realms";

async function getObjectRealms() {
  const files = await readdir(OBJECTS_DIR);
  const objectFiles = files.filter((f) => f.endsWith(".md") && f !== "todo.md");

  const objectRealms = {};

  for (const file of objectFiles) {
    const content = await readFile(`${OBJECTS_DIR}/${file}`, "utf-8");
    const objectName = basename(file, ".md");

    // Extract realms from IMPORTANT section
    const importantMatch = content.match(/> \[!IMPORTANT\]\s*>\s*(.+)/);
    if (importantMatch) {
      const text = importantMatch[1];
      const realms = extractRealmsFromText(text);
      objectRealms[objectName] = realms;
    } else {
      objectRealms[objectName] = [];
    }
  }

  return objectRealms;
}

function extractRealmsFromText(text) {
  // Look for patterns like "exist in X" where X is a realm
  // Only match plural versions to enforce strict formatting
  const existPattern = /exist in ([^.]+)/i;
  const match = text.match(existPattern);

  if (!match) return [];

  const realmText = match[1];
  const realmNames = [
    "districts",
    "schools",
    "buildings",
    "users",
    "groups",
    "courses",
    "sections",
  ];
  const pattern = new RegExp(`\\b(${realmNames.join("|")})\\b`, "gi");

  const matches = realmText.match(pattern) || [];
  const realms = matches.map((realm) =>
    realm.toLowerCase().replace(/^(.)/, (_, c) => c.toUpperCase()),
  );

  return [...new Set(realms)]; // Remove duplicates but preserve order
}

function verifyRealmSorting(realms) {
  const realmOrder = [
    "Districts",
    "Schools",
    "Buildings",
    "Users",
    "Groups",
    "Courses",
    "Sections",
  ];
  const sortedRealms = [...realms].sort(
    (a, b) => realmOrder.indexOf(a) - realmOrder.indexOf(b),
  );

  const isCorrectOrder = realms.every(
    (realm, index) => realm === sortedRealms[index],
  );
  const isPlural = realms.every((realm) => realmOrder.includes(realm));

  return { isCorrectOrder, isPlural, expectedOrder: sortedRealms };
}

async function getAvailableRealms() {
  const files = await readdir(REALMS_DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => basename(f, ".md").replace(/^\d+-/, ""));
}

function verifyStructure(objectRealms, expectedStructure) {
  const errors = [];
  const warnings = [];

  // Check expected structure matches docs
  for (const [objectName, expectedRealms] of Object.entries(
    expectedStructure,
  )) {
    const actualRealms = objectRealms[objectName] || [];

    if (!objectRealms.hasOwnProperty(objectName)) {
      errors.push(`Missing object documentation: ${objectName}`);
      continue;
    }

    // Verify realm sorting and formatting
    const { isCorrectOrder, isPlural, expectedOrder } =
      verifyRealmSorting(actualRealms);
    if (!isCorrectOrder) {
      errors.push(
        `${objectName}: incorrect realm order. Expected: [${expectedOrder.join(", ")}], got: [${actualRealms.join(", ")}]`,
      );
    }
    if (!isPlural) {
      errors.push(
        `${objectName}: uses non-plural realm names. Use plurals like "sections" not "section"`,
      );
    }

    const missing = expectedRealms.filter((r) => !actualRealms.includes(r));
    const extra = actualRealms.filter((r) => !expectedRealms.includes(r));

    if (missing.length > 0) {
      errors.push(`${objectName}: missing realms [${missing.join(", ")}]`);
    }
    if (extra.length > 0) {
      warnings.push(`${objectName}: unexpected realms [${extra.join(", ")}]`);
    }
  }

  // Check docs have objects not in expected structure
  for (const objectName of Object.keys(objectRealms)) {
    if (!expectedStructure.hasOwnProperty(objectName)) {
      warnings.push(`Undocumented object in expected structure: ${objectName}`);
    }
  }

  return { errors, warnings };
}

console.log("🔍 Verifying documentation structure...\n");

const objectRealms = await getObjectRealms();
const availableRealms = await getAvailableRealms();

console.log(`📄 Found ${Object.keys(objectRealms).length} objects`);
console.log(
  `🏛️  Found ${availableRealms.length} realms: ${availableRealms.join(", ")}\n`,
);

// Show current structure
console.log("📋 Current object-realm structure:");
for (const [obj, realms] of Object.entries(objectRealms)) {
  console.log(`  ${obj}: [${realms.join(", ") || "none"}]`);
}

// Complete expected structure from API documentation (using plurals and proper order)
const expectedStructure = {
  // Realm Objects (can be created for different realms)
  Enrollment: ["Groups", "Sections"],
  Event: ["Districts", "Schools", "Users", "Groups", "Sections"],
  "Blog Post": ["Districts", "Schools", "Users", "Groups", "Sections"],
  "Blog Post Comment": ["Districts", "Schools", "Users", "Groups", "Sections"],
  "Discussion Thread": ["Districts", "Schools", "Groups", "Sections"],
  "Discussion Reply": ["Districts", "Schools", "Groups", "Sections"],
  Updates: ["Users", "Groups", "Sections"],
  "Update Comment": ["Users", "Groups", "Sections"],
  Reminders: ["Sections"],
  "Media Album": ["Groups", "Sections"],
  "Media Album Comments": ["Groups", "Sections"],
  Documents: ["Schools", "Sections"],

  // Course-Specific Objects (only for sections)
  Assignment: ["Sections"],
  "Assignment Comments": ["Sections"],
  Grade: ["Users", "Sections"],
  "Grading Scales": ["Sections"],
  "Grading Rubrics": ["Sections"],
  "Grading Categories": ["Sections"],
  "Grading Groups": ["Sections"],
  "Grading Periods": ["Sections"],
  Attendance: ["Sections"],
  Submissions: ["Sections"],
  "Course Folder": ["Courses"],
  Pages: ["Sections"],
  "Scorm Package": ["Sections"],
  "Web Content Package": ["Sections"],
  Completion: ["Sections"],
  "External ID": ["Users", "Sections"],

  // User-Specific Objects (only for users)
  "Friend Request": ["Users"],
  Invite: ["Users", "Groups", "Sections"],
  Network: ["Users"],

  // User Information (for user objects)
  Sections: ["Users"],
  Groups: ["Users"],
  Requests: ["Users"],

  // Other Objects (not associated with realms)
  Role: [],
  "Private Messaging": [],
  Search: [],
  "Resource Collections": [],
  "Resource Templates": [],

  Like: [],
  Poll: [],
};

console.log("\n🎯 Verifying against expected structure...");

const { errors, warnings } = verifyStructure(objectRealms, expectedStructure);

if (errors.length > 0) {
  console.log("\n❌ Errors:");
  errors.forEach((e) => console.log(`  • ${e}`));
}

if (warnings.length > 0) {
  console.log("\n⚠️  Warnings:");
  warnings.forEach((w) => console.log(`  • ${w}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log("\n✅ Structure matches expected!");
} else {
  console.log("\n📊 Actual structure (for updating expected):");
  console.log(JSON.stringify(objectRealms, null, 2));
}
