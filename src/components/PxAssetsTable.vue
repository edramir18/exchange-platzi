<template>
  <div>
    <table>
      <thead>
        <tr class="bg-gray-100 border-b-2 border-gray-400">
          <th></th>
          <th
            :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }"
          >
            <span class="underline cursor-pointer" @click="changeSortOrder"
              >Ranking</span
            >
          </th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cap. de Mercado</th>
          <th>Variación 24hs</th>
          <td class="hidden sm:block">
            <input
              id="filter"
              placeholder="Buscar..."
              type="text"
              class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
              v-model="filter"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="asset in filteredAssets"
          v-bind:key="asset.id"
          class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
        >
          <td>
            <img
              class="w-6 h-6"
              v-bind:src="
                `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
              "
              v-bind:alt="asset.name"
            />
          </td>
          <td>
            <b>#{{ asset.rank }}</b>
          </td>
          <td>
            <router-link
              class="hover:underline text-green-600"
              :to="{ name: 'coin-detail', params: { id: asset.id } }"
            >
              {{ asset.name }}
            </router-link>
            <small class="ml-1 text-gray-600">{{ asset.symbol }}</small>
          </td>
          <td>{{ asset.priceUsd | dollar }}</td>
          <td>{{ asset.marketCapUsd | dollar }}</td>
          <td
            v-bind:class="
              asset.changePercent24Hr.includes('-')
                ? 'text-red-600'
                : 'text-green-600'
            "
          >
            {{ asset.changePercent24Hr | percent }}
          </td>
          <td class="hidden sm:block">
            <px-button v-on:click="goToCoin(asset.id)">
              <span>Detalle</span>
            </px-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PxButton from '@/components/PxButton';

export default {
  name: 'PxAssetsTable',
  components: {
    PxButton,
  },
  data: function() {
    return {
      filter: '',
      sortOrder: 1,
    };
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredAssets: function() {
      return this.assets
        .filter(
          a =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase()),
        )
        .sort((a, b) => {
          const rankA = parseInt(a.rank);
          const rankB = parseInt(b.rank);
          return this.sortOrder === 1 ? rankA - rankB : rankB - rankA;
        });
    },
  },
  methods: {
    goToCoin: function(id) {
      this.$router.push({ name: 'coin-detail', params: { id: id } });
    },
    changeSortOrder: function() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
};
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
