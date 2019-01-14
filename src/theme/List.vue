<template>
  <div>
    <v-btn @click="showModal()"
           color="success">Добавить пользователя</v-btn>
    <v-data-table
      :headers="headers"
      :items="users"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td width="250">{{props.item.name}}</td>
        <td>{{props.item.email}}</td>
        <td width="150">
          <v-btn @click="showModal(props.item)"
                 color="success"
                 small>Редактировать</v-btn>
        </td>
      </template>
    </v-data-table>
    <edit v-on:update="updateList()"></edit>
  </div>
</template>

<script>
  import Edit from './Edit.vue';

  export default {
    components: {
      Edit,
    },
    data() {
      return {
        headers: [
          {
            text: 'Имя',
            value: 'name',
          },
          {
            text: 'Email',
            value: 'email',
          },
          {
            sort: false,
            value: 'edit',
          },
        ],
        users: [],
      };
    },
    methods: {
      showModal(user) {
        this.$store.commit('USER_EDIT', user);
        this.$store.commit('MODAL_EDIT_STATE', true);
      },
      updateList() {
        this.users = this.$store.getters.getUsers;
      },
    },
    async created() {
      this.users = await this.$store.dispatch('getUsers');
    },
  };
</script>

<style lang="scss" scoped>
  tr {
    &:hover {
      .v-btn {
        display: block;
      }
    }
    .v-btn {
      display: none;
    }
  }
</style>