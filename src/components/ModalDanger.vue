<template>
    <DialogRoot>
      <DialogTrigger class="w-32 mx-auto py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
        Click me
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 w-full h-full bg-black opacity-40" />
        <DialogContent class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
          <div class="bg-white rounded-md shadow-lg px-4 py-6 sm:flex">
            <div class="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="mt-2 text-center sm:ml-4 sm:text-left">
            <DialogTitle class="text-lg font-medium text-gray-800 mt-2 text-center sm:ml-4 sm:text-left">
              An error occured!
            </DialogTitle>
            <DialogDescription class="mt-2 text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc eget lorem dolor sed viverra ipsum nunc. venenatis.
            </DialogDescription>
            <div class="items-center gap-2 mt-3 text-sm sm:flex">
              <DialogClose as-child>
                <button class="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2">
                  Delete
                </button>
              </DialogClose>
              <DialogClose as-child>
                <button aria-label="Close" class="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2">
                  Cancel
                </button>
              </DialogClose>
            </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </template>
  
  <script setup>
  import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';
  </script>