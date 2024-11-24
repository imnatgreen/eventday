<script lang="ts">
  import { page } from '$app/stores';

  import type { PageData } from './$types';
  import RunReport from '$lib/RunReport.svelte';

  import { ChevronRight } from 'lucide-svelte';
  import { titleCase, getResultNamesByCondition } from '$lib/utils';
  import type { ParkrunRunReport } from '$lib/server/parkrun';

  export let data: PageData;

  const abstractId = Number.parseInt($page.params.slug);

  const report: ParkrunRunReport = {
    id: abstractId,
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

<div class="mb-1 flex items-center space-x-1 text-sm text-muted-foreground sm:mb-4">
  <a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
  <ChevronRight class="h-4 w-4" />
  <a href={`/event/${abstractId}`} class="font-medium text-foreground">Event #{abstractId}</a>
  <ChevronRight class="h-4 w-4" />
  <div class="font-medium text-foreground">Run report</div>
</div>

<RunReport class="max-w-2xl" {report} />
