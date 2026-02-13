<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const router = useRouter()
const { t } = useI18n()

function onSubmit() {
  toast.success(t('auth.loginSuccess'))
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="auth-form">
    <h4 class="text-center mb-4">{{ t('auth.login') }}</h4>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">{{ t('auth.email') }}</label>
        <input id="email" type="email" class="form-control" :placeholder="t('auth.emailPlaceholder')" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">{{ t('auth.password') }}</label>
        <input id="password" type="password" class="form-control" placeholder="••••••••" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">{{ t('auth.loginButton') }}</button>
    </form>
    <p class="text-center text-muted small mt-3 mb-0">
      <router-link :to="{ name: 'Dashboard' }" class="text-decoration-none">← {{ t('common.backToHome') }}</router-link>
    </p>
  </div>
</template>
