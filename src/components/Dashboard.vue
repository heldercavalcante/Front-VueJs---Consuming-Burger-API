<template>
  <div class="burger-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
      <div class="burger-table-rows">
        <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
          <div class="order-number">{{ burger.id }}</div>
          <div>{{ burger.client }}</div>
          <div>{{ burger.bread_name }}</div>
          <div>{{ burger.meat_name }}</div>
          <div>
            <ul>
              <li v-for="(opcional, index) in burger.optionals" :key="index">
                {{ opcional.opt_name }}
              </li>
            </ul>
          </div>
          <div>
            <select name="status" class="status" @change="updateBurger($event, burger.id)">
              <option value="">Selecione</option>
              <option v-for="s in status" :key="s.id" :value="s.id" :selected="burger.status == s.id">
                {{ s.name }}
              </option>
            </select>
            <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
export default {
  name: 'Dashboard',
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [
                {
                  "id": 1,
                  "name": "Solicitado"
                },
                {
                  "id": 2,
                  "name": "Em produção"
                },
                {
                  "id": 3,
                  "name": "Finalizado"
                }
            ],
      msg: null
    }
  },
  components: {Message},
  methods: {
    async getOrders() {

      const req = await fetch('http://localhost:8000/api/dashboard');

      const data = await req.json();
      
      this.burgers = data;
    },

    async deleteBurger(id) {

      const req = await fetch(`http://localhost:8000/api/order/${id}`, {
        method: "DELETE"
      });

      const res = await req.json();

      if (res.error) {
        this.msg = `Erro ao remover o Pedido!`;
      } else {
        this.msg = `Pedido removido com sucesso!`;
      }

      setTimeout(() => this.msg = '', 3000);

      this.getOrders();
    },

    async updateBurger(event,id) {

      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option })

      const req = await fetch(`http://localhost:8000/api/order/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json"},
        body: dataJson
      });

      const res = await req.json();

      this.status.forEach(element => {
        if (element.id == res.data['status']) {
          res.data['status'] = element.name
        }
      });

      if (res.error) {
        this.msg = `Erro ao atualizar o status do pedido!`;
      } else {
        this.msg = `Pedido N° ${res.data['id']} foi atualizado para ${res.data['status']}!`;
      }

      setTimeout(() => this.msg = '', 3000);
    }
  },
  mounted() {
    this.getOrders();
  }
}
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin: 12px;
  }

  .delete-btn {
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

  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }

</style>