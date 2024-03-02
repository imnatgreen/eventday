<script lang="ts">
  import '../app.css';

  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

  import { MapPin, Settings2, LogOut } from 'lucide-svelte';

  import { fade } from 'svelte/transition';

  import type { LayoutServerData } from './$types';
  import type { Navigation } from '@sveltejs/kit';
  import { navigating } from '$app/stores';
  import { enhance } from '$app/forms';

  export let data: LayoutServerData;

  const shouldDisplayLoader = (n: Navigation | null) => {
    if (n) {
      if (n.to) {
        if (
          n.to.url.pathname.startsWith('/login') ||
          n.to.url.pathname.startsWith('/logout') ||
          n.to.url.pathname.startsWith('/signup')
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  };
</script>

<div class="flex flex-col w-full min-h-screen">
  <header
    class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur"
  >
    <div class="container h-14 flex items-center">
      <a href="/">
        <h1 class="text-lg mr-4">
          <span class="font-semibold">eventday</span> <span class="text-gray-500">for parkrun</span>
        </h1>
      </a>
      {#if data.session.userId != ''}
        <div transition:fade={{ duration: 200 }} class="flex flex-1 items-center justify-end gap-2">
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
                <DropdownMenu.Item class="">
                  <form method="post" action="/logout" use:enhance>
                    <button class="flex gap-2 items-center" type="submit"
                      ><LogOut class="h-4 w-4" /> Sign out</button
                    >
                  </form>
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      {/if}
    </div>
  </header>
  {#if shouldDisplayLoader($navigating)}
    <div
      in:fade={{ duration: 200, delay: 300 }}
      out:fade={{ duration: 200, delay: 200 }}
      class="absolute container py-6 bg-background left-0 right-0 bottom-0 top-0 mt-14 z-40"
    >
      <div class="flex flex-row p-1 gap-2 items-center">
        <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          ><style>
            .spinner_ajPY {
              transform-origin: center;
              animation: spinner_AtaB 0.75s infinite linear;
            }
            @keyframes spinner_AtaB {
              100% {
                transform: rotate(360deg);
              }
            }
          </style><path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          /><path
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            class="spinner_ajPY"
          /></svg
        >
        <span class="text-lg">Loading...</span>
      </div>
    </div>
  {/if}
  {#key data.url}
    <main
      in:fade={{ duration: 200, delay: 200 }}
      out:fade={{ duration: 200 }}
      class="container py-6 flex flex-col gap-4 grow"
    >
      <slot />
    </main>
  {/key}
</div>
