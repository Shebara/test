<template>
  <div>
    <div v-if="count > 0" class="result-list">
      <h2>Result count: {{count}}</h2>
      <ul>
        <li v-for="item in data" :key="item.id">
          <p>Client Name: <strong>{{item.client.name}}</strong></p>
          <!--<p>User Name:</p>-->
          <!--<p>Job Name:</p>-->
          <p>Start Time: {{item.start_time}}</p>
          <p>End Time: {{item.end_time}}</p>
        </li>
      </ul>
    </div>
    <div v-if="! disabled && max > 0" class="pagination">
      <div><a href="#" v-show="page > 1" @click.prevent="changePage(1)">&lt;&lt;</a></div>
      <div><a href="#" v-show="page > 1" @click.prevent="changePage(page - 1)">&lt;</a></div>
      <div><span>{{page}}</span></div>
      <div><a v-show="page < max" href="#" @click.prevent="changePage(page + 1)">&gt;</a></div>
      <div><a v-show="page < max" href="#" @click.prevent="changePage(max)">&gt;&gt;</a></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            max: 0,
            data: [],
            disabled: true,
            count: 0
        }
    },
    computed: {
        page: {
            get () { return this.$store.state.data.page},
            set (page) {
              this.$store.commit('data/setPage', page)
            }
        },
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async changePage(page) {
            this.page = page;

            await this.loadData();
        },
        async loadData() {
            this.disabled = true;

            const result = await axios.get(`http://localhost:5000/api/jobs/${this.page}`, {
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.auth.token
                }
            });

            if (result.data.status_code < 300) {
                const data = result.data;
                const meta = data.meta.pagination;

                this.max = meta.total_pages;
                this.count = meta.total;
                this.data = data.data;
                console.log(data);
            }

            this.disabled = false;
        }
    }
}
</script>

<style>
  .pagination {
    text-align: center;
    display: block;
  }
  .pagination > div {
    display: inline-block;
    width: 50px;
  }
  .result-list ul {
    padding-left: 0;
    list-style-type: none;
  }
  .result-list ul li {
    margin: 5px;
    border: 1px solid #333;
    padding: 5px;
  }
</style>
