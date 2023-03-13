<template>
  <div class="main-container">
    <h1>Pães</h1>
    <Message :msg="msg" v-show="msg" />
    <div id="table-container">
      <table>
        <thead id="bread-table-heading">
          <tr>
            <th>#</th>
            <th>Pão:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody class="bread-table-rows">
          <tr class="bread-table-row" v-for="bread in breads" :key="bread.id">
            <td>{{ bread.id }}</td>
            <td>{{ bread.bread_name }}</td>
            <td>
              <div id="button-container">
                <router-link class="action-btn" :to="{ name: 'BreadForm', params: { id: bread.id } }">Alterar</router-link>
                <button class="action-btn" @click="deleteBread(bread.id)">Cancelar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link class="" to="/admin/bread">Criar novo registro</router-link>
  </div>
</template>

<script>

import Message from '../../components/Message.vue';

export default {
  name: 'Breads',
  data() {
    return {
      breads: null
    }
  },
  methods : {
    async getBreads() {
      const req = await fetch("http://localhost:8000/api/bread/dashboard");

      const data = await req.json();

      this.breads = data;
    },

    async deleteBread(id) {
      const req = await fetch(`http://localhost:8000/api/bread/${id}`, {
        method: "DELETE"
      });

      const res = await req.json();

      if (res.error) {
        this.msg = `Erro ao remover o Registro!`;
      } else {
        this.msg = `Registro removido com sucesso!`;
      }

      setTimeout(() => this.msg = '', 3000);

      this.getBreads();
    }
  },

  mounted() {
    this.getBreads();
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

  #bread-table-heading th {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .bread-table-row {
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