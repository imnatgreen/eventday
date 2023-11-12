<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

  import type { PageData } from './$types';
	import RunReport from '$lib/RunReport.svelte';

  export let data: PageData;
</script>

<div class="mb-1 sm:mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
	<a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
	<ChevronRight class="h-4 w-4" />
	<a href={`/event/${data.report.id}`} class="font-medium text-foreground">Event #{data.report.id}</a>
  <ChevronRight class="h-4 w-4" />
	<div class="font-medium text-foreground">Run report</div>
</div>

<RunReport class="max-w-2xl" report={data.report}></RunReport>