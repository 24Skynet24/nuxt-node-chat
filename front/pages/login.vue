<template>
  <main class="flex-center">
    <article class="flex-column">
      <p v-if="warning">Имя должно содержать минимум <span>3</span> символа</p>
      <input type="text" placeholder="Введите имя" name="name" id="name" v-model="user_name">
      <button @click="sendName">Подтвердить</button>
    </article>
  </main>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user_name: '',
      warning: false
    }
  },
  methods: {
    sendName(){
      if (this.user_name.length >= 3) {
        this.$store.commit('setName', this.user_name)
        this.$router.push('/')
      }
      else this.warning = true
    },
  },
}
</script>

<style scoped lang="scss">

main {
  height: 100%;
}

article {
  padding: sizeAuto(32);
  border: 1px solid rgb(234, 236, 240);
  border-radius: 8px;
  align-items: center;

  p {
    font-size: sizeAuto(20);
    color: #ff0000;
    margin-bottom: sizeAuto(32);
  }

  input {
    width: sizeAuto(350);
    padding: sizeAuto(12) sizeAuto(14);
    font-size: sizeAuto(18);
    color: #000000;
    border-radius: 8px;
    border: 1px solid #000000;
    margin-bottom: sizeAuto(32);
  }

  button {
    padding: sizeAuto(12) sizeAuto(16);
    border: none;
    border-radius: 8px;
    background: rgb(49, 183, 81);
    color: #FFFFFF;
    font-size: sizeAuto(16);
    cursor: pointer;
    transition: .2s;

    &:hover {
      background: rgb(39, 169, 70);
    }
  }
}

</style>
