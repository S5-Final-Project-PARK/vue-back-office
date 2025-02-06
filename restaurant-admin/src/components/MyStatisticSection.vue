<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Chart, { type ChartConfiguration, type ChartOptions } from "chart.js/auto";

const props = defineProps<{
  chartData: { labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string[] }[] };
  chartOptions?: ChartOptions;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

// Default chart options
const defaultOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Sales",
    },
  },
};

// Function to render the chart
const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy(); // Destroy existing chart before re-rendering
  }

  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: "bar",
      data: props.chartData,
      options: { ...defaultOptions, ...props.chartOptions },
    };

    chartInstance = new Chart(ctx, config);
  }
};

// Re-render chart when props change
watch(() => props.chartData, renderChart, { deep: true });

// Initialize chart on mount
onMounted(renderChart);
</script>

<template>
  <div class="w-full max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-center">Statistics</h1>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
