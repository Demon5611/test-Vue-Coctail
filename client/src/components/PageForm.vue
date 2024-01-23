<template>
    <div class="container">
        <div class="list-pages">
            <ul>
                <li>
                    <router-link to="/Margarita">Margarita</router-link>
                </li>
                <li>
                    <router-link to="/Mojito">Mojito</router-link>
                </li>
                <li>
                    <router-link to="/A1">A1</router-link>
                </li>
                <li>
                    <router-link to="/Kir">Kir</router-link>
                </li>
            </ul>
        </div>

        <router-view></router-view>
    </div>
</template>

