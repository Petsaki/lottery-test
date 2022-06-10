<script>
export default {
    name: 'AppButton',
    props: {
        tagProp:{
            link: Boolean,
            default:false,
        },
        toProp:{
            route:String,
        },
        // classProp:{
        //     class:String,
        //     default:'bg-blue-700',
        // },
    },
    render(createElement){
        return createElement(this.tagProp ? 'router-link' : 'div', {
            // class can be inside to attrs too but it will not combined them !!! SOS
            class: 'app-btn text-white',
            attrs: {
                to: this.toProp ? this.toProp : null,
                // class: `app-btn text-white ${this.classProp}`,
            },
            on:{
                click: () => {
                    alert(this.classProp)
                }
            },
        }, [
            this.$slots.default
        ])
    },
}
</script>

<style>

</style>