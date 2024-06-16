<script lang="ts">
  import type { ParkrunRunReportMilestones } from './server/parkrun';

  export let milestones: ParkrunRunReportMilestones;
  export let drawer = false;
</script>

<section
  class={`prose ${drawer ? 'mx-4 mb-12 w-full max-w-sm text-left' : ''} prose-headings:mt-6`}
>
  {#if milestones.half.length + milestones.full.length + milestones.ultra.length + milestones.hundred.length == 0}
    <p>No milestones were reached this week.</p>
  {/if}
  {#if milestones.half.length > 0}
    <h4>Half marathon (11 runs)</h4>
    <ul>
      {#each milestones.half as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
  {#if milestones.full.length > 0}
    <h4>Marathon (21 runs)</h4>
    <ul>
      {#each milestones.full as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
  {#if milestones.ultra.length > 0}
    <h4>Ultra marathon (50 runs)</h4>
    <ul>
      {#each milestones.ultra as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
  {#if milestones.hundred.length > 0}
    <h4>100 junior parkruns</h4>
    <ul>
      {#each milestones.hundred as name}
        <li>{name}</li>
      {/each}
    </ul>
  {/if}
</section>
