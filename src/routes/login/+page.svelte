<script>

    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { loader } from "$lib/store/loader.svelte";
    import { toast } from "$lib/store/toast.svelte";

</script>

<div class="flex flex-wrap lg:flex-nowrap">
    <!-- Side bar (desktop) top bar (mobile) -->
    <div class="bg-zinc-600 h-12 lg:h-svh w-full lg:w-[calc(66vw)] px-4 py-2
        flex lg:items-center lg:justify-end ">
        <img src="/SlateDevLogo.png" alt="Slate Dev Logo" class=" max-w-48"/>
    </div>
    <!-- Main window -->
    <div class="h-[calc(100vh-48px)] lg:h-svh w-full p-4
        bg-[url('/home-office.png')] bg-no-repeat bg-center bg-cover
        flex lg:justify-center lg:items-start flex-col items-center
        ">
        <!-- Login box -->
        <form action="?/login" method="post" use:enhance={()=>{
            loader.show = true

            return async ({result}) => {
                // do something with result or after submission
                if(result.type === 'success' && result.status === 200){
                    goto('/') // send back to main page of site
                } else if(result.type === 'redirect'){
                    // form response might return a redirect
                    goto(result.location, {invalidateAll:true})
                } else {
                    // show an error
                    const errorText = (result.type === 'error' ? result.error.message : result.data?.message)
                   
                    toast.text = errorText
                    toast.color = 'red'
                    loader.show = false
                }
            }
        }}>
            <div class="w-full md:w-[380px] rounded-md bg-zinc-100 p-4 min-h-32
                flex flex-col gap-2">
                <h1 class="text-xl">Welcome!</h1>
                <input type="text" name="email" placeholder="Email" class="border border-zinc-400 rounded-md h-9 p-2"/>
                <input type="password" name="password" placeholder="Password" class="border border-zinc-400 rounded-md h-9 p-2"/>
                <button type="submit" class="h-9 rounded-md bg-slate-500 text-white font-bold hover:brightness-90">Sign In</button>
            </div>
        </form>
    </div>
</div>