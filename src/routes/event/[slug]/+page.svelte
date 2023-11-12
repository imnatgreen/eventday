<script lang="ts">
	import { ChevronRight, PersonStanding, HelpingHand } from 'lucide-svelte';

	import type { PageData } from './$types';
	import StatCard from '$lib/StatCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	// import * as Card from "$lib/components/ui/card";

	export let data: PageData;

	const differences = () => {
		const current = data.report.id;
		const previous = data.events.find((e) => e.id === current - 1);
		if (!previous) return { participants: 0, volunteers: 0 };
		return {
      participants: data.report.participants - previous.finishers,
      volunteers: data.report.volunteers.length - previous.volunteers,
    };
	};
</script>

<div class="mb-1 sm:mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
	<a href="/" class="overflow-hidden text-ellipsis whitespace-nowrap"> Home </a>
	<ChevronRight class="h-4 w-4" />
	<div class="font-medium text-foreground">Event #{data.report.id}</div>
</div>

<div class="flex gap-2 sm:gap-3">
  <StatCard
    class="grow max-w-full sm:max-w-fit"
    title="Participants"
    stat={data.report.participants}
    difference={differences().participants}
  >
    <PersonStanding slot="icon" class="h-4 w-4 text-muted-foreground" />
  </StatCard>
  <StatCard
    class="grow max-w-full sm:max-w-fit"
    title="Volunteers"
    stat={data.report.volunteers.length}
    difference={differences().volunteers}
  >
    <HelpingHand slot="icon" class="h-4 w-4 text-muted-foreground" />
  </StatCard>
</div>
<Button class="max-w-fit px-8" href={`${data.report.id}/report`}>Generate run report</Button>