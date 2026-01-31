const { createApp } = Vue;

createApp({
  data() {
    return {
      people: [],
      updates: [],
      ducks: [],
      search: '',
      roleFilter: ''
    };
  },
  computed: {
    roles() {
      return [...new Set(this.people.map((person) => person.role))];
    },
    filteredPeople() {
      const term = this.search.toLowerCase();
      return this.people.filter((person) => {
        const matchesSearch =
          person.name.toLowerCase().includes(term) ||
          person.focus.toLowerCase().includes(term);
        const matchesRole = this.roleFilter ? person.role === this.roleFilter : true;
        return matchesSearch && matchesRole;
      });
    }
  },
  async mounted() {
    const [people, updates, ducks] = await Promise.all([
      fetch('/api/people').then((res) => res.json()),
      fetch('/api/updates').then((res) => res.json()),
      fetch('/api/ducks').then((res) => res.json())
    ]);
    this.people = people.people;
    this.updates = updates.updates;
    this.ducks = ducks.ducks;
  }
}).mount('#app');
