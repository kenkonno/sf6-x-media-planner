<template>
  TopPage
</template>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  border-bottom: 1px solid #dee2e6;
}

.company-logo-area {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: #f8f9fa;
}

.company-logo {
  max-width: 100%;
  max-height: 50px;
  object-fit: contain;
}

.navbars-wrapper {
  flex-grow: 1;
}

.navbar {
  padding: 0;
  height: 30px;
  font-size: 0.8rem;

  > div {
    > a, div {
      display: block;
      margin-left: 5px;
      color: inherit;
      padding: 0;
      text-decoration: inherit;
      border-bottom: 1px solid black;

      > .material-symbols-outlined {
        vertical-align: middle;
        font-size: 1rem;
      }

      .text {
        vertical-align: middle;
      }
    }
  }
}
</style>

<script setup lang="ts">
</script>