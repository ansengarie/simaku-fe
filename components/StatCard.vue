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
          <a href="#">
            <img
              src="../assets/img/ic_tambah.png"
              alt=""
              class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
            />
          </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'total'],
}
</script>
