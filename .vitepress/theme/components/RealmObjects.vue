<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  realm: string;
}>();

// Expected structure from verify-docs.js
const expectedStructure: Record<string, string[]> = {
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
  "Friend Request": ["Users"],
  Invite: ["Users", "Groups", "Sections"],
  Network: ["Users"],
  Groups: ["Users"],
  Requests: ["Users"],
  Role: [],
  "Private Messaging": [],
  Search: [],
  "Resource Collections": [],
  "Resource Templates": [],
  Like: [],
  Poll: [],
};

const realmsInsideRealms: Record<string, string[]> = {
  "7-Section": ["Users", "Courses"],
  "5-Group": ["Users"],
};

// Helper for case-insensitive matching while preserving original names
const includesRealm = (list: string[], realm: string) =>
  list.some((r) => r.toLowerCase() === realm.toLowerCase());

// Objects that belong to the given realm (same as before, but case-insensitive)
const objectsInRealm = computed(() => {
  return Object.entries(expectedStructure)
    .filter(([_, realms]) => includesRealm(realms, props.realm))
    .map(([objectName]) => objectName)
    .sort((a, b) => a.localeCompare(b));
});

// "Realms" that live inside the current realm (e.g., Sections live inside Users)
const innerRealmsInThisRealm = computed(() => {
  return Object.entries(realmsInsideRealms)
    .filter(([_, parentRealms]) => includesRealm(parentRealms, props.realm))
    .map(([realmName]) => realmName)
    .sort((a, b) => a.localeCompare(b));
});

const getObjectUrl = (objectName: string) => {
  return `../4-API: Objects/${objectName}.html`;
};

const getRealmUrl = (realmName: string) => {
  return `./${realmName}.html`;
};
</script>

<template>
  <p v-if="objectsInRealm.length === 0" class="none">No objects exist in this realm.</p>
  <ul v-if="objectsInRealm.length > 0">
    <li v-for="object in objectsInRealm" :key="object">
      <a :href="getObjectUrl(object)">{{ object }}</a>
    </li>
  </ul>

  <hr v-if="innerRealmsInThisRealm.length > 0" />
  <ul v-if="innerRealmsInThisRealm.length > 0">
    <li v-for="r in innerRealmsInThisRealm" :key="r">
      <a :href="getRealmUrl(r)">{{ r.split("-")[1] }}</a>
    </li>
  </ul>
</template>

<style scoped>
.realm-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
}

.realm-title {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  font-weight: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-inline: -1rem;
}

ul li {
  margin: 0;
  flex-grow: 1;
}

ul a {
  display: block;
  padding-block: 0.25rem;
  padding-inline: 1rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

ul a:hover {
  text-decoration: underline;
}
</style>