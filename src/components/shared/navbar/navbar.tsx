import { component$ } from "@builder.io/qwik";
import { Image } from '@unpic/qwik';
import './navbar.module.css'
import Logo from '../../../../public/favicon.svg'

export const Navbar = component$(() => {

    return (
        <nav class="flex flex-row justify-between items-center px-6">
            <Image
                src={Logo}
                layout="constrained"
                width={50}
                height={50}
                alt="Logo"
            />
            <ul>
                <li>
                    <a href="#">Tuturiales</a>
                </li>
            </ul>
        </nav>
    )
})