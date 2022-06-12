<script>
export default {
    name: 'AppButton',
    props: {
        tagProp:{
            tag: String,
            default:'div',
        },
        toProp:{
            route:String,
        },
        typeProp:{
            type:String,
        },
        valueProp:{
            value:String,
        },
        // classProp:{
        //     class:String,
        //     default:'bg-blue-700',
        // },
    },
    render(createElement){
        return createElement(this.tagProp, {
            // class can be inside to attrs too but it will not combined them !!! SOS
            class: 'app-btn',
            attrs: {
                to: this.toProp ? this.toProp : null,
                type: this.typeProp ? this.typeProp : null,
                value: this.valueProp ? this.valueProp : null,
                // class: `app-btn text-white ${this.classProp}`,
            },
            // on:{
            //     click: () => {
            //         alert(this.classProp)
            //     }
            // },
        }, [
            this.$slots.default
        ])
    },
}
</script>

<style>

</style>