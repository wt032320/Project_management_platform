<template>
  <div class="project">
    <project-header class="header"></project-header>
    <div class="project-area">
      <project-side></project-side>
      <project-main></project-main>
    </div>
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
.project {
  position: absolute;
  width: 100%;
  height: 100%;
  .header {
    height: 5%;
  }
  .project-area {
    height: 95%;
    background-color: rgba(241, 242, 243, $alpha: 1);
    display: flex;
  }
}

</style>