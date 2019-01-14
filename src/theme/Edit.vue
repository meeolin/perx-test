<template>
  <div>
    <v-dialog
      :value="isEditOpened"
      width="500"
      @input="onClose()"
    >
      <v-card>

        <v-card-title
          class="headline white"
          primary-title
        >
          {{title}}
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-alert
              :value="!!error"
              type="error"
            >
              {{error}}
            </v-alert>

            <v-text-field label="Имя"
                          v-model="user.name"></v-text-field>

            <v-text-field label="E-mail"
                          v-model="user.email"></v-text-field>

            <v-text-field v-if="!userEdit"
                          label="Пароль"
                          autocomplete="password"
                          v-model="user.password"
                          type="password"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn v-if="!!userEdit"
                 @click="confirmRemove()"
                 color="error">Удалить</v-btn>
          <v-btn @click="save()"
                 color="success">{{btnTitle}}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <confirm v-on:confirm="remove()">
      <template slot="title">{{removeConfirmMsg}}</template>
    </confirm>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Confirm from './Confirm.vue';

  export default {
    components: {
      Confirm,
    },
    data() {
      return {
        userTemplate: {
          email: '',
          name: '',
          password: '',
        },
        error: '',
      };
    },
    computed: {
      ...mapGetters({
        isEditOpened: 'isEditOpened',
        userEdit: 'userEdit',
      }),
      title() {
        return (this.user ? 'Редактирование' : 'Добавление') + ' пользователя';
      },
      btnTitle() {
        return this.user ? 'Сохранить' : 'Добавить';
      },
      user() {
        return Object.assign({}, this.userTemplate, this.userEdit);
      },
      removeConfirmMsg() {
        if (!this.userEdit) { return; }
        return `Вы действительно хотите удалить пользователя ${this.userEdit.name}?`;
      },
    },
    methods: {
      onClose() {
        this.$store.commit('MODAL_EDIT_STATE', false);
      },
      async save() {
        let result;
        if (!this.userEdit) {
          result = await this.$store.dispatch('appendUser', this.user);
        } else {
          result = await this.$store.dispatch('updateUser', this.user);
        }
        this.error = result && result.error;
        if (!this.error) {
          this.closeModal();
        }
      },
      confirmRemove() {
        this.$store.commit('MODAL_CONFIRM_STATE', true);
      },
      async remove() {
        let result = await this.$store.dispatch('removeUser', this.user.objectId);
        this.error = result && result.error;
        if (!this.error) {
          this.closeModal();
        }
      },
      closeModal() {
        this.$emit('update');
        this.$store.commit('USER_EDIT', null);
        this.$store.commit('MODAL_EDIT_STATE', false);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .v-card__actions {
    justify-content: flex-end;
  }
</style>