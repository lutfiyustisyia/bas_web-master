<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
// import Header from "./components/Header.vue";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

// const data = reactive({
//   variable1: "test variable",
//   counter: 1,
//   variable2: [1, 2, 3, 4],
// });

const loading = ref(false);

const startLoading = () => {
  loading.value = true;
};

// const stopLoading = () => {
//   loading.value = false;
// };

// const tambahCounter = () => {
//   data.counter++;
// };

// const kurangCounter = () => {
//   if (data.counter >= 1) {
//     data.counter--;
//   }
// };

router.beforeEach((to, from, next) => {
  startLoading();
  next();
});

// router.afterEach(() => {
//   stopLoading();
// });
</script>

<template>
  <div v-if="loading" class="loading-spinner"></div>

  <nav style="text-align: center">
    <RouterLink v-if="auth.isLogin" @click="startLoading" to="/">Home</RouterLink>
    <RouterLink v-if="auth.isLogin" @click="startLoading" to="/about">About</RouterLink>
    <RouterLink v-if="!auth.isLogin" @click="startLoading" to="/login">Login</RouterLink>
    <RouterLink v-if="auth.isLogin" @click="startLoading" to="/transact"
      >Transact</RouterLink
    >
  </nav>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmrl0nBtzCXLw-KqMo0m3ipBVw0PJe3OpCACqixEeM5Q&s"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <!-- <Header :text="''">
        <button @click="tambahCounter">Tambah Counter</button>
        <br />
        <button @click="kurangCounter">Kurang Counter</button>
        slot test
        <template #part1_header="{ param1 }">
          <h2>{{ param1 }}</h2>
        </template>
      </Header> -->
      <!-- <div>{{ data.variable1 }}</div> -->
      <!-- <div>{{ data.counter }}</div> -->
      <HelloWorld msg="Bank Central Lampung" />
    </div>
  </header>
  <br />

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  background: transparent;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
