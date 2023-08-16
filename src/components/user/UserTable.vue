<script>
import { users } from '~/api/users'

export default {
  name: 'CustomFiltering',
  data() {
    return {
      users,
      filters: {
        name: { value: '', keys: ['name'] },
        age: { value: { min: 0, max: 100 }, custom: this.ageFilter },
      },
      selectedRows: [],
      totalPages: 1,
      currentPage: 1,
      pageSize: 25,
    }
  },
  mounted() {
    this.$refs.usersTable.selectRows([users[0], users[1], users[2]])
  },
  methods: {
    ageFilter(filterValue, row) {
      return row.age >= filterValue.min && row.age <= filterValue.max
    },
    nameLength(row) {
      return row.name.length
    },
    dateSort(a, b, sortOrder) {
      const date1 = new Date(a.registered).getTime()
      const date2 = new Date(b.registered).getTime()

      return date1 - date2 * sortOrder
    },
    selectAll() {
      this.$refs.usersTable.selectAll()
    },
    deselectAll() {
      this.$refs.usersTable.deselectAll()
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="form-group">
      <label class="form-label">Filter by Name:</label>
      <input v-model="filters.name.value" class="form-input">
    </div>

    <div class="form-group">
      <label class="form-label">Min Age</label>
      <input
        v-model.number="filters.age.value.min"
        class="form-input"
        type="number"
        :min="0"
        :max="filters.age.value.max"
        @onKeyDown.prevent="() => {}"
      >
    </div>

    <div class="form-group">
      <label class="form-label">Max Age</label>
      <input
        v-model.number="filters.age.value.max"
        class="form-input"
        type="number"
        :min="filters.age.value.min"
        :max="99"
        @onKeyDown.prevent="() => {}"
      >
    </div>

    <button @click="selectAll">
      Select All
    </button>

    <button @click="deselectAll">
      Deselect All
    </button>

    <VTable
      ref="usersTable"
      v-model:currentPage="currentPage"
      :data="users"
      :filters="filters"
      :select-on-click="false"
      :page-size="pageSize"
      selection-mode="multiple"
      selected-class="selected-row"
      sort-header-class="flex items-center justify-between w-full"
      sort-icon-position="after"
      @state-changed="selectedRows = $event.selectedRows"
      @total-pages-changed="totalPages = $event"
    >
      <template #head="{ allRowsSelected, toggleAllRows }">
        <th>
          <input
            type="checkbox"
            class="form-checkbox"
            :checked="allRowsSelected"
            @change="toggleAllRows"
          >
        </th>
        <VTh :sort-key="nameLength" default-sort="desc">
          Name
        </VTh>
        <VTh sort-key="age">
          Age
        </VTh>
        <VTh sort-key="address.state">
          State
        </VTh>
        <VTh :custom-sort="dateSort">
          Registered at
        </VTh>
      </template>

      <template #body="{ rows }">
        <VTr
          v-for="row in rows"
          :key="row.guid"
          v-slot="{ isSelected, toggle }"
          :row="row"
        >
          <td>
            <input
              type="checkbox"
              class="form-checkbox"
              :checked="isSelected"
              @change="toggle"
            >
          </td>
          <td>{{ row.name }}</td>
          <td>{{ row.age }}</td>
          <td>{{ row.address.state }}</td>
          <td>{{ row.registered }}</td>
        </VTr>
      </template>
    </VTable>

    <VTPagination
      v-model:currentPage="currentPage"
      :total-pages="totalPages"
      :boundary-links="true"
    />

    <VTPagination
      v-model:currentPage="currentPage"
      :total-pages="totalPages"
    >
      <template #firstPage>
        <i class="fas fa-arrow-left" />
      </template>

      <template #lastPage>
        <i class="fas fa-arrow-right" />
      </template>

      <template #next>
        <i class="fas fa-chevron-right" />
      </template>

      <template #previous>
        <i class="fas fa-chevron-left" />
      </template>
    </VTPagination>

    <strong>Selected:</strong>
    <div v-if="selectedRows.length === 0">
      No rows selected
    </div>
    <ul>
      <li v-for="selected in selectedRows" :key="selected.name">
        {{ selected.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.vt-pagination {
  .pagination {
    display: flex;
    list-style: none outside none;

    .page-item {
      padding: 8px;

      &.active .page-link {
        font-weight: bold;
      }
    }
  }
}
</style>
