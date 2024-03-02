<script lang="ts">
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';

  import type { PageData } from './$types';
  import RunReport from '$lib/RunReport.svelte';

  import { ChevronRight } from 'lucide-svelte';
  import { titleCase, getResultNamesByCondition } from '$lib/utils';

  export let data: PageData;

  const runId = Number.parseInt($page.params.slug);

  let x = [
    ['a', 'b'],
    ['c', 'd']
  ];

  const report: ParkrunRunReport = {
    id: runId,
    participants: data.results.length,
    firstTimers: getResultNamesByCondition(data.results, (r) => r.FirstTimer),
    newPBs: getResultNamesByCondition(data.results, (r) => r.GenuinePB),
    milestones: {
      half: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 11),
      full: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 21),
      ultra: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 50),
      hundred: getResultNamesByCondition(data.results, (r) => r.JuniorRunTotal == 100)
    },
    volunteers: data.volunteers
      .sort((a, b) => a.LastName.localeCompare(b.LastName))
      .map((v) => titleCase(`${v.FirstName} ${v.LastName}`))
  };
</script>

<div class="mb-1 sm:mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
  <a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
  <ChevronRight class="h-4 w-4" />
  <a href={`/event/${runId}`} class="font-medium text-foreground">Event #{runId}</a>
  <ChevronRight class="h-4 w-4" />
  <div class="font-medium text-foreground">Run report</div>
</div>

<RunReport class="max-w-2xl" {report} />
