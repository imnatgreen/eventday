<script lang="ts">
  import { enhance } from '$app/forms';

  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Alert from '$lib/components/ui/alert';

  import { AlertCircle } from 'lucide-svelte';

  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Choose a new password</h1>
    <p class="text-sm text-muted-foreground">You need to set a new password to continue</p>
  </div>
  <form method="post" use:enhance>
    <div class="grid gap-2">
      <div class="grid gap-1">
        <Label class="sr-only" for="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          autocapitalize="none"
          autocorrect="off"
          class="bg-white"
        />
      </div>
      <Button type="submit">Submit</Button>
      {#if form?.message}
        <Alert.Root variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>
            {form.message}
          </Alert.Description>
        </Alert.Root>
      {/if}
    </div>
  </form>
</div>
