<template>
  <section>
    <br><br>
    <h1>Dashboard</h1>
    <br>
    <div v-if="!user" class="text-center">
      <h2 class="text-warning">Getting Your Information</h2>
      <img src="../assets/Double Ring-2s-200px.svg" alt="retrieving">
    </div>
    <button v-if="user" @click="logout" class="btn btn-outline-warning">Logout</button>
    <br><br>
    <h4 v-if="user">Hye!!! {{user.username}}</h4>
    <br>
    <button v-if="user"
      @click="showForm = !showForm"
      class="btn btn-outline-primary">Toggle Form</button>
    <br><br><br>
    <form v-if="user && showForm" class="bg-light p-5" @submit.prevent="addNote">
      <div v-if="errorMessage" class="alert alert-danger">
        <strong>Oh snap!</strong> {{ errorMessage }}
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="newNote.title"
          type="text"
          class="form-control"
          id="title"
          aria-describedby="titleHelp"
          placeholder="Enter title for the note"
          required>
        <small
          id="titleHelp"
          class="form-text text-muted"
          >Enter your note title.</small>
      </div>
      <div class="form-group">
        <label
          for="description">Note</label>
        <textarea
          v-model="newNote.note"
          class="form-control"
          id="description"
          rows="3"
          placeholder="Enter your note"
          required></textarea>
      </div>
      <br>
      <button
        type="submit"
        class="btn btn-success">Add Note</button>
    </form>
    <section v-if="user" class="row mt-5 mb-5 pt-5">
      <div
        class="col-6 mb-5"
        v-for="note in notes"
        :key="note._id">
        <div class="card bg-light">
          <div class="card-header border-primary"><h1>{{note.title}}</h1></div>
          <div class="card-body">
            <p class="card-text" v-html="renderMarkdown(note.note)"></p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// function parseJwt(token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//     const result = `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
//     return result;
//   }).join(''));
//   return JSON.parse(jsonPayload);
// }
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';

const md = new MarkdownIt();
md.use(MDemoji);

const API_URL = 'http://localhost:5050/auth';
const NOTES_URL = 'http://localhost:5050/api/v1/notes';
export default {
  data: () => ({
    user: null,
    showForm: false,
    newNote: {
      title: '',
      note: '',
    },
    notes: [],
    errorMessage: '',
  }),
  watch: {
    newNote: {
      deep: true,
      handler() {
        this.errorMessage = '';
      },
    },
  },
  async mounted() {
    // const payload = parseJwt(localStorage.token);
    // this.user.username = payload.username;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    });
    if (response.ok) {
      const result = await response.json();
      if (result.user) {
        // valid token
        this.getNotes();
        setTimeout(() => {
          this.user = result.user;
        }, 2000);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  },
  methods: {
    renderMarkdown(note) {
      return md.render(note);
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    async addNote() {
      this.errorMessage = '';
      const response = await fetch(NOTES_URL, {
        method: 'POST',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.ok) {
        const note = await response.json();
        this.newNote = {
          title: '',
          note: '',
        };
        this.showForm = false;
        // so that we do not make GET API call everytime a note is added by user
        this.notes.push(note);
      } else {
        const error = await response.json();
        this.errorMessage = error.message;
      }
    },
    async getNotes() {
      const response = await fetch(NOTES_URL, {
        method: 'GET', // default 'GET'
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.notes = result;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.card-text {
  width: 100%;
  height: 100%;
}
.card {
  height: 100%;
}
</style>
