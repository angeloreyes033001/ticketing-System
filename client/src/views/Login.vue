<template>
    <main class="grid grid-cols-1 select-none sm:grid-cols-2 md:grid-cols-[1fr,1fr] lg:grid-cols-[0.5fr,1fr] max-h-screen h-screen text-black/60" >
        <div class="flex items-center" >
            <RouterView/>
        </div>
        <div class=" bg-[url(../assets/bg.png)] bg-no-repeat bg-center bg-cover relative hidden sm:block" >
            <div class="bg-green-300/35 absolute h-full w-full p-5" >
                <div class="flex gap-5 justify-end items-center" >
                    <img src="../assets/logo/cict.png" class=" sm:w-[50px] sm:h-[50px] lg:h-[80px] lg:w-[80px] bg-white rounded-[50%]" />
                    <img src="../assets/logo/neust.png" class="sm:w-[70px] sm:h-[70px]  lg:h-[100px] lg:w-[100px] bg-white rounded-[50%]" />
                    <img src="../assets/logo/pjg.png" class=" sm:w-[90px] sm:h-[90px] lg:h-[125px] lg:w-[125px] bg-white rounded-[50%]" />
                </div>
            </div>
        </div>
    </main>
</template>