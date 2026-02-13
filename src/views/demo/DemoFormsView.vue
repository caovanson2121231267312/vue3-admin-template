<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()

const codeInputBasic = `<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email" placeholder="name@example.com" />
</div>
<div class="mb-3">
  <label for="pass" class="form-label">Mật khẩu</label>
  <input type="password" class="form-control" id="pass" />
</div>`

const codeInputSizes = `<input class="form-control form-control-lg mb-2" type="text" placeholder="Large" />
<input class="form-control mb-2" type="text" placeholder="Default" />
<input class="form-control form-control-sm" type="text" placeholder="Small" />`

const codeSelect = `<select class="form-select">
  <option selected>Chọn...</option>
  <option value="1">Một</option>
  <option value="2">Hai</option>
</select>`

const codeCheckboxRadio = `<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" id="c1" />
  <label class="form-check-label" for="c1">Checkbox</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="r" id="r1" checked />
  <label class="form-check-label" for="r1">Radio 1</label>
</div>`

const codeInputGroup = `<div class="input-group mb-2">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username" />
</div>
<div class="input-group">
  <input type="text" class="form-control" placeholder="Tìm..." />
  <button class="btn btn-outline-secondary" type="button">Tìm</button>
</div>`

const codeFloatingLabel = `<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
  <label for="floatingInput">Email</label>
</div>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.formsTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.formsSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection
      :title="t('demo.inputBasic')"
      :description="t('demo.inputBasicDesc')"
      :code="codeInputBasic"
      code-language="html"
    >
      <div class="mb-3">
        <label for="demo-email" class="form-label">{{ t('auth.email') }}</label>
        <input type="email" class="form-control" id="demo-email" :placeholder="t('auth.emailPlaceholder')" />
      </div>
      <div class="mb-0">
        <label for="demo-pass" class="form-label">{{ t('auth.password') }}</label>
        <input type="password" class="form-control" id="demo-pass" />
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.inputSizes')"
      :description="t('demo.inputSizesDesc')"
      :code="codeInputSizes"
      code-language="html"
    >
      <input class="form-control form-control-lg mb-2" type="text" placeholder="Large" />
      <input class="form-control mb-2" type="text" placeholder="Default" />
      <input class="form-control form-control-sm" type="text" placeholder="Small" />
    </DemoSection>

    <DemoSection
      :title="t('demo.select')"
      :description="t('demo.selectDesc')"
      :code="codeSelect"
      code-language="html"
    >
      <select class="form-select">
        <option selected>{{ t('demo.choose') }}</option>
        <option value="1">{{ t('demo.one') }}</option>
        <option value="2">{{ t('demo.two') }}</option>
      </select>
    </DemoSection>

    <DemoSection
      :title="t('demo.checkboxRadio')"
      :description="t('demo.checkboxRadioDesc')"
      :code="codeCheckboxRadio"
      code-language="html"
    >
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="demo-c1" />
        <label class="form-check-label" for="demo-c1">Checkbox</label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="radio" name="demo-r" id="demo-r1" checked />
        <label class="form-check-label" for="demo-r1">{{ t('demo.radio1') }}</label>
      </div>
      <div class="form-check mb-0">
        <input class="form-check-input" type="radio" name="demo-r" id="demo-r2" />
        <label class="form-check-label" for="demo-r2">{{ t('demo.radio2') }}</label>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.inputGroup')"
      :description="t('demo.inputGroupDesc')"
      :code="codeInputGroup"
      code-language="html"
    >
      <div class="input-group mb-2">
        <span class="input-group-text">@</span>
        <input type="text" class="form-control" placeholder="Username" />
      </div>
      <div class="input-group mb-0">
        <input type="text" class="form-control" :placeholder="t('demo.searchPlaceholder')" />
        <button class="btn btn-outline-secondary" type="button">{{ t('common.search') }}</button>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.floatingLabel')"
      :description="t('demo.floatingLabelDesc')"
      :code="codeFloatingLabel"
      code-language="html"
    >
      <div class="form-floating">
        <input type="email" class="form-control" id="demo-floating" :placeholder="t('auth.emailPlaceholder')" />
        <label for="demo-floating">{{ t('auth.email') }}</label>
      </div>
    </DemoSection>
  </div>
</template>
