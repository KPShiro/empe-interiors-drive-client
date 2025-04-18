import { cn } from '@utils/cn';
import { Link } from 'react-router';

type NavbarProps = React.ComponentProps<'nav'>;

export const Navbar = ({ className, ...props }: NavbarProps) => {
    return (
        <nav {...props} className={cn('bg-primary text-on-primary', className)}>
            <ul className="flex gap-2 p-6">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/aoidiwanb">Broken</Link>
                </li>
            </ul>
        </nav>
    );
};
