import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  function authenticated() {
    isLogin.value=true
  }
  function logout() {
    isLogin.value=false
  }

  return {isLogin, authenticated, logout}
},{
    persist: {
        storage: sessionStorage,
    }
})
