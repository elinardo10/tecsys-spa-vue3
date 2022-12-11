<template>       
 <div class="row">
    <div class="col-lg-12">
        <div class="col-md-4">
            <div>
                <button
                    type="button"
                    class="btn btn-primary mb-3"
                    @click.prevent="onAdd"
                    >
                        <i class="mdi mdi-plus me-1" /> Adicionar Produto
                </button>
        </div>
    </div>

   <ProductTable 
        :products="data" 
        @updateClicked="onUpdate"
        @deleteClicked="onDelete"
    />

    <BModal
        id="modal-standard"
        v-model="modalOpen"
        :title="`Edição do produto ${productObj.name}`"
        title-class="font-18"
        hide-footer
    >
      <ProductForm
            :product="productObj"
            @update="afterUpdate"
        />
    </BModal>

    <BModal
        id="modal-center"
        v-model="modalDelete"
        hide-header
        @ok="afterDelete"
    >
        <ProductDelete
            :product="productObj"
        />
    </BModal>
</div>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import ProductTable from '../../components/Product/ProductTable.vue';
import ProductForm from '../../components/Product/ProductForm.vue';
import ProductDelete from '../../components/Product/ProductDelete.vue';
import { useFetch } from '../../composables/useFetch.js';
const router = useRouter()
const modalOpen = ref(false);
const modalDelete = ref(false);
const productObj = ref({});
const apiUrl = import.meta.env.VITE_API_URL;

const { data } =  await useFetch('api/v1/products', { method:'get' });

function onAdd() {
    router.push({path: '/products/create'});
};

function onUpdate(product) {
    productObj.value = product;
    modalOpen.value = true;
};

function onDelete(product) {
    productObj.value = product;
    modalDelete.value = true;
};

function afterStore(product) {
    data.push(product);
};

function afterUpdate(product) {
    const index = data.findIndex(o => o.id === product.id);
    data.splice(index, 1, product);
    closeModal();
};

function afterDelete() {
    fetch(`${apiUrl}/api/v1/products/${productObj.value.id}`, {
          method:'delete',
          headers: {
          'content-type': 'application/json',
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "*"
          },
      }).then(() => {
        const index = data.findIndex(o => o.id === productObj.value.id);
        data.splice(index, 1);
        closeModal();
    });
}; 

function closeModal() {
    modalOpen.value = false;
    modalDelete.value = false;
};

</script>