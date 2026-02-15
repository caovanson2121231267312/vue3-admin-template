<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bar, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  revenueByMonth,
  ordersByMonth,
  salesByCategory,
  trafficBySource,
  ordersByStatus,
  weeklyActivity,
  kpis,
  recentOrders,
  topProducts,
  recentActivity,
} from './dashboard/data/dashboard-mock'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

const { t } = useI18n()

const revenueChartData = computed(() => ({
  labels: revenueByMonth.map((d) => d.month),
  datasets: [
    {
      label: t('dashboard.chartRevenue'),
      data: revenueByMonth.map((d) => d.value),
      borderColor: 'rgb(79, 70, 229)',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}))
const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index' as const, intersect: false },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
    x: { grid: { display: false } },
  },
}

const ordersChartData = computed(() => ({
  labels: ordersByMonth.map((d) => d.month),
  datasets: [
    {
      label: t('dashboard.chartOrders'),
      data: ordersByMonth.map((d) => d.count),
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderRadius: 6,
    },
  ],
}))
const ordersChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
    x: { grid: { display: false } },
  },
}

const categoryChartData = computed(() => ({
  labels: salesByCategory.map((d) => d.name),
  datasets: [
    {
      data: salesByCategory.map((d) => d.value),
      backgroundColor: salesByCategory.map((d) => d.color),
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
}))
const categoryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const },
  },
}

const trafficChartData = computed(() => ({
  labels: trafficBySource.map((d) => d.source),
  datasets: [
    {
      data: trafficBySource.map((d) => d.value),
      backgroundColor: ['#4f46e5', '#0ea5e9', '#10b981', '#94a3b8'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}))
const trafficChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const },
  },
}

const statusChartData = computed(() => ({
  labels: ordersByStatus.map((d) => d.status),
  datasets: [
    {
      data: ordersByStatus.map((d) => d.count),
      backgroundColor: ['#10b981', '#0ea5e9', '#f59e0b', '#94a3b8'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}))
const statusChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const },
  },
}

const weeklyChartData = computed(() => ({
  labels: weeklyActivity.map((d) => d.day),
  datasets: [
    {
      label: t('dashboard.chartOrders'),
      data: weeklyActivity.map((d) => d.orders),
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.15)',
      fill: true,
      tension: 0.4,
      yAxisID: 'y',
    },
    {
      label: t('dashboard.chartRevenueShort'),
      data: weeklyActivity.map((d) => d.revenue),
      borderColor: 'rgb(245, 158, 11)',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      fill: true,
      tension: 0.4,
      yAxisID: 'y1',
    },
  ],
}))
const weeklyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
  },
  scales: {
    y: { type: 'linear' as const, display: true, position: 'left' as const, beginAtZero: true },
    y1: { type: 'linear' as const, display: true, position: 'right' as const, beginAtZero: true, grid: { drawOnChartArea: false } },
    x: { grid: { display: false } },
  },
}

function statusClass(key: string): string {
  const map: Record<string, string> = {
    delivered: 'success',
    shipping: 'info',
    processing: 'warning',
    pending: 'secondary',
  }
  return map[key] ?? 'secondary'
}
</script>

<template>
  <div class="dashboard-page animate__animated animate__fadeIn">
    <header class="dashboard-header">
      <div>
        <h1 class="dashboard-title">{{ t('dashboard.title') }}</h1>
        <p class="dashboard-subtitle">{{ t('dashboard.subtitle') }}</p>
      </div>
      <div class="dashboard-header__actions">
        <select class="dashboard-select form-select form-select-sm">
          <option>{{ t('dashboard.periodMonth') }}</option>
          <option>{{ t('dashboard.periodQuarter') }}</option>
          <option>{{ t('dashboard.periodYear') }}</option>
        </select>
        <button type="button" class="btn btn-primary btn-sm">
          <i class="bi bi-download me-1"></i>{{ t('dashboard.exportReport') }}
        </button>
      </div>
    </header>

    <!-- KPI cards -->
    <section class="dashboard-kpis">
      <div
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        class="dashboard-kpi animate__animated animate__fadeInUp"
        :style="{ animationDelay: `${i * 0.05}s` }"
      >
        <div class="dashboard-kpi__icon" :class="`dashboard-kpi__icon--${kpi.color}`">
          <i :class="'bi ' + kpi.icon"></i>
        </div>
        <div class="dashboard-kpi__body">
          <span class="dashboard-kpi__label">{{ t(kpi.label) }}</span>
          <div class="dashboard-kpi__value">
            {{ kpi.value }}
            <span v-if="kpi.subValue" class="dashboard-kpi__sub">{{ kpi.subValue }}</span>
          </div>
          <span class="dashboard-kpi__trend" :class="kpi.trend >= 0 ? 'up' : 'down'">
            <i :class="kpi.trend >= 0 ? 'bi bi-arrow-up-right' : 'bi bi-arrow-down-right'"></i>
            {{ Math.abs(kpi.trend) }}% {{ t('dashboard.vsLastPeriod') }}
          </span>
        </div>
      </div>
    </section>

    <!-- Charts row 1 -->
    <section class="dashboard-charts">
      <div class="dashboard-card dashboard-card--chart">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.chartRevenueTitle') }}</h3>
          <span class="dashboard-card__badge">{{ t('dashboard.last8Months') }}</span>
        </div>
        <div class="dashboard-card__chart">
          <Line :data="revenueChartData" :options="revenueChartOptions" />
        </div>
      </div>
      <div class="dashboard-card dashboard-card--chart">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.chartOrdersTitle') }}</h3>
          <span class="dashboard-card__badge">{{ t('dashboard.last8Months') }}</span>
        </div>
        <div class="dashboard-card__chart">
          <Bar :data="ordersChartData" :options="ordersChartOptions" />
        </div>
      </div>
    </section>

    <!-- Charts row 2 -->
    <section class="dashboard-charts dashboard-charts--three">
      <div class="dashboard-card dashboard-card--chart">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.chartCategoryTitle') }}</h3>
        </div>
        <div class="dashboard-card__chart dashboard-card__chart--small">
          <Doughnut :data="categoryChartData" :options="categoryChartOptions" />
        </div>
      </div>
      <div class="dashboard-card dashboard-card--chart">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.chartTrafficTitle') }}</h3>
        </div>
        <div class="dashboard-card__chart dashboard-card__chart--small">
          <Doughnut :data="trafficChartData" :options="trafficChartOptions" />
        </div>
      </div>
      <div class="dashboard-card dashboard-card--chart">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.chartStatusTitle') }}</h3>
        </div>
        <div class="dashboard-card__chart dashboard-card__chart--small">
          <Doughnut :data="statusChartData" :options="statusChartOptions" />
        </div>
      </div>
    </section>

    <!-- Weekly activity line -->
    <section class="dashboard-charts">
      <div class="dashboard-card dashboard-card--chart dashboard-card--full">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.chartWeeklyTitle') }}</h3>
          <span class="dashboard-card__badge">{{ t('dashboard.thisWeek') }}</span>
        </div>
        <div class="dashboard-card__chart dashboard-card__chart--medium">
          <Line :data="weeklyChartData" :options="weeklyChartOptions" />
        </div>
      </div>
    </section>

    <!-- Tables row -->
    <section class="dashboard-tables">
      <div class="dashboard-card">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.recentOrders') }}</h3>
          <router-link :to="{ name: 'OrderList' }" class="dashboard-card__link">{{ t('common.viewAll') }}</router-link>
        </div>
        <div class="dashboard-card__table-wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>{{ t('dashboard.orderId') }}</th>
                <th>{{ t('dashboard.customer') }}</th>
                <th>{{ t('dashboard.amount') }}</th>
                <th>{{ t('common.status') }}</th>
                <th>{{ t('dashboard.date') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id">
                <td><strong>{{ order.id }}</strong></td>
                <td>{{ order.customer }}</td>
                <td>{{ order.amount }} đ</td>
                <td><span class="dashboard-badge" :class="'dashboard-badge--' + statusClass(order.statusKey)">{{ order.status }}</span></td>
                <td class="text-muted">{{ order.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.topProducts') }}</h3>
          <router-link :to="{ name: 'ProductList' }" class="dashboard-card__link">{{ t('common.viewAll') }}</router-link>
        </div>
        <div class="dashboard-card__table-wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>{{ t('dashboard.productName') }}</th>
                <th class="text-end">{{ t('dashboard.sold') }}</th>
                <th class="text-end">{{ t('dashboard.revenue') }}</th>
                <th class="text-end">{{ t('dashboard.growth') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in topProducts" :key="p.name">
                <td><span class="dashboard-rank">{{ i + 1 }}</span> {{ p.name }}</td>
                <td class="text-end">{{ p.sold }}</td>
                <td class="text-end">{{ p.revenue }}</td>
                <td class="text-end"><span :class="p.growth >= 0 ? 'text-success' : 'text-danger'">{{ p.growth >= 0 ? '+' : '' }}{{ p.growth }}%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Activity feed -->
    <section class="dashboard-activity">
      <div class="dashboard-card">
        <div class="dashboard-card__head">
          <h3 class="dashboard-card__title">{{ t('dashboard.recentActivity') }}</h3>
        </div>
        <ul class="dashboard-activity__list">
          <li v-for="item in recentActivity" :key="item.id" class="dashboard-activity__item">
            <div class="dashboard-activity__icon"><i :class="'bi ' + item.icon"></i></div>
            <div class="dashboard-activity__body">
              <p class="dashboard-activity__text">{{ t(item.messageKey) }}</p>
              <span class="dashboard-activity__time">{{ item.time }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding-bottom: 2rem;
}
.dashboard-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.dashboard-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: var(--bs-body-color);
}
.dashboard-subtitle {
  margin: 0;
  color: var(--bs-secondary-color);
  font-size: 0.9375rem;
}
.dashboard-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dashboard-select {
  width: auto;
  min-width: 140px;
}
.dashboard-kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (min-width: 992px) {
  .dashboard-kpis {
    grid-template-columns: repeat(5, 1fr);
  }
}
.dashboard-kpi {
  background: var(--bs-body-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  transition: box-shadow 0.2s ease;
}
.dashboard-kpi:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.dashboard-kpi__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}
.dashboard-kpi__icon--primary { background: rgba(79, 70, 229, 0.15); color: #4f46e5; }
.dashboard-kpi__icon--success { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.dashboard-kpi__icon--info { background: rgba(14, 165, 233, 0.15); color: #0ea5e9; }
.dashboard-kpi__icon--warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.dashboard-kpi__icon--danger { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.dashboard-kpi__body { min-width: 0; }
.dashboard-kpi__label {
  display: block;
  font-size: 0.8125rem;
  color: var(--bs-secondary-color);
  margin-bottom: 4px;
}
.dashboard-kpi__value {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--bs-body-color);
}
.dashboard-kpi__sub {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--bs-secondary-color);
  margin-left: 2px;
}
.dashboard-kpi__trend {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 0.75rem;
  margin-top: 4px;
}
.dashboard-kpi__trend.up { color: #10b981; }
.dashboard-kpi__trend.down { color: #ef4444; }
.dashboard-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.dashboard-charts--three {
  grid-template-columns: 1fr 1fr 1fr;
}
.dashboard-card--full { grid-column: 1 / -1; }
@media (max-width: 991.98px) {
  .dashboard-charts { grid-template-columns: 1fr; }
  .dashboard-charts--three { grid-template-columns: 1fr; }
}
.dashboard-card {
  background: var(--bs-body-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 12px;
  overflow: hidden;
}
.dashboard-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--bs-border-color);
}
.dashboard-card__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--bs-body-color);
}
.dashboard-card__badge {
  font-size: 0.75rem;
  color: var(--bs-secondary-color);
  background: var(--bs-secondary-bg);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}
.dashboard-card__link {
  font-size: 0.875rem;
  color: var(--bs-primary);
  text-decoration: none;
}
.dashboard-card__link:hover { color: var(--bs-primary); text-decoration: underline; }
.dashboard-card__chart {
  height: 280px;
  padding: 1rem 1.25rem;
}
.dashboard-card__chart--small { height: 220px; }
.dashboard-card__chart--medium { height: 260px; }
.dashboard-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 991.98px) {
  .dashboard-tables { grid-template-columns: 1fr; }
}
.dashboard-card__table-wrap {
  overflow-x: auto;
}
.dashboard-table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: collapse;
}
.dashboard-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--bs-secondary-color);
  background: var(--bs-secondary-bg);
  border-bottom: 1px solid var(--bs-border-color);
}
.dashboard-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--bs-border-color-translucent, rgba(0,0,0,0.06));
}
.dashboard-table tbody tr:hover {
  background: var(--bs-secondary-bg);
}
.dashboard-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}
.dashboard-badge--success { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.dashboard-badge--info { background: rgba(14, 165, 233, 0.15); color: #0ea5e9; }
.dashboard-badge--warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.dashboard-badge--secondary { background: rgba(100, 116, 139, 0.15); color: #64748b; }
.dashboard-rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--bs-secondary-bg);
  font-weight: 600;
  font-size: 0.75rem;
  margin-right: 0.5rem;
}
.dashboard-activity { margin-bottom: 0; }
.dashboard-activity__list { list-style: none; margin: 0; padding: 0; }
.dashboard-activity__item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--bs-border-color-translucent, rgba(0,0,0,0.06));
}
.dashboard-activity__item:last-child { border-bottom: none; }
.dashboard-activity__icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--bs-secondary-bg);
  color: var(--bs-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.dashboard-activity__body { min-width: 0; }
.dashboard-activity__text {
  margin: 0 0 2px;
  font-size: 0.875rem;
  color: var(--bs-body-color);
}
.dashboard-activity__time {
  font-size: 0.75rem;
  color: var(--bs-secondary-color);
}
</style>
