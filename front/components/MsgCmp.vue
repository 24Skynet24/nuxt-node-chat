<template>
  <article :class="[msg.state ? 'gray' : 'green']">
    <p>{{ msg.text }}</p>
  </article>
</template>

<script>
export default {
  name: "MsgCmp",
  props: {
    msg: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

article {
  padding: sizeAuto(10) sizeAuto(14);
  border-radius: 0 8px 8px 8px;
  margin-right: auto;
  margin-bottom: sizeAuto(16);
  width: auto;

  p {
    font-size: sizeAuto(16);
    font-weight: 400;
  }
}

.gray {
  background: rgb(242, 244, 247);

  p {
    color: rgb(16, 24, 40);
  }
}

.green {
  background: rgb(49, 183, 81);

  p {
    color: #FFFFFF;
  }
}

</style>
