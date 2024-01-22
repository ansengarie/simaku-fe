<template>
  <div class="tooltip-container">
    <slot></slot>
    <div v-if="showTooltip" class="tooltip">
      {{ tooltipText }}
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
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleTooltip() {
      this.showTooltip = !this.showTooltip
    },
  },
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
