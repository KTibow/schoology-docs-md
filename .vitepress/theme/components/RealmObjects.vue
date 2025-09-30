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
  Sections: ["Users"],
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

const objectsInRealm = computed(() => {
  return Object.entries(expectedStructure)
    .filter(([_, realms]) => realms.includes(props.realm))
    .map(([objectName]) => objectName)
    .sort();
});

const getObjectUrl = (objectName: string) => {
  return `/4-API: Objects/${objectName}.html`;
};
</script>

<template>
  <p v-if="objectsInRealm.length === 0">No objects exist in this realm.</p>
  <ul v-else class="realm-objects-list">
    <li v-for="object in objectsInRealm" :key="object">
      <a :href="getObjectUrl(object)">{{ object }}</a>
    </li>
  </ul>
</template>

<style scoped>
.realm-objects-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-inline: -1rem;
}

.realm-objects-list li {
  margin: 0;
  flex-grow: 1;
}

.realm-objects-list a {
  display: block;
  padding-block: 0.25rem;
  padding-inline: 1rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.realm-objects-list a:hover {
  text-decoration: underline;
}
</style>
