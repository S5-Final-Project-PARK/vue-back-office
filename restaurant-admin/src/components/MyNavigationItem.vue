<script lang="ts">

export default {
    props: {
        link: { type: String, default: "/" },
        label: { type: String, required: true }
    }
}
</script>
<template>
    <a :href="link" class="px-8 py-4 w-full justify-items-stretch bg-(--my-primary)">
        <h1 class="font-montserrat font-bold uppercase text-(--my-white)">{{ label }}</h1>
    </a>
</template>