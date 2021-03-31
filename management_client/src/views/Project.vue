<template>
  <div>
    <project-header></project-header>
    <project-side></project-side>
    <project-main></project-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectHeader from "../components/project/ProjectHeader.vue"
import ProjectSide from "../components/project/ProjectSide.vue"
import ProjectMain from "../components/project/ProjectMain.vue"

export default defineComponent({
  name: 'Project',
  components: {
    ProjectHeader,
    ProjectSide,
    ProjectMain
  },
  setup() {

  }
})
</script>

<style lang="scss">

</style>