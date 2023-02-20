<template>
  <div id="chatContainer">
    <div class="chatHeader">
      <h4 style="font-weight: bold; margin-top: 0.5%">IA Bot Chat</h4>
    </div>
    <div class="chatBody">
      <div class="messages" v-for="message in messages" :key="message.id">
        <div class="messageRow user" v-if="message.user == 'my'">
          <div class="message user">
            <p>{{ message.message }}</p>
          </div>
        </div>
        <div class="messageRow bot" v-else>
          <div class="message bot">
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chatFooter">
      <form @submit.prevent="sendMessage()">
        <input v-model="messageContent" id="createMessage" />
        <!-- <input type="submit" id="messageInput" style="margin: 0%" /> -->
        <button
          type="button"
          id="messageInput"
          style="margin: 0%"
          v-on:click="sendMessage()"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
export default {
  name: "ChatPage",
  setup() {
    const messages = ref([]),
      messageContent = ref("");

    //Sends the message on form submit
    function sendMessage() {
      if (messageContent.value == "") return;
      createMessage(messageContent.value, "my");
      getResponse(messageContent.value);
      messageContent.value = "";
    }
    //Method to obtain the data for chatBot
    async function sendWellcomeMessage() {
      const tokenData = {
        token: sessionStorage.getItem("Token"),
      };
      try {
        const { data } = await axios.get(
          "http://localhost:8000/getWelcomeMessage",
          {
            params: tokenData,
          }
        );
        const { response } = data;
        createMessage(response, "bot");
      } catch (error) {
        // If have some error on the call Api URL, redirect to loginPage
        this.$router.replace({ name: "login" });
      }
    }

    //Create a message
    function createMessage(message, user) {
      let id = 0;
      if (messages.value[messages.value.length - 1]) {
        id = messages.value[messages.value.length - 1].id + 1;
      }
      messages.value.push({
        id: id,
        user: user,
        message: message,
      });
    }

    async function getResponse(message) {
      const postData = {
        message: message,
        token: sessionStorage.getItem("Token"),
      };
      try {
        const { data } = await axios.post(
          "http://localhost:8000/sendMessage",
          postData
        );
        const { response } = data;
        createMessage(response, "bot");
      } catch (error) {
        // If have some error on the call Api URL, redirect to loginPage
        this.$router.replace({ name: "login" });
      }
    }

    return { messages, messageContent, sendMessage, sendWellcomeMessage };
  },
  mounted() {
    setTimeout(() => {
      this.sendWellcomeMessage();
    }, 2000);
  },
};
</script>

<style>
#chatContainer {
  height: 600px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  display: flex;
  overflow: hidden;
  box-shadow: rgb(50 50 93 / 25%) 0 30px 60px -12px,
    rgb(0 0 0 / 30%) 0 18px 36px -18px;
  background: navajowhite;
  border-radius: 10px;
}
.chatHeader {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
  padding-left: 2%;
  height: 33px;
  border-bottom: 1px solid yellow;
}
.chatFooter {
  position: absolute;
  bottom: 0px;
  width: 100%;
  border-top: 1px solid yellow;
}
.chatFooter form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}
.chatBody {
  overflow-y: scroll;
  height: 83%;
}
#createMessage {
  width: 91%;
  height: 35px;
  border: 1px;
  border-radius: 10px;
  margin-top: 1%;
  margin-bottom: 1%;
}
#messageInput {
  margin: 1%;
  border: 1px;
  border-radius: 10px;
  background-color: green;
  border: 0;
  color: white;
  padding: 10px;
  margin-bottom: 12px;
  opacity: 0.8;
}
input:not(#createMessage) {
  background-color: green;
  border: 0;
  color: white;
  padding: 10px;
  margin-bottom: 12px;
  opacity: 0.8;
}
input:not(#createMessage):hover {
  opacity: 0.5;
}
.messageRow {
  display: flex;
  justify-content: flex-end;
}
.messageRow.bot {
  justify-content: flex-start;
}
.message p {
  color: white;
  padding: 0px 15px 0px 15px;
}
.message {
  border-radius: 50px;
  text-align: center;
  margin: 10px;
}
.messageRow.user .message {
  background-color: #1982fc;
}
.messageRow.bot .message {
  background-color: #43cc47;
}
.chatBody::-webkit-scrollbar {
  width: 0px;
  height: 100%;
}
</style>
