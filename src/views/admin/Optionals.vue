<template>
  <div class="main-container">
    <h1>Opcionais</h1>
    <Message :msg="msg" v-show="msg" />
    <div id="table-container">
      <table>
        <thead id="optional-table-heading">
          <tr>
            <th>#</th>
            <th>Opcional:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody class="optional-table-rows">
          <tr class="optional-table-row" v-for="optional in optionals" :key="optional.id">
            <td>{{ optional.id }}</td>
            <td>{{ optional.opt_name }}</td>
            <td>
              <div id="button-container">
                <router-link class="action-btn" :to="{ name: 'OptionalForm', params: { id: optional.id } }">Alterar</router-link>
                <button class="action-btn" @click="deleteOptional(optional.id)">Cancelar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link class="" to="/admin/optional">Criar novo registro</router-link>
  </div>
</template>

<script>

import Message from '../../components/Message.vue';

export default {
  name: 'Optionals',
  data() {
    return {
      optionals: null
    }
  },
  methods : {
    async getOptionals() {
      const req = await fetch("http://localhost:8000/api/optional/dashboard");

      const data = await req.json();

      this.optionals = data;
    },

    async deleteOptional(id) {
      const req = await fetch(`http://localhost:8000/api/optional/${id}`, {
        method: "DELETE"
      });

      const res = await req.json();

      if (res.error) {
        this.msg = `Erro ao remover o Registro!`;
      } else {
        this.msg = `Registro removido com sucesso!`;
      }

      setTimeout(() => this.msg = '', 3000);

      this.getOptionals();
    }
  },

  mounted() {
    this.getOptionals();
  },
  components: {Message}
}
</script>

<style scoped>

table {
    margin: 0 auto;
    width: 60%;
    text-align: center;
    border-collapse: collapse;
  }

  #optional-table-heading th {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .optional-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #button-container {
    display: flex;
    justify-content: center;
  }

  .action-btn {
    background-color: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
    margin: 2px 2px;
    cursor: pointer;
    transition: .5s;
    width: 100px;
  }

  .action-btn:hover {
    background-color: transparent;
    color: #222;
  }

  a.action-btn {
    text-decoration: none;
  }

</style>