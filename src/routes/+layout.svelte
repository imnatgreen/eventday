<script lang="ts">
  import "../app.css";

  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import { MapPin, Settings2, LogOut } from "lucide-svelte";

  import { fly, fade } from 'svelte/transition';

  import type { LayoutServerData } from './$types';
	
	export let data: LayoutServerData;
</script>

<div class="flex flex-col w-full min-h-screen">
  <header class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur">
    <div class="container h-14 flex items-center">
      <a href="/">
        <h1 class="text-lg mr-4">
          <span class="font-semibold">eventday</span> <span class="text-gray-500">for parkrun</span>
        </h1>
      </a>
      <div class="flex flex-1 items-center justify-end gap-2">
        <Button variant="outline" size="sm" class="font-normal hidden min-[450px]:inline-flex">
          <MapPin class="mr-2 -ml-1 h-4 w-4 shrink-0 opacity-50" />
          Burnley juniors
        </Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="outline" size="sm" class="w-9">
              <Settings2 class="h-4 w-4 shrink-0" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item class="min-[450px]:hidden flex gap-2">
                <MapPin class="h-4 w-4" /> Burnley juniors
              </DropdownMenu.Item>
              <DropdownMenu.Separator class="min-[450px]:hidden" />
              <DropdownMenu.Item class="flex gap-2">
                <LogOut class="h-4 w-4" /> Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </header>
  {#key data.url}
    <main
      in:fade={{duration: 200, delay: 200}} 
      out:fade={{duration: 200}} 
      class="container py-6 flex flex-col gap-4 grow"
    >
      <slot />
    </main>
  {/key}
</div>
