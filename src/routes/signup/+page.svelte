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

<div class="absolute top-0 bottom-0 left-0 right-0">
  <div
    class="h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
      <div
        class="absolute inset-0 bg-cover bg-[55%_50%] min-h-full"
        style="
          background-image:
            url(/volunteers.jpg);"
      />
      <div class="relative z-20 mt-auto text-sm drop-shadow-xl" />
    </div>
    <div class="mt-14 p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p class="text-sm text-muted-foreground">Enter your details below to get started</p>
        </div>
        <div class="grid gap-6">
          <form method="post" use:enhance>
            <div class="grid gap-2">
              <div class="grid gap-1">
                <Label class="sr-only" for="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  autocapitalize="none"
                  autocorrect="off"
                />
                <Label class="sr-only" for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  autocapitalize="none"
                  autocorrect="off"
                />
              </div>
              <Button type="submit">Sign up</Button>
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
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground"> Or </span>
            </div>
          </div>
          <Button variant="outline" href="/login">Log in to your account</Button>
        </div>
        <p class="px-8 text-center text-sm text-muted-foreground">
          made with ❤️ by <a
            href="https://nat.omg.lol"
            class="underline underline-offset-4 hover:text-primary">nathan</a
          >
        </p>
      </div>
    </div>
  </div>
</div>
