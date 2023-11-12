
<script >

    import Categories from '@/components/Categories.vue';
    import { fetchData } from '@/services/api';

    export default {
    components: {
        Categories,
    },
    data() {
        return {
            fetchedData: null,
        };
    },
    mounted() {

        this.fetchDataFromBackend();
    },
    methods: {
        async fetchDataFromBackend() {
            this.fetchedData = await fetchData('data');
        },
    },
};

</script>

<template>
    <div class="home">

        <Categories />
    </div>
  
</template>

<style>
    .home {
        margin-top: 4rem;
    }

</style>