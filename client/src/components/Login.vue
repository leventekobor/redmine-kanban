<template>
  <article>
    <form @submit.prevent="getUser" class="form-control">
      <div class="left">
        <img src="../../public/rocket.svg" alt="">
      </div>
      <div class="right">
        <h1 style="margin-bottom: 50px;">Redmine kanban board</h1>
        <p>Fill in API key for login. API key is available at the link below:</p>
        <a :href="apiKeyUrl">Public API key link</a>
        <div style="margin-top: 80px;">
          <h4>Log In</h4>
          <div class="omrs-input-group">
            <label class="omrs-input-underlined">
              <input required v-model="apiKey" id="api-token" name="api-token" type="text">
              <span class="omrs-input-label">API key</span>
            </label>
          </div>
          <button>LOG IN</button>
        </div>
      </div>
    </form>
  </article>
  <div v-bind:class="{ active: isActive }" class="toast" id="errorToast">Login failed</div>
</template>

<script>
  import {onMounted, ref} from 'vue'
import RedmineService from '@/services/RedmineService.js'
import store from '@/store/store'
import { useRouter } from 'vue-router'

export default {
  name: "Login",
  setup() {
    const router = useRouter()
    const apiKey = ref('')
    let apiKeyUrl = ref('')
    let user = ref('')
    let isActive = ref(false)

    async function getUser() {
      try {
        const response = (await RedmineService.getUser(apiKey.value))
        user.value = response.data
        store.commit({
          type: 'addUser',
          payload: response.data.user
        })
        router.push('/project_pick')
      } catch (error) {
        console.log(error)
        isActive.value = true
        setTimeout(() => isActive.value = false, 2000)
        apiKey.value = ""
      }
    }
    async function getRedmineUrl() {
      const response = await RedmineService.getRedmineUrl()
      apiKeyUrl.value = response.data + "/my/account"
    }
    onMounted(() => {
      getRedmineUrl()
    })

    return {
      apiKeyUrl,
      apiKey,
      user,
      isActive,
      getUser
    }
  }
}
</script>

<style>
article {
  display: grid;
  width: 70vw;
  height: 70vh;
}

.form-control {
  display: grid;
  grid-template-columns: fit-content(60%) 1fr;
  grid-gap: 10px;
  text-align: start;
}

img {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}

h1 {
  margin-bottom: 0px;
  font-size: 30px;
}

a {
  margin-bottom: 0px;
}

h4 {
  margin-bottom: 0px;
  font-size: 22px;
}

input {
  margin-top: 0px;
  margin-bottom: 0px;
}

button {
  margin-top: 10px;
  margin-bottom: 0px;
  width: 328px;
  height: 40px;
  background: #005457;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.toast {
  position: fixed;
  left: calc(-50vw + 50%);
  right: calc(-50vw + 50%);
  margin-left: auto;
  margin-right: auto;
  visibility: hidden;
  min-width: 250px;
  max-width: 300px;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  z-index: 1;
  bottom: 30px;
  font-size: 17px;
  background-color: #e76f51;
}

.active {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
  z-index: 5;
}

:root {
	--omrs-color-ink-lowest-contrast: rgba(47, 60, 85, 0.18);
	--omrs-color-ink-low-contrast: rgba(60, 60, 67, 0.3);
	--omrs-color-ink-medium-contrast: rgba(19, 19, 21, 0.6);
	--omrs-color-interaction: #000000;
	--omrs-color-interaction-minus-two: rgba(98, 224, 73, 0.12);
	--omrs-color-danger: #b50706;
	--omrs-color-bg-low-contrast: #eff1f2;
	--omrs-color-ink-high-contrast: #121212;
	--omrs-color-bg-high-contrast: #ffffff;
	
}
/** END: Non Openmrs CSS **/
div.omrs-input-group {
  margin-bottom: 1.5rem;
  position: relative;
  width: 20.4375rem;
}

.omrs-input-underlined > input,
.omrs-input-filled > input {
	border: none;
	border-bottom: 0.125rem solid var(--omrs-color-ink-medium-contrast);
	width: 100%;
	height: 3rem;
	font-size: 1.0625rem;
	padding-left: 0rem;
	line-height: 147.6%;
	padding-top: 0.825rem;
	padding-bottom: 0.5rem;
}

.omrs-input-underlined > input:focus,
.omrs-input-filled > input:focus {
	outline: none;
}

.omrs-input-underlined > .omrs-input-label,
.omrs-input-filled > .omrs-input-label {
	position: absolute;
	top: 0.9375rem;
	left: 0rem;
	line-height: 147.6%;
	color: var(--omrs-color-ink-medium-contrast);
	transition: top .2s;
}

.omrs-input-underlined > svg,
.omrs-input-filled > svg {
	position: absolute;
	top: 0.9375rem;
	right: 0.875rem;
	fill: var(--omrs-color-ink-medium-contrast);
}

.omrs-input-underlined > input:hover,
.omrs-input-filled > input:hover {
	background: var(--omrs-color-interaction-minus-two);
	border-color: var(--omrs-color-ink-high-contrast);
}

.omrs-input-underlined > input:focus + .omrs-input-label,
.omrs-input-underlined > input:valid + .omrs-input-label,
.omrs-input-filled > input:focus + .omrs-input-label,
.omrs-input-filled > input:valid + .omrs-input-label {
	top: 0;
	font-size: 0.9375rem;
	margin-bottom: 32px;;
}

.omrs-input-underlined:not(.omrs-input-danger) > input:focus + .omrs-input-label,
.omrs-input-filled:not(.omrs-input-danger) > input:focus + .omrs-input-label {
	color: var(--omrs-color-interaction);
}

.omrs-input-underlined:not(.omrs-input-danger) > input:focus,
.omrs-input-filled:not(.omrs-input-danger) > input:focus {
	border-color: var(--omrs-color-interaction);
}

.omrs-input-underlined:not(.omrs-input-danger) > input:focus ~ svg,
.omrs-input-filled:not(.omrs-input-danger) > input:focus ~ svg {
	fill: var(--omrs-color-ink-high-contrast);
}
</style>
