import { useRouter } from "next/router";
import styles from '@/styles/Navbar.module.css'
import Link from "next/link";

const Navbar = ({data}: {data: any})=>{
    const router = useRouter();
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <a href="">Logo</a>
            </div>
            <ul className={styles.navLinks}>
                {data.map((item: any, index: number)=> (
                    <li key={index}>
                        <Link href={item.path} onClick={()=> router.push(item.path)} className={router.pathname === item.path ? `menuItem ${styles.active}` : ''}>{item.name}</Link>
                    </li>)
                )}
            </ul>
        </nav>
    )
}

export default Navbar;