<template>
  <v-dialog
    :value="isConfirmOpened"
    width="500"
    @input="emitCancel()"
  >
    <v-card>

      <v-card-title
        class="headline white"
        primary-title
      >
        <slot name="title"></slot>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="emitCancel()"
               color="white">Отмена</v-btn>
        <v-btn @click="emitConfirm()"
               color="success">Продолжить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        isConfirmOpened: 'isConfirmOpened',
      }),
    },
    methods: {
      emitCancel() {
        this.$store.commit('MODAL_CONFIRM_STATE', false);
        this.$emit('cancel');
      },
      emitConfirm() {
        this.$store.commit('MODAL_CONFIRM_STATE', false);
        this.$emit('confirm');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .v-card__title {
    text-align: center;
  }
  .v-card__actions {
    justify-content: center;
  }
</style>