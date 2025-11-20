<template>
  <div>
    <div>{{counter}}</div>
    <button @click="incrementCounter">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)

const incrementCounter = () => {
  counter.value++
}
</script>
