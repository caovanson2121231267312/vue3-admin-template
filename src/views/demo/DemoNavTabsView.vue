<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()
const activeTab = ref('home')

const codeTabs = `<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#home">Home</a></li>
  <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#profile">Profile</a></li>
</ul>
<div class="tab-content">
  <div class="tab-pane fade show active" id="home">Nội dung Home</div>
  <div class="tab-pane fade" id="profile">Nội dung Profile</div>
</div>`

const codePills = `<ul class="nav nav-pills" role="tablist">
  <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
</ul>`

const codeNavFill = `<ul class="nav nav-pills nav-fill">
  <li class="nav-item"><a class="nav-link active" href="#">Rộng đều</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Mục 2</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Mục 3</a></li>
</ul>`

const codeVueTabs = `<!-- Vue: dùng v-for + v-show hoặc component -->
<ul class="nav nav-tabs">
  <li class="nav-item"><button class="nav-link" :class="{ active: tab === 'a' }" @click="tab = 'a'">Tab A</button></li>
  <li class="nav-item"><button class="nav-link" :class="{ active: tab === 'b' }" @click="tab = 'b'">Tab B</button></li>
</ul>
<div v-show="tab === 'a'">Nội dung A</div>
<div v-show="tab === 'b'">Nội dung B</div>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.navTabsTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.navTabsSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.tabsBootstrap')" :description="t('demo.tabsBootstrapDesc')" :code="codeTabs" code-language="html">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#demo-home" role="tab">Home</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#demo-profile" role="tab">Profile</a></li>
        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#demo-contact" role="tab">Contact</a></li>
      </ul>
      <div class="tab-content border border-top-0 p-3 bg-white rounded-bottom">
        <div class="tab-pane fade show active" id="demo-home" role="tabpanel">{{ t('demo.contentHome') }}</div>
        <div class="tab-pane fade" id="demo-profile" role="tabpanel">{{ t('demo.contentProfile') }}</div>
        <div class="tab-pane fade" id="demo-contact" role="tabpanel">{{ t('demo.contentContact') }}</div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.pills')" :description="t('demo.pillsDesc')" :code="codePills" code-language="html">
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
      </ul>
    </DemoSection>

    <DemoSection :title="t('demo.navFill')" :description="t('demo.navFillDesc')" :code="codeNavFill" code-language="html">
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item"><a class="nav-link active" href="#">{{ t('demo.item1') }}</a></li>
        <li class="nav-item"><a class="nav-link" href="#">{{ t('demo.item2') }}</a></li>
        <li class="nav-item"><a class="nav-link" href="#">{{ t('demo.item3') }}</a></li>
      </ul>
    </DemoSection>

    <DemoSection :title="t('demo.tabsVue')" :description="t('demo.tabsVueDesc')" :code="codeVueTabs" code-language="vue">
      <ul class="nav nav-tabs">
        <li class="nav-item"><button type="button" class="nav-link" :class="{ active: activeTab === 'home' }" @click="activeTab = 'home'">Home</button></li>
        <li class="nav-item"><button type="button" class="nav-link" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">Profile</button></li>
      </ul>
      <div class="border border-top-0 p-3 bg-white rounded-bottom">
        <div v-show="activeTab === 'home'">{{ t('demo.contentHomeVue') }}</div>
        <div v-show="activeTab === 'profile'">{{ t('demo.contentProfileVue') }}</div>
      </div>
    </DemoSection>
  </div>
</template>
