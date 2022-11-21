<template>
    <div class="container-preload">
        <!-- Google Chrome -->
        <div class="infinityChrome-preload">
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div class="indigo--text text-lighten-1 text-xs-center load-text animate-flicker subheading font-weight-bold">
            Loading . . .
        </div>

        <!-- Safari and others -->
        <div class="infinity-preload">
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
        </div>

        <!-- Stuff -->
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>

        <!-- dribbble -->
        <!-- <a class="dribbble" href="https://dribbble.com/shots/5557955-Infinity-Loader" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""></a> -->
    </div>
</template>

<script>
    export default {
        mounted() {
            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

            if(!isChrome) {
                document.getElementsByClassName('infinityChrome-preload')[0].style.display = "none";
                document.getElementsByClassName('infinity-preload')[0].style.display = "block";
            }
        }
    }
</script>
