<template>
  <div class="form-group">
    <label :for="inputId" class="text-grey">
      {{ label }}
      <img
        v-if="tooltip"
        :src="tooltipIcon"
        alt=""
        class="ml-2 cursor-pointer"
        :title="tooltip"
      />
    </label>
    <input
      :type="type"
      :id="inputId"
      :value="value"
      @input="updateValue"
      :class="inputClass"
      :disabled="isDisabled"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    inputId: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: '',
    },
    tooltipIcon: {
      type: String,
      default: '~/assets/img/ic_info.png',
    },
  },
  computed: {
    inputClass() {
      return this.isDisabled ? 'bg-gray-300 input-field' : 'input-field'
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
