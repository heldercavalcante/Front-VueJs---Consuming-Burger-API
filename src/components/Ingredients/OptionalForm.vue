<template>
  <div class="main-container">
    <h1>Defina o Opcional</h1>
    <div>
      <Message :msg="msg" v-show="msg" />
      <div>
        <form id="burger-form" @submit.prevent="onSubmit">
          <div class="input-container">
            <label for="name">Nome do Opcional:</label>
            <input type="text" id="name" name="name" v-model="opt_name" placeholder="Digite o opcional">
          </div>
          <div class="input-container">
            <input type="submit" class="submit-btn" :value="optional_id ? 'Alterar registro' : 'Criar registro'">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../Message.vue';

export default {
  name: 'OptionalForm',
  components: {
    Message
  },
  data() {
    return {
      msg: null,
      opt_name: null,
      optional_id: null
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.optional_id = this.$route.params.id;
      this.getOptionalById(this.$route.params.id);
    }
  },
  methods: {
    onSubmit () {
      if (this.optional_id) {
        this.updateRegister(this.optional_id);
      } else {
        this.createRegister();
      }
    },
    async createRegister () {
      const data = { opt_name : this.opt_name };

      const dataJson = JSON.stringify(data);

      const req = await fetch("http://localhost:8000/api/optional", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: dataJson
      });

      const res = await req.json();

      this.msg = `Cadastro N° ${res.data.id} realizado com sucesso!`;

      setTimeout(() => {
        this.msg = '';
        this.opt_name = '';
        window.location.href = '/admin/optional/show';
      }, 3000);
    },

    async updateRegister(id) {
      
      const data = { opt_name : this.opt_name };

      const dataJson = JSON.stringify(data);

      const req = await fetch(`http://localhost:8000/api/optional/update/${id}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: dataJson
      });

      const res = await req.json();

      this.msg = `Cadastro N° ${res.data.id} alterado com sucesso!`;

      setTimeout(() => {
        this.msg = '';
        this.opt_name = '';
        window.location.href = '/admin/optional/show';
      }, 3000);
    },

    async getOptionalById(id) {
      const req = await fetch(`http://localhost:8000/api/optional/edit/${id}`);
      const data = await req.json();
      this.opt_name = data.opt_name;
    }
  }
}
</script>

<style scoped>
  #burger-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #FCBA03;
  }

  input {
    padding: 5px 10px;
    width: 300px;
    margin-bottom: 20px;
    
  }

  .submit-btn {
    background-color: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>