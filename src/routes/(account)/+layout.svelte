<div class="absolute bottom-0 left-0 right-0 top-0">
  <div
    class="h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
      <div id="bg-image" class="absolute inset-0 min-h-full bg-cover bg-[55%_50%]" />
      <div class="relative z-20 mt-auto text-sm drop-shadow-xl" />
    </div>
    <div class="mt-14 p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <slot></slot>
      </div>
    </div>
  </div>
</div>

<style>
  #bg-image {
    background-image: url(/volunteers.jpg);
    background-image: image-set(
      url(/volunteers-1x.avif) type('image/avif') 1x,
      url(/volunteers-2x.avif) type('image/avif') 2x,
      url(/volunteers-1x.jpg) type('image/jpeg') 1x,
      url(/volunteers-2x.jpg) type('image/jpeg') 2x
    );
  }
</style>
