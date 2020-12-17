<template>
  <px-assets-table v-bind:assets="assets"></px-assets-table>
</template>

<script>
import PxAssetsTable from '@/components/PxAssetsTable';
import api from '@/api';

export default {
  name: 'Home',
  components: {
    PxAssetsTable,
  },
  data: function() {
    return {
      assets: [],
    };
  },
  created: function() {
    api.getAssets().then(assets => (this.assets = assets));
  },
};
</script>
