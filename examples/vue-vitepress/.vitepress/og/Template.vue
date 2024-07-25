<script setup lang="ts">
defineProps<{ title: string, desc: string, site: string }>()
</script>

<template>
    <div
        style="background-image: linear-gradient(135deg, rgb(27, 26, 28), rgb(6, 6, 7) 10%, rgb(25, 95, 60) 50%, rgb(16, 15, 16) 80%);"
        class="w-full h-full text-1.4rem text-white flex flex-col items-center justify-between px-2rem py-2rem"
    >
        <div class="flex w-full">
            <svg viewBox="0 0 128 128" width="50" height="50">
                <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"></path>
                <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"></path>
            </svg>
        </div>
        <div class="w-full flex relative mt--20 px-30 flex-col justify-center items-center">
            <div class="text-2.8rem font-bold" style="white-space: pre-wrap;" v-html="title" />
            <div class="text-1.6rem text-neutral-400 text-center w-70%" style="white-space: pre-wrap;" v-html="desc" />
        </div>
        <div class="w-full flex items-center justify-end">
            <div class="flex items-center text-zinc-500 text-0.9rem">
                <span class="text-neutral-500 border-b border-neutral-400 ml-2" v-html="site" />
            </div>
        </div>
    </div>
</template>
