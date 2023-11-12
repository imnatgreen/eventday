<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  import type { LayoutServerData } from "./$types";

  export let data: LayoutServerData;
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-2xl font-normal">Recent events</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-3">
    {#each data.events as event}
      <a href={`/event/${event.id}`}>
        <Card.Root class="hover:shadow-md hover:-translate-y-1 hover:bg-gray-50 transition duration-300 ease-in-out">
          <Card.Header>
            <Card.Title class="text-2xl">#{event.id}</Card.Title>
            <Card.Description>{event.date}</Card.Description>
          </Card.Header>
        </Card.Root>
      </a>
    {/each}
  </div>
</section>

<section class="flex flex-col gap-4 pt-6">
  <h2 class="text-2xl font-normal">Tools</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">
    <a href={`/tokens`}>
      <Card.Root class="hover:shadow-md hover:-translate-y-1 hover:bg-gray-50 transition duration-300 ease-in-out">
        <Card.Header>
          <Card.Title class="text-2xl">Tokens</Card.Title>
          <Card.Description>Create emergency finish tokens on the go.</Card.Description>
        </Card.Header>
      </Card.Root>
    </a>
  </div>
</section>