<template>       
 <div class="row">
    <ProductForm @afterStore="afterStore"/>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import ProductForm from '../../components/Product/ProductForm.vue';

const router = useRouter()


function afterStore() {
    router.push({path: '/products'});
};
</script>