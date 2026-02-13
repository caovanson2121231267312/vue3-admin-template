<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()

const codeBasic = `<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Mục 1</a></li>
    <li><a class="dropdown-item" href="#">Mục 2</a></li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" href="#">Mục 3</a></li>
  </ul>
</div>`

const codeSplit = `<div class="btn-group">
  <button type="button" class="btn btn-danger">Chia</button>
  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"></button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Xóa</a></li>
  </ul>
</div>`

const codeDirections = `<div class="dropdown dropend">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">Dropend</button>
  <ul class="dropdown-menu">...</ul>
</div>
<div class="dropdown dropstart">...</div>
<div class="dropdown dropup">...</div>`

const codeMenuHeader = `<ul class="dropdown-menu">
  <li><h6 class="dropdown-header">Tiêu đề</h6></li>
  <li><a class="dropdown-item" href="#">Mục</a></li>
  <li><a class="dropdown-item active" href="#">Active</a></li>
  <li><a class="dropdown-item disabled" href="#">Disabled</a></li>
</ul>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.dropdownsTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.dropdownsSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.dropdownBasic')" :description="t('demo.dropdownBasicDesc')" :code="codeBasic" code-language="html">
      <div class="d-flex flex-wrap gap-2">
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">{{ t('demo.item1') }}</a></li>
            <li><a class="dropdown-item" href="#">{{ t('demo.item2') }}</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">{{ t('demo.item3') }}</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Outline</button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>{{ t('common.edit') }}</a></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-trash me-2"></i>{{ t('common.delete') }}</a></li>
          </ul>
        </div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.splitButton')" :description="t('demo.splitButtonDesc')" :code="codeSplit" code-language="html">
      <div class="btn-group">
        <button type="button" class="btn btn-danger">{{ t('demo.action') }}</button>
        <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">{{ t('common.delete') }}</a></li>
          <li><a class="dropdown-item" href="#">{{ t('demo.other') }}</a></li>
        </ul>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.menuWithHeader')" :description="t('demo.menuWithHeaderDesc')" :code="codeMenuHeader" code-language="html">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">{{ t('common.menu') }}</button>
        <ul class="dropdown-menu">
          <li><h6 class="dropdown-header">{{ t('demo.options') }}</h6></li>
          <li><a class="dropdown-item" href="#">{{ t('demo.item1') }}</a></li>
          <li><a class="dropdown-item active" href="#">{{ t('demo.selectedItem') }}</a></li>
          <li><a class="dropdown-item disabled" href="#">{{ t('demo.disabledItem') }}</a></li>
        </ul>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.directions')" :description="t('demo.directionsDesc')" :code="codeDirections" code-language="html">
      <div class="d-flex flex-wrap gap-2">
        <div class="dropdown dropend">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropend</button>
          <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">{{ t('demo.item') }}</a></li></ul>
        </div>
        <div class="dropdown dropstart">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropstart</button>
          <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">{{ t('demo.item') }}</a></li></ul>
        </div>
        <div class="dropdown dropup">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropup</button>
          <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">{{ t('demo.item') }}</a></li></ul>
        </div>
      </div>
    </DemoSection>
  </div>
</template>
