<script setup lang="ts">
import MyNavigationItem from './MyNavigationItem.vue';

</script>
<template>
    <header class="flex flex-row justify-evenly">
        <my-navigation-item link="/Home" label="home" />
        <my-navigation-item link="/" label="orders" />
        <my-navigation-item link="/Dishes" label="dishes" />
        <my-navigation-item link="/Statistics" label="statistics" />
        <my-navigation-item link="/" label="client"/>
        <my-navigation-item link="/" label="You"/>
    </header>
</template>