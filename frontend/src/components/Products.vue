<script>
export default {
    computed: {
        productId() {
            return this.$route.params.id;
        },
        isIdValid() {
            return this.productId < this.fetchedData.length && this.productId >= 0;
        },
        fetchedData() {
            return this.$store.getters.getFetchedData;
        },
    },

};
</script>

<template>
    <div class="products" v-if="isIdValid">
        <div class="pr-title-wrap">

            <h2 class="pr-title"> 
                {{fetchedData[productId].category_name}} 
            </h2>
        </div>
        <div class="pr-products">
            <div class="pr-items">
                <div class="pr-item" v-for="(item, index) in fetchedData[productId].products" :key="index">
                    
                    <img class="pr-item-img" :src="item.images">

                    <div class="pr-item-details">
                        <div class="pr-item-id">

                            <span class="pr-item-id-brand">
                                {{ item.brand }}
                            </span>
                            <span class="pr-item-id-name">
                                {{ item.name }}
                            </span>
                            <a class="pr-item-id-btn" :href="item.url" target="_blank">
                                Navigate to source
                            </a>
                        </div>
                        <div class="pr-item-val">
                            <div class="pr-item-val-prc">
                                {{ item.price }}
                            </div>
                            <div class="pr-item-val-oprc">
                                <span class="pr-val-oprc-val">

                                    {{ item.old_price }}
                                </span>
                                <span class="pr-val-oprc-dsc">
                                    {{ item.price_discount }}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


  
</template>



<style>

    .products {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.2rem 0.6rem 0.6rem 0.6rem;
        margin-top: 4rem;
        max-width: 60rem;
        box-sizing: border-box;

    }
    .pr-title-wrap {
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 4rem;

    }
    .pr-title {
        padding: 1rem;
        font-size: 1.3rem;
        font-weight: 600;
    }
    .pr-items {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
    .pr-item {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 0.4rem;
        padding: 0.6rem;
        height: 15rem;

    }
    .pr-item-details {
        display: flex;
        align-items: center;
        flex-grow: 1;
        height: 100%;

    }
    .pr-item-id {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 0.8rem;
        gap: 0.6rem;
        height: 100%;
    }
    .pr-item-img {

        width: 22%;
        object-fit: cover;
    }
    .pr-item-val {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        flex-grow: 1;
        height: 100%;

    }
    .pr-item-id-btn {
        width: max-content;
        padding: 0.4rem 0.8rem;
        border: none;
        text-decoration: none;
        border-radius: 0.2rem;
        background-color: #F68B1E;
        font-size: 1rem;
        font-weight: 500;
        color: white;
        transition: background-color 0.3s ease-in-out;
    }
    .pr-item-id-btn:hover {
        background-color: #ffa74f;

    }
    .pr-item-id-name {
        font-size: 1.1rem;
    }
    .pr-item-id-brand {
        font-size: 1.7rem;
        font-weight: 400;

    }
    .pr-item-val-prc {
        font-size: 0.96rem;
        font-weight: 600;
        text-align: end;
        min-width: max-content;
    }
    .pr-item-val-oprc {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 0.3rem;
        text-align: end;
        min-width: max-content;
    }
    .pr-val-oprc-val {
        text-decoration: line-through;
        color: #939184;
    }
    .pr-val-oprc-dsc {
        padding: 0.2rem;
        background-color: #F9EEE2;
        color: #F68B1E;
        border-radius: 0.2rem;
        font-weight: 500;
    }


    @media (max-width: 700px) {
        .pr-item-id {
            padding-right: 0;

        }
        .pr-item-details {
            flex-direction: column;
            justify-content: start;
            align-items: start;
            gap: 0.3rem;

        }
        .pr-item-val {
            width: 100%;
        }
        .pr-item {
            height: max-content;
        }
}


</style>