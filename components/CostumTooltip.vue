<template>
  <div class="relative inline-block">
    <slot></slot>
    <div
      v-if="showTooltip"
      class="absolute p-2 text-white bg-gray-800 rounded shadow-md tooltip-text"
    >
      <slot name="tooltip-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTooltip: false,
    }
  },
  methods: {
    show() {
      this.showTooltip = true
    },
    hide() {
      this.showTooltip = false
    },
  },
}
</script>

<style scoped>
.tooltip-text {
  @apply hidden;
}
</style>
