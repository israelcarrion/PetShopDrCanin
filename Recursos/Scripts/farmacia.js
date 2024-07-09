const { createApp } = Vue;

createApp({
  data() {
    return {
      farmacia: [],
      idModal: [],
      filtrados: [],
      idCarrito: "",
      carrito: [],
      total: 0,
      filtroTotal: [],
      filtroCopia: [],
      valueInputSearch: "",
      mensajeConfirmacion: "",
    };
  },
  created() {
    fetch('https://mindhub-xj03.onrender.com/api/petshop')
      .then(response => response.json())
      .then((data) => {
        this.farmacia = data.filter(e => e.categoria == "farmacia");
        this.filtroCopia = data.filter(e => e.categoria == "farmacia");
        this.filtroTotal = this.farmacia
      })
  },
  methods: {
    eventosModal(id) {
      this.filtrados = this.farmacia.find((juguete) => juguete._id == id)
      console.log(this.filtrados)
    },
    filtro() {
      this.modalVisible = true;
      this.mensajeBuscando = "Buscando...";
      this.filtroTotal = this.farmacia.filter((e) => e.producto.toLowerCase().includes(this.valueInputSearch.toLowerCase())
        || e.descripcion.toLowerCase().includes(this.valueInputSearch.toLowerCase()))
    },
    filtroCheck(valueCheck) {
      this.mensajeBuscando = "buscando"
      this.filtroTotal = this.farmacia.filter((e) => e.producto.includes(valueCheck.toLowerCase()) || e.descripcion.includes(valueCheck.toLowerCase()) || e.producto.includes("Cepillo"))

    },
    filtroTodos() {
      console.log(this.filtroTotal = this.filtroCopia)

    },

    capturarId(id) {
      this.idCarrito = id;
      this.carrito.push(this.farmacia.find(e => e._id == this.idCarrito))
      let acumulador = 0
      this.carrito.forEach(element => {
        acumulador += element.precio
      });
      this.total = acumulador;

      this.mensajeConfirmacion = "El producto fue añadido al carrito.";

      setTimeout(() => {
        this.mensajeConfirmacion = "";
      }, 2000);
    },
  },
}).mount("#app");