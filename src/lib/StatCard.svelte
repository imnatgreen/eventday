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
  <Card.Header class="p-4 sm:p-6 pb-1 sm:pb-2 flex flex-row items-center justify-between space-y-0">
    <Card.Title class="text-sm sm:text-md font-medium mr-4">{title}</Card.Title>
    <slot name="icon" />
  </Card.Header>
  <Card.Content class="p-4 sm:p-6 pt-0 sm:pt-0 flex flex-col gap-1">
    <div class="text-3xl font-bold">{stat}</div>
    {#if difference > 0}
      <p class="text-xs sm:text-sm text-green-500 flex items-center gap-1">
        <TrendingUp class="w-4 h-4" />{difference}
        {since}
      </p>
    {:else if difference < 0}
      <p class="text-xs sm:text-sm text-red-500 flex items-center gap-1">
        <TrendingDown class="w-4 h-4" />{Math.abs(difference)}
        {since}
      </p>
    {/if}
  </Card.Content>
</Card.Root>
