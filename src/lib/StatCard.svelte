<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };

  import { TrendingUp, TrendingDown } from 'lucide-svelte';

  import * as Card from '$lib/components/ui/card';

  export let title: string;
  export let stat: number | string;
  export let since: string = 'from last week';
  export let difference: number = 0;
</script>

<Card.Root class={className}>
  <Card.Header class="flex flex-row items-center justify-between space-y-0 p-4 pb-1 sm:p-6 sm:pb-2">
    <Card.Title class="sm:text-md mr-4 text-sm font-medium">{title}</Card.Title>
    <slot name="icon" />
  </Card.Header>
  <Card.Content class="flex flex-col gap-1 p-4 pt-0 sm:p-6 sm:pt-0">
    <div class="text-3xl font-bold">{stat}</div>
    {#if difference > 0}
      <p class="flex items-center gap-1 text-xs text-green-500 sm:text-sm">
        <TrendingUp class="h-4 w-4" />{difference}
        {since}
      </p>
    {:else if difference < 0}
      <p class="flex items-center gap-1 text-xs text-red-500 sm:text-sm">
        <TrendingDown class="h-4 w-4" />{Math.abs(difference)}
        {since}
      </p>
    {/if}
  </Card.Content>
</Card.Root>
