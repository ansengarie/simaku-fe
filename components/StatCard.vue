<template>
  <div class="card !gap-y-10 min-h-[200px]">
    <div class="flex items-center justify-between">
      <div>
        <p class="overflow-hidden text-grey whitespace-nowrap">
          {{ title }}
        </p>
        <div class="text-[32px] font-bold text-dark mt-[6px]">
          {{ total }}
        </div>
      </div>
      <div>
        <button>
          <nuxt-link :to="`manage-pegawai/${endpoint}`">
            <img
              src="../assets/img/ic_tambah.png"
              alt="Icon Tambah"
              class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
            />
          </nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'total', 'endpoint'],
}
</script>
