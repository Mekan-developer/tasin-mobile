<template>
  <div class="header">
    <ProjectLogo class="header-logo" />
    <ThemeToggle class="header-toggle" />
  </div>
</template>

<script setup>
import ProjectLogo from '@/components/icons/ProjectLogo.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'



</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.header-logo {
  flex-shrink: 0;
}

.header-toggle {
  flex-shrink: 0;
  color: var(--text-primary);
  transition: color 0.3s;
}
</style>
