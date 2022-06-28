<template>
    <div tabindex="0" class="app-ball">
        <slot>
            {{ numProp }}
        </slot>
    </div>
</template>

<script>
export default {
    props:{
        numProp:{
            number:Number,
            require:true,
        },
    }
}
</script>

<style>

</style>