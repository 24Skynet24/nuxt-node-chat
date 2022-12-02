<template>
  <main>
    <aside>
      <div class="title flex-align-center flex-between">
        <h1>Сообщения</h1>
        <img src="@/assets/img/Information.svg" alt="">
      </div>
      <input type="search" v-model="peopleSearch" placeholder="Поиск">
      <div class="flex-column users">
        <article v-for="(item, id) in users" :key="`user_${id}`" :class="{'active-user' : id === activeUser}" @click="activeUser = id">
          <div class="user flex-align-center">
            <div class="logo"></div>
            <div class="flex-column">
              <h6>{{ item.name }}</h6>
              <span>@{{ item.id }}</span>
            </div>
          </div>
          <span class="text">{{ item.msg }}</span>
        </article>
      </div>
    </aside>
    <section v-if="activeUser">
      <header>
        <div class="user flex-align-center">
          <div class="logo"></div>
          <div class="flex-column">
            <h6>{{ users[activeUser].name }}</h6>
            <span>{{ activeUser }}</span>
          </div>
        </div>
      </header>
      <div class="chat">
        <p v-if="!users[activeUser].messages.length" class="chat-balloon">У вас пока нет сообщений...</p>
        <div class="flex-column" v-else>
          <msg-cmp
            v-for="(item, id) in users[activeUser].messages"
            :key="`msg_${id}`"
            :msg="item"
          />
        </div>
      </div>
      <div class="msg flex-between flex-align-center">
        <input type="text" name="msg" id="msg" placeholder="Введите сообщение...">
        <button>Отправить</button>
      </div>
    </section>

    <section v-else>

    </section>
  </main>
</template>

<script>
import MsgCmp from "../components/MsgCmp";
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  components: {MsgCmp},
  data() {
    return {
      peopleSearch: '',
      activeUser: null,
      users: {
        'abob': {
          name: 'abb',
          msg: 'hi!',
          messages: [
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
            {
              text: 'msg flex-between flex-align-center',
              state: true,
            },
          ],
        },
        'dbob': {
          name: 'abb',
          msg: 'hi!',
          messages: [],
        },
      }
    }
  },

  mounted() {
    document.addEventListener('keydown', this.hideChat)
  },

  destroyed() {
    document.removeEventListener('keydown', this.hideChat)
  },

  methods: {
    hideChat(event) {
      if (event.code === "Escape") this.activeUser = null
    }
  }
}
</script>


<style scoped lang="scss">

main {
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
  overflow-y: hidden;
  display: flex;
}

aside {
  width: 35%;
  padding: sizeAuto(24);
  border-right: 1px solid rgb(234, 236, 240);
  height: 100%;

  .users {
    max-height: 80vh;
    overflow-y: auto;
  }

  .title {
    margin-bottom: sizeAuto(16);

    h1 {
      font-size: sizeAuto(18);
      font-weight: 600;
    }

    img {
      width: sizeAuto(36);
      height: sizeAuto(36);
      padding: sizeAuto(8);
      border: 1px solid rgb(234, 236, 240);
      border-radius: 8px;
      cursor: pointer;
    }
  }

  input {
    border: 1px solid rgb(234, 236, 240);
    border-radius: 8px;
    width: 100%;
    padding: sizeAuto(10) sizeAuto(14);
    font-size: sizeAuto(16);
    color: rgb(102, 112, 133);
    margin-bottom: sizeAuto(35);
  }

  article {
    width: 100%;
    padding: sizeAuto(16);
    cursor: pointer;
    transition: .2s;
    border-bottom: 1px solid rgb(234, 236, 240);

    &:first-child {
      border-top: 1px solid rgb(234, 236, 240);
    }

    &:hover {
      background: rgb(249, 250, 251);
    }

    .logo {
      width: sizeAuto(40);
      height: sizeAuto(40);
      background: rgb(249, 250, 251);
      border-radius: 50%;
      margin-right: sizeAuto(12);
    }

    h6 {
      font-size: sizeAuto(14);
      color: #000;
      margin-bottom: sizeAuto(8);
    }

    span {
      color: rgb(102, 112, 133);
      font-size: sizeAuto(14);
    }

    .text {
      display: block;
      margin-top: sizeAuto(16);
      color: rgb(102, 112, 133);
      font-size: sizeAuto(14);
      overflow: hidden;
      cursor: pointer;
      white-space: nowrap;
    }
  }

  .active-user {
    background: rgb(249, 250, 251);
  }
}

section {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    padding: sizeAuto(12) sizeAuto(40);
    border-bottom: 1px solid rgb(234, 236, 240);

    .logo {
      width: sizeAuto(40);
      height: sizeAuto(40);
      background: rgb(249, 250, 251);
      border-radius: 50%;
      margin-right: sizeAuto(12);
    }

    h6 {
      font-size: sizeAuto(14);
      color: #000;
      margin-bottom: sizeAuto(8);
    }

    span {
      color: rgb(102, 112, 133);
      font-size: sizeAuto(14);
    }
  }

  .msg {
    margin: 0 auto sizeAuto(24);
    width: 90%;
    padding: sizeAuto(16);
    border: 1px solid rgb(234, 236, 240);
    border-radius: 8px;

    input {
      border: none;
      width: 90%;
      font-size: sizeAuto(14);
      color: rgb(102, 112, 133);
    }

    button {
      padding: sizeAuto(10) sizeAuto(16);
      color: #FFF;
      background: rgb(49, 183, 81);
      border-radius: 8px;
      font-weight: 600;
      font-size: sizeAuto(14);
      border: none;
      cursor: pointer;
      transition: .2s;

      &:hover {
        background: rgb(39, 169, 70);
      }
    }
  }

  .chat {
    width: 90%;
    height: 100%;
    max-height: 80vh;
    overflow-y: auto;
    margin: sizeAuto(24) auto;

    &-balloon {
      font-size: sizeAuto(16);
    }
  }
}

</style>
