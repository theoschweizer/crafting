import { IconLoader2 } from '@tabler/icons-react';
import './Loader.css'

type LoaderProps = {
    size?: number;
};

export function Loader({size = 24}: LoaderProps) {
    return (
        <IconLoader2 className="spinner" size={size} />
    );
};