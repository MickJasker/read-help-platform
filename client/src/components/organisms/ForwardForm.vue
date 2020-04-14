<template>
  <section class="forward-form">
    <form @:submit.prevent="HandleSubmit">
      <input
        v-model="phone"
        placeholder="+31 6 123 45 67"
      >
      <button type="submit">
        <label>
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'paper-plane']"
          /> Versturen
        </label>
      </button>
    </form>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'ForwardForm',
};
</script>

<style scoped lang="scss">
  form{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0;
    input {
      width: 50%;
    }
    button {
      color: white;
      width: 50%;
      background: #F54F74;
      border: none;
      margin-top: 10px;
      padding: 5px;
    }
 }
</style>
