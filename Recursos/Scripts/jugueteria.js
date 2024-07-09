const { createApp } = Vue

createApp({
    data() {
        return {
            data: [],
            filterToy: [],
            filtroCopia: [],
            filtrados: [],
            valueInputSearch: "",
            filtroTotal: [],
            valueCheck: [],
            mensajeBuscando: "",
            modalVisible: false,
            idCarrito: "",
            carrito: [],
            mensajeConfirmacion: "",
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(response => response.json())
            .then((data) => {
                this.data = data
                this.filterToy = this.data.filter((product) => product.categoria == "jugueteria")
                this.filtroCopia = this.data.filter((product) => product.categoria == "jugueteria")
                this.filtroTotal = this.filterToy

            }).catch(err => err)
    },

    methods: {
        eventosModal(id) {
            this.filtrados = this.filterToy.find((juguete) => juguete._id == id)
            this.data = this.filtroInput()
        },
        filtroCheck(valueCheck) {
            this.mensajeBuscando = "buscando"
            this.filtroTotal = this.filterToy.filter((juguete) => juguete.producto.includes(valueCheck.toLowerCase()) || juguete.descripcion.includes(valueCheck.toLowerCase()))
        },
        filtroBusqueda() {
            this.modalVisible = true;
            this.mensajeBuscando = "Buscando...";
            this.filtroTotal = this.filterToy.filter((juguete) => juguete.producto.toLowerCase().includes(this.valueInputSearch.toLowerCase())
                || juguete.descripcion.toLowerCase().includes(this.valueInputSearch.toLowerCase()))
        },
        filtroTodos() {
            this.filtroTotal = this.filtroCopia
            console.log(this.filtroTotal)
        },

        capturarId(id) {
            this.idCarrito = id;
            this.carrito.push(this.filterToy.find(e => e._id == this.idCarrito))
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
}).mount('#app')