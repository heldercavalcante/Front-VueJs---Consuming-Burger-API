<template>
  <div class="main-container">
    <h1>Defina um tipo de Carne</h1>
    <div>
      <Message :msg="msg" v-show="msg" />
      <div>
        <form id="burger-form" @submit.prevent="onSubmit">
          <div class="input-container">
            <label for="name">Nome da carne:</label>
            <input type="text" id="name" name="name" v-model="meat_name" placeholder="Digite o tipo da carne">
          </div>
          <div class="input-container">
            <input type="submit" class="submit-btn" :value="meat_id ? 'Alterar registro' : 'Criar registro'">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../Message.vue';

export default {
  name: 'MeatForm',
  components: {
    Message
  },
  data() {
    return {
      msg: null,
      meat_name: null,
      meat_id: null
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.meat_id = this.$route.params.id;
      this.getMeatById(this.$route.params.id);
    }
  },
  methods: {
    onSubmit () {
      if (this.meat_id) {
        this.updateRegister(this.meat_id);
      } else {
        this.createRegister();
      }
    },
    async createRegister () {
      const data = { meat_name : this.meat_name };

      const dataJson = JSON.stringify(data);

      const req = await fetch("http://localhost:8000/api/meat", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: dataJson
      });

      const res = await req.json();

      this.msg = `Cadastro N° ${res.data.id} realizado com sucesso!`;

      setTimeout(() => {
        this.msg = '';
        this.meat_name = '';
        window.location.href = '/admin/meat/show';
      }, 3000);
    },

    async updateRegister(id) {
      
      const data = { meat_name : this.meat_name };

      const dataJson = JSON.stringify(data);

      const req = await fetch(`http://localhost:8000/api/meat/update/${id}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: dataJson
      });

      const res = await req.json();

      this.msg = `Cadastro N° ${res.data.id} alterado com sucesso!`;

      setTimeout(() => {
        this.msg = '';
        this.meat_name = '';
        window.location.href = '/admin/meat/show';
      }, 3000);
    },

    async getMeatById(id) {
      const req = await fetch(`http://localhost:8000/api/meat/edit/${id}`);
      const data = await req.json();
      this.meat_name = data.meat_name;
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