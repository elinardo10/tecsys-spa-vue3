<template>
    <div>
        <div class="col-sm-12">
            <BAlert
                variant="warning"
                show
                class="alert-border alert-border-warning text-center mt-4 px-4 mb-0"
            >
                <i
                    class="uil uil-exclamation-triangle d-block display-4 mt-2 mb-3 text-warning"
                />
                <h5 class="text-warning">
                    Alerta
                </h5>
                <p> Deseja realmente deletar o produto {{ product.name }}? Essa ação não tem volta.</p>
            </BAlert>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ProductDelete',

        props: {
            product: {
                type: Object,
                default: () => ({}),
            },
        },

    };
</script>
