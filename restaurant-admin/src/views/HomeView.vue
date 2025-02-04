<script setup lang="ts">
import MyNavigationItem from '@/components/MyNavigationItem.vue';

</script>

<template>

    <body class="bg-[--my-pure-white]">
        <header class="flex flex-row justify-evenly">
            <my-navigation-item link="/Home" label="home"/>
            <my-navigation-item link="/" label="orders"/>
            <my-navigation-item link="/" label="dishes"/>
            <my-navigation-item link="/" label="sales"/>
            <my-navigation-item link="/" label="statistics"/>
            <my-navigation-item link="/" label="client"/>
        </header>
    </body>
</template>