<template>
  <div v-if="message" :class="flashClass">
    {{ message }}
    <button @click="closeMessage" class="ml-4 text-white">X</button>
  </div>
</template>

<script>
export default {
  props: ['type', 'message', 'autoClose'],
  data() {
    return {
      timeoutId: null,
    }
  },
  computed: {
    flashClass() {
      return [
        'fixed top-0 right-0 mt-4 mr-4 p-4 rounded-lg shadow-lg z-50',
        {
          'bg-red-500 text-white': this.type === 'error',
          'bg-green-500 text-white': this.type === 'success',
        },
      ]
    },
  },
  methods: {
    closeMessage() {
      this.$emit('clearMessage')
    },
  },
  watch: {
    message(newVal) {
      if (this.autoClose && newVal) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          this.closeMessage()
        }, this.autoClose)
      }
    },
  },
}
</script>
