<script setup>
import { reactive, inject } from "vue";
import { VNumberInput } from "vuetify/lib/labs/components.mjs";

const data = reactive({
  Account_id: "",
  Bank_id: "",
  Amount: 0,
  pesantf: "",
  snackbar: false,
  dialog: false, // State to control the dialog visibility
});

const myAxios = inject("myAxios");

const Transfer = () => {
  // Generate current date in the desired format
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0] + "T00:00:00+07:00";

  // Prepare data for POST request
  const requestData = {
    Account_id: data.Account_id,
    Bank_id: data.Bank_id,
    Amount: data.Amount,
    Transaction_date: formattedDate, // Use formatted current date
  };

  // Send POST request
  myAxios.post("/transaction/transferbank", requestData).then(
    (res) => {
      if (res.status === 200) {
        data.pesantf = `Anda Berhasil Transfer\n
                        Account ID: ${data.Account_id}\n
                        Bank ID: ${data.Bank_id}\n
                        Amount: ${data.Amount}\n
                        Transaction Date: ${formattedDate}`;
      } else {
        data.pesantf = "Anda Tidak Berhasil Transfer";
      }
      data.dialog = true; // Show dialog on success
    },
    (err) => {
      data.pesantf = `Data gagal dikirim: ${err.message}`;
      data.dialog = true; // Show dialog on error
    }
  );
};
</script>

<template>
  <v-card class="pa-3">
    <div class="container">
      <div>
        <label>Account ID</label>
        <v-text-field type="text" v-model="data.Account_id" />
      </div>
      <div>
        <label>Bank ID</label>
        <v-text-field type="text" v-model="data.Bank_id" />
      </div>
      <div>
        <label>Amount</label>
        <v-number-input v-model="data.Amount" />
      </div>
      <v-btn @click="Transfer">Transfer</v-btn>
    </div>
  </v-card>

  <v-dialog v-model="data.dialog" max-width="800px">
    <!-- Increased max-width -->
    <v-card>
      <v-card-title class="headline">Transaction Status</v-card-title>
      <v-card-text>
        <pre>{{ data.pesantf }}</pre>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink" text @click="data.dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
