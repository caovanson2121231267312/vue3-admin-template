<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminSmallBox from '../../components/admin/AdminSmallBox.vue'
import AdminInfoBox from '../../components/admin/AdminInfoBox.vue'
import AdminCard from '../../components/admin/AdminCard.vue'
import AdminAlert from '../../components/admin/AdminAlert.vue'
import AdminCallout from '../../components/admin/AdminCallout.vue'
import AdminProgress from '../../components/admin/AdminProgress.vue'
import AdminBadge from '../../components/admin/AdminBadge.vue'
import AdminTable from '../../components/admin/AdminTable.vue'
import AdminTimeline from '../../components/admin/AdminTimeline.vue'
import AdminDirectChat from '../../components/admin/AdminDirectChat.vue'

const { t } = useI18n()
const cardCollapsed = ref(false)
const alertVisible = ref(true)

const timelineItems = computed(() => [
  { time: '10:00', icon: 'bi bi-envelope', variant: 'info' as const, title: t('demo.emailReceived') },
  { time: '11:00', icon: 'bi bi-person-plus', variant: 'success' as const, title: t('demo.newUser') },
  { time: '12:00', icon: 'bi bi-trash', variant: 'danger' as const, title: t('demo.deleteItem') },
])
</script>

<template>
  <div class="components-demo animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.componentsTitle') }}</h1>
    <p class="text-muted mb-4">{{ t('demo.componentsSubtitle') }}</p>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.smallBox') }}</h2>
      <div class="row g-3">
        <div class="col-6 col-md-4 col-lg-2">
          <AdminSmallBox :title="t('demo.orders')" value="150" icon="bi bi-cart3" variant="primary" :link-text="t('demo.detail')" />
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <AdminSmallBox :title="t('demo.revenue')" value="8.5M" icon="bi bi-currency-dollar" variant="success" />
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <AdminSmallBox :title="t('common.user')" value="44" icon="bi bi-people" variant="info" />
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <AdminSmallBox :title="t('demo.compWarning')" value="3" icon="bi bi-exclamation-triangle" variant="warning" />
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <AdminSmallBox :title="t('demo.error')" value="1" icon="bi bi-bug" variant="danger" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.infoBox') }}</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-lg-4">
          <AdminInfoBox :title="t('demo.views')" value="2,250" icon="bi bi-eye" variant="info" :progress="70" :progress-text="t('demo.progressText')" />
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <AdminInfoBox :title="t('demo.sales')" value="1,320" icon="bi bi-graph-up" variant="success" :progress="50" />
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <AdminInfoBox :title="t('demo.newOrders')" value="93" icon="bi bi-cart-plus" variant="primary" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminCard') }}</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-lg-4">
          <AdminCard :title="t('demo.defaultCard')">
            {{ t('demo.defaultCardContent') }}
          </AdminCard>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <AdminCard title="Card primary" variant="primary">
            {{ t('demo.primaryHeader') }}
          </AdminCard>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <AdminCard :title="t('demo.cardCollapsible')" variant="success" collapsible v-model:collapsed="cardCollapsed">
            {{ t('demo.clickToCollapse') }}
          </AdminCard>
        </div>
        <div class="col-12 col-md-6">
          <AdminCard title="Card outline" variant="outline-primary">
            {{ t('demo.outlineHeader') }}
          </AdminCard>
        </div>
        <div class="col-12 col-md-6">
          <AdminCard :title="t('demo.loadingCard')" loading />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminAlert') }}</h2>
      <div class="d-flex flex-column gap-2">
        <AdminAlert variant="info" :title="t('demo.title')">{{ t('demo.infoAlert') }}</AdminAlert>
        <AdminAlert variant="success" dismissible v-model:visible="alertVisible">
          {{ t('demo.successDismiss') }}
        </AdminAlert>
        <AdminAlert variant="warning" :title="t('demo.compWarning')">{{ t('demo.warningContent') }}</AdminAlert>
        <AdminAlert variant="danger">{{ t('demo.errorMessage') }}</AdminAlert>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminCallout') }}</h2>
      <div class="d-flex flex-column gap-2">
        <AdminCallout variant="info" :title="t('demo.tip')">{{ t('demo.tipContent') }}</AdminCallout>
        <AdminCallout variant="success" :title="t('demo.success')">{{ t('demo.successDone') }}</AdminCallout>
        <AdminCallout variant="warning" :title="t('demo.noteLabel')">{{ t('demo.noteContent') }}</AdminCallout>
        <AdminCallout variant="danger" :title="t('demo.errorLabel')">{{ t('demo.errorTryAgain') }}</AdminCallout>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminProgress') }}</h2>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        <AdminProgress :value="40" variant="primary" />
        <AdminProgress :value="75" variant="success" show-label />
        <AdminProgress :value="60" variant="info" striped />
        <AdminProgress :value="90" variant="warning" striped animated />
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminBadge') }}</h2>
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <AdminBadge variant="primary">Primary</AdminBadge>
        <AdminBadge variant="success">Success</AdminBadge>
        <AdminBadge variant="info">Info</AdminBadge>
        <AdminBadge variant="warning">Warning</AdminBadge>
        <AdminBadge variant="danger">Danger</AdminBadge>
        <AdminBadge variant="secondary" rounded>Rounded</AdminBadge>
        <AdminBadge variant="dark" rounded>99+</AdminBadge>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminTable') }}</h2>
      <AdminTable hover striped>
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>{{ t('demo.tableItem') }}</th>
            <th>{{ t('common.status') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{{ t('demo.row1') }}</td>
            <td><AdminBadge variant="success">{{ t('demo.ok') }}</AdminBadge></td>
          </tr>
          <tr>
            <td>2</td>
            <td>{{ t('demo.row2') }}</td>
            <td><AdminBadge variant="warning">{{ t('demo.wait') }}</AdminBadge></td>
          </tr>
          <tr>
            <td>3</td>
            <td>{{ t('demo.row3') }}</td>
            <td><AdminBadge variant="danger">{{ t('demo.error') }}</AdminBadge></td>
          </tr>
        </tbody>
      </AdminTable>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminTimeline') }}</h2>
      <div class="row">
        <div class="col-12 col-md-6">
          <AdminTimeline :items="timelineItems">
            <template #item-0>{{ t('demo.emailContent') }}</template>
            <template #item-1>{{ t('demo.userRegistered') }}</template>
            <template #item-2>{{ t('demo.itemDeleted') }}</template>
          </AdminTimeline>
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h2 class="h5 mb-3 border-bottom pb-2">{{ t('demo.compAdminDirectChat') }}</h2>
      <div class="row">
        <div class="col-12 col-lg-6">
          <AdminDirectChat :title="t('demo.chatSample')" :status="t('demo.online')">
            <div class="p-3 border-bottom">
              <div class="d-flex mb-2">
                <span class="badge bg-primary me-2">{{ t('demo.userA') }}</span>
                <small class="text-muted">10:00</small>
              </div>
              <p class="mb-0 small">{{ t('demo.sampleMessageA') }}</p>
            </div>
            <div class="p-3 border-bottom text-end">
              <div class="d-flex justify-content-end align-items-center mb-2">
                <small class="text-muted me-2">10:01</small>
                <span class="badge bg-success">{{ t('demo.userB') }}</span>
              </div>
              <p class="mb-0 small">{{ t('demo.yourReply') }}</p>
            </div>
            <template #footer>
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" :placeholder="t('demo.typeMessage')" />
                <button class="btn btn-primary" type="button">{{ t('demo.send') }}</button>
              </div>
            </template>
          </AdminDirectChat>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.components-demo code {
  background: rgba(0, 0, 0, 0.06);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}
</style>
