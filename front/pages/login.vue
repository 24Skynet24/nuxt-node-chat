<template>
  <main class="flex-center">
    <article class="flex-column">
      <p v-if="warning.state">{{ warning.text }}</p>
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
      warning: {
        state: false,
        text: 'Имя должно содержать минимум 3 символа',
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code === "Enter") this.sendName()
    })
  },

  destroyed() {
    this.$socketManager.close()
  },
  methods: {
    sendName(){
      if (this.user_name.length >= 3) {
        this.$store.commit('setName', this.user_name)
        const user = {
          id: this.user_name,
          msg: null,
          name: this.user_name,
          last_msg: null,
          messages: [],
        }
        this.$socketManager.send(JSON.stringify(user))

        this.$socket.$on('message', (err) => {
          if (JSON.parse(err.data).error) this.warning = {
            state: true,
            text: JSON.parse(err.data).error
          }
          else this.$router.push('/')
        })
      }
      else this.warning = {
        state: true,
        text: 'Имя должно содержать минимум 3 символа',
      }
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
