<script>

export default {
    computed: {
        fetchedData() {
        return this.$store.getters.getFetchedData;
        },
    },

};

</script>

<template>
    <div class="categories">
        <h2 class="ct-title">
            CATEGORIES 
        </h2>
        <div class="ct-items">
            <div class="ct-item" v-for="(item, index) in fetchedData" :key="index">
                <img class="ct-item-img" :src="item.category_img">
                <span class="ct-item-title">
                    {{ item.category_name }}
                </span>
                <router-link class="ct-item-overlay" :to="{ name: 'products', params: { id: index } }"></router-link>

            </div>

        </div>

    </div>
  
</template>



<style>
    .categories {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;


    }
    .ct-title {
        color: #F68B1E;
        font-size: 3rem;
        font-weight: 600;
        padding-top: 4rem;
        padding-bottom: 4rem;
    }
    .ct-items {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.6rem;
    }
    .ct-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 16rem;
        padding: 0.5rem;
        transition: width 0.3s ease, padding 0.3s ease;
    }
    .ct-item:hover {
        position: relative;
        cursor: pointer;
        width: 17rem;
        padding: 0rem;
        z-index: 10;
    }
    .ct-item-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: background-color 0.3s ease;
    }
    .ct-item:hover  .ct-item-overlay{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;

        border-radius: 0.3rem;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .ct-item-img {
        border-radius: 0.3rem;
        width: 100%;
    }
    .ct-item-title {
        font-size: 1.2rem;
        font-weight: 600;
    }

</style>