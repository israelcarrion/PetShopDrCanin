const { createApp } = Vue;

createApp({
  data() {
    return {
      farmacia: [],
      idModal:[],
      filtrados: [],
      idCarrito:"",
      carrito: [],
      total:0
    };
  },
  created(){
    fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then(response => response.json())
    .then(( data ) => {
        this.farmacia = data.filter( e => e.categoria == "farmacia" );
    })
  },
  methods:{
    eventosModal(id) {
        this.filtrados = this.farmacia.find((juguete) => juguete._id == id)
        console.log(this.filtrados)
    },
    /*Con esta funcion capturo el id cuando le dan al boton de añadir a carrito */
    capturarId(id){
      this.idCarrito = id;
      this.carrito.push(this.farmacia.find(e => e._id == this.idCarrito))
      let acumulador = 0
      this.carrito.forEach(element => {
        acumulador += element.precio
      });
      this.total= acumulador;
    },
  },
}).mount("#app");