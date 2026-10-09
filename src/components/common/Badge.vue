<template>
  <span 
    :class="[
      'inline-flex items-center font-medium rounded-full',
      sizeClasses,
      variantClasses
    ]"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'emerald', // emerald, warning, danger, neutral, forest
  },
  size: {
    type: String,
    default: 'sm', // xs, sm, md
  },
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-[11px] px-2 py-0.5 gap-1';
    case 'md':
      return 'text-sm px-3 py-1 gap-1.5';
    case 'sm':
    default:
      return 'text-xs px-2.5 py-0.5 gap-1.5';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'warning':
      return 'bg-amber-100 text-status-warning border border-amber-200';
    case 'danger':
      return 'bg-red-50 text-status-danger border border-red-200';
    case 'neutral':
      return 'bg-surface-muted text-mutedText border border-surface-border';
    case 'forest':
      return 'bg-brand-forest text-white';
    case 'emerald':
    default:
      return 'bg-brand-sage text-brand-forest border border-brand-emerald/20';
  }
});
</script>
