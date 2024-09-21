<script>
import { getUserStore } from '@/stores/users.js'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const getUser = getUserStore()
    const { users } = storeToRefs(getUser)

    getUser.fetchUsers()

    return { users }
  },
}
</script>

<template>
  <section class="user">
    <h2 class="my-3 font-bold text-lg">All Users</h2>
    <div
      class="user-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      v-if="users.length"
    >
      <div
        v-for="user in users"
        :key="user.id"
        class="user-card border w-[460px] p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer bg-white"
      >
        <div class="card-header flex items-center gap-5">
          <div class="user-profile-image">
            <img
              src="/userimage.jpg"
              alt="User Image"
              class="w-24 h-24 rounded-full border-2 border-[#4F359B] object-cover"
            />
          </div>

          <div class="user-contact-info">
            <h3 class="user-fullname text-xl font-semibold">{{ user.name }}</h3>
            <p class="user-email text-sm text-gray-600">{{ user.email }}</p>
            <p class="user-phone-number text-gray-600">{{ user.phone }}</p>
          </div>
        </div>

        <div class="card-body mt-4">
          <div class="user-other-info">
            <div class="location flex flex-col">
              <div class="title flex gap-1">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8.99981C11.9998 8.44865 11.8477 7.9082 11.5605 7.43777C11.2734 6.96735 10.8621 6.58514 10.372 6.33308C9.88182 6.08102 9.33171 5.96886 8.78201 6.00891C8.23231 6.04896 7.70426 6.23967 7.25582 6.56011C6.80739 6.88055 6.45589 7.31834 6.23992 7.82542C6.02394 8.3325 5.95184 8.88928 6.03151 9.43465C6.11119 9.98002 6.33956 10.4929 6.69158 10.917C7.04359 11.3411 7.50564 11.66 8.027 11.8388"
                    stroke="#26303E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.76001 19.4699C8.31611 19.417 7.90293 19.2162 7.58701 18.8999L3.34301 14.6569C2.41078 13.7245 1.72345 12.5762 1.34215 11.3141C0.960849 10.0519 0.897409 8.71511 1.15747 7.42254C1.41753 6.12997 1.99303 4.92171 2.83278 3.90524C3.67252 2.88877 4.75048 2.09561 5.97076 1.59631C7.19104 1.09702 8.5158 0.907059 9.82722 1.04334C11.1386 1.17962 12.396 1.63792 13.4876 2.37746C14.5791 3.11701 15.4709 4.11487 16.0837 5.28229C16.6965 6.4497 17.0113 7.75048 17 9.06891"
                    stroke="#26303E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 19.9999L18.35 16.7159C18.5554 16.5165 18.7188 16.278 18.8306 16.0145C18.9423 15.7509 19.0001 15.4677 19.0006 15.1814C19.0011 14.8952 18.9442 14.6117 18.8333 14.3478C18.7224 14.0839 18.5598 13.8449 18.355 13.6449C17.9371 13.2362 17.3762 13.0069 16.7917 13.0058C16.2072 13.0046 15.6454 13.2318 15.226 13.6389L15.002 13.8589L14.779 13.6389C14.3612 13.2305 13.8005 13.0014 13.2162 13.0002C12.632 12.9991 12.0704 13.2261 11.651 13.6329C11.4455 13.8321 11.282 14.0706 11.1702 14.3341C11.0583 14.5976 11.0004 14.8808 10.9999 15.1671C10.9993 15.4534 11.0561 15.7368 11.1669 16.0008C11.2777 16.2647 11.4403 16.5038 11.645 16.7039L15 19.9999Z"
                    stroke="#26303E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h5 class="font-bold">Location</h5>
              </div>
              <p class="text-gray-600">
                <span
                  >Timko sokak no:2
                  <br />
                </span>
                Yeni Mahalle / Ankara
              </p>
            </div>

            <div class="company flex flex-col">
              <div class="title flex gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 12V12.01M9 15V15.01M9 18V18.01"
                    stroke="#26303E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h5 class="font-bold">Company</h5>
              </div>
              <p class="text-gray-600 text-md">
                <span
                  >Timko sokak no:2
                  <br />
                </span>
                Yeni Mahalle / Ankara
              </p>
            </div>

            <div class="website flex flex-col">
              <div class="title flex gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.94 13.045C21.1518 11.2333 20.8081 9.39995 19.9544 7.78798C19.1007 6.176 17.7774 4.86147 16.1598 4.01857C14.5421 3.17566 12.7066 2.84418 10.8963 3.06805C9.08602 3.29191 7.3865 4.06055 6.02293 5.27212C4.65937 6.48369 3.69613 8.08099 3.26086 9.85236C2.82558 11.6237 2.93883 13.4855 3.58558 15.1911C4.23233 16.8967 5.38206 18.3654 6.88241 19.4028C8.38277 20.4402 10.1629 20.9972 11.987 21M3.59998 9H20.4M3.59998 15H13"
                    stroke="#26303E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.5 3C9.81532 5.69961 8.92218 8.81787 8.92218 12C8.92218 15.1821 9.81532 18.3004 11.5 21M12.5 3C14.4191 6.07385 15.3053 9.68077 15.029 13.294M16 22L21 17M21 17V21.5M21 17H16.5"
                    stroke="#26303E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h5 class="font-bold">Website</h5>
              </div>

              <p class="text-gray-600">{{ user.website }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
