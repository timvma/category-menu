const { createApp, reactive, toRefs,computed } = Vue

 const navigate =  createApp({
    setup() {
        const menus = [
            { parent:"main", handle:"basketball",    name:"Basketball" },
            { parent:"basketball", handle:"basketball-ball", name:"Ball"},
            { parent:"basketball", handle:"basketball-bag",    name:"Bag" },
            { parent:"basketball-ball", handle:"basketball-ball-5",  name:"Size 5",  link:"/" },
            { parent:"basketball-bag", handle:"basketball-bag-30l",  name:"30L",  link:"/" },
            { parent:"main", handle:'soccer',name:"Soccer",},
            { parent:"soccer", handle:"soccer-ball",  name:"Ball"  },
            { parent:"soccer-ball", handle:"soccer-ball-5", name:"30L", link:"/" }
        ]

        const state = reactive({
            menu:null,
            history:['main'],
            lists: computed(()=> {
                console.log(state.history.at(-1))
                return menus.filter(menu => state.history.at(-1) == menu.parent)
            })                
        })
    
        function openMenu (){
            state.menu.classList.toggle('menu--active')
            state.current = "main"
        }

        function navigate(list){
           state.history.push(list.handle)
        }

        function back(){
            if(state.history.at(-1) == 'main')
                return state.menu.classList.toggle('menu--active')
            state.history.pop()
        }

        return {
            ...toRefs(state),
            openMenu,
            navigate,
            back,
            menus
        }
    }
  })
  
  
navigate.mount('#navigation')
