<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white rounded shadow-md">
        <div class="p-4">
          <button @click="close" class="float-right text-lg cursor-pointer">
            &times;
          </button>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: ['close'],
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
})
</script>

<style scoped>
/* Scoped styles for the modal component */
</style>
