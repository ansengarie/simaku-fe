<!-- BankDropdown.vue -->
<template>
  <div class="form-group">
    <label :for="formId" class="text-grey">{{ formLabel }}</label>
    <select v-model="selectedBankValue" :id="formId" class="input-field">
      <option value="Pilih Bank" selected="true" disabled="disabled">Pilih Bank</option>
      <option v-for="bank in banks" :key="bank.value" :value="bank.value">
        {{ bank.label }}
      </option>
    </select>
    <!-- Tambahan elemen lainnya sesuai kebutuhan -->
  </div>
</template>

<script>
export default {
  props: {
    banks: Array,
    selectedBank: String,
    formLabel: String,
    formId: String,
  },
  computed: {
    // Gunakan computed property untuk mendapatkan label terkait dengan nilai yang dipilih
    selectedBankValue: {
      get() {
        return this.selectedBank
      },
      set(newValue) {
        // Emit event untuk memberitahu halaman bahwa nilai berubah
        this.$emit('update:selectedBank', newValue)
      },
    },
  },
}
</script>
