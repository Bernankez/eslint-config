<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);

function incrementCounter() {
  counter.value++;
}
</script>

<template>
  <div>
    <div>{{ counter }}</div>
    <button @click="incrementCounter">
      Increment
    </button>
  </div>
</template>
