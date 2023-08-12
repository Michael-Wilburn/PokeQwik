import { component$ } from "@builder.io/qwik";
import { Image } from '@unpic/qwik';
import { Link } from "@builder.io/qwik-city";
import './navbar.module.css'
import Logo from '../../../assets/logo/favicon.svg'

export const Navbar = component$(() => {

    return (
        <nav class="flex flex-row justify-between items-center px-6">
            <Link href="/">
                <Image
                    src={Logo}
                    layout="constrained"
                    width={50}
                    height={50}
                    alt="Logo"
                />
            </Link>
            <ul class="flex">
                <li class="mr-3">
                    <Link href="/pokemons/list-ssr/">SSR-List</Link>
                </li>
                <li>
                    <Link href="/pokemons/list-client/">Client-Side</Link>
                </li>
            </ul>
        </nav>
    )
})