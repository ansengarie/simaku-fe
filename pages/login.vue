<template>
    <section class="py-[50px] flex flex-col items-center justify-center px-4">
        <!-- <NuxtLogo/> -->
        <img src="~/assets/img/logo-fh.png" />
        <div class="text-[32px] font-semibold text-dark mt-[70px]">
            Sign In
        </div>
        <p class="mt-4 text-base leading-7 text-center mb-[50px] text-gre">
            Sistem Informasi Manajemen Keuangan
        </p>
        <form class="w-full card">
            <div class="form-group">
                <label for="" class="text-grey">Email Address</label>
                <input type="email" class="input-field">
            </div>
            <div class="form-group">
                <label for="" class="text-grey">Password</label>
                <input type="password" class="input-field">
            </div>
            <a href="index.html" class="w-full btn btn-primary mt-[14px]">
                Sign In
            </a>
            <!-- <button type="button" class="w-full btn btn-primary mt-[14px]">
                Sign In
            </button> -->
        </form>
    </section>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>