<template>
  <div class="modal">
    <div class="modal-content">
      <img
        src="~/assets/img/ic_round-warning.svg"
        class="flex justify-center m-auto mt-[30px] w-[75px]"
        alt=""
      />
      <p class="text-caution mt-[14px] font-bold">Peringatan!</p>
      <p class="text-normal mt-[7px]">
        Apakah kamu yakin ingin menghapus data {{ name }}?
      </p>
      <p class="text-danger mt-[19px] mb-[38px]">
        Kamu tidak dapat membatalkan tindakan ini.
      </p>
      <div class="modal-actions mb-[40px]">
        <button @click="cancelDelete" class="logout-cancel mr-[51px]">
          Batal
        </button>
        <button @click="confirmDelete" class="logout-button">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name'],
  methods: {
    cancelDelete() {
      this.$emit('cancel')
    },
    confirmDelete() {
      this.$emit('confirm', this.id)
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  width: 653px;
  height: 357px;
  flex-shrink: 0;
}

.modal-actions {
  margin-top: 20px;
}

.logout-button {
  color: #fff;
  border-radius: 100px;
  background: #da241a;
  padding: 8px 16px;
  cursor: pointer;
  width: 260px;
  height: 46px;
  flex-shrink: 0;
}

.logout-cancel {
  color: #fff;
  border-radius: 100px;
  background: #abb3c4;
  padding: 8px 16px;
  cursor: pointer;
  width: 260px;
  height: 46px;
  flex-shrink: 0;
}

.text-label {
  color: #121f3e;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}

.text-normal {
  color: #121f3e;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.text-danger {
  color: #da241a;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
