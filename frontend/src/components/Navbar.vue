<script>

</script>

<template>
    <nav class="navbar">
        <ul class="nb-items">
        <li class="nb-home" @click="showAllProducts">
            <router-link class="nb-item nb-home-space" to="/">
                <img class="nb-home-icon" src="/logo.png">
                <span >
                    Home
                </span>
            </router-link>
            <div class="nb-home-empty"></div>
        </li>
        <li class="nb-catg nb-item" @click="showAllProducts">All Products</li>
        <li class="nb-prod nb-item" @click="showAllCategories">All Categories</li>
        </ul>
  </nav>
  
</template>



<style>

    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #F68B1E;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        height: 4rem;
        z-index: 10;
        
    }
    .nb-items {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style-type: none;
        padding: 0 1.6rem 0 1rem;
        height: 100%;
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
        gap: 1rem;
    }
    .nb-item {
        transition: color 0.3s ease-in-out;
    }
    .nb-item:hover{
        cursor: pointer;
        color: #FFDAB5;

    }
    .nb-home {
        display: flex;
        align-items: center;
        justify-content: start;
        flex-grow: 1;
    }
    .nb-home-icon {
        width: 2.6rem;
        height: 2.6rem;
    }
    .nb-home-space {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        gap: 1rem;
    }
    .nb-home-empty {
        flex-grow: 1;
    }

    

</style>