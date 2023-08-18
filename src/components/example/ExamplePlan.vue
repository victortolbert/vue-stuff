<script setup lang="ts">
const selected = ref(true)
</script>

<template>
  <section aria-labelledby="plan_heading">
    <form action="#" method="POST">
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="bg-white px-4 py-6 space-y-6 dark:bg-gray-900 sm:p-6">
          <div>
            <h2
              id="plan_heading"
              class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Plan
            </h2>
          </div>

          <fieldset>
            <legend class="sr-only">
              Pricing plans
            </legend>
            <ul class="relative rounded-md bg-white dark:bg-gray-900 dark:text-gray-400 -space-y-px">
              <li>
                <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
                <div
                  class="relative flex flex-col border rounded-tl-md rounded-tr-md p-4 md:grid md:grid-cols-3 dark:border-gray-800 md:pl-4 md:pr-6"
                >
                  <label class="flex cursor-pointer items-center text-sm">
                    <input
                      name="pricing_plan"
                      type="radio"
                      class="h-4 w-4 cursor-pointer border-gray-300 text-primary-500 dark:border-gray-700 focus:ring-gray-900"
                      aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                    >
                    <span class="ml-3 font-medium text-gray-900 dark:text-gray-100">Startup</span>
                  </label>
                  <p
                    id="plan-option-pricing-0"
                    class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <!-- On: "text-primary-900", Off: "text-gray-900" -->
                    <span class="font-medium">$29 / mo</span>
                    <!-- On: "text-primary-700", Off: "text-gray-500" -->
                    <span>($290 / yr)</span>
                  </p>
                  <!-- On: "text-primary-700", Off: "text-gray-500" -->
                  <p
                    id="plan-option-limit-0"
                    class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                  >
                    Up to 5 active job postings
                  </p>
                </div>
              </li>

              <li>
                <!-- On: "", Off: "" -->
                <div
                  :class="[
                    selected
                      ? 'bg-primary-50 border-primary-200 dark:bg-primary-950 z-10'
                      : 'border-gray-200 dark:border-gray-800',
                  ]"
                  class="relative flex flex-col border p-4 md:grid md:grid-cols-3 dark:border-gray-800 md:pl-4 md:pr-6"
                >
                  <label class="flex cursor-pointer items-center text-sm">
                    <input
                      name="pricing_plan"
                      type="radio"
                      class="h-4 w-4 cursor-pointer border-gray-300 text-primary-500 dark:border-gray-700 focus:ring-primary-500"
                      aria-describedby="plan-option-pricing-1 plan-option-limit-1"
                      checked
                    >
                    <span class="ml-3 font-medium text-gray-900 dark:text-gray-100">Business</span>
                  </label>
                  <p
                    id="plan-option-pricing-1"
                    class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <!-- On: "text-primary-900", Off: "text-gray-900" -->
                    <span class="font-medium">$99 / mo</span>
                    <!-- On: "text-primary-700", Off: "text-gray-500" -->
                    <span>($990 / yr)</span>
                  </p>
                  <!-- On: "text-primary-700", Off: "text-gray-500" -->
                  <p
                    id="plan-option-limit-1"
                    class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                  >
                    Up to 25 active job postings
                  </p>
                </div>
              </li>

              <li>
                <!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-gray-200" -->
                <div
                  class="relative flex flex-col border border-gray-200 rounded-bl-md rounded-br-md p-4 md:grid md:grid-cols-3 dark:border-gray-800 md:pl-4 md:pr-6"
                >
                  <label class="flex cursor-pointer items-center text-sm">
                    <input
                      name="pricing_plan"
                      type="radio"
                      class="h-4 w-4 cursor-pointer border-gray-300 text-primary-500 dark:border-gray-700 focus:ring-gray-900"
                      aria-describedby="plan-option-pricing-2 plan-option-limit-2"
                    >
                    <span class="ml-3 font-medium text-gray-900 dark:text-gray-100">Enterprise</span>
                  </label>
                  <p
                    id="plan-option-pricing-2"
                    class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <!-- On: "text-primary-900", Off: "text-gray-900" -->
                    <span class="font-medium">$249 / mo</span>
                    <!-- On: "text-primary-700", Off: "text-gray-500" -->
                    <span>($2490 / yr)</span>
                  </p>
                  <!-- On: "text-primary-700", Off: "text-gray-500" -->
                  <p
                    id="plan-option-limit-2"
                    class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                  >
                    Unlimited active job postings
                  </p>
                </div>
              </li>
            </ul>
          </fieldset>

          <div class="flex items-center">
            <!-- On: "bg-primary-500", Off: "bg-gray-200" -->
            <button
              type="button"
              aria-pressed="true"
              aria-labelledby="toggleLabel"
              class="relative h-6 w-11 inline-flex flex-shrink-0 cursor-pointer border-2 border-transparent rounded-full bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span class="sr-only">Use setting</span>
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <span
                aria-hidden="true"
                class="inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              />
            </button>
            <span id="toggleLabel" class="ml-3">
              <span class="text-sm font-medium text-gray-900">Annual billing
              </span>
              <span class="text-sm text-gray-500">(Save 10%)</span>
            </span>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right dark:bg-gray-800 sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center border border-transparent rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
