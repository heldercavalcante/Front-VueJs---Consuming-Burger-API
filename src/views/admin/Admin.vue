<template>
  <div class="main-container">
    <h1>Administração</h1>
    <div>
      <div class="card-container">
        <router-link class="card-link" :to="{ name: 'Orders'}">
          <div class="card">
            <img src="/img/burger-order.jpg" alt="Card Image">
            <h2>Pedidos</h2>
            <ul>
              <li>Gerenciar Pedidos</li>
              <li>Editar Pedidos</li>
              <li>Deletar Pedidos</li>
            </ul>
        </div>
        </router-link>
        <router-link class="card-link" :to="{ name: 'Meats'}">
          <div class="card">
            <img src="/img/meats.jpeg" alt="Card Image">
            <h2>Carnes</h2>
            <ul>
              <li>Listar Tipos de carnes</li>
              <li>Editar Registros</li>
              <li>Deletar Registros</li>
            </ul>
        </div>
        </router-link>
        <router-link class="card-link" :to="{ name: 'Breads' }">
          <div class="card">
            <img src="/img/breads.jpeg" alt="Card Image">
            <h2>Pães</h2>
            <ul>
              <li>Listar Tipos de Pães</li>
              <li>Editar Registros</li>
              <li>Deletar Registros</li>
            </ul>
        </div>
        </router-link>
        <router-link class="card-link" :to="{ name: 'Optionals' }">
          <div class="card">
            <img src="/img/optionals.webp" alt="Card Image">
            <h2>Opcionais</h2>
            <ul>
              <li>Listar Opcionais</li>
              <li>Editar Registros</li>
              <li>Deletar Registros</li>
            </ul>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>
<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.main-container {
  margin: 0;
  background-color: #add8e6;
}

h1 {
  padding: 10px;
}


.card {
  width: 300px;
  height: 400px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card h2 {
  margin: 20px;
  font-size: 24px;
  font-weight: bold;
}

.card li {
  margin-left: 30px;
  font-size: 16px;
}

.card-link {
  text-decoration: none;
  color: #000;
  cursor: pointer;
  margin: 10px;
}
</style>