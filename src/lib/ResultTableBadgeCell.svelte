<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import JuniorMilestoneSvg from '$lib/JuniorMilestoneSvg.svelte';

  export let value: string;
  export let labels: {
    type: string;
    value?: string;
  }[];

  const milestoneVariant = (value: string | undefined) => {
    switch (value) {
      case '11':
        return 'milestone11';
      case '21':
        return 'milestone21';
      case '50':
        return 'milestone50';
      case '100':
        return 'milestone100';
      default:
        return 'outline';
    }
  };
</script>

<div class="flex space-x-1 items-center">
  {#if value}<span class="mr-1">{value}</span>{/if}
  {#if labels}
    {#each labels as label}
      {#if label.type == 'pb'}
        <Badge variant="pb">PB</Badge>
      {:else if label.type == 'firsttime'}
        <Badge variant="firsttime">First timer</Badge>
      {:else if label.type == 'milestone'}
        <Badge variant={milestoneVariant(label.value)}
          ><JuniorMilestoneSvg className="w-4 h-4" /></Badge
        >
      {:else if label.type == 'volunteer'}
        <Badge variant="outline">Volunteer</Badge>
      {:else if label.type == 'runs'}
        <Badge variant="outline"
          >{label.value} run{#if label.value != '1'}s{/if}</Badge
        >
      {:else if label.type == 'unknown'}
        <Badge variant="outline">Unknown</Badge>
      {/if}
    {/each}
  {/if}
</div>
