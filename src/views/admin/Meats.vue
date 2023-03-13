<template>
  <div class="main-container">
    <h1>Carnes</h1>
    <Message :msg="msg" v-show="msg" />
    <div id="table-container">
      <table>
        <thead id="meat-table-heading">
          <tr>
            <th class="order-id">#</th>
            <th>Carne:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody class="meat-table-rows">
          <tr class="meat-table-row" v-for="meat in meats" :key="meat.id">
            <td class="order-number">{{ meat.id }}</td>
            <td>{{ meat.meat_name }}</td>
            <td>
              <div id="button-container">
                <router-link class="action-btn" :to="{ name: 'MeatForm', params: { id: meat.id } }">Alterar</router-link>
                <button class="action-btn" @click="deleteMeat(meat.id)">Cancelar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link class="" to="/admin/meat">Criar novo registro</router-link>
  </div>
</template>

<script>

import Message from '../../components/Message.vue';

export default {
  name: 'Meats',
  data() {
    return {
      meats: null
    }
  },
  methods : {
    async getMeats() {
      const req = await fetch("http://localhost:8000/api/meat/dashboard");

      const data = await req.json();

      this.meats = data;
    },

    async deleteMeat(id) {
      const req = await fetch(`http://localhost:8000/api/meat/${id}`, {
        method: "DELETE"
      });

      const res = await req.json();

      if (res.error) {
        this.msg = `Erro ao remover o Registro!`;
      } else {
        this.msg = `Registro removido com sucesso!`;
      }

      setTimeout(() => this.msg = '', 3000);

      this.getMeats();
    }
  },

  mounted() {
    this.getMeats();
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

  #meat-table-heading th {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .meat-table-row {
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