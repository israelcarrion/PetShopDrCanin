const app = Vue.createApp({
  data() {
    return {
      selectedSubject: '',
      form: {
        name: '',
        email: '',
        telephone: '',
        message: '',
        otherPet: ''
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.name && this.form.email && this.form.telephone && this.form.message && 
          (this.selectedSubject || (this.selectedSubject === 'Otro' && this.form.otherPet))) {
        var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {});
        myModal.show();
        this.resetForm();
      } else {
        alert("Por favor, rellene todos los campos antes de enviar.");
      }
    },
    filterNumbers() {
      let numbersOnly = Array.from(this.form.telephone).filter(char => !isNaN(char)).join('');
      this.form.telephone = numbersOnly;
    },
    closeModal() {
      var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {});
      myModal.hide();
    },
    resetForm() {
      this.form.name = '';
      this.form.email = '';
      this.form.telephone = '';
      this.form.message = '';
      this.form.otherPet = '';
      this.selectedSubject = '';
    },
    onSubjectChange() {
      // Aquí puedes añadir lógica adicional si es necesario
    }
  }
});

app.mount('#app');
