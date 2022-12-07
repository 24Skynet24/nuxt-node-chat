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
        text: null,
      },
      allUsers: {},
      chats: {},
      id: null,
    }
  },
  computed: {
    getUsersName() {
      return Object.keys(this.allUsers)
    },
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code === "Enter") this.sendName()
    })
    this.$socket.$on('message', async (message) => {
      const data = JSON.parse(message.data);

      switch (data.type) {
        case 'new':
            if (data.otherConnections === undefined) {
              return this.chats[data.connectionId] = {}
            }

            this.id = data.id;

            for (let i = 0, length = data.otherConnections.length; i < length; ++i) {
              this.chats[data.otherConnections[i]] = {}
            }
          break;
        case 'updateProfile':
            this.chats[data.data.id].username = data.data.username
          break
      }

      console.log(this.chats)

      // this.allUsers = await JSON.parse(messageData.data)
    })
    this.$socketManager.close()
  },
  methods: {
    async sendName() {
      if (this.user_name.length < 3) {
        this.warning = {
          state: true,
          text: 'Имя должно содержать минимум 3 символа',
        }
        return
      }

      if (this.getUsersName.includes(this.user_name)) {
        this.warning = {
          state: true,
          text: 'Пользователь с таким именем уже существует!',
        }
        return
      }

      this.$store.commit('setName', this.user_name)

      const message = {
        type: 'updateProfile',
        data: {
          id: this.id,
          username: this.user_name
        }
      }

      await this.$socketManager.send(JSON.stringify(message))
      // await this.$router.push('/')
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
